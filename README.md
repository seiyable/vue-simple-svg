# vue-simple-svg
A simple Vue.js plugin that allows you to use a component that loads a .svg image as an inline SVG so you can easily control its fill color from the parent component. No jQuery required.

### Installation:
```sh
$ npm install vue-simple-svg
```

### Usage:
initialize in your Vue's main file,
```javascript
// as a plugin
import VueSimpleSVG from 'vue-simple-svg'
Vue.use(VueSimpleSVG)

// or as a component
import {SimpleSVG} from 'vue-simple-svg'
Vue.component('simple-svg', SimpleSVG)
```

and use in your component,
```html
<simple-svg
  :filepath="'/PATH_/TO_/YOUR_/FILE.svg'"
  :fill="getFillColor"
  :stroke="getStrokeColor"
  :width="'400px'"
  :height="'400px'"
  :id="'custom-id'"
  tag="'div'"
  wrapperClasses="'simple-svg-wrapper'"
  svgClasses="'simple-svg'"
  @ready="onSvgReady()"
  />
```

### Available props and events:
| props | type | description | default |
| ------ | ------ | ------ | ------ |
| filepath | string | path to your svg file | |
| fill | string | svg's fill color | 'black' |
| stroke | string | svg's stroke color | 'black' |
| width | string | svg's width | '1em' |
| height | string | svg's height | '1em' |
| id | string | custom color | '' |
| wrapperClasses | string, array | custom classes for wrapper | 'simple-svg-wrapper' |
| svgClasses | string, array | custom classes for svg element | 'simple-svg' |
| tag | string | custom tag to use on the wrapper | 'div' |

| events | description |
| ------ | ------ |
| @ready | called when the svg is loaded |


### Notes:
- inline svg element has a class '.simple-svg'
- inline svg has a div wrapper with a class '.simple-svg-wrapper'
- fill/stroke style set to a path of a SVG will be removed unless its value is 'none'

### Demo:
![result](https://media.giphy.com/media/26FeVejNWHXsZiaIM/giphy.gif)

To run demo in your local environment,
```sh
$ npm run dev-demo
```
You can find the code of an example component that has a simple-svg component as its child in demo/components/SvgButton.vue


### Todo:
- enable applying various colors to multiple paths in an SVG


### Reference:
- Loading a SVG with XMLHttpRequest and DOMParser https://github.com/jonnyhaynes/inline-svg
- Parsing inline svg tags https://github.com/MMF-FE/vue-svgicon
