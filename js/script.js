//cargamos la imagen al inicializar la pagina
window.addEventListener('DOMContentLoaded', drawPixelPhoto);

// Definimos la variable enabled para controlar el estado del botón
let enabled = true;



function drawPixelPhoto() {
  const canvas = document.getElementById('pixelCanvas');
  const ctx = canvas.getContext('2d');
  const img = new Image();
  img.src = 'images/foto_perfil.jpeg';

  img.onload = () => {
    const w = 32, h = 32;       // Tamaño reducido para efecto pixel art
    const blockSize = 4;        // Tamaño de cada "píxel" en pantalla

    canvas.width = w * blockSize;
    canvas.height = h * blockSize;

    const offCanvas = document.createElement('canvas');
    offCanvas.width = w;
    offCanvas.height = h;
    const offCtx = offCanvas.getContext('2d');
    offCtx.drawImage(img, 0, 0, w, h);

    const imageData = offCtx.getImageData(0, 0, w, h).data;

    const pixels = [];
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const i = (y * w + x) * 4;
        const r = imageData[i];
        const g = imageData[i + 1];
        const b = imageData[i + 2];
        const a = imageData[i + 3] / 255;
        pixels.push({
          x, y,
          color: `rgba(${r},${g},${b},${a})`
        });
      }
    }

    let i = 0;
    const speed = 2; // milisegundos entre píxeles

    const interval = setInterval(() => {
      if (i >= pixels.length) {
        clearInterval(interval);
        return;
      }
      const p = pixels[i];
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x * blockSize, p.y * blockSize, blockSize, blockSize);
      i++;
    }, speed);
  };
}
//Muestra un dialogo tipo comic abajo de la imagen
function showComicDialog(mensaje) {
  // Crear el diálogo tipo cómic
  const dialog = document.createElement('div');
  dialog.innerText = mensaje;
  dialog.style.position = 'absolute';
  dialog.style.background = '#fff';
  dialog.style.color = '#000';
  dialog.style.padding = '10px';
  dialog.style.borderRadius = '10px';
  dialog.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
  dialog.style.fontFamily = "'Press Start 2P', cursive";
  dialog.style.fontSize = '12px';
  dialog.style.whiteSpace = 'nowrap';

  // Obtenemos el div que contiene el canvas
  const divCanvas = document.getElementById('pixelCanvasContainer');

  // Obtenemos las coordenadas del div
  const rect = divCanvas.getBoundingClientRect();

  // Posicionamos el diálogo centrado horizontalmente y debajo del canvas
  dialog.style.left = `${rect.left + rect.width / 2}px`; // Centrado horizontalmente
  dialog.style.top = `${rect.bottom + 10}px`; // Justo debajo del canvas con un margen de 10px
  dialog.style.transform = 'translateX(-50%)'; // Ajuste para centrar el diálogo

  // Agregamos el diálogo al body
  document.body.appendChild(dialog);

  // Eliminar el diálogo después de 2 segundos
  setTimeout(() => dialog.remove(), 2000);
}

//
function pressSkills(e) {
  if (enabled===true) {
    const carouselContainer = document.createElement('div');
    carouselContainer.id = 'carousel';
    //asd
    

    
    const images = [
        'images/csharp.png',
        'images/python.png',
        'images/js.png',
        'images/powerbi.png',
        'images/powerautomate.png',

    ]; 

    // Mostramos el diálogo tipo cómic
    showComicDialog("I'M GOOD AT THOSE"); 

    let currentIndex = 0;

    const imgElement = document.createElement('img');
    //agregamos una clas a las imagenes para ajustar el tamaño

    
    const prevButton = document.createElement('button');
    prevButton.innerText = '<-';
    prevButton.addEventListener('click', showPreviousImage);
    carouselContainer.appendChild(prevButton);
    //le quitamos la animacion al boton de la izquierda
    prevButton.style.animation = 'none';

    imgElement.classList.add('carousel-image');
    imgElement.src = images[currentIndex];
    imgElement.alt = 'Carousel Image';
    carouselContainer.appendChild(imgElement);


    const nextButton = document.createElement('button');
    nextButton.innerText = '->';
    nextButton.addEventListener('click', showNextImage);
    carouselContainer.appendChild(nextButton);
    //le quitamos la animacion al boton de la derecha
    nextButton.style.animation = 'none';

    const infoDiv = document.getElementById('info');
    infoDiv.appendChild(carouselContainer);

    // el boton queda estatico y le quitamos la animación
    e.target.style.backgroundColor = '#40E0D0';
    e.target.style.animation = 'none';
    enabled = false; // Deshabilitamos el botón para evitar múltiples clics

    function showPreviousImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        imgElement.src = images[currentIndex];
    }

    function showNextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        imgElement.src = images[currentIndex];
    }
    
    }
  else {
    enabledAllButtons();
    eraseInfo();
  }
}

function pressXp(e) {
  


}

function pressProjects(e) {
}

function pressContact(e) {
}

function enabledAllButtons() {
  // Obtenemos todos los botones dentro del div con id 'start'
  const startDiv = document.getElementById('start');
  const buttons = startDiv.querySelectorAll('button');

  // Rehabilitamos todos los botones
  buttons.forEach(button => {
    button.style.backgroundColor = '#000000'; // Fondo negro
    button.style.color = '#FFFFFF'; // Texto blanco

    // Reiniciamos la animación
    button.style.animation = 'none'; // Detenemos la animación
    void button.offsetWidth; // Forzamos un reflujo para reiniciar la animación
    button.style.animation = 'blink 2s infinite'; // Reactivamos la animación
    enabled = true; // Habilitamos el botón
  });
}

function eraseInfo() {
  // Obtenemos el div con id 'info'
  const infoDiv = document.getElementById('info');
  // eliminamos los elementos hijos del div
  while (infoDiv.firstChild) {
    infoDiv.removeChild(infoDiv.firstChild);
  }
}
function pressAboutMe(e) {
  if (enabled===true) {
    // Creamos un párrafo dentro del div con id 'info'
    const infoDiv = document.getElementById('info');
    const aboutMeText = document.createElement('p');
    aboutMeText.innerText = `Professional in administrative engineering and future systems engineer, with knowledge in programming languages and administrative processes such as financial and market-related ones, passionate about research, innovation, new technologies, artificial intelligence, and data analysis, focused on teamwork, with great leadership and continuous learning capacity, being very proactive, with a high sense of responsibility and good interpersonal relationships.
`;
    aboutMeText.id = 'aboutMeText';
    infoDiv.appendChild(aboutMeText);

    // Mostramos el diálogo tipo cómic
    showComicDialog('THAT\'S ME!');

    // el boton queda estatico y le quitamos la animación
    e.target.style.backgroundColor = '#40E0D0';
    e.target.style.animation = 'none';
    enabled = false; // Deshabilitamos el botón para evitar múltiples clics

    //desaparecemos momentaneamente los otros botones

  }
  else {
    enabledAllButtons();
    eraseInfo();
  }
}


function start(e) {
  // Eliminamos el botón presionado
  e.target.remove();

  // Obtenemos el contenedor con el ID 'start'
  const startDiv = document.getElementById('start');

  // Creamos los botones nuevos y le asignamos sus funciones
  const aboutMe = document.createElement('button');
  aboutMe.innerText = 'ABOUT ME';
  aboutMe.onclick = pressAboutMe;
  aboutMe.id = 'aboutMe';


  const skills = document.createElement('button');
  skills.innerText = 'SKILLS';
  skills.onclick = pressSkills;
  skills.id = 'skills';

  const xp = document.createElement('button');
  xp.innerText = 'XP';
  xp.onclick = pressXp;
  xp.id = 'xp';

  const projects = document.createElement('button');
  projects.innerText = 'PROJECTS';
  projects.onclick = pressProjects;
  projects.id = 'projects';

  const contact = document.createElement('button');
  contact.innerText = 'CONTACT';
  contact.onclick = pressContact;
  contact.id = 'contact';

  // Agregamos los botones al contenedor 'start'
  startDiv.appendChild(aboutMe);
  startDiv.appendChild(skills);
  startDiv.appendChild(xp);
  startDiv.appendChild(projects);
  startDiv.appendChild(contact);
}