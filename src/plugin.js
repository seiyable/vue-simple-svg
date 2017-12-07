// const CSSParser = require('css-js')
// const cssParser = new CSSParser()
const myClassName = 'simple-svg'

let SimpleSVG = {
  template:
    '<div class="simple-svg-wrapper"></div>',
  name: 'simple-svg',
  props: {
    filepath: String,
    color: {
      type: String,
      default: 'black'
    },
    width: {
      type: String,
      default: '1em'
    },
    height: {
      type: String,
      default: '1em'
    },
    id: {
      type: String,
      defualt: ''
    }
  },
  mounted () {
    // generate inline svg
    this.generateInlineSVG()
  },
  watch: {
    color (val) {
      let svg = this.$el.getElementsByTagName('svg')[0]
      svg.style.fill = val
    }
  },
  methods: {
    /* check if the argument is a class selector that starts with a dot */
    /* need to be updated this to  */
    isClassSelector (selector) {
      let regex = new RegExp(/^\./, 'i')
      return (regex.test(selector)) ? true : false
    },
    /* remove a style tag from a inline svg to prevent a global namespace pollution and conflict with other svgs,
    and apply the css rules to each element that needs the style */
    /*
    removeStyleTag (inlinedSVG) {
      let styleElement = inlinedSVG.getElementsByTagName('style')[0]
      let parsedStyle = cssParser.parse(styleElement.textContent)
      let parsedRules = parsedStyle.rulesets

      // check if there are elements with the classes to be removed
      let elements = inlinedSVG.getElementsByTagName('*')
      for (let i = 0; i < elements.length; i++) {
        for (let j = 0; j < parsedRules.length; j++) {
          // class selector to be removed
          let selectorToRemove = parsedRules[j].selector

          if (this.isClassSelector(selectorToRemove)) {
            // if the selector is a class

            // prepare the classname without a dot at the beginning
            let className = selectorToRemove.substring(1)

            // style rule declarations associated with the class, which is going to be added to the element directly
            let declarationsToAdd = parsedRules[j].declaration

            if (elements[i].classList.contains(className)) {
              // if an element has a class to be removed

              // remove the class
              elements[i].classList.remove(className)

              // and add the style declarations directly to the element
              for (let l = 0; l < declarationsToAdd.length; l++) {
                let key = declarationsToAdd[l].key
                let value = declarationsToAdd[l].value
                elements[i].style[key] = value
              }
            }
          }
        }
      }

      // remove the style tag
      inlinedSVG.removeChild(styleElement)
      return inlinedSVG
    },
    */
    /* load a svg image with xml http request to get an inlined svg and append it to this component */
    generateInlineSVG () {
      const context = this

      // Get the contents of the SVG
      let request = new XMLHttpRequest()
      request.open('GET', this.filepath, true)
      request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
          // Setup a dom parser to convert the response to text/xml in order for it
          // to be manipulated and changed
          let domParser = new DOMParser()
          let result = domParser.parseFromString(request.responseText, 'text/xml')
          let inlinedSVG = result.getElementsByTagName('svg')[0]

          let styleElement = inlinedSVG.getElementsByTagName('style')[0]

          // there are some svgs that have style tags which cause a global namespace pollution and conflict with other svgs,
          // so let's remove the style tags and apply the style rules to each element that needs the rules
          // inlinedSVG = context.removeStyleTag(inlinedSVG)

          // Remove some of the attributes that aren't needed
          inlinedSVG.removeAttribute('xmlns:a')
          inlinedSVG.removeAttribute('width')
          inlinedSVG.removeAttribute('height')
          inlinedSVG.removeAttribute('x')
          inlinedSVG.removeAttribute('y')
          inlinedSVG.removeAttribute('enable-background')
          inlinedSVG.removeAttribute('xmlns:xlink')
          inlinedSVG.removeAttribute('xml:space')
          inlinedSVG.removeAttribute('version')

          if (context.id) inlinedSVG.id = context.id
          inlinedSVG.style.width = context.width
          inlinedSVG.style.height = context.height
          inlinedSVG.style.fill = context.color
          inlinedSVG.classList.add(myClassName) // add an additional class

          context.$el.appendChild(inlinedSVG)

          // now the svg is ready to show
          context.$emit('ready')
        } else {
          console.error('There was an error retrieving the source of the SVG.')
        }
      }

      request.onerror = function () {
        console.error('There was an error connecting to the origin server.')
      }

      request.send()
    }
  }
}

let plugin = {
  install (Vue, options) {
    Vue.component('simple-svg', SimpleSVG)
  }
}

export default plugin
