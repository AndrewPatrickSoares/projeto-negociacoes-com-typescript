import { NegociacoesDoDia } from "../interfaces/nogociacao-do-dia.js";
import { Negociacao } from "../models/negociacao.js";

export class NegociacoesService {
    public ObterNegociacoesDoDia(): Promise<Negociacao[]> {
        return fetch('http://localhost:8080/dados')
            .then(res => res.json())
            .then((dados: NegociacoesDoDia[]) => {
                return dados.map(dadoDeHoje => {
                    return new Negociacao(new Date(), dadoDeHoje.vezes, dadoDeHoje.montante);
                });
            });
    };
};
