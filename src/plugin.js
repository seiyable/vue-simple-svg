const CSSOM = require('cssom')

const SimpleSVG = {
  render (createElement) {
    return createElement('svg')
  },
  name: 'simple-svg',
  props: {
    src: {
      type: String,
      required: true
    },
    fillClassName: {
      type: String,
      default: ''
    },
    fill: {
      type: String,
      default: ''
    },
    strokeClassName: {
      type: String,
      default: ''
    },
    stroke: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: 'auto'
    },
    height: {
      type: String,
      default: 'auto'
    },
    customId: {
      type: String,
      default: ''
    },
    customClassName: {
      type: String,
      default: ''
    }
  },
  mounted () {
    this.generateInlineSVG()
  },
  watch: {
    src (val) {
      // Re-generate inline SVG if src is updated
      this.generateInlineSVG()
    },
    fill (val) {
      this.updateFillColor(val)
    },
    stroke (val) {
      this.updateStrokeColor(val)
    },
    width (val) {
      this.$el.style.width = val
    },
    height (val) {
      this.$el.style.width = val
    }
  },
  methods: {
    /* Load an SVG file with XHR and generate an inline SVG code */
    generateInlineSVG () {
      const context = this

      // Reset first. Remove all the code of the existing inline SVG
      this.resetInlineSVG()

      // Get the content of the SVG file
      const request = new XMLHttpRequest()
      request.open('GET', this.src, true)
      request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
          // Setup a DOM parser to convert the response to text/xml
          const domParser = new DOMParser()
          const result = domParser.parseFromString(request.responseText, 'text/xml')
          const loadedSVG = result.getElementsByTagName('svg')[0]

          if (!loadedSVG) {
            console.error('No SVG element found in the given file: ' + context.filepath)
            return
          }

          // add attributes to the inline SVG
          const attributeNames = loadedSVG.getAttributeNames()
          for (const name of attributeNames) {
            const value = loadedSVG.getAttribute(name)
            context.$el.setAttribute(name, value)
          }
          if (context.customId) context.$el.id = context.customId
          if (context.customClassName) context.$el.setAttribute('class', context.customClassName)
          context.$el.style.width = context.width
          context.$el.style.height = context.height

          // add child nodes to the inline SVG
          const domN = loadedSVG.children.length;
          for (let i = domN - 1; i >= 0; i--) {
            const node = loadedSVG.children.item(i)
            context.$el.appendChild(node)
          }

          // set colors
          context.updateFillColor(context.fill)
          context.updateStrokeColor(context.stroke)

          // now the inline SVG is generated
          context.$emit('load')
        } else {
          console.error('There was an error retrieving the source of the SVG.')
        }
      }

      request.onerror = function () {
        console.error('There was on XML Http Request')
      }

      request.send()
    },
    resetInlineSVG () {
      while (this.$el.firstChild) {
        this.$el.removeChild(this.$el.firstChild)
      }
      const attributeNames = this.$el.getAttributeNames()
      for (const name of attributeNames) {
        this.$el.removeAttribute(name)
      }
    },
    updateFillColor (fill) {
      if (this.fillClassName) {
        const matches = this.$el.getElementsByClassName(this.fillClassName)
        for (const element of matches) {
          element.style.fill = fill
        }
      }
    },
    updateStrokeColor (stroke) {
      if (this.strokeClassName) {
        const matches = this.$el.getElementsByClassName(this.strokeClassName)
        for (const element of matches) {
          element.style.stroke = stroke
        }
      }
    }
  }
}

const plugin = {
  install (Vue, options) {
    Vue.component('simple-svg', SimpleSVG)
  }
}

export {plugin as default, SimpleSVG}
