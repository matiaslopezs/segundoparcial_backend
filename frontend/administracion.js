
const URL="http://localhost:9090/"


//Obtener todos los productos
const productos_get_all = async()=>{
     respuesta = await fetch(`${URL}api/administraciondeproductos/`);
    if(respuesta){
        const data = respuesta.json();
        return data;
    }
}

const get_producto_by_id = async (id_producto) =>{
    resp = await fetch(URL+"api/administraciondeproductos/"+id_producto);
    if (resp){
        return resp.json()
    }

}

const get_all_categorias= async()=> {
    const res = await fetch(`${URL}api/categoria_producto/`);
    if(res){
        const data = res.json();
        return data;
    }
}
const get_all_productos_by_categoria = async(id_categoria)=>{
    categorias_productos = await fetch(URL+"api/administraciondeproductos/categoria_producto/"+id_categoria);
    if(categorias_productos){
        return categorias_productos.json()
    }
}

const app = new Vue({
    el: '#app',
    data: {
        message: null,

        nombre_del_producto: null,
        producto_id: 0,
        precio_de_venta: 0,
        id_categoria: 0,
        flagproducto: false,
        productos: [],
        categorias_productos: [],
        id_producto: 0,
        productos_categoria: [],
        nombre_categoria: false,
        categoria_seleccionada:  false,
        producto_seleccionado: [],
        deleteResult: null,
        putResult: null,
        lista: []


    },

    mounted:function () {
        this.beforeCreate()
    },
    methods: {
        beforeCreate: async function () {
           this.productos = await productos_get_all();
            console.log("lista de productos:", this.productos);
            this.categorias_productos =await get_all_categorias();
            console.log("Lista de categorias:", this.categorias_productos);
            this.message = "Hola";
            this.lista= await productos_get_all();
        },

        async cargarCategorias() {
            let categoria = await get_all_categorias();
            console.log("Nombre: " + categoria[0] + " n: " + categoria[0].id_categoria + " Precio: " + categoria[0].nombre_categoria)
            this.nombre_categoria = categoria[0].nombre_categoria;

        },
        async filtrarProductos() {
          this.productos_categoria = await get_all_productos_by_categoria(this.id_categoria)

        },
        registrarProducto(){
            let producto = {
                nombre: this.nombre_del_producto,
                precio: this.precio_de_venta,
                categoria: this.id_categoria,
            };
            fetch(URL+"api/administraciondeproductos/",{
                method: 'POST',
                body:JSON.stringify(producto),
                headers:{
                    'Content-Type': 'application/json'
                }
            }).then(response =>{
                if (response.ok){return response.json();}
                else { throw "Error al crear el producto"}
            })
                .then(data => {
                    this.producto_id=data.id;
                    console.log("Producto creado",data)
                    alert("Producto creado")
                })
                .catch(err=>console.log(err))

        },
        async cargarLista() {
            this.lista= await productos_get_all();
        },

        async cargarProducto() {
            if (this.producto_id != 0){

            let seleccion = await get_producto_by_id(this.producto_id);
            console.log("Dato: ", seleccion);
            this.id_categoria = seleccion.id_categoria;
            this.nombre_del_producto = seleccion.nombre_del_producto;
            this.precio_de_venta = seleccion.precio_de_venta;

            this.flagproducto = true;
        }else {
            this.nombre_del_producto = null;
            this.precio_de_venta=null;
            this.id_categoria=null;
            }
            this.productos = await productos_get_all();

            },
        datosfueroncargados() {
            if (this.flagproducto) {
                return true;
            } else {
                return false;
            }
        },
        async delete_producto_by_id() {
            const id = this.producto_id;

            if (id) {
                try {
                    const res = await fetch(`${URL}api/administraciondeproductos/borrar/${id}`, {
                        method: "delete",
                    });
                    const data = await res.json();
                    const result = {
                        status: res.status + "-" + res.statusText,
                        data: data,
                    };
                    alert("Producto eliminado")
                } catch (err) {
                    this.deleteResult = err.message;
                }
            }

        },
        async put_producto() {


                const put_producto = {
                    id: this.producto_id,
                    nombre_del_producto: this.nombre_del_producto,
                    precio_de_venta: this.precio_de_venta,
                    id_categoria: this.id_categoria
                };
                try {
                    const res = await fetch(`${URL}api/administraciondeproductos/actualizar/`, {
                        method: "put",
                        headers: {
                            "Content-Type": "application/json",
                            "x-access-token": "token-value",
                        },
                        body: JSON.stringify(put_producto),
                    });
                    if (!res.ok) {
                        const message = `Ha ocurrido un error: ${res.status} - ${res.statusText}`;
                        throw new Error(message);
                    }
                    const data = await res.json();
                    const result = {
                        status: res.status + "-" + res.statusText,
                        data: data,
                    };
                    console.log("Se ha actualizado");
                    alert("Producto actualizado")
                } catch (err) {
                    this.putResult = err.message;
                }

        }

        ,
        async registrarProducto() {
            const post_producto = {

                nombre_del_producto: this.nombre_del_producto,
                precio_de_venta: this.precio_de_venta,
                id_categoria: this.id_categoria
            };
            try {
                const res = await fetch(`${URL}api/administraciondeproductos/`, {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": "token-value",
                    },
                    body: JSON.stringify(post_producto),
                });
                if (!res.ok) {
                    const message = `Ha ocurrido un error: ${res.status} - ${res.statusText}`;
                    throw new Error(message);
                }
                const data = await res.json();
                const result = {
                    status: res.status + "-" + res.statusText,
                    data: data,
                };
                console.log("Se ha cargado el producto", post_producto);
                alert("Producto creado")

            } catch (err) {
                this.postResult = err.message;
            }
        }

    }


});

