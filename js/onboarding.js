const booksData = [
  { id: 1, title: "La Sainte Bible", author: "", gradient: "linear-gradient(135deg, #1A2980 0%, #26D0CE 100%)" },
  { id: 2, title: "Le Petit Prince", author: "Antoine de Saint-Exupéry", gradient: "linear-gradient(135deg, #FFB75E 0%, #ED8F03 100%)" },
  { id: 3, title: "L'Étranger", author: "Albert Camus", gradient: "linear-gradient(135deg, #4b6cb7 0%, #182848 100%)" },
  { id: 4, title: "Les Frères Karamazov", author: "Dostoïevski", gradient: "linear-gradient(135deg, #5C258D 0%, #4389A2 100%)" },
  { id: 5, title: "Méditations", author: "Marc Aurèle", gradient: "linear-gradient(135deg, #3CA55C 0%, #B5AC49 100%)" },
  { id: 6, title: "Les Misérables", author: "Victor Hugo", gradient: "linear-gradient(135deg, #870000 0%, #190A05 100%)" },
  { id: 7, title: "Ainsi parlait Zarathoustra", author: "Nietzsche", gradient: "linear-gradient(135deg, #000000 0%, #e74c3c 100%)" },
  { id: 8, title: "L'Art de la guerre", author: "Sun Tzu", gradient: "linear-gradient(135deg, #114357 0%, #F29492 100%)" },
  { id: 9, title: "Candide", author: "Voltaire", gradient: "linear-gradient(135deg, #1D976C 0%, #93F9B9 100%)" },
  { id: 10, title: "1984", author: "George Orwell", gradient: "linear-gradient(135deg, #141E30 0%, #243B55 100%)" }
];

let selectedBooks = [];
let currentStep = 1;
let dailyGoal = 15;

// DOM Elements
const bookGrid = document.getElementById('bookGrid');
const bookSearch = document.getElementById('bookSearch');
const btnContinue = document.getElementById('btnContinue');
const selectionCounter = document.getElementById('selectionCounter');
const themeTags = document.querySelectorAll('.theme-tag');

// Initialize Book Grid
function renderBooks(filter = "") {
  bookGrid.innerHTML = "";
  booksData.forEach(book => {
    if (book.title.toLowerCase().includes(filter.toLowerCase()) || book.author.toLowerCase().includes(filter.toLowerCase())) {
      const tile = document.createElement('div');
      tile.className = `book-tile ${selectedBooks.find(b => b.id === book.id) ? 'selected' : ''}`;
      tile.style.background = book.gradient;
      tile.innerHTML = `
        <div class="book-tile__title">${book.title}</div>
        <div class="book-tile__overlay">
          <svg class="book-tile__check" viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
      `;
      tile.addEventListener('click', () => toggleBook(book, tile));
      bookGrid.appendChild(tile);
    }
  });
}

function toggleBook(book, tileEl) {
  const index = selectedBooks.findIndex(b => b.id === book.id);
  if (index > -1) {
    selectedBooks.splice(index, 1);
    tileEl.classList.remove('selected');
  } else {
    if (selectedBooks.length < 3) {
      selectedBooks.push(book);
      tileEl.classList.add('selected');
    } else {
      // Shake animation to indicate max reached
      tileEl.style.transform = "translateX(5px)";
      setTimeout(() => tileEl.style.transform = "translateX(-5px)", 50);
      setTimeout(() => tileEl.style.transform = "translateX(5px)", 100);
      setTimeout(() => tileEl.style.transform = "", 150);
    }
  }
  updateCounterAndButton();
}

function updateCounterAndButton() {
  selectionCounter.textContent = `${selectedBooks.length}/3 sélectionnés`;
  if (currentStep === 1) {
    if (selectedBooks.length === 3) {
      btnContinue.classList.add('active');
    } else {
      btnContinue.classList.remove('active');
    }
  }
}

bookSearch.addEventListener('input', (e) => {
  renderBooks(e.target.value);
});

// Step Navigation
btnContinue.addEventListener('click', () => {
  if (currentStep === 1) {
    goToStep(2);
  } else if (currentStep === 2) {
    goToStep(3);
  } else if (currentStep === 3) {
    window.location.href = 'app.html';
  }
});

function goToStep(step) {
  document.getElementById(`step${currentStep}`).classList.remove('active');
  document.getElementById(`step${currentStep}`).classList.add('previous');
  
  currentStep = step;
  
  document.getElementById(`step${currentStep}`).classList.remove('previous');
  document.getElementById(`step${currentStep}`).classList.add('active');
  
  // Update dots
  document.querySelectorAll('.indicator-dot').forEach((dot, idx) => {
    dot.classList.toggle('active', idx + 1 === currentStep);
  });

  if (currentStep === 2) {
    selectionCounter.style.display = 'none';
    btnContinue.classList.add('active'); // Always active on step 2
    btnContinue.textContent = "Continuer";
    initRing();
  }

  if (currentStep === 3) {
    selectionCounter.style.display = 'none';
    btnContinue.textContent = "Commencer mon voyage";
    generateSentier();
  }
}

// Themes selection
themeTags.forEach(tag => {
  tag.addEventListener('click', () => {
    tag.classList.toggle('active');
  });
});

// Daily Goal Ring Logic
const ringContainer = document.getElementById('goalRingContainer');
const ringProgress = document.getElementById('goalProgress');
const ringKnob = document.getElementById('goalKnob');
const goalValDisplay = document.getElementById('goalVal');
let isDragging = false;

function initRing() {
  updateRing(15);
}

function setRingValueFromEvent(e) {
  const rect = ringContainer.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  
  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  const clientY = e.touches ? e.touches[0].clientY : e.clientY;

  const dx = clientX - centerX;
  const dy = clientY - centerY;
  
  let angle = Math.atan2(dy, dx); // in radians
  // Adjust angle so top is 0
  angle += Math.PI / 2;
  if (angle < 0) angle += 2 * Math.PI;

  let percent = angle / (2 * Math.PI);
  
  // map percent to 5-60 min
  let val = Math.round((percent * 55) + 5);
  val = Math.max(5, Math.min(60, Math.round(val / 5) * 5)); // snap to 5 min intervals
  
  updateRing(val);
}

function updateRing(val) {
  dailyGoal = val;
  goalValDisplay.textContent = val;
  
  const percent = (val - 5) / 55;
  const circum = 2 * Math.PI * 100;
  const offset = circum - (percent * circum);
  ringProgress.style.strokeDashoffset = offset;

  const angle = percent * 2 * Math.PI - Math.PI/2;
  const kx = 110 + 100 * Math.cos(angle);
  const ky = 110 + 100 * Math.sin(angle);
  
  ringKnob.setAttribute('cx', kx);
  ringKnob.setAttribute('cy', ky);
}

ringContainer.addEventListener('mousedown', (e) => {
  isDragging = true;
  setRingValueFromEvent(e);
});
document.addEventListener('mousemove', (e) => {
  if (isDragging) setRingValueFromEvent(e);
});
document.addEventListener('mouseup', () => {
  isDragging = false;
});
ringContainer.addEventListener('touchstart', (e) => {
  isDragging = true;
  setRingValueFromEvent(e);
}, {passive: true});
document.addEventListener('touchmove', (e) => {
  if (isDragging) setRingValueFromEvent(e);
}, {passive: true});
document.addEventListener('touchend', () => {
  isDragging = false;
});

// Step 3: Sentier Generation
function generateSentier() {
  const wrapper = document.getElementById('sentierBooksWrapper');
  wrapper.innerHTML = "";
  
  selectedBooks.forEach((book, index) => {
    const el = document.createElement('div');
    const align = index % 2 === 0 ? 'left' : 'right';
    el.className = `sentier-book ${align}`;
    el.innerHTML = `
      <div class="sentier-book-card">
        <div class="sentier-book-title">${book.title}</div>
      </div>
    `;
    wrapper.appendChild(el);
    
    // Stagger animation
    setTimeout(() => {
      el.classList.add('visible');
    }, 600 + index * 400);
  });

  // Animate line
  setTimeout(() => {
    document.getElementById('sentierLine').style.height = "100%";
    createConfetti();
  }, 100);
}

function createConfetti() {
  const colors = ['#6D8F7A', '#D28B3D'];
  for (let i=0; i<30; i++) {
    const c = document.createElement('div');
    c.className = 'confetti';
    c.style.left = Math.random() * 100 + '%';
    c.style.background = colors[Math.floor(Math.random() * colors.length)];
    c.style.animationDelay = Math.random() * 2 + 's';
    document.getElementById('step3').appendChild(c);
  }
}

// Initial Render
renderBooks();
