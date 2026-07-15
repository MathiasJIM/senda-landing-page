(function () {
  document.addEventListener('click', function (event) {
    var cta = event.target.closest('a[href="calendario.html"]');
    if (!cta) return;
    if (typeof fbq !== 'function') return;
    fbq('trackCustom', 'CalendarView', {
      cta: cta.getAttribute('data-cta') || 'unknown'
    });
  });
})();
