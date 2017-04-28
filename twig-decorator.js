"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var twig_1 = require("twig");
function Twig(args) {
    if (args === void 0) { args = {}; }
    return function TwigDecorator(cls) {
        args.template = RenderSync(args);
        TwigComponent(args)(cls);
    };
}
exports.Twig = Twig;
function loadTemplate(url) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, false); // MUST BE SYNC FOR NOW!!!
    xhr.send();
    return xhr.responseText;
}
function TwigComponent(config) {
    return function (cls) {
        var annotations = Reflect.getMetadata('annotations', cls) || [];
        annotations.push(new core_1.Component(config));
        Reflect.defineMetadata('annotations', annotations, cls);
        return cls;
    };
}
function RenderSync(args) {
    var tpl = args.template;
    if (args.templateUrl) {
        tpl = loadTemplate(args.templateUrl);
    }
    console.log('annotation Twig OK');
    return twig_1.twig({
        id: 'RenderSync',
        data: tpl
    }).render(args.context);
}
// Not working for now because decorators are resolved synchronously!
function RenderAsync(args) {
    return new Promise(function (resolve, reject) {
        twig_1.twig({
            id: 'RenderAsync',
            href: args.templateUrl,
            load: function (template) {
                var tpl = template.render(args.context);
                console.log('annotation Twig OK');
                resolve(tpl);
            },
            error: reject
        });
    });
}
//# sourceMappingURL=twig-decorator.js.map