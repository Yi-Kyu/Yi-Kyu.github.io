const NEWS_URL = 'https://raw.githubusercontent.com/Yi-Kyu/Yi-Kyu.github.io/main/data/news.json';

const FALLBACK_IMAGES = {
  cybersecurity: [
    'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=600&q=80',
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80',
    'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&q=80',
    'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=600&q=80',
    'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600&q=80',
    'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&q=80',
  ],
  development: [
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80',
    'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600&q=80',
    'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600&q=80',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80',
    'https://images.unsplash.com/photo-1607798748738-b15c40d33d57?w=600&q=80',
  ]
};

function getFallback(category, index) {
  const pool = FALLBACK_IMAGES[category] || FALLBACK_IMAGES.cybersecurity;
  return pool[index % pool.length];
}

function timeAgo(dateStr) {
  if (!dateStr) return '';
  const diff = Date.now() - new Date(dateStr).getTime();
  const h = Math.floor(diff / 3600000);
  if (h < 1) return 'Just now';
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

function tagLabel(category) {
  const isCyber = category === 'cybersecurity';
  return `<i class="fas ${isCyber ? 'fa-shield-alt' : 'fa-code'}" style="margin-right:5px;font-size:.7rem;"></i>${isCyber ? 'Cyber' : 'Dev'}`;
}

function renderHero(article) {
  const hero = document.getElementById('news-hero');
  if (!hero) return;
  hero.href = article.link || '#';
  const img = hero.querySelector('img');
  if (img) {
    img.src = article.image || getFallback(article.category, 0);
    img.alt = article.title || 'Featured news';
    img.onerror = () => { img.src = getFallback(article.category, 0); };
  }
  const title = hero.querySelector('.news-hero-title');
  if (title) title.textContent = article.title || '';
  const snippet = hero.querySelector('.news-hero-snippet');
  if (snippet) snippet.textContent = article.summary || '';
}

function renderGrid(articles) {
  const grid = document.getElementById('news-grid');
  if (!grid) return;
  grid.innerHTML = articles.map((a, i) => {
    const imgSrc = a.image || getFallback(a.category, i + 1);
    return `
      <a class="news-card" href="${a.link || '#'}" target="_blank" rel="noopener noreferrer">
        <img src="${imgSrc}" alt="${a.title || ''}" onerror="this.src='${getFallback(a.category, i + 1)}'">
        <div class="news-card-body">
          <span class="news-tag">${tagLabel(a.category)}</span>
          <h3 class="news-card-title">${a.title || ''}</h3>
          <div class="news-card-meta">
            <span>${a.source || ''}</span>
            <span>${timeAgo(a.published)}</span>
          </div>
          <p class="news-card-snippet">${a.summary || ''}</p>
        </div>
      </a>
    `;
  }).join('');
}

async function loadNews() {
  try {
    const res = await fetch(NEWS_URL + '?t=' + Date.now());
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();
    const articles = data.articles || [];
    if (!articles.length) return;
    renderHero(articles[0]);
    renderGrid(articles.slice(1, 7));
  } catch (err) {
    console.error('[home-news]', err);
    const grid = document.getElementById('news-grid');
    if (grid) grid.innerHTML = '<p style="color:rgba(255,0,0,0.5);padding:20px;">Could not load news.</p>';
  }
}

loadNews();
setInterval(loadNews, 30 * 60 * 1000);
