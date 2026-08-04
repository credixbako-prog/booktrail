BT.screens.profile = {
  init: function() {
    this.counters = document.querySelectorAll('.counter');
  },
  
  onEnter: function() {
    this.animateCounters();
  },
  
  animateCounters: function() {
    this.counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const duration = 1500;
      const steps = 30;
      const stepTime = duration / steps;
      let current = 0;
      const inc = target / steps;
      
      const timer = setInterval(() => {
        current += inc;
        if (current >= target) {
          counter.textContent = target;
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current);
        }
      }, stepTime);
    });
  }
};
