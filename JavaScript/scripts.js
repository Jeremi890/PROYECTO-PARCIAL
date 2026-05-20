document.addEventListener('DOMContentLoaded', function() {
    
    // 1. GALERÍA 
    const imagenGaleria = document.getElementById('imagen-galeria');
    const btnAnterior = document.getElementById('btn-anterior');
    const btnSiguiente = document.getElementById('btn-siguiente');
    const imagenes = [
        'imagenes/viaje1.jpg',
        'imagenes/caribe.jpg',
        'imagenes/islandia.jpg',
        'imagenes/suiza.jpg',
        'imagenes/estatua.jpg'
    ];
    let indiceActual = 0;

    if(imagenGaleria) {
        btnSiguiente.addEventListener('click', function() {
            indiceActual++;
            if(indiceActual >= imagenes.length) {
                indiceActual = 0;
            }
            imagenGaleria.src = imagenes[indiceActual];
        });

        btnAnterior.addEventListener('click', function() {
            indiceActual--;
            if(indiceActual < 0) {
                indiceActual = imagenes.length - 1;
            }
            imagenGaleria.src = imagenes[indiceActual];
        });
    }

    // 2. VALIDACIÓN DEL FORMULARIO DE RESERVAS
    const formularioReserva = document.getElementById('formulario-reserva');
    const mensajeAlerta = document.getElementById('mensaje-alerta');

    if(formularioReserva) {
        formularioReserva.addEventListener('submit', function(evento) {
            evento.preventDefault(); 
            const nombre = document.getElementById('nombre').value;
            const correo = document.getElementById('correo').value;
            const destino = document.getElementById('destino').value;
            const fecha = document.getElementById('fecha').value;
            const pasajeros = document.getElementById('pasajeros').value;
            const hospedaje = document.getElementById('hospedaje').value;

            if(nombre === '' || correo === '' || destino === '' || fecha === '' || pasajeros === '' || hospedaje === '') {
                mostrarAlerta('Por favor, llena todos los campos obligatorios.', 'error');
                return;
            }

            const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!regexCorreo.test(correo)) {
                mostrarAlerta('Ingresa un correo electrónico válido.', 'error');
                return;
            }
            const textoExito = `¡Gracias, ${nombre}! Hemos registrado tu solicitud para viajar a ${destino.toUpperCase()} el ${fecha}. Un asesor te contactará pronto.`;
            mostrarAlerta(textoExito, 'exito');
            formularioReserva.reset();
        });
    }

    // Función auxiliar para mostrar las alertas
    function mostrarAlerta(mensaje, tipo) {
        mensajeAlerta.textContent = mensaje;
        
        if (tipo === 'error') {
            mensajeAlerta.classList.remove('exito');
            mensajeAlerta.classList.add('error');
        } else {
            mensajeAlerta.classList.remove('error');
            mensajeAlerta.classList.add('exito');
        }

        setTimeout(() => {
            mensajeAlerta.classList.remove('error', 'exito');
            mensajeAlerta.style.display = 'none';
            setTimeout(() => mensajeAlerta.style.display = '', 100); 
        }, 5000);
    }
    });

// 3. FILTRO DE DESTINOS
    const botonesFiltro = document.querySelectorAll('.boton-filtro');
    const tarjetasDestino = document.querySelectorAll('.tarjeta-destino');

    if (botonesFiltro.length > 0) {
        botonesFiltro.forEach(boton => {
            boton.addEventListener('click', () => {
                botonesFiltro.forEach(b => b.classList.remove('activo'));
                boton.classList.add('activo');

                const filtroSeleccionado = boton.getAttribute('data-filtro');

                tarjetasDestino.forEach(tarjeta => {
                    if (filtroSeleccionado === 'todos') {
                        tarjeta.style.display = 'flex';
                    } else {
                        if (tarjeta.getAttribute('data-categoria') === filtroSeleccionado) {
                            tarjeta.style.display = 'flex';
                        } else {
                            tarjeta.style.display = 'none';
                        }
                    }
                });
            });
        });
    }

    