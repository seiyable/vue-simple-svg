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
    generateInlineSVG () {
      const context = this

      // Get the contents of the SVG
      let request = new XMLHttpRequest()
      request.open('GET', this.filepath, true)
      request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
          // Setup a parser to convert the response to text/xml in order for it
          // to be manipulated and changed
          let parser = new DOMParser()
          let result = parser.parseFromString(request.responseText, 'text/xml')
          let inlinedSVG = result.getElementsByTagName('svg')[0]
          console.log('inlinedSVG: ', inlinedSVG)

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
