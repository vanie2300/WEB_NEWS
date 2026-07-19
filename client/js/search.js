(async function() {
const input = document.getElementById('main-search');
const headerInput = document.getElementById('header-search');
const countEl = document.querySelector('.search-results-count');
const grid = document.querySelector('.search-grid');
const sortDropdown = document.getElementById('search-sort-dropdown');
const query = getParam('q') || '';
var allResults = [];
if (headerInput && query) headerInput.value = query;
if (input) {
input.value = query;
if (query) await doSearch(query);
input.addEventListener('input', debounce(async () => {
const q = input.value.trim();
if (q.length < 2) {
if (countEl) countEl.textContent = '';
if (grid) grid.innerHTML = '';
return;
}
await doSearch(q);
}, 400));
}
if (sortDropdown) sortDropdown.addEventListener('dropdown-select', function(e) {
var sorted = allResults.slice();
sorted.sort((a, b) => {
var da = new Date(a.publishedAt).getTime() || 0;
var db = new Date(b.publishedAt).getTime() || 0;
return e.detail.value === 'oldest' ? da - db : db - da;
});
renderResults(sorted);
});
function renderResults(results) {
if (!grid) return;
if (!results.length) { grid.innerHTML = '<div class="empty-state"><div class="empty-icon"><svg class="icon-xl"><use href="icons/sprite.svg#icon-search"/></svg></div><p>No articles match your search</p></div>'; return; }
var frag = document.createDocumentFragment();
results.forEach(function(a) {
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
async function doSearch(q) {
if (grid) grid.innerHTML = Array(6).fill(`<div class="skeleton-card"><div class="skeleton skel-img"></div><div class="skel-body"><div class="skeleton skel-tag"></div><div class="skeleton skel-title"></div><div class="skeleton skel-desc"></div><div class="skeleton skel-meta"></div></div></div>`).join('');
const data = await API.search(q);
if (grid) grid.querySelectorAll('.skeleton-card').forEach(s => s.remove());
if (!data) {
if (countEl) countEl.textContent = 'Search unavailable. Please try again later.';
if (grid) grid.innerHTML = '<div class="error-state"><div class="error-icon"><svg class="icon-xl"><use href="icons/sprite.svg#icon-alert-triangle"/></svg></div><h3>Search Failed</h3><p>Could not connect to the search service.</p></div>';
return;
}
allResults = data.results || [];
if (countEl) countEl.textContent = allResults.length
? `Showing ${allResults.length} results for "${q}"`
: `No results found for "${q}"`;
renderResults(allResults);
}
})();
