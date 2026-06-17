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

        const boton = document.querySelector("#surveyForm button");

        // Evita múltiples clics
        if (boton.disabled) {
            return;
        }

        boton.disabled = true;
        boton.innerHTML = "⏳ Enviando...";
        boton.classList.add(
            "opacity-60",
            "cursor-not-allowed"
        );

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

            const respuesta = await fetch(API_URL, {
                method: "POST",
                body: JSON.stringify(payload)
            });

            const data = await respuesta.json();

            if (!data.success) {
                throw new Error("Error guardando encuesta");
            }

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

            boton.disabled = false;
            boton.innerHTML = "Enviar encuesta";
            boton.classList.remove(
                "opacity-60",
                "cursor-not-allowed"
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

    const boton = document.querySelector("#surveyForm button");

    boton.disabled = false;
    boton.innerHTML = "Enviar encuesta";
    boton.classList.remove(
        "opacity-60",
        "cursor-not-allowed"
    );

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