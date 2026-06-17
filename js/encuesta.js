document
.getElementById("surveyForm")
.addEventListener("submit", async function(e){

    e.preventDefault();

    const puntoVenta =
        localStorage.getItem("puntoVenta");

    const payload = {

        nombre:
            document.getElementById("nombre").value,

        puntoVenta,

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

    await fetch(API_URL,{
        method:"POST",
        body:JSON.stringify(payload)
    });

    document
    .getElementById("surveyForm")
    .classList.add("hidden");

    document
    .getElementById("success")
    .classList.remove("hidden");

});