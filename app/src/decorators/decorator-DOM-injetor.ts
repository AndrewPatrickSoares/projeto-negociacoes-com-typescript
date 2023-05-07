export function decoratorDomInjetor (seletor: string) {
    return function (target: any, propetyKey: string) {

        console.log(`Modificando ProtoType ${target.constructor.name} e adicionando getter para a propriedade ${propetyKey}`);

        let elemento: HTMLElement;

        const getter = function () {

            if(!elemento){
                elemento = <HTMLElement>document.querySelector(seletor);
                console.log(`Buscando elemento do Dom com o seletor ${seletor} para injetar em ${propetyKey}`);
            };

            return elemento
        };

        Object.defineProperty(target, propetyKey, {get: getter});
    };
        
};