'use strict';

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
          [{
            'header': [1, 2, 3, 4, 5, 6, false]
          }],
          ['bold', 'italic', 'underline', 'strike'], // toggled buttons
          [{
            'align': []
          }],
          [{
            'list': 'ordered'
          }, {
            'list': 'bullet'
          }],
          [{
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
          ['link', 'image', 'video'],
          ['blockquote', 'code-block'],
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

  // Define other lifecycle methods as you need.
  ready() {
    this._insertStyleLib()
    this._insertLib()
  }

  attached() {

  }

  detached() {}
  attributeChanged() {}

  _insertStyleLib () {
    let link = document.createElement('link');
    let href = this.theme === 'bubble' ? '//cdn.quilljs.com/1.0.4/quill.bubble.css' : '//cdn.quilljs.com/1.0.4/quill.snow.css';
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('type', 'text/css');
    link.setAttribute('href', href);
    document.head.appendChild(link);
  }

  _insertLib() {
    let quillSrc = document.createElement('script');
    quillSrc.setAttribute('src','//cdn.quilljs.com/1.0.0-rc.4/quill.js');
    quillSrc.async = true;
    quillSrc.onreadystatechange = quillSrc.onload = (evt) => {
      this._onLoadLib(evt);
    }
    document.body.appendChild(quillSrc);
  }

  _onLoadLib(evt) {
    console.log(evt)
    this._initLib()
  }

  _initLib() {
     this.Quill = new Quill(this.$.editor, {
      module: {
        toolbar: this.toolbarOptions
      },
      placeholder: this.placeholder,
      theme: this.theme
    });
  }
}

// Register the element using Polymer's constructor.
Polymer(quillEditor);
