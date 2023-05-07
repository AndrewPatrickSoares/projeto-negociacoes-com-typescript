export function decoratorInspetor() {
    return function (target: any, propetyKey: string, descriptor: PropertyDescriptor) {
        const metodoOriginal = descriptor.value;
        descriptor.value = function (...args: any[]) {
            console.log(`--- Método: ${propetyKey}`);
            console.log(`--- Parâmetros: ${JSON.stringify(args)}`);
            let retorno = metodoOriginal.apply(this, args);
            console.log(`--- Retorno: ${JSON.stringify(retorno)}`);
            return retorno;
        };

        return descriptor
    };
};