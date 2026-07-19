function relativeTime(dateString) {
if (!dateString) return '';
const ts = new Date(dateString).getTime();
if (isNaN(ts)) return '';
const seconds = Math.floor((Date.now() - ts) / 1000);
if (seconds < 60) return 'Just now';
const minutes = Math.floor(seconds / 60);
if (minutes < 60) return `${minutes}m ago`;
const hours = Math.floor(minutes / 60);
if (hours < 24) return `${hours}h ago`;
const days = Math.floor(hours / 24);
if (days < 7) return `${days}d ago`;
return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
function debounce(fn, ms) {
let timer;
return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
}
function escapeHTML(str) {
if (str == null) return '';
return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}
function getParam(name) {
return new URLSearchParams(window.location.search).get(name);
}
