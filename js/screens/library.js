BT.screens.library = {
  init: function() {
    this.toggleCtrl = document.getElementById('library-toggle');
    this.viewGrid = document.getElementById('view-library-grid');
    this.viewSentier = document.getElementById('view-sentier');
    this.gridContainer = document.getElementById('library-grid-container');
    this.sentierContainer = document.getElementById('sentier-container');
    
    if (this.toggleCtrl) {
      const btns = this.toggleCtrl.querySelectorAll('button');
      btns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          const index = e.target.getAttribute('data-index');
          this.toggleCtrl.setAttribute('data-active', index);
          btns.forEach(b => b.classList.remove('active'));
          e.target.classList.add('active');
          
          if (index === '0') {
            this.viewGrid.style.display = 'block';
            this.viewSentier.style.display = 'none';
          } else {
            this.viewGrid.style.display = 'none';
            this.viewSentier.style.display = 'block';
            if (BT.Timeline) BT.Timeline.init(this.sentierContainer);
          }
        });
      });
    }
    
    this.renderGrid();
    this.renderSentier();
  },
  
  renderGrid: function() {
    if (!this.gridContainer) return;
    this.gridContainer.innerHTML = '';
    
    BT.state.books.forEach((book, idx) => {
      const delay = (idx % 3) + 1;
      const html = `
        <div class="library-book anim-fade-up delay-${delay}">
          <div class="library-book__cover" style="background: ${book.coverColor};">
            <div style="position: absolute; bottom: 8px; left: 8px; color: white; font-family: 'Playfair Display'; font-size: 11px; font-weight: bold; width: 80%;">${book.title}</div>
          </div>
          <div class="library-book__progress">
            <div class="library-book__progress-fill" style="width: ${book.progress}%;"></div>
          </div>
          <div class="library-book__title">${book.title}</div>
        </div>
      `;
      this.gridContainer.insertAdjacentHTML('beforeend', html);
    });
  },
  
  renderSentier: function() {
    if (!this.sentierContainer) return;
    // Keep axis
    const axis = this.sentierContainer.querySelector('.sentier__axis');
    this.sentierContainer.innerHTML = '';
    if (axis) this.sentierContainer.appendChild(axis);
    
    BT.state.timeline.forEach(yearGroup => {
      const yearHtml = `
        <div class="sentier__year">
          <span class="sentier__year-label">${yearGroup.year}</span>
        </div>
      `;
      this.sentierContainer.insertAdjacentHTML('beforeend', yearHtml);
      
      yearGroup.items.forEach(item => {
        const footprintHtml = item.side === 'left' ? 
          `<div class="sentier__footprint" style="top: 120px; left: calc(50% + 20px);">
             <svg viewBox="0 0 24 24"><path d="M12 2c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z" stroke-width="1" stroke="currentColor" fill="none"></path><circle cx="12" cy="12" r="3" fill="currentColor"></circle></svg>
           </div>` : 
          `<div class="sentier__footprint" style="top: 120px; left: calc(50% - 20px);">
             <svg viewBox="0 0 24 24"><path d="M12 2c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z" stroke-width="1" stroke="currentColor" fill="none"></path><circle cx="12" cy="12" r="3" fill="currentColor"></circle></svg>
           </div>`;
           
        const nodeHtml = `
          <div class="sentier__node sentier__node--${item.side}">
            <div class="sentier__node-dot"></div>
            <div class="sentier__node-content">
              <div class="sentier__node-book card-flip-container" onclick="BT.CardFlip.toggle(this)">
                <div class="card-flip-inner">
                  <div class="card-flip-front" style="display:flex; gap:12px;">
                    <div class="book-cover book-cover--sm" style="background: ${item.coverColor}; flex-shrink:0;"></div>
                    <div class="sentier__node-book-info">
                      <div class="sentier__node-book-title">${item.title}</div>
                      <div class="sentier__node-book-author">${item.author}</div>
                      <div class="sentier__node-date">${item.date}</div>
                    </div>
                  </div>
                  <div class="card-flip-back">
                    <p style="font-size:12px; font-family:'Playfair Display'; font-style:italic; color:var(--color-bleu-nuit);">"Trace capturée."</p>
                  </div>
                </div>
              </div>
            </div>
            ${footprintHtml}
          </div>
        `;
        this.sentierContainer.insertAdjacentHTML('beforeend', nodeHtml);
      });
    });
  },
  
  onEnter: function() {
    const fills = this.gridContainer.querySelectorAll('.library-book__progress-fill');
    fills.forEach(fill => {
      const target = fill.style.width;
      fill.style.width = '0%';
      setTimeout(() => fill.style.width = target, 100);
    });
  }
};
