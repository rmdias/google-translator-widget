//Início de APP
var APP = APP || {};
APP._nameSpace = "APP";
APP.iniciar = function (Modulos) {
    var quantidadeDeModulos = arguments.length;
    if (Modulos !== undefined && Modulos !== APP) {
        APP.setUp();
    }
    if (quantidadeDeModulos == 0 || quantidadeDeModulos == 1) {
        this.iniciarModulos(Modulos || APP);
    } else if (quantidadeDeModulos > 1) {
        APP.iniciarModulos.apply(this, arguments);
    }
};
APP.setUp = function () {};
APP.iniciarModulos = function (Modulo) {
    var Filho, i = 0;
    if (arguments.length > 1) {
        for (; i < arguments.length; i++) {
            APP.iniciarModulos(arguments[i]);
        }
        return;
    }
    if (typeof Modulo != "object") return false;
    if (Modulo.hasOwnProperty('setUp') && typeof Modulo.setUp == "function") {
        Modulo.setUp();
    } else {
        return false;
    }
    for (Filho in Modulo) {
        if (Modulo.hasOwnProperty(Filho) === true) {
            if (Modulo[Filho] !== null && typeof Modulo[Filho] == "object") {
                Modulo[Filho]['pai'] = function () {
                    return Modulo;
                };
                Modulo[Filho]['_nameSpace'] = (Modulo['_nameSpace'] || "APP") + '.' + Filho;
                APP.iniciarModulos(Modulo[Filho]);
            }
        }
    }
    return false;
};
APP.nameSpace = function (nameSpace, arrayDeParametros) {
    var no, nos, escopos, alvo, i;
    if (arrayDeParametros !== undefined && arrayDeParametros instanceof Array === false) {
        arrayDeParametros = [arrayDeParametros];
    }
    escopos = [window];
    nos = nameSpace.split('.');
    for (i = 0; i < nos.length; i++) {
        no = nos[i];
        if (escopos[i].hasOwnProperty(no)) {
            escopos.push(escopos[i][no]);
        }
    }
    alvo = escopos.pop();
    if (typeof alvo == 'function') {
        return alvo.apply(escopos.pop(), arrayDeParametros || []);
    } else {
        return alvo;
    }
}
//FIM de APP