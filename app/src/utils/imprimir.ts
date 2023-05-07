import { Imprimivel } from "../interfaces/imprimivel.js";

export function imprimir (...objetos: Imprimivel[]) {
    objetos.forEach(objeto => {
        console.log(objeto.paraTexto());
    });
};