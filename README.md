# vue-simple-svg
A simple Vue.js plugin that allows you to use a component that loads a .svg image as an inline SVG so you can easily control its fill color from the parent component. No jQuery required.

### Demo:
![result](https://media.giphy.com/media/26FeVejNWHXsZiaIM/giphy.gif)

(To run demo in your local environment, run "npm run dev-demo")

### Installation:
```sh
$ npm install vue-simple-svg
```

### Usage:
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
  :id="'custom-id'"
  @ready="onSvgReady()"
  />
```

### Available props and events:
| props | type | description | default |
| ------ | ------ | ------ | ------ |
| filepath | string | path to your svg file | |
| color | string | svg's fill color | 'black' |
| width | string | svg's width | '1em' |
| height | string | svg's height | '1em' |
| id | string | custom color | '' |

| events | description |
| ------ | ------ |
| @ready | called when the svg is loaded |

### Notes:
- inline svg element has a class '.simple-svg'
- inline svg has a div wrapper with a class '.simple-svg-wrapper'

### Todo:
- enable applying various colors to multiple paths in an SVG

### Reference:
- Loading a SVG with XMLHttpRequest and DOMParser https://github.com/jonnyhaynes/inline-svg
- Parsing inline svg tags https://github.com/MMF-FE/vue-svgicon
