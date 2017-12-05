# vue-simple-svg
A simple Vue.js plugin that allows you to use a component that loads a SVG image as an inline SVG so you can easily control its fill color from the parent component, without jQuery or any other dependencies.

### Installation:
```sh
$ npm install vue-simple-svg
```

### Usage of the plugin:
in your Vue's main file,
```javascript
import VueSimpleSVG from 'vue-simple-svg'
Vue.use(VueSimpleSVG)
```

and in your component,
```html
<simple-svg
  :filepath="'/PATH_/TO_/YOUR_/FILE.svg'"
  :color="getColor"
  :width="'400px'"
  :height="'400px'"
  @ready="onSvgReady()"
  />
```

### Available props and events:
| props | type | description |
| ------ | ------ | ------ |
| filepath | string | path to your svg file |
| color | string | svg's fill color |
| width | string | svg's width |
| height | string | svg's height |

| events | description |
| ------ | ------ |
| @ready | called when the svg is loaded |

### Todo:
- parse inline svg tags to overwrite fill parameters
- add demo

### References:
- Loading a SVG with XMLHttpRequest and DOMParser https://github.com/jonnyhaynes/inline-svg
- Parsing inline svg tags https://github.com/MMF-FE/vue-svgicon
