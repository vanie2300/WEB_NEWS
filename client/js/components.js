(function(){
/* Dropdown */
document.addEventListener('click', function(e) {
document.querySelectorAll('.dropdown.open').forEach(function(dd) {
if (!dd.contains(e.target)) { dd.classList.remove('open'); dd.querySelector('.dropdown-trigger').setAttribute('aria-expanded','false'); }
});
});
document.querySelectorAll('.dropdown-trigger').forEach(function(trigger) {
trigger.addEventListener('click', function(e) {
e.stopPropagation();
var dd = this.closest('.dropdown');
var wasOpen = dd.classList.contains('open');
dd.classList.toggle('open', !wasOpen);
this.setAttribute('aria-expanded', !wasOpen);
if (!wasOpen) {
var first = dd.querySelector('.dropdown-item');
if (first) first.focus();
}
});
trigger.addEventListener('keydown', function(e) {
var dd = this.closest('.dropdown');
var items = dd.querySelectorAll('.dropdown-item');
if (e.key === 'ArrowDown' || e.key === 'Down') {
e.preventDefault();
dd.classList.add('open');
this.setAttribute('aria-expanded','true');
if (items.length) items[0].focus();
} else if (e.key === 'Escape') {
dd.classList.remove('open');
this.setAttribute('aria-expanded','false');
}
});
});
document.querySelectorAll('.dropdown-item').forEach(function(item) {
item.addEventListener('click', function() {
var dd = this.closest('.dropdown');
var trigger = dd.querySelector('.dropdown-trigger');
dd.querySelectorAll('.dropdown-item').forEach(function(i){i.classList.remove('active');i.setAttribute('aria-selected','false');});
this.classList.add('active');
this.setAttribute('aria-selected','true');
if (trigger) { trigger.textContent = this.textContent; trigger.setAttribute('aria-expanded','false'); }
dd.classList.remove('open');
dd.dispatchEvent(new CustomEvent('dropdown-select', {detail:{value:this.dataset.value,label:this.textContent}}));
});
item.addEventListener('keydown', function(e) {
var dd = this.closest('.dropdown');
var items = Array.from(dd.querySelectorAll('.dropdown-item'));
var idx = items.indexOf(this);
if (e.key === 'ArrowDown' || e.key === 'Down') {
e.preventDefault();
if (idx < items.length - 1) items[idx + 1].focus();
} else if (e.key === 'ArrowUp' || e.key === 'Up') {
e.preventDefault();
if (idx > 0) items[idx - 1].focus();
else dd.querySelector('.dropdown-trigger').focus();
} else if (e.key === 'Escape') {
dd.classList.remove('open');
dd.querySelector('.dropdown-trigger').setAttribute('aria-expanded','false');
dd.querySelector('.dropdown-trigger').focus();
} else if (e.key === 'Enter' || e.key === ' ') {
e.preventDefault();
this.click();
}
});
});

/* Modal */
var activeModal = null;
var lastFocusedElement = null;
window.openModal = function(id) {
var overlay = document.getElementById(id);
if (!overlay) return;
lastFocusedElement = document.activeElement;
activeModal = overlay;
overlay.classList.add('open');
document.body.style.overflow = 'hidden';
var firstFocusable = overlay.querySelector('.modal-close, button, input, [tabindex]');
if (firstFocusable) firstFocusable.focus();
};
window.closeModal = function(id) {
var overlay = document.getElementById(id || (activeModal && activeModal.id));
if (!overlay) return;
overlay.classList.remove('open');
document.body.style.overflow = '';
activeModal = null;
if (lastFocusedElement) lastFocusedElement.focus();
};
document.querySelectorAll('.modal-overlay').forEach(function(overlay) {
overlay.addEventListener('click', function(e) {
if (e.target === this) window.closeModal(this.id);
});
overlay.addEventListener('keydown', function(e) {
if (e.key !== 'Tab' || !activeModal) return;
var focusable = activeModal.querySelectorAll('button, input, [tabindex]:not([tabindex="-1"])');
if (!focusable.length) return;
var first = focusable[0];
var last = focusable[focusable.length - 1];
if (e.shiftKey) {
if (document.activeElement === first) { e.preventDefault(); last.focus(); }
} else {
if (document.activeElement === last) { e.preventDefault(); first.focus(); }
}
});
});
document.addEventListener('keydown', function(e) {
if (e.key === 'Escape' && activeModal) window.closeModal();
});
document.querySelectorAll('[data-modal]').forEach(function(btn) {
btn.addEventListener('click', function() { window.openModal(this.dataset.modal); });
});

/* Toast */
var toastContainer = null;
function ensureContainer() {
if (!toastContainer) {
toastContainer = document.createElement('div');
toastContainer.className = 'toast-container';
toastContainer.setAttribute('role', 'log');
toastContainer.setAttribute('aria-live', 'polite');
toastContainer.setAttribute('aria-label', 'Notifications');
document.body.appendChild(toastContainer);
}
return toastContainer;
}
window.showToast = function(msg, type, duration) {
type = type || 'info';
duration = duration || 4000;
var icons = {success:'icon-check-circle',error:'icon-x-circle',warning:'icon-alert-triangle',info:'icon-info'};
var container = ensureContainer();
var toast = document.createElement('div');
toast.className = 'toast ' + type;
toast.setAttribute('role', 'status');
toast.innerHTML = '<span class="toast-icon" aria-hidden="true"><svg class="icon icon-sm"><use href="icons/sprite.svg#' + (icons[type]||'icon-info') + '"/></svg></span><span class="toast-msg"></span><button class="toast-close" aria-label="Dismiss notification"><svg class="icon icon-sm"><use href="icons/sprite.svg#icon-x"/></svg></button>';
toast.querySelector('.toast-msg').textContent = msg;
toast.querySelector('.toast-close').addEventListener('click', function() {
toast.classList.remove('show');
setTimeout(function(){toast.remove();}, 300);
});
container.appendChild(toast);
requestAnimationFrame(function(){requestAnimationFrame(function(){toast.classList.add('show');});});
setTimeout(function(){
toast.classList.remove('show');
setTimeout(function(){toast.remove();}, 300);
}, duration);
};

/* Pagination — render only */
window.renderPagination = function(container, currentPage, totalPages, onSelect) {
if (!container || totalPages <= 1) { container.innerHTML = ''; return; }
var html = '';
html += '<button class="page-btn" data-page="' + (currentPage - 1) + '"' + (currentPage === 1 ? ' disabled' : '') + ' aria-label="Previous page">&lsaquo;</button>';
var start = Math.max(1, currentPage - 2);
var end = Math.min(totalPages, currentPage + 2);
if (start > 1) { html += '<button class="page-btn" data-page="1" aria-label="Page 1">1</button>'; if (start > 2) html += '<span class="page-ellipsis" aria-hidden="true">&hellip;</span>'; }
for (var i = start; i <= end; i++) {
html += '<button class="page-btn' + (i === currentPage ? ' active' : '') + '" data-page="' + i + '" aria-label="Page ' + i + '"' + (i === currentPage ? ' aria-current="page"' : '') + '>' + i + '</button>';
}
if (end < totalPages) { if (end < totalPages - 1) html += '<span class="page-ellipsis" aria-hidden="true">&hellip;</span>'; html += '<button class="page-btn" data-page="' + totalPages + '" aria-label="Page ' + totalPages + '">' + totalPages + '</button>'; }
html += '<button class="page-btn" data-page="' + (currentPage + 1) + '"' + (currentPage === totalPages ? ' disabled' : '') + ' aria-label="Next page">&rsaquo;</button>';
container.innerHTML = html;
container.querySelectorAll('.page-btn').forEach(function(btn) {
btn.addEventListener('click', function() {
if (!this.disabled && onSelect) onSelect(parseInt(this.dataset.page));
});
});
};
})();
