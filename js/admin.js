function animarNumero(id, valor, sufijo = "") {

    const elemento = document.getElementById(id);

    const inicio = 0;

    const duracion = 700;

    const incremento = valor / (duracion / 16);

    let actual = inicio;

    const timer = setInterval(() => {

        actual += incremento;

        if (actual >= valor) {

            actual = valor;

            clearInterval(timer);

        }

        elemento.innerText =
            Math.round(actual) + sufijo;

    }, 16);

}

async function cargarDashboard() {

    try {

        const dashboard = await fetch(
            API_URL + "?action=getDashboard"
        );

        const datos = await dashboard.json();

        animarNumero("total", datos.total);

        animarNumero("experiencia", datos.experiencia, "%");

        animarNumero("recomendaria", datos.recomendaria, "%");

        animarNumero("producto", datos.producto, "%");

        const respuestas = await fetch(
            API_URL + "?action=getResponses"
        );

        const filas = await respuestas.json();
        dibujarGraficas(filas);

        const tbody = document.getElementById("tabla");

        tbody.innerHTML = "";

        for (let i = filas.length - 1; i >= 1; i--) {

            tbody.innerHTML += `

            <tr class="border-b hover:bg-cyan-50 transition">

                <td class="py-4">${filas[i][0]}</td>

                <td>${filas[i][2]}</td>

                <td>${filas[i][1]}</td>

                <td>${filas[i][3]}</td>

                <td>${filas[i][6]}</td>

            </tr>

            `;

        }

    } catch (e) {

        console.log(e);

    }

}

cargarDashboard();

setInterval(cargarDashboard,30000);