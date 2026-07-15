(function () {
  var bookingTracked = false;

  function isCalendlyEvent(e) {
    return (
      e.origin === 'https://calendly.com' &&
      e.data &&
      typeof e.data.event === 'string' &&
      e.data.event.indexOf('calendly.') === 0
    );
  }

  window.addEventListener('message', function (event) {
    if (!isCalendlyEvent(event)) return;
    if (event.data.event !== 'calendly.event_scheduled') return;
    if (bookingTracked) return;
    bookingTracked = true;
    if (typeof fbq === 'function') {
      fbq('track', 'Schedule', {
        content_name: 'Calendly meeting booked'
      });
    }
  });
})();
