// <----- SCROLL AUTOMÁTICO CON LOS BOTONES DEL HEADER ----->
window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  header.classList.toggle('scrolled', window.scrollY > 20);
});

// <----- EFECTO DE APARECER AL HACER SCROLL -----> 
const elementos = document.querySelectorAll('.reveal');

function revelarAlScroll() {
  const trigger = window.innerHeight * 0.85;
  elementos.forEach(el => {
    if (el.getBoundingClientRect().top < trigger) {
      el.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', revelarAlScroll);
window.addEventListener('load', revelarAlScroll);

// <----- MODAL DE VER IMÁGENES COMPLETAS -----> 
document.querySelectorAll('.ver-imagen').forEach(boton => {
  boton.addEventListener('click', e => {
    e.preventDefault();
    const src = boton.getAttribute('data-src');
    document.getElementById('imagenAmpliada').src = src;
    document.getElementById('modalImagen').style.display = 'flex';
  });
});

document.querySelector('.cerrar').addEventListener('click', () => {
  document.getElementById('modalImagen').style.display = 'none';
});

document.getElementById('modalImagen').addEventListener('click', e => {
  if (e.target.id === 'modalImagen') e.target.style.display = 'none';
});


// <----- MODAL DE REDES SOCIALES ABAJO DEL TYPEWRITER -----> 
const btnRedes = document.getElementById('btnRedes');
const modalRedes = document.getElementById('modalRedes');
const cerrarRedes = document.querySelector('.cerrar-redes');

btnRedes.addEventListener('click', () => {
  modalRedes.classList.remove('oculto');
});

cerrarRedes.addEventListener('click', () => {
  modalRedes.classList.add('oculto');
});

modalRedes.addEventListener('click', e => {
  if (e.target.id === 'modalRedes') modalRedes.classList.add('oculto');
});

// <----- MENÚ HAMBURGUESA MÓVIL RESPONSIVE -----> 
const toggleBtn = document.getElementById('menu-toggle');
const menuOverlay = document.getElementById('menu-overlay');
const closeBtn = document.getElementById('close-menu');

toggleBtn.addEventListener('click', () => {
  menuOverlay.classList.add('activo');
});

closeBtn.addEventListener('click', () => {
  menuOverlay.classList.remove('activo');
});

document.querySelectorAll('.menu-overlay .nav__item a').forEach(link => {
  link.addEventListener('click', () => {
    menuOverlay.classList.remove('activo');
  });
});

// <----- EFECTO TYPEWRITER -----> 
const frases = [
  "Desarrollador full-stack",
  "Gamer",
  "Apasionado por la tecnología",
];

let i = 0, j = 0, escribiendo = true;
const textoElemento = document.getElementById("typewriter-text");

function efectoTypewriter() {
  const fraseActual = frases[i];
  
  textoElemento.textContent = escribiendo
  ? fraseActual.slice(0, j++)
  : fraseActual.slice(0, j--);
  
  if (escribiendo && j > fraseActual.length) {
    escribiendo = false;
    setTimeout(efectoTypewriter, 1800);
    return;
  }

  if (!escribiendo && j === 0) {
    escribiendo = true;
    i = (i + 1) % frases.length;
  }

  setTimeout(efectoTypewriter, escribiendo ? 100 : 50);
}

document.addEventListener("DOMContentLoaded", efectoTypewriter);

// <----- FORMULARIO DE CONTACTO -----> 
const form = document.getElementById('form-contacto');

form.addEventListener('submit', async function (e) {
  e.preventDefault();
  const datos = new FormData(form);
  const url = form.getAttribute('action');

  try {
    const respuesta = await fetch(url, {
      method: 'POST',
      body: datos,
      headers: { 'Accept': 'application/json' }
    });

    if (respuesta.ok) {
      mostrarNotificacion('¡Gracias por tu mensaje! Te responderé pronto.', 'exito');
      form.reset();
    } else throw new Error();
  } catch {
    mostrarNotificacion('Hubo un error al enviar tu mensaje. Intentá nuevamente.', 'error');
  }
});

function mostrarNotificacion(mensaje, tipo) {
  const noti = document.createElement('div');
  noti.className = `notificacion-fija ${tipo}`;
  noti.textContent = mensaje;
  document.body.appendChild(noti);
  setTimeout(() => {
    noti.style.transition = 'opacity 0.5s ease';
    noti.style.opacity = '0';
    setTimeout(() => noti.remove(), 500);
  }, 6000);
}