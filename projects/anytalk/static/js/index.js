$(document).ready(function() {
  $(".navbar-burger").click(function() {
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
  });

  (function() {
    var slider = document.getElementById('results-slider');
    if (!slider) return;
    var slidesContainer = slider.querySelector('.slides');
    var prevBtn = slider.querySelector('.control.prev');
    var nextBtn = slider.querySelector('.control.next');
    var originalSlides = Array.from(slidesContainer.querySelectorAll('.slide'));
    var n = originalSlides.length;
    if (n === 0) return;

    var firstClone = originalSlides[0].cloneNode(true);
    var lastClone = originalSlides[n - 1].cloneNode(true);
    slidesContainer.appendChild(firstClone);
    slidesContainer.insertBefore(lastClone, slidesContainer.firstChild);

    var slides = slidesContainer.querySelectorAll('.slide');
    var index = 1;

    slidesContainer.style.transition = 'transform 0.35s ease-in-out';
    slidesContainer.style.transform = 'translateX(-100%)';

    function refreshControls(slide) {
      if (!slide) return;
      var video = slide.querySelector('video');
      if (!video || video.dataset.controlsFixed) return;
      var fresh = video.cloneNode(true);
      fresh.dataset.controlsFixed = '1';
      video.parentNode.replaceChild(fresh, video);
      fresh.load();
    }

    function goTo(i) {
      slidesContainer.style.transform = 'translateX(' + (-i * 100) + '%)';
      index = i;
      slides.forEach(function(s, si) {
        var v = s.querySelector('video');
        if (!v) return;
        if (si !== index) {
          try { v.pause(); v.currentTime = 0; } catch (e) {}
        }
      });
    }

    if (nextBtn) nextBtn.addEventListener('click', function() { goTo(index + 1); });
    if (prevBtn) prevBtn.addEventListener('click', function() { goTo(index - 1); });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowLeft') goTo(index - 1);
      if (e.key === 'ArrowRight') goTo(index + 1);
    });

    slidesContainer.addEventListener('transitionend', function() {
      if (index === 0) {
        slidesContainer.style.transition = 'none';
        index = n;
        slidesContainer.style.transform = 'translateX(' + (-index * 100) + '%)';
        void slidesContainer.offsetWidth;
        slidesContainer.style.transition = 'transform 0.35s ease-in-out';
      } else if (index === n + 1) {
        slidesContainer.style.transition = 'none';
        index = 1;
        slidesContainer.style.transform = 'translateX(' + (-index * 100) + '%)';
        void slidesContainer.offsetWidth;
        slidesContainer.style.transition = 'transform 0.35s ease-in-out';
      }
      refreshControls(slides[index]);
    });

    slides.forEach(function(s) {
      var v = s.querySelector('video');
      if (!v) return;
      try { v.pause(); v.currentTime = 0; } catch (e) {}
    });
  })();
});
