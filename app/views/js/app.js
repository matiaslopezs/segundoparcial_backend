const URL = 'http://localhost:9090/api';

function mostrarRestaurantes(){
    console.log("mostrar Restaurantes...");


    const valores = window.location.search;
    //Mostramos los valores en consola:
    console.log(valores);
    //Resultado:
    //resultado=1&fecha=2022-05-21&cliente=
    //Creamos la instancia
    const urlParams = new URLSearchParams(valores);
    //Accedemos a los valores
    var restaurante = urlParams.get('restaurante');
    var fecha = urlParams.get('fecha');
    var cliente = urlParams.get('cliente');
    console.log("el valor de restaurante es: "+restaurante);
    console.log("el valor de fecha es: "+fecha);
    console.log("el valor de cliente es: "+cliente);
    //eliminamos las filas anteriores
    //Verificar si existe el parámetro
    console.log("Existe valor restaurante: "+urlParams.has('restaurante')); 
    console.log("Existe valor fecha: "+urlParams.has('fecha')); 
    console.log("Existe valor cliente: "+urlParams.has('cliente')); 

    if(!urlParams.has('restaurante') && !urlParams.has('fecha') && !urlParams.has('cliente')){ //obtengo todas las reservas
        fetch("http://localhost:9090/api/reserva")
        .then((response)=>response.json())
        .then((Restaurantes)=>{
            //retorna la lista de todos los restaurantes
            console.log(Restaurantes);
            generarTabla(Restaurantes);
        })
    }else{
        if(restaurante != "" && fecha != "" && cliente != "" ){
            const direccion = URL + "/reserva/ryfyc/"+restaurante+"/"+fecha+"/"+cliente;
            console.log(direccion);
            traerDatos(direccion);
        }else if(restaurante != "" && fecha != "" && cliente == "" ){
            const direccion = URL + "/reserva/ryf/"+restaurante+"/"+fecha;
            console.log(direccion);
            traerDatos(direccion);
        }else if( restaurante != "" && fecha == "" && cliente != ""){
            const direccion = URL + "/reserva/ryc/"+restaurante+"/"+cliente;
            console.log(direccion);
            traerDatos(direccion);
        }else if( restaurante == "" && fecha != "" && cliente != ""){
            const direccion = URL + "/reserva/cyf/"+cliente+"/"+fecha;
            console.log(direccion);
            traerDatos(direccion);
        }else if(restaurante != "" && fecha == "" && cliente == ""){
            const direccion = URL + "/reserva/restaurantes/"+restaurante;
            console.log(direccion);
            traerDatos(direccion);
        }else if(restaurante == "" && fecha != "" && cliente == ""){
            const direccion = URL + "/reserva/fechas/"+fecha;
            console.log(direccion);
            traerDatos(direccion);
        }else if(restaurante == "" && fecha == "" && cliente != ""){
            const direccion = URL + "/reserva/clientes/"+cliente;
            console.log(direccion);
            traerDatos(direccion);
        }
    }
    
}
mostrarRestaurantes();

function traerDatos(url){
        fetch(url)
        .then((response)=>response.json())
        .then((datos)=>{
            //retorna la lista de todos los restaurantes
            console.log(datos);
            generarTabla(datos);
        }) 
      
}

function generarTabla(datos){
    let tablaRestaurantes = document.querySelector('#tabla-reserva tbody');
    for(const r of datos){
        let texto = `<tr><td>${r.id_restaurante}</td>
                <td>${r.id}</td>
                <td>${r.id_mesa}</td>
                <td>${r.fecha}</td>
                <td>${r.hora_entrada}</td>
                <td>${r.hora_salida}</td>
                <td>${r.id_cliente}</td>
                <td>${r.cantidad_lugares}</td></tr>` 
        tablaRestaurantes.innerHTML += texto;
    }
}





s