const URL="http://localhost:9090/"

const productos_get_all= async()=> {
    const res = await fetch(`${URL}api/categoria_producto/`);
    if(res){
        const data = res.json();
        return data;
    }
}
const get_categoria_by_id = async (id_categoria) =>{
    resp = await fetch(URL+"api/categoria_producto/"+id_categoria);
    if (resp){
        return resp.json()
    }

}

const app = new Vue({
    el: '#app',
    data: {
       lista: [],
        nombre: null,
        id_categoria: null

    },

    mounted:function () {
        this.beforeCreate()
    },
    methods: {
        beforeCreate: async function () {
           this.lista = await productos_get_all();
           console.log("lista: ", this.lista);

        },
        async cargarLista() {
            this.lista= await productos_get_all();
        },

        async cargarCategoria() {
            let categoria = {
                nombre: this.nombre

            };
            fetch(URL+"api/categoria_producto/",{
                method: 'POST',
                body:JSON.stringify(categoria),
                headers:{
                    'Content-Type': 'application/json'
                }
            }).then(response =>{
                if (response.ok){return response.json();}
                else { throw "Error al crear la categoria"}
            })
                .then(data => {
                    this.producto_id=data.id;
                    console.log("Categoria creada",data)
                    alert("Categoria creada")
                })
                .catch(err=>console.log(err))
        },
        async verCategoria() {
            if (this.id_categoria != null){

                let categoria = await get_categoria_by_id(this.id_categoria);
                console.log("Dato: ", categoria);
                this.id_categoria = categoria.id;
                this.nombre = categoria.nombre;

            }else {
                this.id_categoria = 0;
                this.nombre=null;
                console.log("Categoria retorno null");
            }


        },
        async delete_categoria_by_id() {
            console.log("ID", this.id_categoria);
            const id = this.id_categoria;
            if (id) {
                try {
                    const res = await fetch(`${URL}api/categoria_producto/borrar/${id}`, {
                        method: "delete",
                    });
                    const data = await res.json();
                    const result = {
                        status: res.status + "-" + res.statusText,
                        data: data,
                    };
                    alert("Categoria eliminada")
                } catch (err) {
                    this.deleteResult = err.message;
                }
            }
        },
        async actualizarCategoria() {


            const put_categoria = {
                id: this.id_categoria,
                nombre: this.nombre
            };

            try {
                const res = await fetch(`${URL}api/categoria_producto/actualizar/`, {
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
                const data = await res.json();
                const result = {
                    status: res.status + "-" + res.statusText,
                    data: data,
                };
                console.log("Se ha actualizado");
                alert("Categoria actualizada")
            } catch (err) {
                this.putResult = err.message;
            }

        }
        }
});

