import { ReactNode, RefObject, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import createCache, { EmotionCache } from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';

import { clearThemeFrame, setThemeFrame, useAppDispatch } from '@/store';

export function IFrameSetContent(
  el: HTMLIFrameElement | null,
  content: string,
  forceWrite = false,
) {
  if (el) {
    const element = el;
    if ('srcdoc' in HTMLIFrameElement.prototype && !forceWrite) {
      element.srcdoc = content;
    } else {
      const iframeDoc = element.contentDocument;
      iframeDoc?.open('text/html', 'replace');
      iframeDoc?.write(content);
      iframeDoc?.close();
    }
  }
}

const handleLoad = (_iframeRef: RefObject<HTMLIFrameElement>) => {
  // resolve iframe use document mousedown no effect
  if (_iframeRef.current?.contentDocument?.addEventListener) {
    _iframeRef.current.contentDocument.addEventListener('keydown', () => {
      document.dispatchEvent(new Event('keydown'));
    });
    _iframeRef.current.contentDocument.addEventListener('mousedown', () => {
      document.dispatchEvent(new Event('mousedown'));
    });
    _iframeRef.current.contentDocument.addEventListener('touchstart', () => {
      document.dispatchEvent(new Event('touchstart'));
    });
    _iframeRef.current.contentDocument.addEventListener('touchmove', () => {
      document.dispatchEvent(new Event('touchmove'));
    });
    _iframeRef.current.contentDocument.addEventListener('click', () => {
      document.dispatchEvent(new Event('click'));
    });
  }
};

interface ThemeFrameProps {
  children: ReactNode; // children to be rendered within iframe
  className?: string; // className to assign the iframe
  bodyRef?: RefObject<HTMLBodyElement>; // if the parent needs access to body of iframe. i.e to attach dom event handlers
  fontUrl?: string;
  customStyles?: string;
  title?: string;
}
interface ThemeFramePortalProps {
  children: ReactNode;
  isSetupComplete: boolean;
  emotionCache?: EmotionCache;
  iframeDocument?: HTMLIFrameElement['contentDocument'];
  bodyRef?: RefObject<HTMLBodyElement>;
}

const DefaultIframeContent = '<!DOCTYPE html><html><head></head><body></body></html>';

function ThemeFramePortal(props: ThemeFramePortalProps) {
  const dispatch = useAppDispatch();
  const { isSetupComplete, emotionCache, iframeDocument, bodyRef, children } = props;

  useEffect(() => {
    if (iframeDocument) {
      dispatch(setThemeFrame(iframeDocument));
    }
    return () => {
      if (iframeDocument) {
        dispatch(clearThemeFrame());
      }
    };
    // disabling because dispatch is not needed in the dependency array
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [iframeDocument]);

  if (!isSetupComplete || !emotionCache || !iframeDocument) {
    return null;
  }

  if (bodyRef?.current !== undefined) {
    // eslint-disable-next-line
    // @ts-ignore - we are intentionally setting ref passed from parent
    bodyRef.current = iframeDocument.body;
  }

  return createPortal(
    <CacheProvider value={emotionCache}>
      <CssBaseline />
      {children}
    </CacheProvider>,
    iframeDocument.body,
  );
}

export default function ThemeFrame(props: ThemeFrameProps) {
  const { title, className, fontUrl, customStyles, children, bodyRef } = props;
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [emotionCache, setEmotionCache] = useState<EmotionCache | undefined>(undefined);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) {
      return;
    }

    IFrameSetContent(iframe, DefaultIframeContent, true);
    const doc = iframeRef.current?.contentDocument;
    if (!doc) {
      return;
    }

    if (fontUrl) {
      const font = doc.createElement('link');
      font.rel = 'stylesheet';
      font.href = fontUrl;
      doc.head.appendChild(font);
    }

    if (customStyles) {
      if (!doc.getElementById('tailwind-src')) {
        const tw = doc.createElement('script');
        tw.id = 'tailwind-src';
        tw.setAttribute('src', 'https://cdn.tailwindcss.com');
        doc.head.appendChild(tw);
        const tailwindConfig = document.createElement('script');
        tailwindConfig.textContent = `tailwind.config = {
          theme: {
            screens: {
              xsm: '480px',
              sm: '667px',
              md: '768px',
              lg: '1024px',
              xl: '1280px',
              '2xl': '1440px',
              '3xl': '1630px',
            },
            container: {
              center: true,
              padding: '1.875rem',
            },
            extend: {
              colors: {
                transparent: 'transparent',
                primary: '#004270',
                primaryHover: '#006892',
                borderColor: '#dddddd',
                white: '#ffffff',
                black: '#000000',
                yellow: '#EA7030',
                green: '#00873c',
                brown: '#760d17',
                blue: '#3498DB',
                orange: '#ea9137',
                orangeLight: '#e0a800',
                gray: {
                  10: '#cccccc',
                  20: '#eaebec',
                  30: '#e5e5e5',
                  40: '#e4e2e2',
                  50: '#ebebeb',
                  100: '#626366',
                  200: '#808285',
                  300: '#939597',
                  400: '#d1d2d4',
                  500: '#8f8f8f',
                  600: '#f7f8f8',
                  700: '#6d6e71',
                  800: '#f5f5f5',
                  900: '#696b73',
                },
                neutral: {
                  10: '#dadcdd',
                  20: '#eceded',
                  30: '#ceced1',
                  40: '#999999',
                },
              },
              fontFamily: {
                primary: ['proxima-nova', 'Arial'],
              },
              fontSize: {
                xs: '0.75rem',
                sm: '0.875rem',
                base: '1rem',
                lg: '1.125rem',
                xl: '1.25rem',
                '2xl': '1.5rem',
                '3xl': '1.875rem',
                '4xl': ['2.1875rem', '2.625rem'],
                '5xl': '3.125rem',
                '6xl': '4rem',
                '7xl': '4.5rem',
              },
              backgroundImage: {
                pdficon: "url('@images/pdf.png')",
                rightIcon: 'url(@icons/icon-check.svg)',
                arrowDownFill: 'url(@icons/arrow-down-fill.svg)',
              },
              keyframes: {
                skBouncedelay: {
                  '0%, 100%, 80%': { transform: 'scale(.9)' },
                  '40%': { transform: 'scale(1)' },
                },
                smoothScroll: {
                  '0%': { transform: 'translateY(-200px)' },
                  '100%': { transform: 'translateY(0)' },
                },
                bottomTop: {
                  '0%': { transform: 'translateY(0)' },
                  '100%': { transform: 'translateY(-100%)' },
                },
                showToHide: {
                  '0%': { opacity: '0' },
                  '100%': { opacity: '1' },
                },
                topToBottom: {
                  '0%': { top: '-200px' },
                  '100%': { top: '0' },
                },
              },
              animation: {
                skBouncedelay: 'skBouncedelay 1.4s infinite ease-in-out both',
                smoothScroll: 'smoothScroll 0.8s ease',
                bottomTop: 'bottomTop 0.8s ease',
                showToHide: 'showToHide 0.8s ease',
                'top-to-bottom': 'topToBottom .8s ease',
              },
            },
          },
        };`;
        tw.onload = () => {
          doc.head.appendChild(tailwindConfig);
        };
      }
      const customStyleElement = doc.createElement('style');
      customStyleElement.appendChild(document.createTextNode(customStyles));
      doc.head.appendChild(customStyleElement);
    }

    const emotionCacheObj = createCache({
      key: 'css',
      container: doc.head,
      prepend: true,
    });

    setEmotionCache(emotionCacheObj);

    if (doc.readyState === 'complete') {
      handleLoad(iframeRef);
    } else {
      iframeRef.current?.addEventListener('load', () => handleLoad(iframeRef));
    }

    setIsSetupComplete(true);
    const currentFrame = iframeRef.current;
    // eslint-disable-next-line
    return () => {
      setIsSetupComplete(false);
      currentFrame?.removeEventListener('load', () => {
        handleLoad(iframeRef);
      });
    };
    // disabling cause it needs to be run once
  }, [customStyles, fontUrl]);

  return (
    <iframe
      id="b2b-iframe"
      allowFullScreen
      className={isSetupComplete ? className : undefined}
      title={title}
      ref={iframeRef}
    >
      <ThemeFramePortal
        isSetupComplete={isSetupComplete}
        emotionCache={emotionCache}
        iframeDocument={iframeRef.current?.contentDocument}
        bodyRef={bodyRef}
      >
        {children}
      </ThemeFramePortal>
    </iframe>
  );
}
