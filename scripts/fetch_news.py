import feedparser, json, os, re
from datetime import datetime

FEEDS = [
    {"url": "https://feeds.feedburner.com/TheHackersNews",  "category": "cybersecurity"},
    {"url": "https://www.bleepingcomputer.com/feed/",        "category": "cybersecurity"},
    {"url": "https://krebsonsecurity.com/feed/",             "category": "cybersecurity"},
    {"url": "https://hnrss.org/frontpage",                   "category": "development"},
    {"url": "https://dev.to/feed",                           "category": "development"},
    {"url": "https://css-tricks.com/feed/",                  "category": "development"},
]

def extract_image(entry):
    for key in ['media_thumbnail', 'media_content']:
        media = entry.get(key)
        if media and isinstance(media, list) and media[0].get('url'):
            return media[0]['url']
    for enc in entry.get('enclosures', []):
        if enc.get('type', '').startswith('image'):
            return enc.get('href', '')
    raw = entry.get('summary', '') or ''
    m = re.search(r'<img[^>]+src=["\']([^"\']+)["\']', raw)
    return m.group(1) if m else ''

def clean(text):
    return re.sub(r'<[^>]+>', '', text or '').strip()[:220]

articles = []
for f in FEEDS:
    try:
        feed = feedparser.parse(f["url"])
        for e in feed.entries[:5]:
            articles.append({
                "title":     clean(e.get("title", "No title")),
                "link":      e.get("link", "#"),
                "summary":   clean(e.get("summary", "")),
                "image":     extract_image(e),
                "published": e.get("published", ""),
                "source":    feed.feed.get("title", "Unknown"),
                "category":  f["category"]
            })
    except Exception as ex:
        print(f"Error with {f['url']}: {ex}")

os.makedirs("data", exist_ok=True)
with open("data/news.json", "w", encoding="utf-8") as fp:
    json.dump({
        "updated": datetime.utcnow().isoformat() + "Z",
        "articles": articles
    }, fp, ensure_ascii=False, indent=2)

print(f"✅ {len(articles)} articles saved to data/news.json")
