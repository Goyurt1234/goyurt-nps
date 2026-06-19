let graficaEncuestas = null;
let graficaExperiencia = null;

function dibujarGraficas(respuestas){

    const fechas = {};
    const experiencia = {
        Excelente:0,
        Regular:0,
        Mala:0
    };

    // Ignorar encabezado
    respuestas.slice(1).forEach(fila=>{

        // Fecha
        let fecha = new Date(fila[0]).toLocaleDateString();

        fechas[fecha] = (fechas[fecha] || 0) + 1;

        // NPS (columna 3)
        if(experiencia[fila[3]] != undefined){
            experiencia[fila[3]]++;
        }

    });

    // ---------- Línea ----------

    if(graficaEncuestas){
        graficaEncuestas.destroy();
    }

    graficaEncuestas = new Chart(
        document.getElementById("chart1"),
        {
            type:"line",

            data:{

                labels:Object.keys(fechas),

                datasets:[{

                    label:"Encuestas",

                    data:Object.values(fechas),

                    borderWidth:3,

                    tension:.35,

                    fill:false

                }]

            },

            options:{
                responsive:true,
                plugins:{
                    legend:{
                        display:false
                    }
                }
            }

        }
    );

    // ---------- Dona ----------

    if(graficaExperiencia){
        graficaExperiencia.destroy();
    }

    graficaExperiencia = new Chart(
        document.getElementById("chart2"),
        {
            type:"doughnut",

            data:{

                labels:Object.keys(experiencia),

                datasets:[{

                    data:Object.values(experiencia)

                }]

            },

            options:{
                responsive:true,
                plugins:{
                    legend:{
                        position:"bottom"
                    }
                }
            }

        }
    );

}