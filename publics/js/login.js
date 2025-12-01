document.getElementById("formLogin").addEventListener("submit", function(e) {
    e.preventDefault();

    let usuario = document.getElementById("usuario").value.trim();
    let password = document.getElementById("password").value.trim();

    let datos = new FormData();
    datos.append("usuario", usuario);
    datos.append("password", password);

    fetch("backend/login.php", {
        method: "POST",
        body: datos
    })
    .then(res => res.json())
    .then(data => {

        console.log("RESPUESTA:", data);

        if (data.status === "OK") {

            // Guardar datos reales
            localStorage.setItem("usuario", data.usuario);
            localStorage.setItem("rol", data.rol);

            // Redirección correcta
            window.location.href = "dashboard.php";
        } 
        else {
            document.getElementById("msg").innerHTML = 
                "Usuario o contraseña incorrectos";
        }
    })
    .catch(err => {
        document.getElementById("msg").innerHTML = "Error del servidor";
        console.error(err);
    });
});
