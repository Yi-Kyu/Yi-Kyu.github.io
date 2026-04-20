// home-news.js
// Reemplaza TU-USUARIO y TU-REPO con los datos reales de tu repo
const NEWS_URL =
  'https://raw.githubusercontent.com/Yi-Kyu/Yi-Kyu.github.io/main/data/news.json';

const PLACEHOLDER_IMG =
  'https://placehold.co/900x480/0a0a0a/ff0000?text=CyberNews';

function timeAgo(dateStr) {
  if (!dateStr) return '';
  const diff = Date.now() - new Date(dateStr).getTime();
  const h = Math.floor(diff / 3600000);
  if (h < 1) return 'Just now';
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

function tagLabel(category) {
  return category === 'cybersecurity' ? '🔒 Cyber' : '💻 Dev';
}

function renderHero(article) {
  const hero = document.getElementById('news-hero');
  if (!hero) return;

  hero.href = article.link || '#';

  const img = hero.querySelector('img');
  if (img) {
    img.src = article.image || PLACEHOLDER_IMG;
    img.alt = article.title || 'Featured news';
  }

  const title = hero.querySelector('.news-hero-title');
  if (title) title.textContent = article.title || '';

  const snippet = hero.querySelector('.news-hero-snippet');
  if (snippet) snippet.textContent = article.summary || '';
}

function renderGrid(articles) {
  const grid = document.getElementById('news-grid');
  if (!grid) return;

  grid.innerHTML = articles.map(a => `
    <a class="news-card" href="${a.link || '#'}" target="_blank" rel="noopener noreferrer">
      <div class="news-card-body">
        <span class="news-tag">${tagLabel(a.category)}</span>
        <h3 class="news-card-title">${a.title || 'No title'}</h3>
        <div class="news-card-meta">
          <span>${a.source || ''}</span>
          <span>${timeAgo(a.published)}</span>
        </div>
        <p class="news-card-snippet">${a.summary || ''}</p>
      </div>
    </a>
  `).join('');
}

async function loadNews() {
  try {
    const res = await fetch(NEWS_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const articles = data.articles || [];

    if (articles.length === 0) {
      document.getElementById('news-grid').innerHTML =
        '<p style="color:rgba(255,255,255,0.4); padding:20px;">No news available right now.</p>';
      return;
    }

    renderHero(articles[0]);
    renderGrid(articles.slice(1, 7)); // 6 cards en el grid

  } catch (err) {
    console.error('[home-news] Error loading news:', err);
    const grid = document.getElementById('news-grid');
    if (grid) grid.innerHTML =
      '<p style="color:rgba(255,0,0,0.5); padding:20px;">Could not load news feed.</p>';
  }
}

loadNews();
// Refresca cada 30 min si el usuario mantiene la página abierta
setInterval(loadNews, 30 * 60 * 1000);