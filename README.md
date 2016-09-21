# `<quill-editor>` Polymer (ES6)


:construction: [WIP] seriously :warning:

> Wrapper of [QuillJs](https://quilljs.com/) as a customizable [Polymer 1.0](https://www.polymer-project.org/1.0/) component in ES6 syntax.

## Develop

Clone the repository ***inside a folder*** (ex: `sandbox-quill-editor/quill-editor`) and inside the `quill-editor` folder:

    npm install && bower install

Developing mode: **watch** on base files and **Babel** that transpiles (http://localhost:8080/quill-editor/demo)

    gulp watch

Build: only the **Babel** action simply run

    gulp


## How to use (important note)

If you need it **multiple times** inside a single component or a page (like the demo.html) you need to specify the property `load-lib="false"` within the instances of the component after the first instance.  
This is required because is not easy to check if the library is present on the page from within each instance of the component.  
Example:

``` html

  <!-- This one will load the library -->
  <quill-editor></quill-editor>
  <!-- Thees other two will not -->
  <quill-editor placeholder="Testing other" load-lib="false"></quill-editor>
  <quill-editor theme="bubble" load-lib="false"></quill-editor>

```

## License

[MIT](https://github.com/LasaleFamine/quill-editor/blob/master/LICENSE.md) &copy; LasaleFamine
