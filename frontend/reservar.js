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

const get_mesas_disponibles=(mesas,mesas_ocupadas)=>{
    mesas_disp = []
    mesas.forEach(elemento =>{
        var mesa = mesas_ocupadas.find( valor =>{
            return valor === elemento.id
        })
        if(!mesa){
            mesas_disp.push(elemento)
        }
    });
    console.log("mesas_disponibles: "+mesas_disp)
    return mesas_disp;
}

const app = new Vue({
    el:'#app',
    data:{
        restaurantes:[],
        valorcheck: 0,
        flagmesas: false,
        mesasdisponibles:[],
        restaurante_id: 0,
        fecha: null,
        rango_hora:"Hora de entrada y salida",
        hora_entrada:0,
        hora_salida:0,
        cantidad_lugares:0,
    },
    mounted:function (){
        this.beforeCreate()
    },
    methods:{
        beforeCreate: async function(){
            this.restaurantes = await restaurantes_get_all();
            console.log("lista restaurantes:", this.restaurantes);
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
            this.mesasdisponibles = get_mesas_disponibles(mesastodas,mesasocupadas)
        }
    },
})

