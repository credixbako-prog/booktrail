BT.screens.session = {
  init: function() {
    this.timerDisplay = document.getElementById('timer-display');
    this.btnDictaphone = document.getElementById('btn-dictaphone');
    this.pageInput = document.getElementById('page-input');
    
    this.startTime = Date.now() - (24 * 60 * 1000 + 18 * 1000); // Mock starting at 24:18
    this.interval = null;
    this.isRecording = false;
    
    if (this.btnDictaphone) {
      this.btnDictaphone.addEventListener('click', this.toggleRecording.bind(this));
    }
    
    const ringContainer = document.getElementById('session-progress-ring');
    if (ringContainer && BT.ProgressRing) {
      this.ring = new BT.ProgressRing(ringContainer, 136, 4, '#6D8F7A');
    }
    
    const waveCanvas = document.getElementById('wave-canvas');
    if (waveCanvas && BT.WaveVisualizer) {
      this.wave = new BT.WaveVisualizer(waveCanvas);
    }
    
    const dialContainer = document.getElementById('rotary-dial-container');
    if (dialContainer && BT.RotaryDial) {
      this.dial = new BT.RotaryDial(dialContainer, (val) => {
        if(this.pageInput) this.pageInput.value = val;
      });
      this.dial.setValue(parseInt(this.pageInput.value) || 0);
    }
  },
  
  onEnter: function() {
    this.startTimer();
    if (this.ring) {
      this.ring.setProgress(0, false);
      setTimeout(() => {
        this.ring.setProgress(65, true);
      }, 500);
    }
  },
  
  startTimer: function() {
    if (this.interval) clearInterval(this.interval);
    this.interval = setInterval(() => {
      const diff = Date.now() - this.startTime;
      const minutes = Math.floor(diff / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      if (this.timerDisplay) {
        this.timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      }
    }, 1000);
  },
  
  toggleRecording: function() {
    this.isRecording = !this.isRecording;
    if (this.isRecording) {
      this.btnDictaphone.classList.add('recording');
      if (this.wave) this.wave.start();
    } else {
      this.btnDictaphone.classList.remove('recording');
      if (this.wave) this.wave.stop();
    }
  }
};
