import { MensagemView } from '../views/mensagem-view';
import { Negociacao } from "../models/negociacao";
import { NegociacoesView } from '../views/negociacoes-view';
import { Negociacoes } from '../models/negociacoes';
import { DiasDaSemana } from '../enums/dias-da-semana';
export class NegociacaoController {
    constructor() {
        this.Negociacoes = new Negociacoes();
        this.NegociacoesView = new NegociacoesView('#negociacoesView', true);
        this.MensagemView = new MensagemView('#mensagemView');
        this.inputData = document.querySelector('#data');
        this.inputQuantidade = document.querySelector('#quantidade');
        this.inputValor = document.querySelector('#valor');
        this.NegociacoesView.update(this.Negociacoes);
    }
    ;
    adicionar() {
        const negociacao = Negociacao.criaDe(this.inputData.value, this.inputQuantidade.value, this.inputValor.value);
        if (!this.ehDiaUtil(negociacao.data)) {
            this.MensagemView.update("Apenas negociações em dias úteis são adicionadas!");
            return;
        }
        ;
        this.Negociacoes.adiciona(negociacao);
        console.log(this.Negociacoes.lista());
        this.limpaFormulario();
        this.atualizaUpdate();
    }
    ;
    limpaFormulario() {
        this.inputData.value = '';
        this.inputQuantidade.value = '';
        this.inputValor.value = '';
        this.inputData.focus();
    }
    ;
    atualizaUpdate() {
        this.NegociacoesView.update(this.Negociacoes);
        this.MensagemView.update('Negociação adcionada com sucesso!');
    }
    ;
    ehDiaUtil(data) {
        return data.getDay() > DiasDaSemana.DOMINGO
            && data.getDay() < DiasDaSemana.SABADO;
    }
    ;
}
;
