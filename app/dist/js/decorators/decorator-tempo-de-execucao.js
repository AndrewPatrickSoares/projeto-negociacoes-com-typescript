export function decoratorTempoDeExecucao(emSegundos = false) {
    return function (target, propetyKey, descriptor) {
        const metodoOriginal = descriptor.value;
        descriptor.value = function (...args) {
            let divisor = 1;
            let unidade = 'milisegundos';
            if (emSegundos) {
                divisor = 1000;
                unidade = 'segundos';
            }
            ;
            const t1 = performance.now();
            let retorno = metodoOriginal.apply(this, args);
            const t2 = performance.now();
            console.log(`${propetyKey}, Tempo de execução: ${(t1 - t2) / divisor} ${unidade}`);
            return retorno;
        };
        return descriptor;
    };
}
;
