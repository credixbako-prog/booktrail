BT.screens.home = {
  init: function() {
    this.progressRingContainer = document.getElementById('home-progress-ring');
    if (this.progressRingContainer && BT.ProgressRing) {
      this.ring = new BT.ProgressRing(this.progressRingContainer, 76, 4, '#6D8F7A');
    }
  },
  
  onEnter: function() {
    if (this.ring) {
      this.ring.setProgress(0, false);
      setTimeout(() => {
        this.ring.setProgress(75, true);
      }, 300);
    }
  }
};
