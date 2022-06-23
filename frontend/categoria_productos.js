const URL = "http://localhost:9090/api";

function get_all_categorias () {
  try {
    const res = fetch(`${URL}/categoria_producto/`);
    if (!res.ok) {
      const message = `Ha ocurrido un error: ${res.status} - ${res.statusText}`;
      throw new Error(message);
    }
    const data = res.json();
    const result = {
      status: res.status + "-" + res.statusText,
      data: data,
    };
    console.log(result.data);
    this.getResult = this.fortmatResponse(result);
  } catch (err) {
    this.getResult = err.message;
  }
}
function get_categoria_by_id() {
  const id = this.$refs.get_id.value; //el valor del id cargado
  if (id) {
    try {
      const res = fetch(`${URL}/categoria_producto/${id}`);
      if (!res.ok) {
        const message = `Ha ocurrido un error: ${res.status} - ${res.statusText}`;
        throw new Error(message);
      }
      const data = res.json();
      const result = {
        data: data,
        status: res.status,
      };
      this.getResult = this.fortmatResponse(result);
    } catch (err) {
      this.getResult = err.message;
    }
  }
}
function get_categoria_by_nombre() {
  const nombre = this.$refs.get_title.value;
  if (nombre) {
    try {
      const res = fetch(`${URL}/categoria_producto?nombre=${nombre}`);
      if (!res.ok) {
        const message = `Ha ocurrido un error: ${res.status} - ${res.statusText}`;
        throw new Error(message);
      }
      const data = res.json();
      const result = {
        status: res.status + "-" + res.statusText,
        data: data,
      };
      this.getResult = this.fortmatResponse(result);
    } catch (err) {
      this.getResult = err.message;
    }
  }
}
function post_categoria_producto() {
  const post_categoria = {
    nombre: this.$refs.post_nombre.value,
  };
  try {
    const res = fetch(`${URL}/categoria_producto`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": "token-value",
      },
      body: JSON.stringify(post_categoria),
    });
    if (!res.ok) {
      const message = `Ha ocurrido un error: ${res.status} - ${res.statusText}`;
      throw new Error(message);
    }
    const data = res.json();
    const result = {
      status: res.status + "-" + res.statusText,
      data: data,
    };
    this.postResult = this.fortmatResponse(result);
  } catch (err) {
    this.postResult = err.message;
  }
}
function put_categoria_producto() {
  const { put_id: id, put_nombre } = this.$refs;
  if (id) {
    const put_categoria = {
      id: id.value,
      nombre: put_nombre.value,
    };
    try {
      const res = fetch(`${URL}/categoria_producto/actualizar/`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": "token-value",
        },
        body: JSON.stringify(put_categoria),
      });
      if (!res.ok) {
        const message = `Ha ocurrido un error: ${res.status} - ${res.statusText}`;
        throw new Error(message);
      }
      const data = res.json();
      const result = {
        status: res.status + "-" + res.statusText,
        data: data,
      };
      this.putResult = this.fortmatResponse(result);
    } catch (err) {
      this.putResult = err.message;
    }
  }
}
function delete_categoria_by_id() {
  const id = this.$refs.delete_id.value;
  if (id) {
    try {
      const res = fetch(`${URL}/categoria_producto/borrar/${id}`, {
        method: "delete",
      });
      const data = res.json();
      const result = {
        status: res.status + "-" + res.statusText,
        data: data,
      };
      this.deleteResult = this.fortmatResponse(result);
    } catch (err) {
      this.deleteResult = err.message;
    }
  }
}

const app = new Vue({
  el: "#app1",
  data: {
    listaDeCategorias:[],
      getResult:null,
      postResult: null,
      putResult: null,
      deleteResult: null,
  },
  mounted:function () {
    this.beforeCreate()
  },
  methods: {
    fortmatResponse(res) {
      return JSON.stringify(res.data, null, 2);
    },
    beforeCreate: async function(){
      this.listaDeCategorias = get_all_categorias();
      console.log("lista categorias:", this.listaDeCategorias);
    },
    async obtener_categrorias (){
      this.listaDeCategorias = get_all_categorias();
      console.log(this.listaDeCategorias);
    },
    clearGet() {
      this.getResult = null;
    },
    clearPost() {
      this.postResult = null;
    },
    clearPut() {
      this.putResult = null;
    },
    clearDelete() {
      this.deleteResult = null;
    },
  },
});
