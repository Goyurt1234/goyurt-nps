document
.getElementById("loginForm")
.addEventListener("submit", async function(e){

    e.preventDefault();

    const usuario =
        document.getElementById("usuario").value;

    const password =
        document.getElementById("password").value;

    const response = await fetch(
        `${API_URL}?action=login&usuario=${encodeURIComponent(usuario)}&password=${encodeURIComponent(password)}`
    );

    const data = await response.json();

    if(data.success){

        localStorage.setItem(
            "usuario",
            usuario
        );

        localStorage.setItem(
            "puntoVenta",
            data.puntoVenta
        );

        window.location.href =
            "encuesta.html";
    }
    else{

        alert("Usuario o contraseña incorrectos");

    }

});