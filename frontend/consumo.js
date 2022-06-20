const URL="http://localhost:9090/"

const get_cliente_by_id = async (id_cliente) =>{
    respuesta = await fetch(URL+"api/cliente/"+id_cliente)
    if (respuesta){
        return respuesta.json()
    }
}

const get_cliente_by_ci = async (cedula_cliente) =>{
    respuesta = await fetch(URL+"api/cliente/ci/"+cedula_cliente)
    if (respuesta){
        return respuesta.json()
    }
}

async function clientes_get_all() {
    const res = await fetch(`${URL}api/cliente/`);
    if(res){
        const data = res.json();
        return data;
    }
}

const restaurantes_get_all = async()=>{
    const res = await fetch(`${URL}api/restaurante/`);
    if(res){
        const data = res.json();
        return data;
    }
}

const get_all_mesas_by_restaurante = async(id_restaurant)=>{
    mesas = await fetch(URL+"api/mesa/restaurantes/"+id_restaurant)
    if(mesas){
        return mesas.json()
    }
}

async function get_consumo_by_id_mesa(id_mesa) {
    consumo = await fetch(URL + "api/consumo/mesa/" + id_mesa)
    if (consumo) {
        return consumo.json()
    }
}

async function get_detalles_consumo(id_consumo) {
    detalles_consumo = await fetch(URL+"api/detalleconsumo/consumo/"+id_consumo)
    if (detalles_consumo){
        return detalles_consumo.json()
    }
}

async function update_cliente_in_consumo(id_consumo,id_cliente) {
    try{
        const request = await fetch(URL + "api/consumo/",{
            method: 'PUT',
            body:JSON.stringify({
                id: id_consumo,
                id_cliente: id_cliente
            }),
            headers:{
                'Content-Type': 'application/json'
            }
        });
        return await request.json();
    }catch (error){
        console.error('Error cambiando el cliente del consumo');
        console.error(error);
    }
}

const app = new Vue({
    el:'#app',
    data:{
        restaurantes:[],
        mesas:[],
        restaurante_id: 0,
        id_mesa: 0,
        consumo: null,
        detalles_consumo: [],
        cliente_actual: null,
        band_cliente: false,
        cliente_id: null,
        listaclientes:[],
        ci:null,
        nombre:null,
        apellido:null,
        flagcliente: false,
    },
    mounted:function () {
        this.beforeCreate()
    },
    methods:{
        beforeCreate: async function(){
            this.restaurantes = await restaurantes_get_all();
            console.log("lista restaurantes:", this.restaurantes);
            this.listaclientes = await clientes_get_all();
            console.log("lista clientes:", this.listaclientes);
        },
        async obtener_mesas(){
            if (this.restaurante_id !== 0){
                this.mesas = await get_all_mesas_by_restaurante(this.restaurante_id);
            }
        },
        async obtener_consumo_by_mesa(){
            if (this.id_mesa !== 0){
                console.log("id de la mesa ", this.id_mesa)
                let lista_consumo = await get_consumo_by_id_mesa(this.id_mesa);
                this.consumo = lista_consumo[0]
                console.log("consumo de la mesa: ",this.consumo)
                // si tenemos el consumo recuperamos sus detalles y el cliente titular
                this.detalles_consumo = await get_detalles_consumo(this.consumo.id);
                this.cliente_actual = await get_cliente_by_id(this.consumo.id_cliente);
            }
        },
        cambiar_cliente(){
            this.band_cliente = true;
        },
        async cargarcliente(){
            if (this.ci !== "Elija su cédula"){
                let cliente = await get_cliente_by_ci(this.ci);
                this.nombre = cliente[0].nombre;
                this.apellido = cliente[0].apellido;
                this.cliente_id = cliente[0].id;
                this.flagcliente = true;
            }else{
                this.ci = null;
                this.nombre = null;
                this.apellido = null;
                this.flagcliente = false;
            }
        },
        async registrarcliente() {
            let cliente = {
                nombre: this.nombre,
                apellido: this.apellido,
                cedula: this.ci
            };
            try{
                const req = await fetch(URL + "api/cliente/", {
                    method: 'POST',
                    body: JSON.stringify(cliente),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                alert("Cliente creado")
                this.cliente_actual = await req.json();
                return data;
            } catch (error) {
                console.error("Error al crear el cliente");
                console.error(error);
            }
            this.flagcliente = true;
            this.band_cliente = false;
            console.log(await update_cliente_in_consumo(this.consumo.id, this.cliente_actual.id));
        },
        async actualizar_cliente() {
            this.band_cliente = false;
            console.log(await update_cliente_in_consumo(this.consumo.id,this.cliente_id));
            this.cliente_actual = await get_cliente_by_id(this.cliente_id);
        }
    },
})