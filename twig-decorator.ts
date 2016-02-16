import {
  Component
} from 'angular2/core';

import {
  PromiseWrapper
} from 'angular2/src/facade/async';

var twig: Function = (<any>window).twig;

export function Twig(args:any={}) {
  return function TwigDecorator(cls) {
    args.template = RenderSync(args);
    args.templateUrl = '';
    TwigComponent(args)(cls);
  };
}

function loadTemplate(url) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, false); // MUST BE SYNC FOR NOW!!!
  xhr.send();
  return xhr.responseText;
}

function TwigComponent(config) {
  return function(cls) {
    var annotations = Reflect.getMetadata('annotations', cls) || [];
    annotations.push(new Component(config));
    Reflect.defineMetadata('annotations', annotations, cls);
    return cls;
  }
}

function RenderSync(args) {

  let tpl = args.template;
  if(args.templateUrl) {
    tpl = loadTemplate(args.templateUrl);
  }

  (<any>console).log('annotation Twig OK');

  return twig({
    id: 'RenderSync',
    data: tpl
  }).render(args.context);
}

// Not working for now because decorators are resolved synchronously!
function RenderAsync(args) {
  var completer = PromiseWrapper.completer();
  twig({
    id: 'RenderAsync',
    href: args.templateUrl,
    load: (template) => {
      let tpl = template.render(args.context);
      console.log('annotation Twig OK');
      completer.resolve(tpl);
    },
    error: completer.reject
  });
  return completer.promise;
}
