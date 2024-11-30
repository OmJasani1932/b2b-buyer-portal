/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

function ExpLinkParser({
  children,
  to,
  target = '_self',
  className,
  title,
  ariaLabel,
  onClick,
}: {
  children?: any;
  to?: any;
  target?: string;
  className?: string;
  title?: string;
  ariaLabel?: string;
  onClick?: any;
}) {
  const Link = to?.startsWith('/') ? to.replace(/^\//, '') : to;

  return (
    <>
      {to?.includes('http') || to?.startsWith('tel:') || to?.startsWith('mailto:') ? (
        <span
          onClick={() => {
            if (onClick) {
              onClick();
            }
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
            if (onClick) {
              onClick();
            }
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
      )}
    </>
  );
}

function ExpNavigate(target: string) {
  const Link = target?.startsWith('/') ? target.replace(/^\//, '') : target;
  window.location.href = `${window.location.origin}/${Link}`;
}

export { ExpLinkParser, ExpNavigate };
