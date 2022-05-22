const URL="http://localhost:9090/"

const restaurantes_get_all = async()=>{
    const res = await fetch(`${URL}api/restaurante/`);
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
        filtrarmesas(){
            if (this.restaurante_id!==0 && this.fecha !== null && this.rango_hora!== "Hora de entrada y salida" && this.cantidad_lugares !== 0){
                this.flagmesas = true;
            }else {
                alert("Debe completar todos los datos anteriores");
            }
            // alert("restaurante: "+this.restaurante_id+" fecha: "+this.fecha+" rango hora: "+this.rango_hora +" cantidad: "+this.cantidad_lugares);
            this.hora_entrada = parseInt(this.rango_hora.slice(0,2));
            this.hora_salida = parseInt(this.rango_hora.slice(3));
        }
    },
})

