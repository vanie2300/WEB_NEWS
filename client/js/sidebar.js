(function(){
var sidebar = document.querySelector('.sidebar');
var toggle = document.getElementById('sidebar-toggle');
var mobileBtn = document.getElementById('mobile-menu-btn');
var backdrop = document.getElementById('sidebar-backdrop');
var isCollapsed = localStorage.getItem('sidebar') === 'collapsed';
var navLinks = document.querySelectorAll('.nav a');

function setCollapsed(collapsed) {
  isCollapsed = collapsed;
  if (collapsed) {
    document.documentElement.classList.add('sidebar-collapsed');
  } else {
    document.documentElement.classList.remove('sidebar-collapsed');
  }
  navLinks.forEach(function(link) {
    if (collapsed) {
      link.setAttribute('data-tooltip', link.getAttribute('title') || '');
    } else {
      link.removeAttribute('data-tooltip');
    }
  });
  if (toggle) toggle.setAttribute('aria-expanded', String(!collapsed));
  localStorage.setItem('sidebar', collapsed ? 'collapsed' : 'expanded');
}

if (isCollapsed) {
  navLinks.forEach(function(link) {
    link.setAttribute('data-tooltip', link.getAttribute('title') || '');
  });
}

if (toggle) {
  toggle.addEventListener('click', function() {
    setCollapsed(!isCollapsed);
  });
}

if (mobileBtn) {
  mobileBtn.addEventListener('click', function() {
    if (isCollapsed) {
      setCollapsed(false);
    }
    sidebar.classList.add('mobile-open');
    if (backdrop) backdrop.classList.add('visible');
    document.body.style.overflow = 'hidden';
  });
}

function closeMobile() {
  if (sidebar) sidebar.classList.remove('mobile-open');
  if (backdrop) backdrop.classList.remove('visible');
  document.body.style.overflow = '';
}

if (backdrop) {
  backdrop.addEventListener('click', closeMobile);
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && sidebar && sidebar.classList.contains('mobile-open')) {
    closeMobile();
  }
});

navLinks.forEach(function(link) {
  link.addEventListener('click', closeMobile);
});
})();
