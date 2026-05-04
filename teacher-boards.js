import React from 'https://esm.sh/react@18.2.0';
import { createRoot } from 'https://esm.sh/react-dom@18.2.0/client';
import { Tldraw } from 'https://esm.sh/tldraw@latest?deps=react@18.2.0,react-dom@18.2.0';

const { createElement } = React;
const lessonCards = [...document.querySelectorAll('.lesson-card')];

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'lesson';
}

function makeBoard(card, index) {
  const title = card.querySelector('h3')?.textContent?.trim() || `Lesson section ${index + 1}`;
  const details = document.createElement('details');
  details.className = 'demo-board';
  details.innerHTML = `
    <summary>
      Teacher demo canvas: ${title}
      <span>Expandable infinite whiteboard. Stylus, touch, mouse, pan, zoom, text, shapes, undo, and saved board state are available.</span>
    </summary>
    <div class="demo-board-shell">
      <div class="demo-board-mount" data-board-id="${index}" aria-label="Teacher demo canvas for ${title}"></div>
    </div>
  `;
  card.insertAdjacentElement('afterend', details);

  details.addEventListener('toggle', () => {
    if (!details.open || details.dataset.mounted === 'true') return;
    const mount = details.querySelector('.demo-board-mount');
    try {
      createRoot(mount).render(createElement(Tldraw, {
        persistenceKey: `unit-1-methods-double-lesson-${index}-${slugify(title)}`
      }));
      details.dataset.mounted = 'true';
    } catch (error) {
      mount.innerHTML = '<div class="demo-board-fallback">The whiteboard could not load. Check the internet connection and refresh this page.</div>';
    }
  });
}

lessonCards.forEach(makeBoard);
