"use strict";
var core_1 = require('angular2/core');
var async_1 = require('angular2/src/facade/async');
var twig = window.twig;
function Twig(args) {
    if (args === void 0) { args = {}; }
    return function TwigDecorator(cls) {
        args.template = RenderSync(args);
        args.templateUrl = '';
        TwigComponent(args)(cls);
    };
}
exports.Twig = Twig;
function loadTemplate(url) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
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
    return twig({
        id: 'RenderSync',
        data: tpl
    }).render(args.context);
}
function RenderAsync(args) {
    var completer = async_1.PromiseWrapper.completer();
    twig({
        id: 'RenderAsync',
        href: args.templateUrl,
        load: function (template) {
            var tpl = template.render(args.context);
            console.log('annotation Twig OK');
            completer.resolve(tpl);
        },
        error: completer.reject
    });
    return completer.promise;
}
//# sourceMappingURL=twig-decorator.js.map
