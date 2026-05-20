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

    // 2. VALIDACIÓN DEL FORMULARIO
    const formulario = document.getElementById('formulario-contacto');
    const mensajeAlerta = document.getElementById('mensaje-alerta');

    if(formulario) {
        formulario.addEventListener('submit', function(evento) {
            evento.preventDefault();
            const nombre = document.getElementById('nombre').value;
            const correo = document.getElementById('correo').value;
            const mensaje = document.getElementById('mensaje').value;

            if(nombre === '' || correo === '' || mensaje === '') {
                mensajeAlerta.textContent = 'Por favor, llena todos los campos.';
                mensajeAlerta.style.color = 'red';
                return;
            }
            const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!regexCorreo.test(correo)) {
                mensajeAlerta.textContent = 'Ingresa un correo electrónico válido.';
                mensajeAlerta.style.color = 'red';
                return;
            }

            mensajeAlerta.textContent = '¡Solicitud enviada correctamente!';
            mensajeAlerta.style.color = 'green';
            formulario.reset();
        });
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

    