/* ===== CSS dinamico ===== */
const css = `
body {
    margin: 50px;
    font-family: Arial, Helvetica, sans-serif;
    background: white;
    color: black;
}

nav a {
    margin-right: 25px;
    text-decoration: none;
    color: black;
}

nav a:hover {
    text-decoration: underline;
}

p {
    max-width: 600px;
}

footer {
    margin-top: 100px;
    font-size: 14px;
}

/* ===== Griglia immagini ===== */
.image-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

/* contenitore immagine */
.image-grid .img-wrap {
    width: auto;
    height: 140px;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* immagine */
.image-grid img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    cursor: pointer;
    border: none;
    outline: none;
}

/* ===== Lightbox ===== */
#lightbox {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.85);
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

#lightbox img {
    max-width: 90%;
    max-height: 90%;
    object-fit: contain;
    border: none;
    outline: none;
    transition: opacity 0.2s ease;
}

/* frecce */

.lightbox-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 50px;
    color: white;
    cursor: pointer;
    user-select: none;
    opacity: 0;
    transition: opacity 0.2s;
}

#lightbox:hover .lightbox-arrow {
    opacity: 1;
}

.lightbox-prev {
    left: 40px;
}

.lightbox-next {
    right: 40px;
}
`;

// inserisce CSS
const style = document.createElement('style');
style.textContent = css;
document.head.appendChild(style);


/* ===== WRAP automatico immagini ===== */
document.querySelectorAll('.image-grid img').forEach(img => {
    const wrapper = document.createElement('div');
    wrapper.className = 'img-wrap';
    img.parentNode.insertBefore(wrapper, img);
    wrapper.appendChild(img);
});


/* ===== Lightbox ===== */
let lightbox = document.getElementById('lightbox');

if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    const lbImg = document.createElement('img');
    lightbox.appendChild(lbImg);
    document.body.appendChild(lightbox);
}

const lightboxImg = lightbox.querySelector('img');

document.querySelectorAll('.image-grid img').forEach(img => {
    img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || '';
        lightbox.style.display = 'flex';
    });
});

// chiudi cliccando fuori
lightbox.addEventListener('click', e => {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
    }
});


/* ===== Navigazione immagini ===== */

const images = Array.from(document.querySelectorAll('.image-grid img'));
let currentIndex = 0;

images.forEach((img, index) => {
    img.addEventListener('click', () => {
        currentIndex = index;
    });
});

function showImage(index){

    if(index < 0) index = images.length - 1;
    if(index >= images.length) index = 0;

    currentIndex = index;

    /* animazione cambio */
    lightboxImg.style.opacity = 0;

    setTimeout(()=>{
        lightboxImg.src = images[currentIndex].src;
        lightboxImg.style.opacity = 1;
    },120);
}


/* ===== frecce ===== */

const prev = document.createElement("div");
const next = document.createElement("div");

prev.className = "lightbox-arrow lightbox-prev";
next.className = "lightbox-arrow lightbox-next";

prev.innerHTML = "←";
next.innerHTML = "→";

lightbox.appendChild(prev);
lightbox.appendChild(next);

prev.onclick = (e)=>{
    e.stopPropagation();
    showImage(currentIndex - 1);
};

next.onclick = (e)=>{
    e.stopPropagation();
    showImage(currentIndex + 1);
};


/* ===== tastiera ===== */

document.addEventListener("keydown",(e)=>{

    if(lightbox.style.display !== "flex") return;

    if(e.key === "ArrowRight") showImage(currentIndex + 1);
    if(e.key === "ArrowLeft") showImage(currentIndex - 1);

});


/* ===== swipe telefono ===== */

let startX = 0;

lightbox.addEventListener("touchstart",(e)=>{
    startX = e.touches[0].clientX;
});

lightbox.addEventListener("touchend",(e)=>{

    let endX = e.changedTouches[0].clientX;
    let diff = startX - endX;

    if(Math.abs(diff) > 50){

        if(diff > 0){
            showImage(currentIndex + 1);
        }else{
            showImage(currentIndex - 1);
        }

    }

});
