(function() {
var btn = document.getElementById('back-to-top');
var status = document.getElementById('api-status');
var main = document.querySelector('.main');
if (btn && main) {
main.addEventListener('scroll', function() {
btn.classList.toggle('visible', main.scrollTop > 300);
});
btn.addEventListener('click', function() { main.scrollTo({ top: 0, behavior: 'smooth' }); });
}
if (status) {
status.querySelector('.dot').classList.add('loading');
status.querySelector('.status-text').textContent = 'Loading...';
}
window.setAPIStatus = function(ok, text) {
if (!status) return;
var dot = status.querySelector('.dot');
dot.classList.remove('loading', 'error');
if (!ok) dot.classList.add('error');
status.querySelector('.status-text').textContent = text || (ok ? 'Connected' : 'Offline');
};
window.setLastUpdated = function() {
var el = document.getElementById('last-updated');
if (el) el.textContent = 'Updated ' + new Date().toLocaleTimeString();
};
document.querySelectorAll('img[data-src]').forEach(function(img) {
img.src = img.dataset.src;
img.removeAttribute('data-src');
});
/* Scroll reveal — observe .reveal elements */
if ('IntersectionObserver' in window) {
var revealObserver = new IntersectionObserver(function(entries) {
entries.forEach(function(entry) {
if (entry.isIntersecting) {
entry.target.classList.add('visible');
revealObserver.unobserve(entry.target);
}
});
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
function observeReveals() {
document.querySelectorAll('.reveal:not(.visible)').forEach(function(el) {
revealObserver.observe(el);
});
}
observeReveals();
window.observeReveals = observeReveals;
} else {
document.querySelectorAll('.reveal').forEach(function(el) {
el.classList.add('visible');
});
}
})();
