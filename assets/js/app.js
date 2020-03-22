/**
 * C = trebol
 * D = diamantes
 * H = corazones
 * S = picas
 */

(() => {
    'use strict'

    let deck = []
    const tipos = ['C', 'D', 'H', 'S'],
        especiales = ['A', 'J', 'Q', 'K'];

    let puntosJugadores = [];

    const smalls = document.querySelectorAll('.row .col h1 small'),
        detener = document.querySelector('#detener'),
        nuevoJuego = document.querySelector('#nuevoJuego'),
        pedir = document.getElementById('pedir'),
        divCartasJugador = document.querySelectorAll('.divCartas');


    const inicializarJuego = (numJugadores = 2) => {
        deck = crearDeck();
        puntosJugadores = [];
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }
        smalls.forEach(elem => elem.innerHTML = 0);

        divCartasJugador.forEach(elem => elem.innerHTML = '');
        pedir.disabled = false;
        detener.disabled = false;
    }

    const crearDeck = () => {
        deck = [];
        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(i + tipo);
            }
        }

        for (let tipo of tipos) {
            for (let esp of especiales) {
                deck.push(esp + tipo);
            }
        }

        return _.shuffle(deck);;
    }



    //Funcion para tomar una carta

    const pedirCarta = () => {

        if (deck.length === 0) {
            throw 'No hay cartas en el deck';
        }
        return deck.pop();
    }

    const valorCarta = (carta) => {

        const valor = carta.substring(0, carta.length - 1);
        return (isNaN(valor)) ?
            (valor === 'A') ? 11 : 10 :
            valor * 1
            /*let puntos = parseInt(valor);
            if (isNaN(valor)) {
                puntos = (valor === 'A') ? 11 : 10;
            }


            console.log(puntos);
            */
    };

    const acumularPuntos = (carta, turno) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        smalls[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const crearCarta = (carta, turno) => {
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugador[turno].append(imgCarta);
    }

    const determinarGanador = () => {
        const [puntosMinimos, puntosComputador] = puntosJugadores;
        setTimeout(() => {
            if (puntosComputador === puntosMinimos) {
                alert('Nadie gana :(');
            } else if (puntosMinimos > 21) {
                alert('Computadora gana')
            } else if (puntosComputador > 21) {
                alert('Jugador Gana');
            } else {
                alert('Computadora Gana')
            }
        }, 100);
    }



    //Turno de la compu
    const turnoComputadora = (puntosMinimos) => {
        let puntosComputador = 0;
        do {
            const carta = pedirCarta();
            puntosComputador = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length - 1);

        } while ((puntosComputador < puntosMinimos) && (puntosMinimos <= 21));
        determinarGanador();
    }


    //Pedir carta por boton

    pedir.addEventListener('click', () => {
        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0);

        crearCarta(carta, 0);

        if (puntosJugador > 21) {
            console.warn('Lo siento mucho, perdiste');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);

        } else if (puntosJugador === 21) {
            console.warn('21, genial!');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }

    });
    detener.addEventListener('click', () => {
        pedir.disabled = true;
        detener.disabled = true;
        turnoComputadora(puntosJugadores[0]);
    });

    nuevoJuego.addEventListener('click', () => {
        console.clear();
        inicializarJuego();

    });
})();