(async function() {
const url = getParam('url');
if (!url) return;
const hero = document.querySelector('.article-hero');
const header = document.querySelector('.article-header');
const content = document.querySelector('.article-content');
const actions = document.querySelector('.article-actions');
const breadcrumb = document.getElementById('article-breadcrumb');
if (hero) hero.innerHTML = '<div class="skeleton skeleton-hero" style="height:300px"></div>';
if (header) header.innerHTML = '<div class="skeleton skel-tag" style="width:80px;height:14px;margin-bottom:var(--spacing-sm)"></div><div class="skeleton skel-title" style="height:28px;margin-bottom:var(--spacing-sm)"></div><div class="skeleton skel-meta" style="width:200px;height:12px"></div>';
if (content) content.innerHTML = Array(4).fill('<div class="skeleton skel-desc" style="height:14px;margin-bottom:var(--spacing-sm)"></div>').join('');
const article = await API.article(url);
if (hero) hero.querySelectorAll('.skeleton').forEach(s => s.remove());
if (header) header.querySelectorAll('.skeleton').forEach(s => s.remove());
if (content) content.querySelectorAll('.skeleton').forEach(s => s.remove());
if (!article || article.error) {
if (hero) hero.innerHTML = '';
if (header) header.innerHTML = `
<div class="error-state">
<div class="error-icon"><svg class="icon-xl"><use href="icons/sprite.svg#icon-newspaper"/></svg></div>
<h3>Article Not Found</h3>
<p>The article could not be loaded. It may have been removed or the link is invalid.</p>
<a href="index.html" class="btn btn-primary">Back to Home</a>
</div>`;
if (content) content.innerHTML = '';
if (actions) actions.innerHTML = '';
return;
}
if (article.category && breadcrumb) {
breadcrumb.innerHTML = '<a href="index.html">Home</a><span class="breadcrumb-sep">›</span><a href="category.html?name=' + encodeURIComponent(article.category) + '">' + escapeHTML(article.category.charAt(0).toUpperCase() + article.category.slice(1)) + '</a><span class="breadcrumb-sep">›</span><span class="breadcrumb-current">' + escapeHTML(article.title).substring(0, 40) + '...</span>';
}
if (hero) hero.innerHTML = `<img src="${escapeHTML(article.image)}" alt="${escapeHTML(article.title)}" width="900" height="500" loading="eager" onerror="this.src='https://picsum.photos/900/500'">`;
if (header) header.innerHTML = `
<div class="card-tag">${escapeHTML(article.category)}</div>
<h1>${escapeHTML(article.title)}</h1>
<div class="article-meta">
${article.author ? `<span>By ${escapeHTML(article.author)}</span>` : ''}
${article.publishedAt && !isNaN(new Date(article.publishedAt).getTime()) ? `<span>${new Date(article.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>` : ''}
${article.source ? `<span>Source: ${escapeHTML(article.source)}</span>` : ''}
</div>`;
if (content) {
const text = article.content || article.description || '';
content.innerHTML = text.split(/\n+/).filter(Boolean).map(p => `<p>${escapeHTML(p)}</p>`).join('');
}
if (actions) actions.innerHTML = `
<a href="${escapeHTML(article.url)}" target="_blank" rel="noopener" class="btn btn-primary">Read Original Article <svg class="icon icon-sm"><use href="icons/sprite.svg#icon-external-link"/></svg></a>
<button class="btn btn-outline" onclick="document.getElementById('share-url').value=window.location.href;openModal('share-modal')">Share</button>`;
})();
