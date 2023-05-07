export class Negociacoes {
    constructor() {
        this.negociacoes = [];
    }
    adiciona(Negociacao) {
        this.negociacoes.push(Negociacao);
    }
    lista() {
        return this.negociacoes;
    }
    ;
}
;
