# Ejemplos de VueJS

* [Mostrar información al pasar el cursor por encima.](/Ejemplos/MostrarInfo.html)

~~~
<html>
  <head>
  </head>
  <body>
    <h2>Ejemplo pasando el ratón:</h2>
    <div id="app-2">
      <span v-bind:title="message">
        Pasando el ratón por encima de este texto y esperando unos segundos,
        aparecerá cuando ha cargado la página.
      </span>
      <br>
      <span v-bind:title="message2">
      Aquí tenemos un mensaje distinto.
      </span>
    </div>
    <br>
  </body>
  <script src="https://unpkg.com/vue"></script>
  <script src="MostrarInfo.js"></script>
</html>
~~~
* [Mostrar list de textos.](Lista.html)

~~~
<html>
  <head>
  </head>
  <body>
    <h2>Listado de elementos utilizando vuejs:</h2>
    <div id="app-4">
      <ol>
        <li v-for="todo in todos">
          {{ todo.text }}
        </li>
      </ol>
    </div>
  </body>
  <script src="https://unpkg.com/vue"></script>
  <script>
  var app4 = new Vue({
    el: '#app-4',
    data: {
      todos: [
        { text: 'Aprender JavaScript' },
        { text: 'Aprender Vue' },
        { text: 'Construir algo increíble' }
      ]
    }
  });
  </script>
</html>
~~~
* [Compilador Markdown](Editor.html)

~~~
<html>
  <head>
  </head>
  <body>
    <h2>Editor de texto utilizando vuejs:</h2>
    <p>A continucación podemos encontrar un editor de texto, que saca por pantalla lo que escribimos.</p>

    <div id="editor">
      <textarea :value="input" @input="update"></textarea>
      <div v-html="compiledMarkdown"></div>
    </div>
  </body>
  <script src="https://unpkg.com/vue"></script>
    <script src="https://unpkg.com/marked@0.3.6"></script>
    <script src="https://unpkg.com/lodash@4.16.0"></script>
  <script>
    new Vue({
      el: '#editor',
      data: {
        input: '# hello'
      },
      computed: {
        compiledMarkdown: function () {
          return marked(this.input, { sanitize: true })
        }
      },
      methods: {
        update: _.debounce(function (e) {
          this.input = e.target.value
        }, 500)
      }
    });
  </script>
</html>
~~~
* [Mostrar u ocultar elementos del html sin modificarlo](Mostrar.html)

~~~
<html>
  <head>
  </head>
  <body>

    <h2>Texto oculto/visible:</h2>
    <p>Justo debajo se encuentra un texto el cual se puede ocultar o mostrar desde el archivo js utilizando vuejs.</p>
    <div id="app-3">
      <span v-if="seen">Now you see me</span>
    </div>
    <br>
    <p> Modificando la variable seen de app3 a true, permitimos que se muestre el texto, pero su la modificamos a false, se oculta<p/>

  </body>
  <script src="https://unpkg.com/vue"></script>
  <script src="https://unpkg.com/marked@0.3.6"></script>
  <script src="https://unpkg.com/lodash@4.16.0"></script>
  <script>
    var app3 = new Vue({
      el: '#app-3',
      data: {
        seen: true
      }
    });
  </script>
</html>
~~~
* [Combinando mostrar información con editor](ej.html)

~~~
<html>
  <head>
  </head>
  <body>
    <div id="editor">
      <p>Escribir "borrar" para eliminar el texto, escribir "mostrar" para volver a mostrarlo</p>

      <textarea :value="input" @input="update"></textarea>
      <div v-html="compiledMarkdown"></div>
    </div>
    <br>

    <h2>Texto oculto/visible:</h2>
    <p>Justo debajo se encuentra un texto el cual se puede ocultar o mostrar desde el archivo js utilizando vuejs.</p>
    <div id="app-3">
      <span v-if="seen">Now you see me</span>
    </div>
    <br>

  </body>
  <script src="https://unpkg.com/vue"></script>
  <script src="https://unpkg.com/marked@0.3.6"></script>
  <script src="https://unpkg.com/lodash@4.16.0"></script>
  <script>
    var app3 = new Vue({
      el: '#app-3',
      data: {
        seen: true
      }
    });

    new Vue({
      el: '#editor',
      data: {
        input: ''
      },
      computed: {
        compiledMarkdown: function () {

          return marked(this.input, { sanitize: true })
        }
      },
      methods: {
        update: _.debounce(function (e) {
          this.input = e.target.value
          if(this.input.match(/borrar\s*/)){
            app3.seen = false;
          }
          if(this.input.match(/mostrar\s*/)){
            app3.seen = true;
          }
        }, 500)
      }
    });
  </script>
</html>
~~~
