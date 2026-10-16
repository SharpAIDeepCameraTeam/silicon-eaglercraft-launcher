(() => {
  if (window.__fullbrightInserted) return;
  window.__fullbrightInserted = true;

  const style = document.createElement('style');
  style.id = 'fullbright-style';
  style.textContent = `
    #fullbright-overlay {
      position: fixed;
      inset: 0;
      pointer-events: none;
      background: rgba(255, 255, 255, 0.22);
      z-index: 2147483646;
      display: none;
    }

    #fullbright-label {
      position: fixed;
      right: 18px;
      bottom: 18px;
      padding: 8px 12px;
      font: 12px monospace;
      color: white;
      background: rgba(0, 0, 0, 0.6);
      border-radius: 8px;
      pointer-events: none;
      z-index: 2147483647;
      display: none;
    }
  `;
  document.head.appendChild(style);

  const overlay = document.createElement('div');
  overlay.id = 'fullbright-overlay';
  document.body.appendChild(overlay);

  const label = document.createElement('div');
  label.id = 'fullbright-label';
  label.textContent = 'FULLBRIGHT: OFF';
  document.body.appendChild(label);

  let enabled = false;

  function setEnabled(next) {
    enabled = !!next;
    overlay.style.display = enabled ? 'block' : 'none';
    label.style.display = enabled ? 'block' : 'none';
    label.textContent = 'FULLBRIGHT: ' + (enabled ? 'ON' : 'OFF');
  }

  document.addEventListener('keydown', (event) => {
    const key = event.key ? event.key.toLowerCase() : '';
    if (key === 'f') {
      setEnabled(!enabled);
    }
  });

  window.fullbright = {
    enable: () => setEnabled(true),
    disable: () => setEnabled(false),
    toggle: () => setEnabled(!enabled)
  };

  setEnabled(false);
})();
