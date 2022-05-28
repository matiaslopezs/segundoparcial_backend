const URL="http://localhost:9090/"

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

const get_mesas_ocupadas = async (id_restaurante,fecha,hora_entrada,hora_salida,cantidad_lugares) =>{
    date=fecha
    parametros = id_restaurante+"/"+date+"/"+hora_entrada+"/"+hora_salida+"/"+cantidad_lugares
    respuesta= await fetch(URL+"api/reserva/mesasocupadas/"+parametros)
    console.log("mesas ocupadas: "+respuesta)
    if(respuesta){
        return respuesta.json()
    }
}

const get_mesas_disponibles=(mesas,mesas_ocupadas, capacidad)=>{
    mesas_disp = []
    mesas.forEach(elemento =>{
        if (elemento.capacidad >= capacidad){
            var mesa = mesas_ocupadas.find( valor =>{
                return valor === elemento.id
            })
            if(!mesa){
                mesas_disp.push(elemento)
            }
        }
    });
    console.log("mesas_disponibles: "+mesas_disp)
    return mesas_disp;
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

const app = new Vue({
    el:'#app',
    data:{
        restaurantes:[],
        valorcheck: 0,
        flagmesas: false,
        flagcliente: false,
        mesasdisponibles:[],
        restaurante_id: 0,
        fecha: null,
        rango_hora:"Hora de entrada y salida",
        hora_entrada:0,
        hora_salida:0,
        cantidad_lugares:0,
        cliente_id: null,
        mesa_elegida:null,
        listaclientes:[],
        ci:null,
        nombre:null,
        apellido:null,
    },
    mounted:function (){
        this.beforeCreate()
    },
    methods:{
        beforeCreate: async function(){
            this.restaurantes = await restaurantes_get_all();
            console.log("lista restaurantes:", this.restaurantes);
            this.listaclientes = await clientes_get_all();
            console.log("lista clientes:", this.listaclientes);
        },
        checkhora(valor){
            if (valor === 1){
                this.valorcheck = 1;
            }else if(valor === 2){
                this.valorcheck = 2;
            }
        },
        async filtrarmesas() {
            if (this.restaurante_id !== 0 && this.fecha !== null && this.rango_hora !== "Hora de entrada y salida" && this.cantidad_lugares !== 0) {
                this.flagmesas = true;
            } else {
                alert("Debe completar todos los datos anteriores");
            }
            // alert("restaurante: "+this.restaurante_id+" fecha: "+this.fecha+" rango hora: "+this.rango_hora +" cantidad: "+this.cantidad_lugares);
            this.hora_entrada = parseInt(this.rango_hora.slice(0, 2));
            this.hora_salida = parseInt(this.rango_hora.slice(3));
            let mesastodas = await get_all_mesas_by_restaurante(this.restaurante_id)
            let mesasocupadas = await get_mesas_ocupadas(this.restaurante_id, this.fecha, this.hora_entrada, this.hora_salida, this.cantidad_lugares)
            this.mesasdisponibles = get_mesas_disponibles(mesastodas,mesasocupadas, this.cantidad_lugares)
        },
        async cargarcliente(){
            if (this.ci !== "Elija su cédula"){
                let cliente = await get_cliente_by_ci(this.ci);
                // console.log("c: "+cliente[0]+" n: "+cliente[0].nombre+" a: "+cliente[0].apellido)
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
        datoscargados(){
            if (this.ci !== null && this.nombre !== null && this.apellido !== null && this.mesa_elegida !== null){
                return true;
            }else{
                return false;
            }
        },
        registrarcliente(){
            let cliente = {
                nombre: this.nombre,
                apellido: this.apellido,
                cedula: this.ci
            };
            fetch(URL+"api/cliente/",{
                method: 'POST',
                body:JSON.stringify(cliente),
                headers:{
                    'Content-Type': 'application/json'
                }
            }).then(response =>{
                if (response.ok){return response.json();}
                else { throw "Error al crear el cliente"}
            })
                .then(data => {
                    this.cliente_id=data.id;
                    console.log("Cliente creado",data)
                    alert("Cliente creado")
                })
                .catch(err=>console.log(err))
            this.flagcliente = true;
        },
        async reservar() {
            const cliente = await get_cliente_by_ci(this.ci);
            if (cliente !== null){
                const reserva = {
                    id_restaurante: this.restaurante_id,
                    id_mesa: this.mesa_elegida,
                    fecha: this.fecha,
                    hora_entrada: this.hora_entrada,
                    hora_salida: this.hora_salida,
                    id_cliente: this.cliente_id,
                    cantidad_lugares: this.cantidad_lugares
                }
                fetch(URL+"api/reserva/", {
                    method: 'POST',
                    body:JSON.stringify(reserva),
                    headers:{
                        'Content-Type': 'application/json'
                    }
                }).then(response => {
                    if (response.ok){return response.json}
                    else { throw "Error al crear la reserva"}
                }).then( data => {
                    console.log("Reserva creada")
                    alert("¡Reserva realizada con éxito!")
                    window.location.href="menu.html"
                }).catch(err=>console.log(err))
            }
        }
    },
})


