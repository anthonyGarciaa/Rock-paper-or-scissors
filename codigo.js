"use strict";
const piedra = document.querySelector(".piedra");
const papel = document.querySelector(".papel");
const tijera = document.querySelector(".tijera");
const elegido = document.querySelector(".player").children[1];
const cpu = document.querySelector(".cpu").children[1];
const contenedorNarrador = document.querySelector(".narrador-container");
const narrador = document.createElement("h1");
narrador.classList.add("narrador");
const puntuacion1 = document.querySelector(".puntuacion1");
const puntuacion2 = document.querySelector(".puntuacion2");

let narradorHtml = 3;

const primeraAccion = (elemento, click) => {
  if (click === 1) {
    eleccionMano(elemento);
  }
};

const handleSelect = (e) => {
  let sibilings;
  if (e.target.__proto__ === HTMLImageElement.prototype) {
    sibilings = [...e.target.parentElement.parentElement.children];
    eleccionMano(e.target);
  } else {
    sibilings = [...e.target.parentElement.children];
    eleccionMano(e.target.children[0]);
  }

  sibilings.map((el) => (el.disabled = true));

  setTimeout(() => sibilings.map((el) => (el.disabled = false)), 4000);
};

piedra.addEventListener("click", handleSelect);
papel.addEventListener("click", handleSelect);
tijera.addEventListener("click", handleSelect);

const eleccionMano = (mano) => {
  let intervalo = setInterval(() => {
    elegido.setAttribute("class", "rotate-izquierda");
    cpu.setAttribute("class", "rotate-izquierda");

    setTimeout(() => {
      cpu.setAttribute("class", "rotate-derecha");
      elegido.setAttribute("class", "rotate-derecha");
    }, 200);

    contenedorNarrador.appendChild(narrador);
    narrador.textContent = narradorHtml.toString();
    narradorHtml--;
  }, 998);

  setTimeout(() => {
    clearInterval(intervalo);
    narradorHtml = 3;
    elegido.setAttribute("src", mano.getAttribute("src"));
    let numero = Math.floor(Math.random() * 3 + 1);
    eleccionCpu(numero);
  }, 4000);
};

const eleccionCpu = (numero) => {
  const opciones = [
    "images/Piedra.png",
    "images/Tijeras.png",
    "images/Papel.png",
  ];
  cpu.setAttribute("src", opciones[numero - 1]);

  const opcionCpu = cpu.getAttribute("src");
  const opcionmano = elegido.getAttribute("src");

  if (
    (opcionmano === "images/Piedra.png" &&
      opcionCpu === "images/Tijeras.png") ||
    (opcionmano === "images/Tijeras.png" && opcionCpu === "images/Papel.png") ||
    (opcionmano === "images/Papel.png" && opcionCpu === "images/Piedra.png")
  ) {
    narrador.textContent = "Ganas";
    definirPuntuacion("puntoplayer");
  } else if (opcionCpu === opcionmano) {
    narrador.textContent = "Empate";
  } else {
    narrador.textContent = "Pierdes";
    definirPuntuacion("puntocpu");
  }
  definirPuntuacion();

  reset();
};

const definirPuntuacion = (punto) => {
  let puntuacionUsuario = parseInt(puntuacion1.textContent);

  let puntuacionCpu = parseInt(puntuacion2.textContent);

  mostrarSiNoSeTermina(puntuacionUsuario, puntuacionCpu, punto);
  mostrarSiSeTermina(puntuacionUsuario, puntuacionCpu);
};

const mostrarSiNoSeTermina = (puntuacionUsuario, puntuacionCpu, punto) => {
  if (puntuacionUsuario < 3 && puntuacionCpu < 3) {
    if (punto == "puntoplayer") {
      puntuacionUsuario++;
      puntuacion1.textContent = puntuacionUsuario.toString();
    } else if (punto == "puntocpu") {
      puntuacionCpu++;
      puntuacion2.textContent = puntuacionCpu.toString();
    }
  }
};

const mostrarSiSeTermina = (puntuacionUsuario, puntuacionCpu) => {
  if (puntuacionCpu == 3)
    narrador.textContent = `Mala suerte, has perdido la partida`;
  else if (puntuacionUsuario == 3)
    narrador.textContent = `Felicidades, has ganado la partida`;

  if (puntuacionUsuario == 3 || puntuacionCpu == 3) {
    setTimeout(() => {
      puntuacion1.textContent = "0";
      puntuacion2.textContent = "0";
      puntuacionCpu = 0;
      puntuacionUsuario = 0;
    }, 900);
  }
};

const reset = () => {
  setTimeout(() => {
    elegido.setAttribute("src", "images/Piedra.png");
    cpu.setAttribute("src", "images/Piedra.png");
  }, 2000);
};
