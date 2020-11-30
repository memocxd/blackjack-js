

(() => {
    'use strict'

    let deck = [];
    const tipos = ['C','D','H','S'], 
        especiales = ['A','J','Q','K'];
    let puntosJugadores = [];

    // Referencias de html
    const btnPedir = document.getElementById('btnPedir'),
    btnNuevo = document.getElementById('btnNuevo'),
    btnDetener = document.getElementById('btnDetener'),
    puntosHtml = document.querySelectorAll('small'),
    divCartasJugadores = document.querySelectorAll('.divCartas');

    // Esta función inicializa el juego
    const inicializarJuego = (numJugadores = 2) => {
        deck = crearDeck();
        puntosJugadores = [];
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }
        puntosHtml.forEach(elem => elem.innerText = 0);
        divCartasJugadores.forEach(elem => elem.innerHTML = '');

        btnPedir.disabled = false;
        btnDetener.disabled = false;
    }

    // Esta funcion crea un nuevo deck
    const crearDeck = () => {
        deck = [];
        for (let i = 2; i <= 10; i++) {
            for (const tipo of tipos) {
                deck.push( i + tipo );
            }
        }
        for (const tipo of tipos) {
            for (const especial of especiales) {
                deck.push( especial + tipo );
            }
        }
        return _.shuffle(deck);
    }
    

    // Esta funcion me permite pedi una carta
    const pedirCarta = () => {
        if (deck.length === 0) {
            throw 'No hay cartas en el deck';
        }

        return deck.pop(); 
    }

    // Aqui convierto la carta en numeros y lo sumo al puntosJugador
    const valorCarta = (carta) => { 
        const valor = carta.substring(0, carta.length-1);
        return ( isNaN(valor) ) ?
                (valor === 'A') ? 11 : 10
                : valor * 1;
    }

    // Turno: 0 = primer jugador y el ultimo es la computadora
    const acumularPuntos = (carta, turno) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntosHtml[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const crearCarta = (carta, turno) => {
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add("carta");
        divCartasJugadores[turno].append(imgCarta);
    }

    // Condicion de victoria
    const determinarGanador = () => {
        const [puntosJugador, puntosComputadora] =puntosJugadores;

        setTimeout(() => {
            if ((puntosJugador > puntosComputadora) && (puntosJugador <= 21) || puntosComputadora > 21 ) {
                alert('Felicidades haz ganado');
            } else if (puntosJugador === puntosComputadora) {
                alert('Empatastes, sigue intentandolo');
            } else if ((puntosJugador < puntosComputadora) && (puntosComputadora <= 21) || puntosJugador > 21 ) {
                alert('Haz pedido...');
            }
        }, 300 );
    }

    // Turno de la computadora
    const turnoComputadora = (puntosJugador) => {
        let puntosComputadora = 0;
        do {
            // Al dar click pide la carta y suma los puntos
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length -1 );
            // Agregar la carta en forma de imagen
            crearCarta(carta, puntosJugadores.length - 1 );
        } while ( ( puntosComputadora < puntosJugador ) && ( puntosJugador <= 21 ) );
        determinarGanador();
    }

    // Eventos

    btnPedir.addEventListener('click', () => {
        // Al dar click pide la carta y suma los puntos
        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0);
        // Agregar la carta en forma de imagen
        crearCarta(carta, 0);
        // Desactiva el boton si el jugador pierde o logra 21 puntos
        if ( puntosJugador > 21 ) {
            console.warn('Perdiste, haz superado los 21 puntos');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        } else if ( puntosJugador === 21 ) {
            console.log('21, genial');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }
    });

    btnDetener.addEventListener('click', () => {
        if (puntosJugadores[0] >= 2) {
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugadores[0]);
        } else { alert('Debe pedir una carta primero'); }
    });

    btnNuevo.addEventListener('click', () => {
        console.clear();
        inicializarJuego();
        
    });

    inicializarJuego();


})();