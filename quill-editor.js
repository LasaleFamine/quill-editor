'use strict';

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
        /* {module: toolbar: toolbarOptions} */
        toolbarOptions: {
          type: Array,
          value: [[{
            'header': [1, 2, 3, 4, 5, 6, false]
          }], ['bold', 'italic', 'underline', 'strike'], // toggled buttons
          [{
            'align': []
          }], [{
            'list': 'ordered'
          }, {
            'list': 'bullet'
          }], [{
            'indent': '-1'
          }, {
            'indent': '+1'
          }], // outdent/indent
          [{
            'color': []
          }, {
            'background': []
          }], // dropdown with defaults from theme
          ['clean'], // remove formatting button
          ['link', 'image', 'video'], ['blockquote', 'code-block']]
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

    // Define other lifecycle methods as you need.

  }, {
    key: 'ready',
    value: function ready() {
      this._insertStyleLib();
      this._insertLib();
    }
  }, {
    key: 'attached',
    value: function attached() {}
  }, {
    key: 'detached',
    value: function detached() {}
  }, {
    key: 'attributeChanged',
    value: function attributeChanged() {}
  }, {
    key: '_insertStyleLib',
    value: function _insertStyleLib() {
      var link = document.createElement('link');
      var href = this.theme === 'bubble' ? '//cdn.quilljs.com/1.0.4/quill.bubble.css' : '//cdn.quilljs.com/1.0.4/quill.snow.css';
      link.setAttribute('rel', 'stylesheet');
      link.setAttribute('type', 'text/css');
      link.setAttribute('href', href);
      document.head.appendChild(link);
    }
  }, {
    key: '_insertLib',
    value: function _insertLib() {
      var _this = this;

      var quillSrc = document.createElement('script');
      quillSrc.setAttribute('src', '//cdn.quilljs.com/1.0.0-rc.4/quill.js');
      quillSrc.async = true;
      quillSrc.onreadystatechange = quillSrc.onload = function (evt) {
        _this._onLoadLib(evt);
      };
      document.body.appendChild(quillSrc);
    }
  }, {
    key: '_onLoadLib',
    value: function _onLoadLib(evt) {
      console.log(evt);
      this._initLib();
    }
  }, {
    key: '_initLib',
    value: function _initLib() {
      this.Quill = new Quill(this.$.editor, {
        module: {
          toolbar: this.toolbarOptions
        },
        placeholder: this.placeholder,
        theme: this.theme
      });
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