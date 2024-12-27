import { IconMenuDown } from '../assets/icons/menu-drop';
import ExpMenu from '../menu/menu';
import { ExpLinkParser } from '../utils';

const FooterQuickLinks = ({ pageData }: any) => {
  const toggleMenu = (event: any) => {
    if (event.currentTarget.parentElement?.parentElement?.classList.contains('is-expanded')) {
      event.currentTarget.parentElement?.parentElement.classList.remove('is-expanded');
    } else {
      event.currentTarget.parentElement?.parentElement.classList.add('is-expanded');
    }
  };

  return (
    <>
      <div className="footer-col xl:basis-[35%] lg:basis-[19%] basis-[100%] group">
        <div className="footer-list-wrap">
          {pageData.globalSettings?.footer_com &&
            pageData.globalSettings?.footer_com[0]?.column_1_title_et && (
              // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
              <h6
                className="footer-info-heading lg:text-xl text-base mb-0 lg:border-0 border-b border-gray-50 lg:py-0 py-[0.625rem] leading-5 relative text-white uppercase font-bold"
                onClick={(event) => toggleMenu(event)}
              >
                {pageData.globalSettings?.footer_com &&
                  pageData.globalSettings?.footer_com[0]?.column_1_title_et}

                <i className="icon w-5 h-5 [&>svg]:w-3 [&>svg]:h-3 text-white absolute justify-center items-center right-0 top-[9px] lg:hidden flex">
                  <IconMenuDown />
                </i>
              </h6>
            )}
          <ExpMenu
            menuLinkObj={pageData.globalSettings?.footer_com}
            keyValueForMenu={'column_1_navigation_id_et'}
            ulClasses={
              'footer-info-list lg:mt-3 mt-2 lg:block hidden group-[.is-expanded]:block lg:columns-2 max-w-[400px]'
            }
            liClasses={''}
            linkNameClasses={
              'text-white hover:text-white/80 py-1 leading-5 inline-block lg:text-base text-sm'
            }
          />
        </div>
      </div>

      <div className="footer-col xl:basis-1/5 lg:basis-[19%] basis-[100%] group">
        <div className="footer-list-wrap">
          {pageData.globalSettings?.footer_com &&
            pageData.globalSettings?.footer_com[0]?.column_2_title_et && (
              // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
              <h6
                className="footer-info-heading lg:text-xl text-base mb-0 lg:border-0 border-b border-gray-50 lg:py-0 py-[0.625rem] leading-5 relative text-white uppercase font-bold"
                onClick={(event) => toggleMenu(event)}
              >
                {pageData.globalSettings?.footer_com &&
                  pageData.globalSettings?.footer_com[0]?.column_2_title_et}
                <i className="icon w-5 h-5 [&>svg]:w-3 [&>svg]:h-3 text-white absolute lg:hidden flex justify-center items-center right-0 top-[9px]">
                  <IconMenuDown />
                </i>
              </h6>
            )}
          <ExpMenu
            menuLinkObj={pageData.globalSettings?.footer_com}
            keyValueForMenu={'column_2_navigation_id_et'}
            ulClasses={'footer-info-list lg:mt-3 mt-2 lg:block hidden group-[.is-expanded]:block'}
            liClasses={''}
            linkNameClasses={
              'text-white hover:text-white/80 py-1 leading-5 inline-block lg:text-base text-sm'
            }
          />
          <ul className="footer-info-list lg:block hidden group-[.is-expanded]:block">
            <li>
              <a
                className="text-white hover:text-white/80 py-1 leading-5 inline-block lg:text-base text-sm"
                href="/my-account/"
              >
                My Account
              </a>
            </li>
            <li>
              <a
                className="text-white hover:text-white/80 py-1 leading-5 inline-block lg:text-base text-sm"
                href="/my-account?tab=orders"
              >
                Recent Orders
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-col xl:basis-1/6 lg:basis-[19%] basis-[100%] group">
        <div className="footer-list-wrap">
          {pageData.globalSettings?.footer_com &&
            pageData.globalSettings?.footer_com[0]?.column_3_title_et && (
              // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
              <h6
                className="footer-info-heading lg:text-xl text-base mb-0 lg:border-0 border-b border-gray-50 lg:py-0 py-[0.625rem] leading-5 relative text-white uppercase font-bold"
                onClick={(event) => toggleMenu(event)}
              >
                {pageData.globalSettings?.footer_com &&
                  pageData.globalSettings?.footer_com[0]?.column_3_title_et}
                <i className="icon w-5 h-5 [&>svg]:w-3 [&>svg]:h-3 text-white absolute lg:hidden flex justify-center items-center right-0 top-[9px]">
                  <IconMenuDown />
                </i>
              </h6>
            )}
          <ExpMenu
            menuLinkObj={pageData.globalSettings?.footer_com}
            keyValueForMenu={'column_3_navigation_id_et'}
            ulClasses={'footer-info-list lg:mt-3 mt-2 lg:block hidden group-[.is-expanded]:block'}
            liClasses={''}
            linkNameClasses={
              'text-white hover:text-white/80 py-1 leading-5 inline-block lg:text-base text-sm'
            }
          />
        </div>
        <div className="f-app-icon mt-8">
          <strong className="mb-3 block text-white uppercase">Download Our App</strong>
          <ul className="flex space-x-3">
            {pageData?.globalSettings?.footer_com[0].app_store_link_et && (
              <li>
                <ExpLinkParser
                  to={pageData?.globalSettings?.footer_com[0].app_store_link_et}
                  title="Footer Logo"
                  ariaLabel="Footer Logo"
                >
                  <img
                    src={pageData?.globalSettings?.footer_com[0]?.app_store_image_url_et}
                    // name={`App Store`}
                    alt={`App Store`}
                    title={`App Store`}
                    width={140}
                    height={40}
                    className="max-h-[60px]"
                  />
                </ExpLinkParser>
              </li>
            )}
            {pageData?.globalSettings?.footer_com[0].google_play_link_et && (
              <li>
                <ExpLinkParser
                  to={pageData?.globalSettings?.footer_com[0].google_play_link_et}
                  title="Footer Logo"
                  ariaLabel="Footer Logo"
                >
                  <img
                    src={pageData?.globalSettings?.footer_com[0]?.google_play_image_url_et}
                    // name="Google Play"
                    alt="Google Play"
                    title="Google Play"
                    width={140}
                    height={40}
                    className="max-h-[60px]"
                  />
                </ExpLinkParser>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default FooterQuickLinks;
