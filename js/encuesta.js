const puntoVenta = localStorage.getItem("puntoVenta");

// Si no hay sesión activa, volver al login
if (!puntoVenta) {
    window.location.href = "index.html";
}

// Enviar encuesta
document
    .getElementById("surveyForm")
    .addEventListener("submit", async function (e) {

        e.preventDefault();

        const payload = {

            nombre:
                document.getElementById("nombre").value,

            puntoVenta:
                localStorage.getItem("puntoVenta"),

            experiencia:
                document.querySelector(
                    'input[name="experiencia"]:checked'
                ).value,

            recomendaria:
                document.querySelector(
                    'input[name="recomendaria"]:checked'
                ).value,

            productoTemporada:
                document.querySelector(
                    'input[name="producto"]:checked'
                ).value,

            comentario:
                document.getElementById("comentario").value

        };

        try {

            await fetch(API_URL, {
                method: "POST",
                body: JSON.stringify(payload)
            });

            document
                .getElementById("surveyForm")
                .classList.add("hidden");

            document
                .getElementById("success")
                .classList.remove("hidden");

        } catch (error) {

            console.error(error);

            alert(
                "Ocurrió un error guardando la encuesta."
            );

        }

    });

// Responder otra encuesta
function reiniciarEncuesta() {

    document
        .getElementById("surveyForm")
        .reset();

    document
        .getElementById("surveyForm")
        .classList.remove("hidden");

    document
        .getElementById("success")
        .classList.add("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}

// Cerrar sesión
function cerrarSesion() {

    if (
        confirm(
            "¿Deseas cerrar la sesión de este punto de venta?"
        )
    ) {

        localStorage.removeItem("puntoVenta");

        window.location.href = "index.html";

    }

}