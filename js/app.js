window.BT = window.BT || {};

BT.state = {
  currentScreen: 'home',
  books: [
    { id: 1, title: "L'Étranger", author: "Albert Camus", progress: 42, coverColor: "linear-gradient(135deg, #101c2e, #4a5c78)" },
    { id: 2, title: "La Peste", author: "Albert Camus", progress: 100, coverColor: "linear-gradient(135deg, #456552, #c4e8d0)" },
    { id: 3, title: "Le Mythe de Sisyphe", author: "Albert Camus", progress: 0, coverColor: "linear-gradient(135deg, #2c1600, #b77528)" },
    { id: 4, title: "1984", author: "George Orwell", progress: 100, coverColor: "linear-gradient(135deg, #ba1a1a, #ffdad6)" },
    { id: 5, title: "Dune", author: "Frank Herbert", progress: 12, coverColor: "linear-gradient(135deg, #d28b3d, #f2ede3)" },
    { id: 6, title: "Fahrenheit 451", author: "Ray Bradbury", progress: 100, coverColor: "linear-gradient(135deg, #101c2e, #ffdcbe)" },
    { id: 7, title: "Brave New World", author: "Aldous Huxley", progress: 100, coverColor: "linear-gradient(135deg, #6d8f7a, #c7ebd3)" },
    { id: 8, title: "Foundation", author: "Isaac Asimov", progress: 5, coverColor: "linear-gradient(135deg, #0f1b2d, #bbc7df)" },
    { id: 9, title: "Neuromancer", author: "William Gibson", progress: 0, coverColor: "linear-gradient(135deg, #32302a, #c5c6cd)" }
  ],
  timeline: [
    { year: 2024, items: [
      { id: 1, title: "L'Étranger", author: "Albert Camus", date: "Août 2024", coverColor: "linear-gradient(135deg, #101c2e, #4a5c78)", side: "left" },
      { id: 5, title: "Dune", author: "Frank Herbert", date: "Juin 2024", coverColor: "linear-gradient(135deg, #d28b3d, #f2ede3)", side: "right" }
    ]},
    { year: 2023, items: [
      { id: 4, title: "1984", author: "George Orwell", date: "Décembre 2023", coverColor: "linear-gradient(135deg, #ba1a1a, #ffdad6)", side: "left" },
      { id: 2, title: "La Peste", author: "Albert Camus", date: "Octobre 2023", coverColor: "linear-gradient(135deg, #456552, #c4e8d0)", side: "right" }
    ]}
  ]
};

BT.init = function() {
  BT.router.init();
  if (BT.screens.home) BT.screens.home.init();
  if (BT.screens.session) BT.screens.session.init();
  if (BT.screens.library) BT.screens.library.init();
  if (BT.screens.profile) BT.screens.profile.init();
  if (BT.navigation) BT.navigation.init();
};

BT.router = {
  init: function() {
    window.addEventListener('hashchange', this.handleHashChange.bind(this));
    if(!window.location.hash) {
      window.location.hash = '#home';
    } else {
      this.handleHashChange();
    }
  },
  
  handleHashChange: function() {
    const hash = window.location.hash.substring(1) || 'home';
    this.navigate(hash);
  },
  
  navigate: function(screenId) {
    BT.state.currentScreen = screenId;
    
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
      screen.classList.remove('active');
      setTimeout(() => screen.classList.remove('visible'), 50);
    });
    
    // Show target screen
    const target = document.getElementById(`screen-${screenId}`);
    if (target) {
      target.classList.add('active');
      // small delay to allow display:block to apply before animating opacity
      setTimeout(() => target.classList.add('visible'), 50);
      
      // Update nav if exists
      if (BT.navigation) BT.navigation.updateActive(screenId);
      
      // Screen specific enter hooks
      if (BT.screens[screenId] && BT.screens[screenId].onEnter) {
        BT.screens[screenId].onEnter();
      }

      // Hide/show FAB and Appbar based on screen
      const fab = document.getElementById('fab-scanner');
      const appBar = document.getElementById('app-bar');
      const bottomNav = document.getElementById('bottom-nav');
      
      if (screenId === 'library') {
        fab.style.display = 'flex';
      } else {
        fab.style.display = 'none';
      }

      if (screenId === 'session') {
        appBar.style.display = 'none';
        bottomNav.style.display = 'none';
      } else {
        appBar.style.display = 'flex';
        bottomNav.style.display = 'flex';
      }
    }
  }
};

BT.screens = {};
