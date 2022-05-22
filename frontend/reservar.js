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
    },
})

