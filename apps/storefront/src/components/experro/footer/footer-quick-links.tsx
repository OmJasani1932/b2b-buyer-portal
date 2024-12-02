import { IconMenuDown } from '../assets/icons/menu-drop';
import ExpMenu from '../menu/menu';

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
      <div className="footer-col xl:basis-[15%] lg:basis-[19%] basis-[100%] group">
        <div className="footer-list-wrap">
          {pageData.globalSettings?.footer_com &&
            pageData.globalSettings?.footer_com[0]?.column_1_title_et && (
              // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
              <h6
                className="footer-info-heading font-semibold text-lg mb-0 lg:border-0 border-b border-gray-50 lg:py-0 py-[0.625rem] leading-5 relative"
                onClick={(event) => toggleMenu(event)}
              >
                {pageData.globalSettings?.footer_com &&
                  pageData.globalSettings?.footer_com[0]?.column_1_title_et}

                <i className="icon w-5 h-5 [&>svg]:w-3 [&>svg]:h-3 text-gray-200 absolute justify-center items-center right-0 top-[9px] lg:hidden flex">
                  <IconMenuDown />
                </i>
              </h6>
            )}
          <ExpMenu
            menuLinkObj={pageData.globalSettings?.footer_com}
            keyValueForMenu={'column_1_navigation_id_et'}
            ulClasses={
              'footer-info-list lg:mt-[1.125rem] mt-2 lg:block hidden group-[.is-expanded]:block'
            }
            liClasses={''}
            linkNameClasses={
              'hover:text-primary py-1 leading-5 inline-block lg:text-base text-sm text-gray-200'
            }
          />
        </div>
      </div>

      <div className="footer-col xl:basis-[15%] lg:basis-[19%] basis-[100%] group">
        <div className="footer-list-wrap">
          {pageData.globalSettings?.footer_com &&
            pageData.globalSettings?.footer_com[0]?.column_2_title_et && (
              // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
              <h6
                className="footer-info-heading font-semibold text-lg mb-0 lg:border-0 border-b border-gray-50 lg:py-0 py-[0.625rem] leading-5 relative"
                onClick={(event) => toggleMenu(event)}
              >
                {pageData.globalSettings?.footer_com &&
                  pageData.globalSettings?.footer_com[0]?.column_2_title_et}
                <i className="icon w-5 h-5 [&>svg]:w-3 [&>svg]:h-3 text-gray-200 absolute lg:hidden flex justify-center items-center right-0 top-[9px]">
                  <IconMenuDown />
                </i>
              </h6>
            )}
          <ExpMenu
            menuLinkObj={pageData.globalSettings?.footer_com}
            keyValueForMenu={'column_2_navigation_id_et'}
            ulClasses={
              'footer-info-list lg:mt-[1.125rem] mt-2 lg:block hidden group-[.is-expanded]:block'
            }
            liClasses={''}
            linkNameClasses={
              'hover:text-primary py-1 leading-5 inline-block lg:text-base text-sm text-gray-200'
            }
          />
          <ul className="footer-info-list lg:block hidden group-[.is-expanded]:block">
            <li>
              <a
                className="hover:text-primary py-1 leading-5 inline-block lg:text-base text-sm text-gray-200"
                href="/my-account/"
              >
                My Account
              </a>
            </li>
            <li>
              <a
                className="hover:text-primary py-1 leading-5 inline-block lg:text-base text-sm text-gray-200"
                href="/my-account?tab=orders"
              >
                Recent Orders
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-col xl:basis-[15%] lg:basis-[19%] basis-[100%] group">
        <div className="footer-list-wrap">
          {pageData.globalSettings?.footer_com &&
            pageData.globalSettings?.footer_com[0]?.column_3_title_et && (
              // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
              <h6
                className="footer-info-heading font-semibold text-lg mb-0 lg:border-0 border-b border-gray-50 lg:py-0 py-[0.625rem] leading-5 relative"
                onClick={(event) => toggleMenu(event)}
              >
                {pageData.globalSettings?.footer_com &&
                  pageData.globalSettings?.footer_com[0]?.column_3_title_et}
                <i className="icon w-5 h-5 [&>svg]:w-3 [&>svg]:h-3 text-gray-200 absolute lg:hidden flex justify-center items-center right-0 top-[9px]">
                  <IconMenuDown />
                </i>
              </h6>
            )}
          <ExpMenu
            menuLinkObj={pageData.globalSettings?.footer_com}
            keyValueForMenu={'column_3_navigation_id_et'}
            ulClasses={
              'footer-info-list lg:mt-[1.125rem] mt-2 lg:block hidden group-[.is-expanded]:block'
            }
            liClasses={''}
            linkNameClasses={
              'hover:text-primary py-1 leading-5 inline-block lg:text-base text-sm text-gray-200'
            }
          />
        </div>
      </div>
    </>
  );
};

export default FooterQuickLinks;
