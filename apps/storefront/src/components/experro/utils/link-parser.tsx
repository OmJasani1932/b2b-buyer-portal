/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

function ExpLinkParser({
  children,
  to,
  target = '_self',
  dangerouslySetInnerHTML,
  className,
  title,
  ariaLabel,
  onClick,
}: {
  children?: any;
  to?: any;
  target?: string;
  dangerouslySetInnerHTML?: { __html: string };
  className?: string;
  title?: string;
  ariaLabel?: string;
  onClick?: any;
}) {
  const Link = to?.startsWith('/') ? to.replace(/^\//, '') : to;
  const removeMobileMenuClass = () => {
    const b2bIframe: any = document.getElementById('b2b-iframe');

    const element: any = b2bIframe.contentDocument.getElementById('hamburger-menu');
    if (b2bIframe.contentDocument.body.classList.contains('mobile-menu-open')) {
      b2bIframe.contentDocument.body.classList.remove('mobile-menu-open');
      b2bIframe.contentDocument.body.classList.remove('group');
      b2bIframe.contentDocument.body.classList.remove('fixed');
      b2bIframe.contentDocument.body.classList.remove('overflow-hidden');
      b2bIframe.contentDocument.body.classList.remove('w-full');
      element?.classList.remove('is-open');
    }
  };
  return (
    <>
      {to?.includes('http') || to?.startsWith('tel:') || to?.startsWith('mailto:') ? (
        <>
          {!dangerouslySetInnerHTML ? (
            <span
              onClick={() => {
                // if (onClick) {
                if (onclick) {
                  onClick();
                }
                removeMobileMenuClass();
                // }
                if (target === '_blank') {
                  window.open(to, '_blank');
                } else {
                  window.location.href = to;
                }
              }}
              className={className}
              title={title}
              aria-label={ariaLabel}
            >
              {children}
            </span>
          ) : (
            <span
              onClick={() => {
                // if (onClick) {
                if (onclick) {
                  onClick();
                }
                removeMobileMenuClass();
                // }
                if (target === '_blank') {
                  window.open(to, '_blank');
                } else {
                  window.location.href = to;
                }
              }}
              className={className}
              title={title}
              aria-label={ariaLabel}
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                // eslint-disable-next-line no-underscore-dangle
                __html: dangerouslySetInnerHTML?.__html,
              }}
            />
          )}
        </>
      ) : (
        <>
          {!dangerouslySetInnerHTML ? (
            <span
              onClick={() => {
                // if (onClick) {
                if (onclick) {
                  onClick();
                }
                removeMobileMenuClass();
                // }
                if (target === '_blank') {
                  window.open(Link, '_blank');
                } else {
                  window.location.href = `${window.location.origin}/${Link}`;
                }
              }}
              className={className}
              title={title}
              aria-label={ariaLabel}
            >
              {children}
            </span>
          ) : (
            <span
              onClick={() => {
                // if (onClick) {
                if (onclick) {
                  onClick();
                }
                removeMobileMenuClass();
                // }
                if (target === '_blank') {
                  window.open(Link, '_blank');
                } else {
                  window.location.href = `${window.location.origin}/${Link}`;
                }
              }}
              className={className}
              title={title}
              aria-label={ariaLabel}
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                // eslint-disable-next-line no-underscore-dangle
                __html: dangerouslySetInnerHTML?.__html,
              }}
            />
          )}
        </>
      )}
    </>
  );
}

function ExpNavigate(target: string) {
  const Link = target?.startsWith('/') ? target.replace(/^\//, '') : target;
  window.location.href = `${window.location.origin}/${Link}`;
  console.log('called here in this section')
}

export { ExpLinkParser, ExpNavigate };
