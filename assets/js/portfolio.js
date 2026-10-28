(() => {
  const links = [...document.querySelectorAll('.section-nav a')];
  const sections = links.map(link => document.querySelector(link.hash)).filter(Boolean);
  if (!sections.length) return;
  const activate = id => links.forEach(link => {
    if (link.hash === '#' + id) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  let scheduled = false;
  const update = () => {
    scheduled = false;
    const threshold = Math.min(200, window.innerHeight * 0.3);
    let active = sections[0];
    for (const section of sections) if (section.getBoundingClientRect().top <= threshold) active = section;
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8) active = sections.at(-1);
    activate(active.id);
  };
  const schedule = () => {
    if (!scheduled) { scheduled = true; requestAnimationFrame(update); }
  };
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule);
  addEventListener('hashchange', schedule);
  update();
})();
