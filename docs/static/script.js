// ------------------------------------------------------------------------

let grid = document.querySelector('.masonry-grid');

let msnry = new Masonry(grid, {
  itemSelector: '.masonry-grid-item',
  percentPosition: true
});

imagesLoaded(grid).on('progress', function () {
  // layout Masonry after each image loads
  msnry.layout();
});


// ------------------------------------------------------------------------
// Animate on Scroll

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log("Reveal", entry, entry.isIntersecting);
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal');
    } else {
      entry.target.classList.remove('reveal');
    }
  });
});

const hiddenElements = document.querySelectorAll('.reveal-on-scroll');
hiddenElements.forEach((element) => observer.observe(element));

// ------------------------------------------------------------------------
// Proximity Hover effect
// On Fish eyes in Description page

try {
  if (document.getElementById('fishEye')) {

    document.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const anchor = document.getElementById('fishBody')
      const rekt = anchor.getBoundingClientRect();
      const anchorX = rekt.left + rekt.width / 2;
      const anchorY = rekt.top + rekt.height / 2;

      const angleDeg = angle(mouseX, mouseY, anchorX, anchorY);

      const eye = document.getElementById('fishEye')
      eye.style.transform = `rotate(${60 + angleDeg}deg)`
    });

  }
} catch (error) { }

function angle(cx, cy, ex, ey) {
  const dy = ey - cy;
  const dx = ex - cx;

  const rad = Math.atan2(dy, dx); // range (-PI, PI]
  const deg = rad * 180 / Math.PI; // rads to degs, range(-180, 180]

  return deg;
}

// ------------------------------------------------------------------------
// Modals

var myModal = document.getElementById('myModal')
var myInput = document.getElementById('myInput')

myModal.addEventListener('shown.bs.modal', function () {
  myInput.focus()
})

// ------------------------------------------------------------------------
//Get the button
let mybutton = document.getElementById("btn-back-to-top");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 20 ||
    document.documentElement.scrollTop > 20
  ) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}
// When the user clicks on the button, scroll to the top of the document
mybutton.addEventListener("click", backToTop);

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// ------------------------------------------------------------------------
