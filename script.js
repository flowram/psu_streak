const header = document.getElementById('site-header');
const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.getElementById('mobile-nav');

function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Открыть меню');
  mobileNav.classList.remove('is-open');
}

menuButton.addEventListener('click', () => {
  const opening = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(opening));
  menuButton.setAttribute('aria-label', opening ? 'Закрыть меню' : 'Открыть меню');
  mobileNav.classList.toggle('is-open', opening);
});

mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeMenu();
});
document.addEventListener('click', event => {
  if (!header.contains(event.target)) closeMenu();
});
window.addEventListener('resize', () => {
  if (window.innerWidth > 980) closeMenu();
});
window.addEventListener('scroll', () => {
  header.classList.toggle('is-scrolled', window.scrollY > 10);
}, { passive: true });

const demoButton = document.getElementById('demo-button');
const streakPanel = document.getElementById('streak-panel');
const streakNumber = document.getElementById('streak-number');
const weekStatus = document.getElementById('week-status');
const today = document.getElementById('today-day');
const demoCaption = document.getElementById('demo-caption');
let dayAdded = false;

demoButton.addEventListener('click', () => {
  dayAdded = !dayAdded;
  streakNumber.textContent = dayAdded ? '07' : '06';
  document.querySelector('.inline-days').textContent = dayAdded ? '7' : '6';
  weekStatus.textContent = dayAdded ? '7 / 7' : '6 / 7';
  today.classList.toggle('done', dayAdded);
  demoButton.innerHTML = dayAdded
    ? 'Повторить демо <span aria-hidden="true">↻</span>'
    : 'Зажечь сегодняшний день <svg aria-hidden="true"><use href="#icon-arrow"/></svg>';
  demoCaption.textContent = dayAdded
    ? 'Демо: +1 день! В боте — после проверки фото табеля'
    : 'Демо: реальная отметка требует проверки табеля';
  if (dayAdded) {
    streakPanel.classList.remove('celebrate');
    void streakPanel.offsetWidth;
    streakPanel.classList.add('celebrate');
  } else {
    streakPanel.classList.remove('celebrate');
  }
});
