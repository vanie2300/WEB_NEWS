(async function() {
const hero = document.querySelector('.hero');
const trending = document.querySelector('.trending-list');
const grid = document.querySelector('.bottom');
showHeroSkeleton(hero);
showTrendingSkeleton(trending);
showCardSkeletons(grid);
const data = await API.home();
if (!data) {
if (window.setAPIStatus) setAPIStatus(false, 'API unavailable');
hideSkeletons(hero, trending, grid);
if (hero) hero.innerHTML = '<div class="error-state"><div class="error-icon"><svg class="icon-xl"><use href="icons/sprite.svg#icon-alert-triangle"/></svg></div><h3>Unable to Load News</h3><p>Could not connect to the news service.</p><button class="btn btn-primary" onclick="location.reload()">Retry</button></div>';
return;
}
if (window.setAPIStatus) setAPIStatus(true, 'Connected');
if (window.setLastUpdated) setLastUpdated();
hideSkeletons(hero, trending, grid);
if (data.featured) renderHero(data.featured, hero);
renderTrending(data.trending || [], trending);
renderCards(data.latest || [], grid);
if (window.observeReveals) observeReveals();
})();
function showHeroSkeleton(el) {
if (!el) return;
el.innerHTML = '<div class="skeleton skeleton-hero"></div>';
}
function showTrendingSkeleton(el) {
if (!el) return;
el.innerHTML = Array(5).fill('<div class="skeleton skeleton-trending"></div>').join('');
}
function showCardSkeletons(el) {
if (!el) return;
el.innerHTML = Array(4).fill(`<div class="skeleton-card"><div class="skeleton skel-img"></div><div class="skel-body"><div class="skeleton skel-tag"></div><div class="skeleton skel-title"></div><div class="skeleton skel-title2"></div><div class="skeleton skel-desc"></div><div class="skeleton skel-meta"></div></div></div>`).join('');
}
function hideSkeletons(hero, trending, grid) {
if (hero) hero.querySelectorAll('.skeleton').forEach(s => s.remove());
if (trending) trending.querySelectorAll('.skeleton').forEach(s => s.remove());
if (grid) grid.querySelectorAll('.skeleton-card').forEach(s => s.remove());
}
function renderHero(article, el) {
el.innerHTML = `
<img src="${escapeHTML(article.image)}" alt="${escapeHTML(article.title)}" width="900" height="600" loading="eager" onerror="this.src='https://picsum.photos/900/600'">
<div class="hero-overlay">
<span class="hero-badge">${escapeHTML(article.category)}</span>
<h1>${escapeHTML(article.title)}</h1>
<p>${escapeHTML(article.description)}</p>
<a href="article.html?url=${encodeURIComponent(article.url)}">Read More <svg class="icon icon-sm"><use href="icons/sprite.svg#icon-arrow-right"/></svg></a>
</div>`;
}
function renderTrending(articles, el) {
if (!articles.length) { el.innerHTML = '<div class="empty-state"><p>No trending articles</p></div>'; return; }
var frag = document.createDocumentFragment();
articles.forEach(function(a) {
var item = document.createElement('div');
item.className = 'trending-item';
item.tabIndex = 0;
item.setAttribute('role', 'button');
item.setAttribute('onclick', "location.href='article.html?url=" + encodeURIComponent(a.url) + "'");
item.setAttribute('onkeydown', "if(event.key==='Enter')this.click()");
item.innerHTML = '<div><b>' + escapeHTML(a.category) + '</b><p>' + escapeHTML(a.title) + '</p></div>';
frag.appendChild(item);
});
el.innerHTML = '';
el.appendChild(frag);
}
function renderCards(articles, el) {
if (!articles.length) { el.innerHTML = '<div class="empty-state"><p>No articles available</p></div>'; return; }
var frag = document.createDocumentFragment();
articles.forEach(function(a) {
var card = document.createElement('article');
card.className = 'card reveal';
card.tabIndex = 0;
card.setAttribute('role', 'link');
card.setAttribute('onclick', "location.href='article.html?url=" + encodeURIComponent(a.url) + "'");
card.setAttribute('onkeydown', "if(event.key==='Enter')this.click()");
card.innerHTML = '<img class="card-img" src="' + escapeHTML(a.image) + '" alt="' + escapeHTML(a.title) + '" width="300" height="200" loading="lazy" onerror="this.src=\'https://picsum.photos/300/200\'"><div class="card-body"><div class="card-tag">' + escapeHTML(a.category) + '</div><h4 class="card-title">' + escapeHTML(a.title) + '</h4><p class="card-desc">' + escapeHTML(a.description) + '</p><div class="card-meta"><span>' + relativeTime(a.publishedAt) + '</span><span>' + escapeHTML(a.source) + '</span></div></div>';
frag.appendChild(card);
});
el.innerHTML = '';
el.appendChild(frag);
}
