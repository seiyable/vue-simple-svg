const CSSOM = require('cssom')
const myClassName = 'simple-svg'

let SimpleSVG = {
  render (createElement) {
    return createElement('div', {
      'class': [
        'simple-svg-wrapper'
      ]
    })
  },
  name: 'simple-svg',
  props: {
    filepath: String,
    fill: {
      type: String,
      default: 'black'
    },
    stroke: {
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
  data () {
    return {
      isSVGReady: false
    }
  },
  mounted () {
    // generate inline svg
    this.generateInlineSVG()
  },
  watch: {
    filepath (val) {
      // re-generate inline svg
      this.generateInlineSVG()
    },
    fill (val) {
      this.updateSVGStyle('fill', val)
    },
    stroke (val) {
      this.updateSVGStyle('stroke', val)
    },
    width (val) {
      this.updateSVGStyle('width', val)
    },
    height (val) {
      this.updateSVGStyle('height', val)
    }
  },
  methods: {
    /* check if the argument is a class selector that starts with a dot */
    /* this is a quite simple expression so needs to be updated in the future */
    isClassSelector (selector) {
      let regex = new RegExp(/^\./, 'i')
      return (regex.test(selector)) ? true : false
    },
    /* remove a style tag from a inline svg to prevent a global namespace pollution and conflict with other svgs,
    and apply the css rules to each element that needs the style */
    removeStyleTag (inlinedSVG) {
      let styleElement = inlinedSVG.getElementsByTagName('style')[0]
      let parsedStyle = CSSOM.parse(styleElement.textContent)
      let cssRules = parsedStyle.cssRules

      // check every element if there is one with the classes to be removed
      let elements = inlinedSVG.getElementsByTagName('*')
      for (let i = 0; i < elements.length; i++) {
        for (let j = 0; j < cssRules.length; j++) {
          // class selector to be removed
          let selectorToRemove = cssRules[j].selectorText

          if (this.isClassSelector(selectorToRemove)) {
            // if the selector is a class

            // prepare the classname without a dot at the beginning
            let className = selectorToRemove.substring(1)

            if (elements[i].classList.contains(className)) {
              // if an element has a class to be removed

              // remove the class
              elements[i].classList.remove(className)

              // style rule declaration associated with the class, which is going to be added to the element directly
              let declarationToAdd = cssRules[j].style

              // and add the style declaration directly to the element
              for (let k = 0; k < declarationToAdd.length; k++) {
                let key = declarationToAdd[k]
                let value = declarationToAdd[key]
                elements[i].style[key] = value
              }
            }
          }
        }
      }

      // remove the style tag
      styleElement.parentNode.removeChild(styleElement)
      return inlinedSVG
    },
    /* remove fill and stroke style declarations in the each path to enable color control */
    removeFillStrokeStyles (inlinedSVG) {
      let elements = inlinedSVG.getElementsByTagName('*')
      for (let i = 0; i < elements.length; i++) {
        if(elements[i].style === undefined) {
          continue
        }
        let fill = elements[i].style.fill
        if (fill && fill !== 'none') {
          elements[i].style.fill = ''
        }
        let stroke = elements[i].style.stroke
        if (stroke && stroke !== 'none') {
          elements[i].style.stroke = ''
        }
      }
    },
    /* load a svg image with xml http request to get an inlined svg and append it to this component */
    generateInlineSVG () {
      const context = this

      // reset first
      this.isSVGReady = false
      let svgElement = this.$el.getElementsByTagName('svg')[0]
      if (svgElement) {
        this.$el.removeChild(svgElement)
      }

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

          if (!inlinedSVG) {
            console.error('No svg element found. Did you pass a valid .svg file?')
            return
          }
          let styleElement = inlinedSVG.getElementsByTagName('style')[0]

          if (styleElement) {
            // there are some svgs that have style tags which cause a global namespace pollution and conflict with other svgs,
            // so let's remove the style tags and apply the style rules to each element that needs the rules
            inlinedSVG = context.removeStyleTag(inlinedSVG)
          }

          // remove fill and stroke style declarations in the each path to enable color control
          context.removeFillStrokeStyles(inlinedSVG)

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
          inlinedSVG.style.fill = context.fill
          inlinedSVG.style.stroke = context.stroke
          inlinedSVG.classList.add(myClassName) // add an additional class

          context.$el.appendChild(inlinedSVG)

          // now the svg is ready to show
          this.isSVGReady = true
          context.$emit('ready')
        } else {
          console.error('There was an error retrieving the source of the SVG.')
        }
      }

      request.onerror = function () {
        console.error('There was an error connecting to the origin server.')
      }

      request.send()
    },
    /* update SVG's style */
    updateSVGStyle (property, value) {
      let svgElement = this.$el.getElementsByTagName('svg')[0]
      if (svgElement) {
        svgElement.style[property] = value
      } else {
        console.error('No svg element found. Did you pass a valid .svg file?')
      }
    }
  }
}

let plugin = {
  install (Vue, options) {
    Vue.component('simple-svg', SimpleSVG)
  }
}

export {plugin as default, SimpleSVG}
