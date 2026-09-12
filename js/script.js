// Destaca no menu o link da seção visível no momento (a página original (artifact)
// não tinha JS — isso é a única interação real que fazia sentido extrair pra cá).
(function () {
  var links = document.querySelectorAll('nav.links a[href^="#"]');
  if (!links.length || !('IntersectionObserver' in window)) return;

  var sections = Array.prototype.map.call(links, function (link) {
    return document.querySelector(link.getAttribute('href'));
  }).filter(Boolean);

  var byId = {};
  links.forEach(function (link) {
    byId[link.getAttribute('href').slice(1)] = link;
  });

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (l) { l.classList.remove('active'); });
        var link = byId[entry.target.id];
        if (link) link.classList.add('active');
      });
    },
    { rootMargin: '-45% 0px -45% 0px' }
  );

  sections.forEach(function (section) { observer.observe(section); });
})();
