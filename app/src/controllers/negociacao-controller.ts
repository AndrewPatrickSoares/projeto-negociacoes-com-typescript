import { decoratorDomInjetor } from '../decorators/decorator-DOM-injetor.js';
import { decoratorInspetor } from '../decorators/decorator-inspetor.js';
import { decoratorTempoDeExecucao } from '../decorators/decorator-tempo-de-execucao.js';
import { DiasDaSemana } from '../enums/dias-da-semana.js';
import { Negociacao } from '../models/negociacao.js';
import { Negociacoes } from '../models/negociacoes.js';
import { NegociacoesService } from '../services/negociacoes-service.js';
import { imprimir } from '../utils/imprimir.js';
import { MensagemView } from '../views/mensagem-view.js';
import { NegociacoesView } from '../views/negociacoes-view.js';

export class NegociacaoController {
    @decoratorDomInjetor('#data')
    private inputData: HTMLInputElement;
    @decoratorDomInjetor('#quantidade')
    private inputQuantidade: HTMLInputElement;
    @decoratorDomInjetor('#valor')
    private inputValor: HTMLInputElement;
    private negociacoes = new Negociacoes();
    private negociacoesView = new NegociacoesView('#negociacoesView');
    private mensagemView = new MensagemView('#mensagemView');
    private negociacoesService = new NegociacoesService();

    constructor() {
        this.negociacoesView.update(this.negociacoes);
    };

    @decoratorTempoDeExecucao(true)
    @decoratorInspetor()
    public adiciona(): void {
        const negociacao = Negociacao.criaDe(
            this.inputData.value,
            this.inputQuantidade.value,
            this.inputValor.value
        );

        if (!this.ehDiaUtil(negociacao.data)) {
            this.mensagemView
                .update('Apenas negociações em dias úteis são aceitas!');
            return;
        };

        this.negociacoes.adiciona(negociacao);
        imprimir(negociacao, this.negociacoes);
        this.limparFormulario();
        this.atualizaView();
    };

    private ehDiaUtil(data: Date) {
        return data.getDay() > DiasDaSemana.DOMINGO
            && data.getDay() < DiasDaSemana.SABADO;
    };

    private limparFormulario(): void {
        this.inputData.value = '';
        this.inputQuantidade.value = '';
        this.inputValor.value = '';
        this.inputData.focus();
    };

    private atualizaView(): void {
        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update('Negociação adicionada com sucesso');
    };

    public importaDados(): void {
        this.negociacoesService.ObterNegociacoesDoDia()
        .then(negociacoesDeHoje => {
            return negociacoesDeHoje.filter(negociacoesDeHoje => {
                return !this.negociacoes.lista().some(negociacao => negociacao.ehIgual(negociacoesDeHoje));
            });
        })
        .then(negociacoesDeHoje => {
            negociacoesDeHoje.forEach(negociacao => {
                this.negociacoes.adiciona(negociacao);
            });

            this.negociacoesView.update(this.negociacoes);
        });

    };
};
