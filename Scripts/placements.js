document.addEventListener("DOMContentLoaded", () => {
  /* ================= SMOOTH COUNTER LOGIC ================= */
  const startCounters = () => {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
      const target = parseFloat(counter.getAttribute('data-target'));
      const decimals = parseInt(counter.getAttribute('data-decimals')) || 0;
      const duration = 2500; // Total time 2.5s for a more elegant feel
      const startTime = performance.now();

      const update = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Cubic Easing function (easeOutCubic)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentVal = target * easeOut;

        counter.innerText = currentVal.toFixed(decimals);

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          counter.innerText = target.toFixed(decimals);
        }
      };

      requestAnimationFrame(update);
    });
  };

  /* ================= INTERSECTION OBSERVER ================= */
  const statsSection = document.getElementById('placement-stats');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Adding a slight delay before start for visual impact
        setTimeout(startCounters, 200);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });

  if (statsSection) {
    observer.observe(statsSection);
  }
});