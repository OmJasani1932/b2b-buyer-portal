import FooterQuickLinks from './footer-quick-links';
import SocialIcons from './social-icons';
import FooterCopyrightText from './footer-copyright-text';
import { ExpImageParser, ExpLinkParser } from '../utils';

const Footer = ({ globalSettings }: any) => {
  const pageData = { globalSettings };

  return (
    <footer className="md:pt-16 pt-10 bg-white group-[.transparent-header]/body:mt-0">
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
            <div className="footer-col footer-logo-col xl:basis-1/4 lg:basis-1/2 basis-[100%] ">
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
                  <p className="mb-0">
                    <ExpLinkParser
                      className="text-white font-normal text-sm hover:text-white/80 mb-3"
                      to="/contact-us/"
                    >
                      Contact US
                    </ExpLinkParser>
                  </p>
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
