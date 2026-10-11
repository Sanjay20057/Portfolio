/*
 * Portfolio ad-block notice.
 * Detection is heuristic: some blockers are not detectable and some privacy
 * extensions can trigger false positives. This is a visitor notice, not a
 * security boundary.
 */
(() => {
  const init = () => {
    if (document.getElementById('adblock-gate')) return;

    const gate = document.createElement('div');
    gate.id = 'adblock-gate';
    gate.setAttribute('role', 'dialog');
    gate.setAttribute('aria-modal', 'true');
    gate.setAttribute('aria-labelledby', 'adblock-title');
    gate.setAttribute('aria-describedby', 'adblock-description');
    gate.innerHTML = `
      <section class="adblock-card">
        <div class="adblock-mark" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 3 21 19H3L12 3Z"></path><path d="M12 9v4"></path><path d="M12 16.5h.01"></path>
          </svg>
        </div>
        <p class="adblock-kicker">ACCESS CHECK / 01</p>
        <h2 id="adblock-title">Ad Blocker Detected!</h2>
        <p class="adblock-copy" id="adblock-description">It looks like you're using an ad blocker. Please turn OFF your ad blocker to access Sanjay Sharma's portfolio. Disable your ad-blocking extension for this website, then click the button below to check again.</p>
        <div class="adblock-note"><span aria-hidden="true">↳</span><div>Open your browser’s extensions menu, turn OFF your ad blocker, then reload this page. Access will be checked again after reloading.</div></div>
        <div class="adblock-actions"><button class="adblock-retry" type="button" id="adblock-retry">I've Turned Off My Ad Blocker <span aria-hidden="true">→</span></button></div>
        <p class="adblock-footer">SANJAY SHARMA · PORTFOLIO</p>
      </section>`;
    document.body.appendChild(gate);

    const bait = document.createElement('div');
    bait.className = 'adsbox ad-placement ad-banner advert sponsored-content';
    bait.id = 'adblock-detection-bait';
    bait.setAttribute('aria-hidden', 'true');
    Object.assign(bait.style, {
      position: 'absolute', left: '-10000px', top: '-10000px',
      width: '12px', height: '12px', overflow: 'hidden',
      pointerEvents: 'none'
    });
    document.body.appendChild(bait);

    // Give extension-injected CSS a moment to hide the bait element.
    window.setTimeout(() => {
      const style = window.getComputedStyle(bait);
      const detected = bait.offsetHeight === 0 || bait.offsetWidth === 0 ||
        style.display === 'none' || style.visibility === 'hidden' ||
        style.opacity === '0';
      bait.remove();
      if (detected) {
        gate.classList.add('is-visible');
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
        const button = document.getElementById('adblock-retry');
        button.addEventListener('click', () => window.location.reload());
        window.setTimeout(() => button.focus({ preventScroll: true }), 450);
      } else {
        gate.remove();
      }
    }, 250);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
