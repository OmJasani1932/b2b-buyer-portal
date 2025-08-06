import FooterQuickLinks from './footer-quick-links';
import SocialIcons from './social-icons';
import FooterCopyrightText from './footer-copyright-text';
import { ExpImageParser, ExpLinkParser } from '../utils';
import { useEffect, useState } from 'react';
import { LunchIcon } from '../assets/icons/lunch-icon';
import { LunchHoverIcon } from '../assets/icons/lunch-hover';
import { LunchHoverMobileIcon } from '../assets/icons/lunch-hover-mobile';
import { ChatFloatIcon } from '../assets/icons/chat-float';
import { ChatFloatHoverIcon } from '../assets/icons/chat-float-hover';
declare let window: any;

const Footer = ({ globalSettings }: any) => {
  const pageData = { globalSettings };

  const [liveChatLoaded, setLiveChatLoaded] = useState<boolean>(false);

  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 50;

    const checkInterval = setInterval(() => {
      attempts++;
      if (window.LiveChatWidget || document.getElementById('chat-widget-container')) {
        setLiveChatLoaded(true);
        clearInterval(checkInterval);
      } else if (attempts >= maxAttempts) {
        clearInterval(checkInterval);
      }
    }, 1000);
    return () => {
      clearInterval(checkInterval);
    };
  }, []);

  return (
    <footer className="md:pt-16 pt-10 bg-white group-[.transparent-header]/body:mt-0">
      <div className="fixed z-50 md:left-4 left-0 md:w-auto w-full md:bottom-auto bottom-0 md:top-1/2 md:-translate-y-1/2 md:block hidden md:group-[.sticky-header]/body:block group-[.sticky-header]/body:flex">
        <ExpLinkParser
          to="https://info.cookandboardman.com/event/lunch-and-learn-request/general"
          className="md:mt-4 bg-primary md:hover:bg-primary hover:bg-[#B3E1E7] md:w-11 w-1/2 md:h-11 p-[9px_14px_9px_11px] cursor-pointer flex md:flex-row flex-col overflow-hidden items-center z-[99] group-[.mobile-menu-open]:z-10 md:group-[&.sticky-header]/body:flex group-[&.sticky-header]/body:flex whitespace-nowrap md:rounded-[23px] group/quote md:hover:w-full transition-all duration-400 ease-in-out md:shadow-[0_0_20px_0_rgba(255,255,255,0.19)]"
        >
          <i className="icon md:w-8 w-full md:h-[34px] h-7 flex items-center group-hover/quote:hidden transition-all duration-300 flex-[0_0_auto] md:[&_svg]:w-[23px] [&_svg]:w-[20px] md:[&_svg]:h-[28px] [&_svg]:h-[22px] md:justify-normal justify-center">
            <LunchIcon />
          </i>
          <i className="icon md:w-8 w-full md:h-[34px] h-7 hidden items-center md:group-hover/quote:flex transition-all duration-300 flex-[0_0_auto] md:[&_svg]:w-[23px] [&_svg]:w-[20px] md:[&_svg]:h-[28px] [&_svg]:h-[22px] md:justify-normal justify-center">
            <LunchHoverIcon />
          </i>
          <i className="icon md:w-8 w-full md:h-[34px] h-7 hidden items-center md:group-hover/quote:hidden group-hover/quote:flex transition-all duration-300 flex-[0_0_auto] md:[&_svg]:w-[23px] [&_svg]:w-[20px] md:[&_svg]:h-[28px] [&_svg]:h-[22px] md:justify-normal justify-center">
            <LunchHoverMobileIcon />
          </i>
          <span className="md:w-[calc(100%_-_32px)] md:opacity-0 md:group-hover/quote:opacity-100 md:group-hover/quote:text-white group-hover/quote:text-primary transition-all duration-300 text-[11px] font-medium text-white tracking-[0.05rem]">
            Let's Do Lunch
          </span>
        </ExpLinkParser>

        {/* Chat button with loading state */}
        {!liveChatLoaded ? (
          <span className="md:mt-4 bg-primary md:hover:bg-primary hover:bg-[#B3E1E7] md:w-11 w-1/2 md:h-11 p-[9px_14px_9px_11px] cursor-pointer flex md:flex-row flex-col overflow-hidden items-center z-[99] group-[.mobile-menu-open]:z-10 md:group-[&.sticky-header]/body:flex group-[&.sticky-header]/body:flex whitespace-nowrap md:rounded-[23px] group/quote md:hover:w-full transition-all duration-400 ease-in-out md:shadow-[0_0_20px_0_rgba(255,255,255,0.19)]">
            <div className="flex items-center justify-center w-full h-full">
              <div className="flex space-x-0.5">
                <div
                  className="w-1.5 h-1.5 bg-white rounded-full animate-[skBouncedelay_0.8s_infinite_ease-in-out_both]"
                  style={{ animationDelay: '0s' }}
                ></div>
                <div
                  className="w-1.5 h-1.5 bg-white rounded-full animate-[skBouncedelay_0.8s_infinite_ease-in-out_both]"
                  style={{ animationDelay: '0.1s' }}
                ></div>
                <div
                  className="w-1.5 h-1.5 bg-white rounded-full animate-[skBouncedelay_0.8s_infinite_ease-in-out_both]"
                  style={{ animationDelay: '0.2s' }}
                ></div>
              </div>
            </div>
          </span>
        ) : (
          <span
            onClick={() => {
              if (window.LiveChatWidget) {
                window.LiveChatWidget.call('maximize');
              }
            }}
            className="md:mt-4 bg-primary md:hover:bg-primary hover:bg-[#B3E1E7] md:w-11 w-1/2 md:h-11 p-[9px_14px_9px_11px] cursor-pointer flex md:flex-row flex-col overflow-hidden items-center z-[99] group-[.mobile-menu-open]:z-10 md:group-[&.sticky-header]/body:flex group-[&.sticky-header]/body:flex whitespace-nowrap md:rounded-[23px] group/quote md:hover:w-full transition-all duration-400 ease-in-out md:shadow-[0_0_20px_0_rgba(255,255,255,0.19)]"
          >
            <i className="icon md:w-8 w-full md:h-[34px] h-7 flex items-center group-hover/quote:hidden transition-all duration-300 flex-[0_0_auto] md:[&_svg]:w-[23px] [&_svg]:w-[20px] md:[&_svg]:h-[28px] [&_svg]:h-[22px] md:justify-normal justify-center">
              <ChatFloatIcon />
            </i>
            <i className="icon md:w-8 w-full md:h-[34px] h-7 hidden items-center group-hover/quote:flex transition-all duration-300 flex-[0_0_auto] md:[&_svg]:w-[23px] [&_svg]:w-[20px] md:[&_svg]:h-[28px] [&_svg]:h-[22px] md:justify-normal justify-center">
              <ChatFloatHoverIcon />
            </i>
            <span className="md:w-[calc(100%_-_32px)] md:opacity-0 md:group-hover/quote:opacity-100 md:group-hover/quote:text-white group-hover/quote:text-primary transition-all duration-300 text-[11px] font-medium text-white tracking-[0.05rem]">
              Chat With Us
            </span>
          </span>
        )}
      </div>
      <div className="service-block bg-gray-50 lg:py-5 py-4 hidden">
        {!!pageData?.globalSettings?.footer_usp_links_com?.length && (
          <div className="container">
            <ul className="flex justify-center lg:[&>*:nth-child(2)]:px-11 md:[&>*:nth-child(2)]:px-5 md:[&>*:nth-child(2)]:border-x-[0.1875rem] md:[&>*:nth-child(2)]:border-y-0 [&>*:nth-child(2)]:border-y-[0.125rem] [&>*:nth-child(2)]:border-gray-400 [&>*:nth-child(2)]:border-solid lg:space-x-11 md:space-x-5 md:flex-row flex-col">
              {pageData?.globalSettings?.footer_usp_links_com?.map((ele: any, index: number) => (
                <li key={index} className="xl:py-5 lg:py-5 py-3">
                  <a className="flex items-center md:justify-start" href={ele?.usp_link_et}>
                    <img
                      src={ExpImageParser(ele?.usp_icon_emd[0])?.absolutePath}
                      alt={ele?.usp_title_et}
                      title={ele?.usp_title_et}
                      width={50}
                      height={50}
                      className="icon flex items-center justify-center lg:w-[3.125rem] lg:h-[3.125rem] w-10 h-10 bg-primary text-white rounded-full mr-4 lg:[&>svg]:w-[1.625rem] [&>svg]:w-5"
                    />
                    <h4 className="lg:text-[1.375rem] text-lg mb-0 font-semibold">
                      {ele?.usp_title_et}
                    </h4>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="footer-section md:container-liquid px-12 lg:pt-14 lg:pb-8 py-10 bg-primary max-w-full 3xl:px-[4.6875rem] 2xl:px-10 lg:px-14 px-12">
        <div className="footer-navigation-section">
          <div className="footer-nav-block flex xl:gap-5 xl:flex-nowrap flex-wrap lg:[&>.footer-col]:mb-0 [&>.footer-col]:mb-12 last:[&>.footer-col]:mb-0">
            <div className="footer-col footer-logo-col lg:basis-1/4 basis-[100%] ">
              <div className="footer-logo mb-7">
                <ExpLinkParser to="" title="Footer Logo" aria-label="Footer Logo">
                  <img
                    className="lg:max-h-[80px] max-h-16 w-auto object-contain"
                    src={
                      ExpImageParser(
                        pageData?.globalSettings.site_com?.length &&
                          pageData?.globalSettings.site_com[0]?.footer_logo_emd
                          ? pageData?.globalSettings.site_com[0]?.footer_logo_emd[0]
                          : '',
                      )?.absolutePath
                    }
                    alt="C&B Logo"
                    title="C&B Logo"
                    width={255}
                    height={80}
                  />
                </ExpLinkParser>
              </div>
              <div className="lg:block flex justify-between">
                <div className="left-block">
                  {pageData.globalSettings?.site_com &&
                    pageData.globalSettings?.site_com[0]?.address_et && (
                      <div className="address-block mb-1.5">
                        <h6 className="footer-info-heading text-base mb-2  leading-5 relative text-white">
                          Corporate Headquarters:
                        </h6>
                        <div
                          className="text-white font-normal text-sm underline"
                          dangerouslySetInnerHTML={{
                            __html:
                              pageData?.globalSettings?.site_com &&
                              pageData?.globalSettings?.site_com[0]?.address_et,
                          }}
                        />
                      </div>
                    )}

                  {pageData.globalSettings?.site_com &&
                    pageData.globalSettings?.site_com[0]?.phone_et && (
                      <div className="address-block mb-1.5">
                        <ExpLinkParser
                          className="text-white font-normal text-sm underline"
                          to={`tel: ${pageData?.globalSettings?.site_com[0]?.phone_et}`}
                          dangerouslySetInnerHTML={{
                            __html:
                              pageData?.globalSettings?.site_com &&
                              pageData?.globalSettings?.site_com[0]?.phone_et,
                          }}
                        ></ExpLinkParser>
                      </div>
                    )}
                  {!!pageData?.globalSettings?.header_com?.length &&
                    !!pageData?.globalSettings?.header_com[0]?.contact_us_link_et?.length && (
                      <p className="mb-0">
                        <ExpLinkParser
                          className="text-white font-normal text-sm hover:text-white/80 mb-3"
                          to={`${pageData?.globalSettings?.header_com[0]?.contact_us_link_et}`}
                          ariaLabel={`${pageData?.globalSettings?.header_com[0]?.contact_us_text_et}`}
                        >
                          {pageData?.globalSettings?.header_com[0]?.contact_us_text_et
                            ? pageData?.globalSettings?.header_com[0]?.contact_us_text_et
                            : ''}
                        </ExpLinkParser>
                      </p>
                    )}
                  <div className="images-floating-button flex md:mt-9 mt-5 gap-5">
                    <div className="cookie-block">
                      <span
                        onClick={(e) => {
                          const target = e.currentTarget;
                          target.classList.add('loading');
                          if (typeof (window as any).UserWay !== 'undefined') {
                            (window as any).UserWay.widgetOpen();
                          }
                          setTimeout(() => target.classList.remove('loading'), 3000);
                        }}
                        className="cookie-btn cursor-pointer"
                      >
                        <img
                          src={`https://k097otgk-us-en.myexperro.com/mm-images/user-accesiblity-ty4zl3fb.webp`}
                          width={40}
                          height={40}
                          title="user-accesiblity"
                          alt="user-accesiblity"
                        />
                      </span>
                    </div>
                    <div className="cookie-block">
                      <span
                        onClick={() =>
                          (
                            document.querySelector('.ot-floating-button__open') as HTMLElement
                          )?.click()
                        }
                        className="cookie-btn cursor-pointer"
                      >
                        <img
                          src={`https://k097otgk-us-en.myexperro.com/mm-images/persistent-cookie-icon-dy0yinjj.webp`}
                          width={40}
                          height={40}
                          title="Cookie"
                          alt="Cookie"
                        />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="right-block lg:hidden block [&_ul]:mt-0 [&_ul]:flex-col [&_ul]:gap-6 [&_ul_.icon]:w-6 [&_ul_.icon]:h-6 [&_h6]:hidden">
                  <SocialIcons pageData={pageData} />
                </div>
              </div>
            </div>
            <FooterQuickLinks pageData={pageData} />
          </div>
        </div>
        <div className="footer-bottom mt-12">
          <div className="flex xl:flex-nowrap flex-wrap xl:flex-row flex-col-reverse">
            <FooterCopyrightText pageData={pageData} />
            <div
              className="xl:w-8/12 w-full flex xl:justify-end justify-center xl:mb-0 mb-3 text-white [&_a:hover]:text-white/80"
              dangerouslySetInnerHTML={{
                __html:
                  pageData?.globalSettings?.footer_com &&
                  pageData?.globalSettings?.footer_com[0]?.footer_bottom_links_et,
              }}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
