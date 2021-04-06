function initModals() {

  const wrap = (el, wrapper) => {
    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);
  }

  document.querySelectorAll('[data-rel="modal"]').forEach(el => {
    const blackoutElem = document.createElement('div');

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