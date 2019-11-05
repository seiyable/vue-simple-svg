# vue-simple-svg (V2)
A simple Vue.js plugin that allows you to use a component that dynamically loads a .svg file as an inline SVG so you can easily control its style programmatically. No jQuery required.   

I recommend using [vue-svg-loader] (https://www.npmjs.com/package/vue-svg-loader) for the case you just need to load a SVG file as a component. This plugin is built to cover some cases the library doesn't work well which are:
- loading a SVG file dynamically. You don't have to hard code the file name in the source code and can change the file to load after the component is mounted.
- changing fill color or stroke color of the SVG programmatically with ease and no global css usage.

### Installation:
```sh
$ npm install vue-simple-svg
```

### Usage:
1. initialize in your main file,
```javascript
// as a plugin
import VueSimpleSVG from 'vue-simple-svg'
Vue.use(VueSimpleSVG)

// or as a component
import {SimpleSVG} from 'vue-simple-svg'
Vue.component('simple-svg', SimpleSVG)
```

2. specify which elements in the SVG will be manipulated their fill and stroke colors by setting dedicated class names to them
```html
<svg xmlns="http://www.w3.org/2000/svg">
  <g>
    <path class="fill-to-change" d="XXXXX XXXXX XXXXX" />
    <path class="stroke-to-change" d="XXXXX XXXXX XXXXX" />
  </g>
</svg>
```

and use it in your component,
```html
<simple-svg
  :src="svgSrc"
  fill-class-name="fill-to-change"
  :fill="svgFillColor"
  stroke-class-name="stroke-to-change"
  :stroke="svgFillColor"
  width="100%"
  height="100%"
  custom-id="my-id"
  custom-class-name="my-class"
  @load="svgLoaded()"
/>
```

### Available props and events:
| props | type | description | default |
| ------ | ------ | ------ | ------ |
| src | string | path to your SVG file | *required |
| fillClassName | string | class name set to the elements in your SVG file whose fill color you want to change | '' |
| fill | string | CSS-valid fill color value | '' |
| strokeClassName | string | class name set to the elements in your SVG file whose stroke color you want to change | '' |
| stroke | string | CSS-valid stroke color value | '' |
| width | string | root SVG element's style width | 'auto' |
| height | string | root SVG element's style height | 'auto' |
| customId | string | root SVG element's id | '' |
| customClassName | string | root SVG element's class | '' |

| events | description |
| ------ | ------ |
| @load | called when the inline SVG is generated |


### Notes:
- inline svg element has a class '.simple-svg'
- inline svg has a div wrapper with a class '.simple-svg-wrapper'
- fill/stroke style set to a path of a SVG will be removed unless its value is 'none'

### Demo:
![result](https://media.giphy.com/media/S9RVyPr2L9D76hpDui/giphy.gif)

To run demo in your local environment,
```sh
$ npm run dev-demo
```
You can find the code of an example component that has a simple-svg component as its child in demo/components/SvgButton.vue

### Reference:
- Loading a SVG with XMLHttpRequest and DOMParser https://github.com/jonnyhaynes/inline-svg
- Parsing inline svg tags https://github.com/MMF-FE/vue-svgicon
