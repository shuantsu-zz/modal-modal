function initModals() {

  const wrap = (el, wrapper) => {
    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);
  }

  document.querySelectorAll('[data-rel="modal"]').forEach(el => {
    const blackoutElem = document.createElement('div');

    const width = el.dataset.width;

    if (width) {
      el.style.width = width;
    }

    const maxWidth = el.dataset.maxWidth;

    if (maxWidth) {
      el.style.maxWidth = maxWidth;
    }

    const height = el.dataset.height;

    if (height) {
      el.style.height = height;
    }

    const maxHeight = el.dataset.maxHeight;

    if (maxHeight) {
      el.style.maxHeight = maxHeight;
    }

    blackoutElem.style.display = 'none'; // Avoid modal flash when document load

    blackoutElem.classList.add('blackout', 'hidden');
    wrap(el, blackoutElem);
    blackoutElem.onclick = (ev) => {
      // Avoid closing modal when inner elements are clicked, propagating the click
      if (ev.target !== blackoutElem) {
        return false;
      }
      blackoutElem.classList.remove('show');
      blackoutElem.classList.add('hidden');
    };
  });

  document.querySelectorAll('[data-rel="modal:open"]').forEach(el => {
    el.onclick = () => {
      const blackoutElem = document.querySelector(el.getAttribute('href')).parentNode;
      blackoutElem.classList.remove('hidden');
      blackoutElem.classList.add('show');
      return false;
    };
  });

}

document.addEventListener('DOMContentLoaded', initModals);