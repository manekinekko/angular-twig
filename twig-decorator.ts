import {
  Component
} from '@angular/core';
import {twig} from 'twig';

declare var Reflect;

export function Twig(args:any={}) {
  return function TwigDecorator(cls) {
    args.template = RenderSync(args);
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
  return new Promise( (resolve, reject) => {
    twig({
      id: 'RenderAsync',
      href: args.templateUrl,
      load: (template) => {
        let tpl = template.render(args.context);
        console.log('annotation Twig OK');
        resolve(tpl);
      },
      error: reject
    });
  });
}
