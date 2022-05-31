
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

    if(!urlParams.has('restaurante') && !urlParams.has('fecha')){
        fetch("http://localhost:9090/api/reserva")
        .then((response)=>response.json())
        .then((Restaurantes)=>{
            //retorna la lista de todos los restaurantes
            console.log(Restaurantes);
            generarTabla(Restaurantes);
        })
    }else{ //filtrar
        if(cliente != ""){ //cliente fue cargado para filtrar
            console.log("El cliente se cargó para filtrar");
            fetch("http://localhost:9090/api/reserva/filtro/"+restaurante+"/"+fecha)
                .then((response)=>response.json())
                .then((restaurantes)=>{
                    //retorna la lista de reservas por restaurante y fecha
                    const restaurantesPorCliente = [];
                    for(let r of restaurantes){
                        if(r.id_cliente == cliente){
                            restaurantesPorCliente.push(r);
                        }
                    }
                    if(restaurantesPorCliente.length>0){
                        console.log(restaurantesPorCliente);
                    }else{
                        console.log("No hay coincidencias para el filtro");
                    }
                    generarTabla(restaurantesPorCliente);
                })
        }else{ //el cliente no fue cargado para filtrar
            console.log("el cliente no se cargo para filtrar");
            //filtra por id_restaurante
            fetch("http://localhost:9090/api/reserva/filtro/"+restaurante+"/"+fecha)
                .then((response)=>response.json())
                .then((restaurantes)=>{
                    //retorna la lista de reservas por restaurante y fecha
                    if(restaurantes.length>0){
                        console.log(restaurantes);
                    }else{
                        console.log("No hay coincidencias para el filtro");
                    }
                    generarTabla(restaurantes);
                })

        }
    }

    
}
mostrarRestaurantes();

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





