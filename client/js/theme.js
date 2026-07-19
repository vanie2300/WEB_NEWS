(function() {
var THEMES = [
{id:'classic',label:'Classic',color:'#d33',mode:'light'},
{id:'dark',label:'Dark',color:'#666',mode:'dark'},
{id:'midnight',label:'Midnight',color:'#1a1a2e',mode:'dark'},
{id:'ocean',label:'Ocean',color:'#0077b6',mode:'light'},
{id:'emerald',label:'Emerald',color:'#2a9d8f',mode:'light'},
{id:'forest',label:'Forest',color:'#2d6a4f',mode:'dark'},
{id:'sunset',label:'Sunset',color:'#e76f51',mode:'light'},
{id:'rose',label:'Rose',color:'#e63946',mode:'light'},
{id:'lavender',label:'Lavender',color:'#7b2cbf',mode:'light'},
{id:'slate',label:'Slate',color:'#495057',mode:'light'},
{id:'newspaper',label:'Newspaper',color:'#222',mode:'light'},
{id:'contrast',label:'High Contrast',color:'#000',mode:'light'}
];
var saved = localStorage.getItem('theme') || 'classic';
applyTheme(saved);
var toggle = document.querySelector('.theme-toggle');
var picker = document.querySelector('.theme-picker');
buildPicker();
if (toggle) toggle.addEventListener('click', function() {
var current = getCurrentTheme();
var next = current === 'classic' ? 'dark' : current === 'dark' ? 'classic' : current;
applyTheme(next);
localStorage.setItem('theme', next);
updateToggleIcon();
updatePickerActive();
});
function applyTheme(id) {
document.documentElement.classList.add('theme-transitioning');
document.documentElement.classList.remove('dark');
var toRemove = [];
for (var i = 0; i < document.documentElement.classList.length; i++) {
var c = document.documentElement.classList[i];
if (c.startsWith('theme-') && c !== 'theme-transitioning') toRemove.push(c);
}
toRemove.forEach(function(c){document.documentElement.classList.remove(c);});
if (id === 'dark') {
document.documentElement.classList.add('dark');
} else if (id !== 'classic') {
document.documentElement.classList.add('theme-' + id);
}
setTimeout(function(){document.documentElement.classList.remove('theme-transitioning');}, 300);
}
function updateToggleIcon() {
if (!toggle) return;
var current = getCurrentTheme();
var isDark = current === 'dark' || current === 'forest' || current === 'midnight';
var useEl = toggle.querySelector('use');
if (useEl) {
useEl.setAttribute('href', 'icons/sprite.svg#' + (isDark ? 'icon-moon' : 'icon-sun'));
}
toggle.setAttribute('title', 'Theme: ' + (THEMES.find(function(x){return x.id===current;})||{}).label || current);
}
function getCurrentTheme() {
var cls = document.documentElement.className;
if (cls.indexOf('dark') !== -1) return 'dark';
var m = cls.match(/theme-(\w+)/);
return m ? m[1] : 'classic';
}
function buildPicker() {
if (!picker) return;
picker.innerHTML = '';
THEMES.forEach(function(t) {
var btn = document.createElement('button');
btn.className = 'theme-option' + (t.id === getCurrentTheme() ? ' active' : '');
btn.setAttribute('data-theme', t.id);
btn.setAttribute('title', t.label);
btn.setAttribute('aria-label', t.label + ' theme');
btn.innerHTML = '<svg width="16" height="16"><circle cx="8" cy="8" r="7" fill="' + t.color + '" stroke="var(--color-border)" stroke-width="1"/></svg>';
btn.addEventListener('click', function() {
applyTheme(t.id);
localStorage.setItem('theme', t.id);
updateToggleIcon();
updatePickerActive();
});
picker.appendChild(btn);
});
}
function updatePickerActive() {
if (!picker) return;
var current = getCurrentTheme();
picker.querySelectorAll('.theme-option').forEach(function(btn) {
btn.classList.toggle('active', btn.getAttribute('data-theme') === current);
});
}
updateToggleIcon();
})();
