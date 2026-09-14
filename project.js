(function () {
  var page = document.body;
  var prefix = page.dataset.prefix;
  var total = Number(page.dataset.screens);
  var stack = document.querySelector('.screen-stack');

  if (!prefix || !total || !stack) return;

  for (var number = 1; number <= total; number++) {
    var card = document.createElement('article');
    var label = String(number).padStart(2, '0') + ' / ' + String(total).padStart(2, '0');

    card.className = 'screen';
    card.style.setProperty('--screen-offset', (number - 1) * 14 + 'px');
    card.innerHTML =
      '<div class="screen__bar"><i></i><i></i><i></i><span>' + label + '</span></div>' +
      '<img src="' + prefix + number + '.png" alt="Экран ' + number + ' проекта">';

    stack.appendChild(card);
  }

  var backLink = document.querySelector('.back');
  backLink.addEventListener('click', function (event) {
    if (document.referrer && new URL(document.referrer).origin === window.location.origin) {
      event.preventDefault();
      window.history.back();
    }
  });

  ['copy', 'cut', 'selectstart', 'dragstart'].forEach(function (eventName) {
    document.addEventListener(eventName, function (event) { event.preventDefault(); });
  });
})();
