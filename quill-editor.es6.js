'use strict';

/** TODO: code syntax */

class quillEditor {
  // Define behaviors with a getter.
  get behaviors() {
    return [];
  }

  // Element setup goes in beforeRegister instead of createdCallback.
  beforeRegister() {
    this.is = 'quill-editor';

    // Define the properties object in beforeRegister.
    this.properties = {
      /** Quill istance **/
      Quill: {
        type: Function,
      },
      /** Load or not the lib */
      loadLib: {
        type: Boolean,
        value: true
      },
      /* {module: toolbar: toolbarOptions} */
      toolbarOptions: {
        type: Array,
        value: [
          ['bold', 'italic', 'underline', 'strike'], // toggled buttons
          ['blockquote', 'code-block'],
          [{
            'header': 1
          }, {
            'header': 2
          }], // custom button values
          [{
            'list': 'ordered'
          }, {
            'list': 'bullet'
          }],
          [{
            'script': 'sub'
          }, {
            'script': 'super'
          }], // superscript/subscript
          [{
            'indent': '-1'
          }, {
            'indent': '+1'
          }], // outdent/indent
          [{
            'direction': 'rtl'
          }], // text direction

          [{
            'size': ['small', false, 'large', 'huge']
          }], // custom dropdown
          [{
            'header': [1, 2, 3, 4, 5, 6, false]
          }],

          [{
            'color': []
          }, {
            'background': []
          }], // dropdown with defaults from theme
          [{
            'font': []
          }],
          [{
            'align': []
          }],

          ['clean'] // remove formatting button
        ]
      },
      /* {placeholder: placeholder} */
      placeholder: {
        type: String,
        value: 'Compose an epic...'
      },
      /* {theme: theme} */
      theme: {
        type: String,
        value: 'snow'
      }
    };
  }

  // onReady insert Quill style and js library from CDN
  ready() {

  }

  attached() {

      if(this._preventReLoadLibs()) return false;
      this._insertStyleLib(this.theme === 'bubble' ? '//cdn.quilljs.com/1.0.4/quill.bubble.css' : '//cdn.quilljs.com/1.0.4/quill.snow.css')
      this._insertStyleLib('//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.6.0/styles/mono-blue.min.css')
      this._insertLib('//cdn.quilljs.com/latest/quill.min.js', 'quill')
      this._insertLib('//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.6.0/highlight.min.js', 'hljs')

  }


  /** ===============
   * Private methods
   **/

  /* Choose the the css lib according to the theme choise and insert as head child */
  _insertStyleLib(href) {
    let link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('type', 'text/css');
    link.setAttribute('href', href);
    document.head.appendChild(link);
  }

  /* Insert at the end of the body the js lib */
  _insertLib(link, type) {
    let quillSrc = document.createElement('script');
    quillSrc.setAttribute('src', link);
    quillSrc.id = 'quill-editor-src';
    quillSrc.async = true;
    quillSrc.onreadystatechange = quillSrc.onload = (evt) => {
      this._onLoadLib(evt, type);
    }
    document.body.appendChild(quillSrc);
  }

  _preventReLoadLibs() {
    if(!this.loadLib) {
      document.addEventListener('quill-editor-loaded', () => {
        if(window.Quill) this._initQuill();
        if(window.hljs) this._initHljs();
      })
      return true;
    }
    return false;
  }

  /* Initialize Quill with the choosen parameters */
  _initQuill() {
    console.log(this.toolbarOptions)
    this.Quill = new Quill(this.$.editor, {
      modules: {
        toolbar: this.toolbarOptions
      },
      placeholder: this.placeholder,
      theme: this.theme
    });
  }
  /* Initialize highlight.js with the choosen parameters */
  _initHljs() {
    hljs.configure({
      languages: ['javascript', 'ruby', 'python']
    });
  }


  /** ===============
   * Event listeners
   **/
  /* On lib loaded */
  _onLoadLib(evt, type) {
    document.dispatchEvent(new CustomEvent('quill-editor-loaded'))
    type === 'quill' ? this._initQuill() : this._initHljs()
  }
}

// Register the element using Polymer's constructor.
Polymer(quillEditor);
