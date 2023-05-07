export function decoratorEscape() {
    return function (target, propetyKey, descriptor) {
        const metodoOriginal = descriptor.value;
        descriptor.value = function (...args) {
            let retorno = metodoOriginal.apply(this, args);
            if (typeof retorno === 'string') {
                retorno = retorno.replace(/<script>[\s\S]*?<\/script>/, '');
            }
            ;
            return retorno;
        };
        return descriptor;
    };
}
;
