export function decoratorDomInjetor(seletor) {
    return function (target, propetyKey) {
        console.log(`Modificando ProtoType ${target.constructor.name} e adicionando getter para a propriedade ${propetyKey}`);
        let elemento;
        const getter = function () {
            if (!elemento) {
                elemento = document.querySelector(seletor);
                console.log(`Buscando elemento do Dom com o seletor ${seletor} para injetar em ${propetyKey}`);
            }
            ;
            return elemento;
        };
        Object.defineProperty(target, propetyKey, { get: getter });
    };
}
;
