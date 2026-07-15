(function () {
  var bookingTracked = false;

  function isCalendlyOrigin(origin) {
    try {
      var url = new URL(origin);
      if (url.protocol !== 'https:') return false;
      return url.hostname === 'calendly.com' || url.hostname.endsWith('.calendly.com');
    } catch (e) {
      return false;
    }
  }

  function isCalendlyEvent(e) {
    return (
      isCalendlyOrigin(e.origin) &&
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
