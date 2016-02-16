# Angular2 ❤ Twig

This (WIP...) experiment is an attempt to add Twig templating support for Angular2

### How to use

```javascript
import {Twig} from 'angular2-twig';
```

The `@Twig` decorator supersedes the `@Component()` decorator.

#### Use a `templateUrl`
```javascript
@Twig({
	templateUrl: 'templates/field--comment.html.twig',
  // -or- template: '',
	context: {
		title: 'Angular2 ❤ Twig',
		content_1: 'content 1',
		content_2: 'content 2'
	},
	selector: '#block-content',
})
export class AppComponent {}
```
#### Use an inlined `template`

```javascript
@Twig({
  template: `
  <section>
    {% if title %}
      <h2>{{ title }}</h2>
    {% endif %}

    {{ content_1 }}

    {% if content_2 %}
      {{ content_2 }}
    {% endif %}
  </section>
  `,
	context: {
		title: 'Angular2 ❤ Twig',
		content_1: 'content 1',
		content_2: 'content 2'
	},
	selector: '#block-content',
})
export class AppComponent {}
```


### Live Example

Checkout this [plnkr](http://plnkr.co/edit/K0MohmywZpn5aSVHtYad?p=preview) for a quick demo.

### Acknowledgments

The Twig templates are parsed using (a modified version of) the  [twig.js](https://github.com/justjohn/twig.js) library from [@justjohn](https://github.com/justjohn). All credits go to him for the parser.

### License
The MIT License
