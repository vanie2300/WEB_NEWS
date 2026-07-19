(async function() {
const name = getParam('name') || 'world';
const titleEl = document.getElementById('category-title');
const descEl = document.getElementById('category-desc');
const breadcrumbCat = document.getElementById('breadcrumb-cat');
const grid = document.querySelector('.bottom');
const EMOJIS = { technology: 'C', business: 'B', sports: 'S', science: 'Sc', entertainment: 'E', health: 'H', world: 'W' };
const LABELS = { technology: 'Technology', business: 'Business', sports: 'Sports', science: 'Science', entertainment: 'Entertainment', health: 'Health', world: 'World' };
const iconMap = { technology: 'icon-cpu', business: 'icon-trending-up', sports: 'icon-trophy', science: 'icon-flask', entertainment: 'icon-film', health: 'icon-heart-pulse', world: 'icon-globe' };
const iconId = iconMap[name] || 'icon-newspaper';
const label = LABELS[name] || name.charAt(0).toUpperCase() + name.slice(1);
if (titleEl) titleEl.innerHTML = '<svg class="icon icon-lg" style="vertical-align:middle;margin-right:var(--spacing-sm)"><use href="icons/sprite.svg#' + iconId + '"/></svg>' + label;
if (descEl) descEl.textContent = `Latest ${label.toLowerCase()} news and headlines`;
if (breadcrumbCat) breadcrumbCat.textContent = label;
document.title = `${label} - NewsSphere`;
document.querySelectorAll('.nav a').forEach(a => {
const param = new URL(a.href, location.origin).searchParams.get('name');
a.classList.toggle('active', param === name);
});
if (grid) grid.innerHTML = Array(6).fill(`<div class="skeleton-card"><div class="skeleton skel-img"></div><div class="skel-body"><div class="skeleton skel-tag"></div><div class="skeleton skel-title"></div><div class="skeleton skel-desc"></div><div class="skeleton skel-meta"></div></div></div>`).join('');
const data = await API.category(name);
if (grid) grid.querySelectorAll('.skeleton-card').forEach(s => s.remove());
if (!data || !data.articles) {
if (grid) grid.innerHTML = '<div class="empty-state"><div class="empty-icon"><svg class="icon-xl"><use href="icons/sprite.svg#icon-newspaper"/></svg></div><p>No articles found in this category</p><button class="btn btn-primary" onclick="location.reload()">Retry</button></div>';
return;
}
var allArticles = data.articles;
var currentSort = 'newest';
function render(articles) {
if (!articles.length) { grid.innerHTML = '<div class="empty-state"><div class="empty-icon"><svg class="icon-xl"><use href="icons/sprite.svg#icon-newspaper"/></svg></div><p>No articles found in this category</p></div>'; return; }
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
grid.innerHTML = '';
grid.appendChild(frag);
if (window.observeReveals) observeReveals();
}
render(allArticles);
var sortDropdown = document.getElementById('sort-dropdown');
if (sortDropdown) sortDropdown.addEventListener('dropdown-select', function(e) {
currentSort = e.detail.value;
var sorted = allArticles.slice();
sorted.sort((a, b) => {
var da = new Date(a.publishedAt).getTime() || 0;
var db = new Date(b.publishedAt).getTime() || 0;
return currentSort === 'oldest' ? da - db : db - da;
});
render(sorted);
});
})();
