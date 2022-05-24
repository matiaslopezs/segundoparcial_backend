
function mostrarReservas(){
    console.log("mostrar reservas...");
    fetch("http://localhost:9090/api/reserva")
        .then((response)=>response.json())
        .then((reservas)=>{
            //me retorna la lista de reservas de todos los restaurante
            let tablaReservas = document.querySelector('#tabla-reserva tbody')

            for(const r of reservas){
                let texto = `<tr><td>${r.id_restaurante}</td>
                        <td>${r.id}</td>
                        <td>${r.id_mesa}</td>
                        <td>${r.fecha}</td>
                        <td>${r.hora_entrada}</td>
                        <td>${r.hora_salida}</td>
                        <td>${r.id_cliente}</td>
                        <td>${r.cantidad_lugares}</td></tr>` 
                tablaReservas.innerHTML += texto;
            }
            
            console.log(reservas);
        })
}

