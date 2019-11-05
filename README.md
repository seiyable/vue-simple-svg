# vue-simple-svg (V2)
A simple Vue.js plugin that allows you to use a component that dynamically loads a .svg file as an inline SVG so you can easily control its style programmatically. No jQuery required.   

I recommend using [vue-svg-loader](https://www.npmjs.com/package/vue-svg-loader) for many cases when you just need to load a SVG file as a component. This plugin is built to cover some other cases the library doesn't fit, which are:
- loading a SVG file dynamically. You don't have to hardcode the filename in the source code. Instead you can specify it at rendering time or change it even after the component is rendered.
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

3. and use it in your component,
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
- To generate the inline SVG properly, you need to manually clean up and edit your SVG files beforehand. Tips: remove all hardcoded inline styles and unnecessary attributes, especially the ones specifying colors.

### Demo:
![result](https://media.giphy.com/media/S9RVyPr2L9D76hpDui/giphy.gif)

To run demo in your local environment,
```sh
$ npm run dev-demo
```
You can see the example of how to use simple-svg component at demo/components/SvgButton.vue

### Reference:
- Loading a SVG with XMLHttpRequest and DOMParser https://github.com/jonnyhaynes/inline-svg
- Parsing inline svg tags https://github.com/MMF-FE/vue-svgicon
