  (function () {
    const dialog = document.getElementById('modal');
    const content = document.getElementById('modal-content');
    let lastTrigger = null;

    function openModal(templateId, triggerBtn) {
      const tpl = document.getElementById(templateId);
      if (!tpl) return;

      content.innerHTML = '';
      content.appendChild(tpl.content.cloneNode(true));

      lastTrigger = triggerBtn;
      triggerBtn.setAttribute('aria-expanded', 'true');

      if (typeof dialog.showModal === 'function') dialog.showModal();
      else dialog.setAttribute('open', '');

      document.documentElement.style.overflow = 'hidden'; // bloquea scroll
      // Foco inicial
      const focusable = dialog.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      (focusable || dialog).focus();
      dialog.classList.add('is-opening');
      setTimeout(() => dialog.classList.remove('is-opening'), 150);
    }

    function closeModal() {
      dialog.classList.add('is-closing');
      setTimeout(() => {
        if (dialog.open) dialog.close();
        dialog.classList.remove('is-closing');
        content.innerHTML = '';
        document.documentElement.style.overflow = '';
        if (lastTrigger) {
          lastTrigger.setAttribute('aria-expanded', 'false');
          lastTrigger.focus();
        }
      }, 150);
    }

    // Delegación: abrir
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.seemore-btn[data-modal]');
      if (btn) {
        e.preventDefault();
        openModal(btn.getAttribute('data-modal'), btn);
      }
      if (e.target.matches('[data-close]')) {
        closeModal();
      }
    });

    // Cerrar con clic en backdrop
    dialog.addEventListener('click', (e) => {
      const card = dialog.querySelector('.modal-card');
      if (card && !card.contains(e.target)) closeModal();
    });

    // Cerrar con Esc (evento `cancel` propio de <dialog>)
    dialog.addEventListener('cancel', (e) => {
      e.preventDefault();
      closeModal();
    });

    // Exponer por si lo llamas inline
    window.closeModal = closeModal;
  })();
