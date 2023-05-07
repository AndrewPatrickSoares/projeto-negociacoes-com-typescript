import { View } from "./view";
export class NegociacoesView extends View {
    template(model) {
        return `
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <td>DATA</td>
                    <td>QUANTIDADE</td>
                    <td>VALOR</td>
                </tr>
            </thead>
                ${model.lista().map(negociacao => {
            return `
                    <tr>
                        <td>${this.formatar(negociacao.data)}</td>
                        <td>${negociacao.quantidade}</td>
                        <td>${negociacao.valor}</td>
                    </tr>
                    `;
        }).join('')}
            <tbody>
            </tbody>
        `;
    }
    ;
    formatar(data) {
        return new Intl.DateTimeFormat().format(data);
    }
    ;
}
;
