

(() => {

    /* 
    * 2c = Two of clubs
    * 2d = Two of diaminds
    * 2h = Two of hearts
    * 2s = Two of spades
    */

    let deck = [];
    const tipos = ['C','D','H','S'];
    const especiales = ['A','J','Q','K'];
    let puntosJugador = 0,
        puntosComputadora = 0;

    // Referencias de html
    const btnPedir = document.getElementById('btnPedir');
    const btnNuevo = document.getElementById('btnNuevo');
    const btnDetener = document.getElementById('btnDetener');
    const puntosHtml = document.querySelectorAll('small');
    const divCartasJugador = document.getElementById('jugador-cartas');
    const divCartasComputadora = document.getElementById('computadora-cartas');

    // Esta funcion crea un nuevo deck
    const crearDeck = () => {
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
        deck = _.shuffle(deck);
        return deck;
    }

    crearDeck();

    // Esta funcion me permite pedi una carta
    const pedirCarta = () => {
        if (deck.length === 0) {
            throw 'No hay cartas en el deck';
        }

        const carta = deck.pop();
        return carta;
    }

    // Aqui convierto la carta en numeros y lo sumo al puntosJugador
    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length-1);
        return ( isNaN(valor) ) ?
                (valor === 'A') ? 11 : 10
                : valor * 1;
    }

    // Turno de la computadora
    const turnoComputadora = (puntosMinimos) => {
        do {
            // Al dar click pide la carta y suma los puntos
            const carta = pedirCarta();
            puntosComputadora += valorCarta(carta);
            puntosHtml[1].innerText = puntosComputadora;
            // Agregar la carta en forma de imagen
            const imgCarta = document.createElement('img');
            imgCarta.src = `assets/cartas/${carta}.png`;
            imgCarta.classList.add("carta");
            divCartasComputadora.append(imgCarta);

            if ( puntosMinimos > 21 ) {
                break;
            }
        } while ( ( puntosComputadora < puntosMinimos ) && ( puntosMinimos <= 21 ) );
        // Condicion de victoria
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


    // Eventos

    btnPedir.addEventListener('click', () => {
        // Al dar click pide la carta y suma los puntos
        const carta = pedirCarta();
        puntosJugador += valorCarta(carta);
        puntosHtml[0].innerText = puntosJugador;
        // Agregar la carta en forma de imagen
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add("carta");
        divCartasJugador.append(imgCarta);
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
        if (puntosJugador >= 2) {
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        } else { alert('Debe pedir una carta primero'); }
    });

    btnNuevo.addEventListener('click', () => {
        console.clear();
        deck = [];
        deck = crearDeck();

        puntosJugador = 0;
        puntosComputadora = 0;

        puntosHtml[0].innerText = 0;
        puntosHtml[1].innerText = 0;

        btnPedir.disabled = false;
        btnDetener.disabled = false;

        divCartasComputadora.innerHTML = '';
        divCartasJugador.innerHTML = '';
    });







})();