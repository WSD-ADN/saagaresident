const prev = document.querySelector('#prev');
const next = document.querySelector('#next');
const slider = document.querySelector('.slider');
const slide = Array.from(slider.querySelectorAll('.slide'));



let currentSlide = 0;

slide.forEach((slide) => {
  slide.addEventListener('click', (event) => {
    event.stopPropagation();
    slider.dataset.state = slider.dataset.state === 'full' ? 'slides' : 'full';
  });
});



function setSlide(index) {
  if (slide.length === 0) return;

  slide.forEach((slide) => delete slide.dataset.current);
  currentSlide = index;
  slide[index].dataset.current = true;

  slide.forEach((slide, i) => {
    let offset = 0;
    if (i > index) offset = 1;
    else if (i < index) offset = -1;

    slide.style.setProperty('--offset', offset);
  });
}

setSlide(currentSlide);

prev.addEventListener('click', (event) => {
  event.stopPropagation();
  setSlide(currentSlide - 1 < 0 ? slide.length - 1 : currentSlide - 1);
});

next.addEventListener('click', (event) => {
  event.stopPropagation();
  setSlide(currentSlide + 1 >= slide.length ? 0 : currentSlide + 1);
});


