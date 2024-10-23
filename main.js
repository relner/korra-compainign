window.onload = function() {
    animateCardWrqpper();
    animateCardArrowWrqpper();
    animateMobileCardArrowWrqpper();
};


window.addEventListener('scroll', function() {
    onCounterScroll();
    onScroll();
});

function animateCounter(id, target) {
  const element = document.getElementById(id);
  let start = 0;
  const duration = 10000; // Продолжительность анимации в миллисекундах
  const increment = target / (duration / 100); // Увеличение числа за каждую итерацию

  const animate = () => {
      start += increment;
      if (start >= target) {
          element.innerText = target;
      } else {
          element.innerText = Math.floor(start);
          requestAnimationFrame(animate);
      }
  };

  animate();
}

function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function onCounterScroll() {
  const counter1 = document.getElementById('counter1');
  const counter2 = document.getElementById('counter2');

  if (isElementInViewport(counter1) && counter1.innerText == '0') {
      animateCounter('counter1', 25);
  }
  if (isElementInViewport(counter2) && counter2.innerText == '0') {
      animateCounter('counter2', 30);
  }
}

function animateCardWrqpper() {
  var observer = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
          if (entry.isIntersecting) {
              observer.unobserve(entry.target); 
              animateCard(entry.target);
          }
      });
  }, { threshold: 0.1 });

  document.querySelectorAll('.card').forEach(function (card) {
      observer.observe(card);
  });

}

function animateCard(card) {
  const animationDuration = 0.4; 
  const delay = 0.1; 
  const cards = document.querySelectorAll('.card');
  let index = Array.from(cards).indexOf(card);
  card.style.transition = `opacity ${animationDuration}s, transform ${animationDuration}s`;
  card.style.transitionDelay = `${index * delay}s`;
  card.classList.add('visible');
}

function animateCardArrowWrqpper() {
  var observer = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
          if (entry.isIntersecting) {
              observer.unobserve(entry.target); 
              animateArrowCard(entry.target);
          }
      });
  }, { threshold: 0.1 });

  document.querySelectorAll('.cardArrow').forEach(function (card) {
    observer.observe(card);
});
}

function animateArrowCard(card) {
  const animationDuration = 0.4; 
  const delay = 0.2; 
  const cards = document.querySelectorAll('.cardArrow');
  let index = Array.from(cards).indexOf(card);
  card.style.transition = `opacity ${animationDuration}s, transform ${animationDuration}s`;
  card.style.transitionDelay = `${index * delay}s`;
  card.classList.add('visible');
}

function animateMobileCardArrowWrqpper() {
  var observer = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
          if (entry.isIntersecting) {
              observer.unobserve(entry.target); 
              animateMobileArrowCard(entry.target);
          }
      });
  }, { threshold: 0.1 });

  document.querySelectorAll('.cardMobileArrow').forEach(function (card) {
    observer.observe(card);
});
}

function animateMobileArrowCard(card) {
  const animationDuration = 0.4; 
  const delay = 0.2; 
  const cards = document.querySelectorAll('.cardMobileArrow');
  let index = Array.from(cards).indexOf(card);
  card.style.transition = `opacity ${animationDuration}s, transform ${animationDuration}s`;
  card.style.transitionDelay = `${index * delay}s`;
  card.classList.add('visible');
}

let animationStarted = false;

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function animateScroll(element, to, duration) {
    const start = element.scrollLeft;
    const change = to - start;
    const increment = 15;
    let currentTime = 0;

    const animate = () => {
        currentTime += increment;
        const val = Math.linearTween(currentTime, start, change, duration);
        element.scrollLeft = val;
        if (currentTime < duration) {
            setTimeout(animate, increment);
        }
    };
    animate();
}

Math.linearTween = (t, b, c, d) => {
    return c * t / d + b;
};

function onScroll() {
    const carousel = document.getElementById('logos-carusel');
    if (isElementInViewport(carousel) && !animationStarted) {
        animationStarted = true;
        animateScroll(carousel, carousel.scrollWidth - carousel.clientWidth, 5000); // 5 seconds duration
    }
}
