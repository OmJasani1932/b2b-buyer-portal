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
      <div className="footer-section max-w-[120rem] 3xl:px-[4.6875rem] 2xl:px-10 md:px-5 px-4 py-4 mx-auto lg:py-14 py-12 bg-primary">
        <div className="footer-navigation-section">
          <div className="footer-nav-block flex lg:gap-5 xl:flex-nowrap flex-wrap lg:[&>.footer-logo-col]:mb-0 [&>.footer-logo-col]:mb-5">
            <div className="footer-col footer-logo-col xl:basis-1/4 lg:basis-[36%] basis-[100%]">
            <div className="footer-logo mb-7">
                <ExpLinkParser to="" title="Footer Logo" aria-label="Footer Logo">
                  <img
                    className="max-h-[80px]"
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
              {pageData.globalSettings?.site_com &&
                pageData.globalSettings?.site_com[0]?.address_et && (
                  <div className="address-block mb-3">
                    <h6 className="footer-info-heading text-base mb-2 lg:py-0 py-[0.625rem] leading-5 relative text-white">
                      Corporate Headquarters:
                    </h6>
                    <div
                      className="text-white font-normal text-sm"
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
                  <div className="address-block mb-3">
                    <ExpLinkParser
                      className="text-white font-normal text-sm underline"
                      to={`tel: ${pageData?.globalSettings?.site_com[0]?.phone_et}`}
                      dangerouslySetInnerHTML={{
                        __html:
                          pageData?.globalSettings?.site_com &&
                          pageData?.globalSettings?.site_com[0]?.phone_et,
                      }}
                    />
                  </div>
                )}
              <p className='mb-3'>
                <ExpLinkParser
                  className="text-white font-normal text-sm hover:text-white/80 mb-3"
                  to="/contact-us/"
                >
                  Contact US
                </ExpLinkParser>
              </p>

              <SocialIcons pageData={pageData} />
            </div>
            <FooterQuickLinks pageData={pageData} />
          </div>
        </div>
        <div className="footer-bottom mt-12">
          <div className="flex xl:flex-nowrap flex-wrap">
            <FooterCopyrightText pageData={pageData} />
            <div
              className="xl:w-8/12 w-full flex xl:justify-end justify-center xl:mt-0 mt-3 text-white [&_a:hover]:text-white/80"
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
