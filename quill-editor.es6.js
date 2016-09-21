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
      syntax: {
        type: Boolean,
        value: false
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
      },
      __initTimeQuill: {
        type: Number,
        value: 0
      },
      __initTimeHljs: {
        type: Number,
        value: 0
      }
    };
  }

  // onReady insert Quill style and js library from CDN
  ready() {

  }

  attached() {

      let choosenTheme = this.theme === 'bubble' ? '//cdn.quilljs.com/1.0.4/quill.bubble.css' : '//cdn.quilljs.com/1.0.4/quill.snow.css'

      this._insertStyleLib(choosenTheme, this.theme);

      this._insertStyleLib('//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.6.0/styles/mono-blue.min.css', 'hljs')
      this._insertLib('//cdn.quilljs.com/latest/quill.min.js', 'quill')
      this._insertLib('//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.6.0/highlight.min.js', 'hljs')

  }


  /** ===============
   * Private methods
   **/

  /* Choose the the css lib according to the theme choise and insert as head child */
  _insertStyleLib(href, id) {
    if(document.querySelector('#' + id + '-css')) return false;
    let link = document.createElement('link');
    link.id = id + '-css';
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('type', 'text/css');
    link.setAttribute('href', href);
    document.head.appendChild(link);
  }

  /* Insert at the end of the body the js lib */
  _insertLib(link, type) {
    if(document.querySelector('#' + type)) {
      this._addListener();
      return false;
    }
    this._addListener();
    let src = document.createElement('script');
    src.setAttribute('src', link);
    src.id = type;
    src.async = true;
    src.onreadystatechange = src.onload = (evt) => {
      this._onLoadLib(evt, type);
    }
    document.body.appendChild(src);
  }


  /* Initialize Quill with the choosen parameters */
  _initQuill() {
    console.info('Count time init Quill: ', this.__initTimeQuill+1);
    this.Quill = new Quill(this.$.editor, {
      modules: {
        toolbar: this.toolbarOptions,
        syntax: this.syntax
      },
      placeholder: this.placeholder,
      theme: this.theme
    });
    this.isQuillInit = true;
  }
  /* Initialize highlight.js with the choosen parameters */
  _initHljs() {
    console.info('Count time init Hljs: ', this.__initTimeHljs+1);
    window.hljs.configure({
      languages: ['javascript', 'html', 'python']
    });
    this.isHljsInit = true;
  }
  /* Add listener to the document for the load of the library */
  _addListener() {
    document.addEventListener('quill-editor-loaded', () => {
      if(window.Quill && !this.isQuillInit) this._initQuill();
      if(window.hljs && !this.isHljsInit) this._initHljs();
    })
  }


  /** ===============
   * Event listeners
   **/
  /* On lib loaded */
  _onLoadLib(evt, type) {
    setTimeout(() => {
      document.dispatchEvent(new CustomEvent('quill-editor-loaded'))
    })
  }
}

// Register the element using Polymer's constructor.
Polymer(quillEditor);
