'use strict';

/** TODO: code syntax */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var quillEditor = function () {
  function quillEditor() {
    _classCallCheck(this, quillEditor);
  }

  _createClass(quillEditor, [{
    key: 'beforeRegister',


    // Element setup goes in beforeRegister instead of createdCallback.
    value: function beforeRegister() {
      this.is = 'quill-editor';

      // Define the properties object in beforeRegister.
      this.properties = {
        /** Quill istance **/
        Quill: {
          type: Function
        },
        /** Load or not the lib */
        loadLib: {
          type: Boolean,
          value: true
        },
        /* {module: toolbar: toolbarOptions} */
        toolbarOptions: {
          type: Array,
          value: [['bold', 'italic', 'underline', 'strike'], // toggled buttons
          ['blockquote', 'code-block'], [{
            'header': 1
          }, {
            'header': 2
          }], // custom button values
          [{
            'list': 'ordered'
          }, {
            'list': 'bullet'
          }], [{
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
          }], [{
            'color': []
          }, {
            'background': []
          }], // dropdown with defaults from theme
          [{
            'font': []
          }], [{
            'align': []
          }], ['clean'] // remove formatting button
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

  }, {
    key: 'ready',
    value: function ready() {}
  }, {
    key: 'attached',
    value: function attached() {

      if (this._preventReLoadLibs()) return false;
      this._insertStyleLib(this.theme === 'bubble' ? '//cdn.quilljs.com/1.0.4/quill.bubble.css' : '//cdn.quilljs.com/1.0.4/quill.snow.css');
      this._insertStyleLib('//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.6.0/styles/mono-blue.min.css');
      this._insertLib('//cdn.quilljs.com/latest/quill.min.js', 'quill');
      this._insertLib('//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.6.0/highlight.min.js', 'hljs');
    }

    /** ===============
     * Private methods
     **/

    /* Choose the the css lib according to the theme choise and insert as head child */

  }, {
    key: '_insertStyleLib',
    value: function _insertStyleLib(href) {
      var link = document.createElement('link');
      link.setAttribute('rel', 'stylesheet');
      link.setAttribute('type', 'text/css');
      link.setAttribute('href', href);
      document.head.appendChild(link);
    }

    /* Insert at the end of the body the js lib */

  }, {
    key: '_insertLib',
    value: function _insertLib(link, type) {
      var _this = this;

      var quillSrc = document.createElement('script');
      quillSrc.setAttribute('src', link);
      quillSrc.id = 'quill-editor-src';
      quillSrc.async = true;
      quillSrc.onreadystatechange = quillSrc.onload = function (evt) {
        _this._onLoadLib(evt, type);
      };
      document.body.appendChild(quillSrc);
    }
  }, {
    key: '_preventReLoadLibs',
    value: function _preventReLoadLibs() {
      var _this2 = this;

      if (!this.loadLib) {
        document.addEventListener('quill-editor-loaded', function () {
          if (window.Quill) _this2._initQuill();
          if (window.hljs) _this2._initHljs();
        });
        return true;
      }
      return false;
    }

    /* Initialize Quill with the choosen parameters */

  }, {
    key: '_initQuill',
    value: function _initQuill() {
      console.log(this.toolbarOptions);
      this.Quill = new Quill(this.$.editor, {
        modules: {
          toolbar: this.toolbarOptions
        },
        placeholder: this.placeholder,
        theme: this.theme
      });
    }
    /* Initialize highlight.js with the choosen parameters */

  }, {
    key: '_initHljs',
    value: function _initHljs() {
      hljs.configure({
        languages: ['javascript', 'ruby', 'python']
      });
    }

    /** ===============
     * Event listeners
     **/
    /* On lib loaded */

  }, {
    key: '_onLoadLib',
    value: function _onLoadLib(evt, type) {
      document.dispatchEvent(new CustomEvent('quill-editor-loaded'));
      type === 'quill' ? this._initQuill() : this._initHljs();
    }
  }, {
    key: 'behaviors',

    // Define behaviors with a getter.
    get: function get() {
      return [];
    }
  }]);

  return quillEditor;
}();

// Register the element using Polymer's constructor.


Polymer(quillEditor);