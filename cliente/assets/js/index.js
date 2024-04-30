let url = "http://localhost:3000/";
let email = document.getElementById("email");
let password = document.getElementById("password");
let btnIngresar = document.getElementById("ingresar");

let loggedEmail = null;
let rutaRestringidaLink = null;
let tokenName = null;

function eventoRuta() {
  rutaRestringidaLink.addEventListener("click", async function (event) {
    event.preventDefault(); // Evitar comportamiento por defecto del enlace
    try {
      const token = sessionStorage.getItem(tokenName);
      // Realizar la solicitud GET a la ruta restringida
      const response = await axios.get(`${url}restringida?token=${token}`);
      // Manejar la respuesta según sea necesario
      console.log("respuesta es ", response.data);

      if (response.data.status === "Ok") {
        sessionStorage.setItem("acceso", "OK");
        window.location.href = "rutaRestringida.html";
      } else {
        alert("no tiene acceso a esta pagina");
      }
    } catch (error) {
      console.error("Error al obtener la ruta restringida:", error);
      // Manejar el error de acuerdo a tus necesidades
    }
  });
}

btnIngresar.addEventListener("click", async function (event) {
  event.preventDefault();

  try {
    const mail = email.value;
    const pass = password.value;
    const regexcorreo = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

    if (!regexcorreo.test(mail)) {
      alert("Favor ingrese un correo valido.");
      throw new Error("Favor ingrese un correo valido.");
    }

    const response = await axios.get(
      `${url}login?email=${mail}&password=${pass}`
    );

    const data = response;

    console.log("data.status", data.status);

    if (data.status == "200") {
      console.log("Registro agregado correctamente.");
      console.log(data);
      sessionStorage.setItem("jwtToken", data.data.token);
      loggedEmail = data.data.loggedUser.email;
      tokenName = data.data.tokenName;

      // Obtener referencia a la ventana modal y su contenido
      const modal = document.getElementById("myModal");
      const modalContent = document.getElementById("modalContent");

      sessionStorage.setItem("correo", loggedEmail);

      // Actualizar el contenido HTML de la ventana modal
      modalContent.innerHTML = `
      <h2>Bienvenido</h2>
      <p>Usuario: ${loggedEmail}</p>
      <p>Token: ${data.data.token}</p>
      <a href="rutaRestringida.html" id="rutaRestringidaLink" target="_blank">Ir a Ruta Restringida</a>
  `;

      // Mostrar la ventana modal
      modal.style.display = "flex";
      rutaRestringidaLink = document.getElementById("rutaRestringidaLink");

      eventoRuta();

      // Agregar evento para cerrar la ventana modal al hacer clic en el botón de cerrar (x)
      const closeModalBtn = document.getElementsByClassName("close")[0];
      closeModalBtn.onclick = function () {
        modal.style.display = "none";
      };

      // Agregar evento para cerrar la ventana modal al hacer clic fuera de ella
      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      };
    } else {
      // Mostrar mensaje de error
      alert("Error al iniciar sesión");
    }
  } catch (error) {
    console.log("Hubo un error:", error);
    alert("Error al iniciar sesión");
    // Aquí puedes manejar el error de acuerdo a tus necesidades, como mostrar un mensaje al usuario
  }
});
