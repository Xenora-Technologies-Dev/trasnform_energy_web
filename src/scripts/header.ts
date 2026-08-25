const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export function initHeader() {
  const header = document.querySelector<HTMLElement>('[data-site-header]');
  if (!header) return;

  const compactOffset = 16;
  const updateCompact = () => {
    header.classList.toggle('is-compact', window.scrollY > compactOffset);
  };

  updateCompact();
  window.addEventListener('scroll', updateCompact, { passive: true });

  initServicesMenu(header);
  initMobileNav(header);
}

function initServicesMenu(header: HTMLElement) {
  const trigger = header.querySelector<HTMLButtonElement>('[data-services-trigger]');
  const panel = header.querySelector<HTMLElement>('[data-services-panel]');
  if (!trigger || !panel) return;

  let closeTimer: number | undefined;
  let hoverOpen = false;

  const getLinks = () => [...panel.querySelectorAll<HTMLAnchorElement>('a')];

  const setOpen = (open: boolean) => {
    trigger.setAttribute('aria-expanded', String(open));
    panel.hidden = !open;
    panel.classList.toggle('pointer-events-none', !open);
    panel.classList.toggle('opacity-0', !open);
    panel.classList.toggle('invisible', !open);
    header.classList.toggle('is-mega-open', open);
  };

  const open = () => {
    window.clearTimeout(closeTimer);
    setOpen(true);
  };

  const close = (delay = 0) => {
    window.clearTimeout(closeTimer);
    closeTimer = window.setTimeout(() => {
      setOpen(false);
      hoverOpen = false;
    }, delay);
  };

  const isOpen = () => trigger.getAttribute('aria-expanded') === 'true';

  trigger.addEventListener('click', () => {
    isOpen() ? close() : open();
  });

  trigger.addEventListener('mouseenter', () => {
    hoverOpen = true;
    open();
  });
  panel.addEventListener('mouseenter', () => {
    hoverOpen = true;
    open();
  });
  trigger.addEventListener('mouseleave', () => close(160));
  panel.addEventListener('mouseleave', () => close(160));

  trigger.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      open();
      getLinks()[0]?.focus();
    }
  });

  panel.addEventListener('keydown', (event) => {
    const links = getLinks();
    const index = links.indexOf(document.activeElement as HTMLAnchorElement);

    if (event.key === 'Escape') {
      event.preventDefault();
      setOpen(false);
      trigger.focus();
      return;
    }

    if (event.key === 'ArrowDown' && index >= 0) {
      event.preventDefault();
      links[(index + 1) % links.length]?.focus();
    }

    if (event.key === 'ArrowUp' && index >= 0) {
      event.preventDefault();
      if (index === 0) {
        trigger.focus();
      } else {
        links[index - 1]?.focus();
      }
    }

    if (event.key === 'Home') {
      event.preventDefault();
      links[0]?.focus();
    }

    if (event.key === 'End') {
      event.preventDefault();
      links[links.length - 1]?.focus();
    }

    if (event.key === 'Tab' && index === links.length - 1 && !event.shiftKey) {
      close();
    }

    if (event.key === 'Tab' && event.shiftKey && index <= 0) {
      close();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isOpen()) {
      setOpen(false);
      if (!hoverOpen) trigger.focus();
    }
  });

  document.addEventListener('click', (event) => {
    if (!header.contains(event.target as Node)) setOpen(false);
  });

  setOpen(false);
}

function initMobileNav(header: HTMLElement) {
  const toggle = header.querySelector<HTMLButtonElement>('[data-mobile-toggle]');
  const dialog = document.querySelector<HTMLElement>('[data-mobile-nav]');
  if (!toggle || !dialog) return;

  const closeBtn = dialog.querySelector<HTMLButtonElement>('[data-mobile-close]');
  const servicesToggle = dialog.querySelector<HTMLButtonElement>('[data-mobile-services]');
  const servicesPanel = dialog.querySelector<HTMLElement>('[data-mobile-services-panel]');
  let lastFocus: HTMLElement | null = null;

  const getFocusable = () =>
    [...dialog.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
      (el) => !el.hasAttribute('disabled') && el.offsetParent !== null,
    );

  const setOpen = (open: boolean) => {
    toggle.setAttribute('aria-expanded', String(open));
    dialog.hidden = !open;
    document.body.classList.toggle('overflow-hidden', open);

    if (open) {
      lastFocus = document.activeElement as HTMLElement;
      window.setTimeout(() => closeBtn?.focus(), 10);
    } else {
      lastFocus?.focus();
    }
  };

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    setOpen(!expanded);
  });

  closeBtn?.addEventListener('click', () => setOpen(false));

  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) setOpen(false);
  });

  dialog.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });

  servicesToggle?.addEventListener('click', () => {
    if (!servicesPanel || !servicesToggle) return;
    const expanded = servicesToggle.getAttribute('aria-expanded') === 'true';
    servicesToggle.setAttribute('aria-expanded', String(!expanded));
    servicesPanel.hidden = expanded;
  });

  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      setOpen(false);
      return;
    }

    if (event.key !== 'Tab') return;
    const focusable = getFocusable();
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (!first || !last) return;
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  setOpen(false);
}
