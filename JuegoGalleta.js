'use strict';

// --- 1. Selecció d'Elements HTML (Tasca de l'Integrador/a) ---
let elementGalleta = document.getElementById('coockie_button');
let elementMarcador = document.getElementById('marcador');
let elementMejorasManuales = document.getElementById('updates_manual');
let elementMejorasAutomaticas = document.getElementById('updates_auto');


// --- 2. Variables del Joc (Tasca del Programador/a de Lògica) ---
let puntuacio = 0;
let poderDeClick = 1
let poderDeClickAuto = 0
//mejoras manuales
let gaunteDeCocina = { name: 'gaunteDeCocina', costbase: 10, power: 1, icon: '🧤', cantidad: 0 };
let rodillo = { name: 'rodillo', costbase: 75, power: 3, icon: '🥖', cantidad: 0 };
let batidora = { name: 'batidora', costbase: 300, power: 10, icon: '🌀', cantidad: 0}
let hornoManual = { name: 'hornoManual', costbase: 1200, power: 25, icon: '🔥', cantidad: 0}
let listaMejorasManuales = [gaunteDeCocina, rodillo, batidora, hornoManual];
//mejoras automaticas
let abuela = { name: 'abuela', costbase: 150, power: 2, icon: '🧓', cantidad: 0, escala: 1.15 };
let horno = { name: 'horno', costbase: 1000, power: 15, icon: '🔥', cantidad: 0, escala: 1.17};
let granjaDetrigo = { name: 'granjaDetrigo', costbase: 8000, power: 80, icon: '🌾', cantidad: 0, escala: 1.18};
let fabrica = { name: 'fabrica', costbase: 75000, power: 500, icon: '🏭', cantidad: 0 ,escala: 1.2};
let plantaIndustrial = { name: 'plantaIndustrial', costbase:500000, power: 4000, icon: '🏰', cantidad: 0,escala: 1.25}
let listaMejorasAutomaticas = [abuela, horno, granjaDetrigo, fabrica, plantaIndustrial];


// Funció per actualitzar el text del marcador a l'HTML
function actualitzarMarcador() {
    elementMarcador.textContent = puntuacio
}

// Funció que s'executa en fer clic a la galeta
function sumarPunt() {
    puntuacio += poderDeClick
    actualitzarMarcador()
}
// Aquesta línia connecta el clic de l'usuari amb la funció sumarPunt
elementGalleta.onclick = sumarPunt;
function aplicarMejoras() {
    for (let i = 0; i < listaMejorasManuales.length; i++) {
        let mejora = listaMejorasManuales[i]
        let boton = document.createElement('button')
            boton.innerHTML = `
    <div class="mejora-header">
        <span class="mejora-icono">${mejora.icon}</span>
        <span class="mejora-nombre">${mejora.name}</span>
    </div>
    <div class="mejora-info">
        <p class="costbase">Coste:${mejora.costbase} 🍪</p>
        <p>Poder: +${mejora.power}</p>
        <p class="cantidad">Cantidad: ${mejora.cantidad}</p>
    </div>
    `;
    boton.onclick = function () {
        if (puntuacio >= mejora.costbase) {
            puntuacio -= mejora.costbase
            mejora.cantidad++
            poderDeClick += mejora.power
            mejora.costbase = Math.ceil(mejora.costbase * 1.15)
            actualitzarMarcador()
        }
    }
    elementMejorasManuales.appendChild(boton)
    boton.className = mejora.name
    boton.style.display = "flex";
    boton.style.alignItems = "center";
    if (mejora.costbase > puntuacio) {
        boton.disabled = true;
    } else {
        boton.disabled = false;
    } 
    boton.classList.add('boton-tienda');
    }
    for (let i = 0; i < listaMejorasAutomaticas.length; i++) {
        let mejora = listaMejorasAutomaticas[i]
        let boton = document.createElement('button')
            boton.innerHTML = `
    <div class="mejora-header">
        <span class="mejora-icono">${mejora.icon}</span>
        <span class="mejora-nombre">${mejora.name}</span>
    </div>
    <div class="mejora-info">
        <p class="costbase">Coste:${mejora.costbase} 🍪</p>
        <p>Poder: +${mejora.power}</p>
        <p class="cantidad">Cantidad: ${mejora.cantidad}</p>
    </div>
    `;
    boton.onclick = function () {
        if (puntuacio >= mejora.costbase) {
            puntuacio -= mejora.costbase
            mejora.cantidad++
            poderDeClickAuto += mejora.power
            mejora.costbase = Math.ceil(mejora.costbase * mejora.escala)
            actualitzarMarcador()
        }
    }
    elementMejorasAutomaticas.appendChild(boton)
    boton.className = mejora.name
    boton.style.display = "flex";
    boton.style.alignItems = "center";
    boton.disabled = mejora.costbase > puntuacio;
    boton.classList.add('boton-tienda');
    }
}
aplicarMejoras()
setInterval(function () {
    let todasLasListas = [...listaMejorasManuales, ...listaMejorasAutomaticas]
    let botones = document.querySelectorAll('.boton-tienda');
    for (let i = 0; i < todasLasListas.length; i++) {
        let mejoraActual = todasLasListas[i]
        let botonActual = botones[i]
        if (botonActual) {
            if (puntuacio >= mejoraActual.costbase) {
                botonActual.disabled = false;
            } else {
                botonActual.disabled = true;
        }   
        let elementCantidad = botonActual.querySelector('.cantidad')
        if (elementCantidad) {
        elementCantidad.textContent = `Cantidad: ${mejoraActual.cantidad}`;
    }
    let elementCostoActual = botonActual.querySelector('.costbase')
        if (elementCostoActual) {
        elementCostoActual.textContent = `Coste: ${mejoraActual.costbase}`;
    }
        }
    }
}, 100)
setInterval(function () {
    puntuacio += poderDeClickAuto
    actualitzarMarcador()
}, 1000)
function guardarPartida() {
    localStorage.setItem('puntuacio', puntuacio)
    localStorage.setItem('poderDeClick', poderDeClick)
    localStorage.setItem('poderDeClickAuto', poderDeClickAuto)
}
setInterval(function () {
    guardarPartida()
    console.log('partida guardada')
}, 10000);
function cargarPartida() {
    puntuacio = Number(localStorage.getItem('puntuacio'))
    if (Number(localStorage.getItem('poderDeClick' != 0))) {
        poderDeClick = Number(localStorage.getItem('poderDeClick'))
    }
    poderDeClickAuto = Number(localStorage.getItem('poderDeClickAuto'))
    actualitzarMarcador()
}
cargarPartida()


