import { Fragment } from 'react/jsx-runtime';
import { IconCross } from '../assets/icons/icon-cross';
import { ExpImageParser, ExpLinkParser } from '../utils';
import { IconArrowPrev } from '../assets/icons/arrow-prev';

const MenuLayoutFour = (props: any) => {
  const { menuItem, setClickedMainMenuItem, addClassToOpenMobileMenu, isMobileView } = props;

  const removeMenuActive = () => {
    const newMenu = document.querySelector('.main-menu-list');
    const navigation_block = document.querySelector('.navigation-block-inner');
    navigation_block?.classList.remove('active-menu');
    if (newMenu?.classList.contains('menu-active')) {
      newMenu?.classList.remove('menu-active');
    }
    setClickedMainMenuItem(null);
  };

  const handleNavigationBlockClass = () => {
    const navigation_block = document.querySelector('.navigation-block-inner');
    navigation_block?.classList.add('active-menu');
  };

  return (
    <div className="has-nav-list lg:bg-white bg-[#EBEFF2] lg:w-[440px] w-full p-7 lg:absolute fixed top-0 left-0 lg:bottom-auto bottom-0 lg:top-full lg:left-1/2 lg:-translate-x-1/2 lg:shadow-[inset_0px_7px_9px_-7px_rgba(0,0,0,0.15),0px_7px_9px_0px_rgba(0,0,0,0.15)] lg:group-[.transparent-header]/body:shadow-[0px_7px_7px_rgba(0,0,0,0.15)] z-10 lg:opacity-0 lg:invisible lg:group-[&.menu-active]/newMenu:opacity-100 lg:group-[&.menu-active]/newMenu:visible lg:duration-500 lg:transition-all ">
      <div className="flex items-center mb-5 lg:pb-0 pb-5 lg:border-b-0 border-b-[2px] border-[#E5E5E5]">
        <span className="w-6 cursor-pointer lg:hidden flex" onClick={removeMenuActive}>
          <i className="w-6 h-6 flex text-primary">
            <IconArrowPrev />
          </i>
        </span>
        {menuItem?.menu_icon_emd && (
          <span className="mr-3.5 lg:flex hidden w-[44px] h-[44px]">
            <img
              src={ExpImageParser(menuItem?.menu_icon_emd[0])?.absolutePath}
              width={44}
              height={44}
              alt={`menu-${menuItem?.menu_title_et}`}
              title={menuItem?.menu_title_et}
              // name={menuItem?.menu_title_et}
            />
          </span>
        )}
        {menuItem?.menu_title_et && (
          <span
            className="lg:text-[22px] text-sm lg:font-bold lg:text-left text-center text-primary w-[calc(100%_-_44px)]"
            dangerouslySetInnerHTML={{ __html: menuItem?.menu_title_et }}
          />
        )}
        <span
          className="w-6 cursor-pointer lg:hidden flex"
          onClick={() => {
            removeMenuActive();
            addClassToOpenMobileMenu();
            handleNavigationBlockClass();
          }}
        >
          <i className="w-6 h-6 flex text-primary">
            <IconCross />
          </i>
        </span>
      </div>
      <ul className="flex flex-wrap -mx-2.5 lg:[&>li]:w-6/12 [&>li]:w-full [&>li]:px-2.5 mb-3 lg:h-auto h-[calc(100%_-_110px)] lg:overflow-visible overflow-auto">
        {!!menuItem?.sub_menu_com?.length &&
          menuItem?.sub_menu_com?.map((item: any, index: any) => {
            return (
              <Fragment key={index.toString()}>
                {' '}
                {item?.sub_menu_title_et && (
                  <li>
                    <div className="link-wrap">
                      {item?.sub_menu_link_et ? (
                        <ExpLinkParser
                          className="lg:text-xs text-base leading-9 lg:leading-6 font-normal block text-quartzGray hover:text-primaryHover"
                          to={item?.sub_menu_link_et}
                          target={item?.open_link_in_new_page_eb ? '_blank' : '_self'}
                        >
                          {item?.sub_menu_title_et}
                        </ExpLinkParser>
                      ) : (
                        <p className="mb-0 lg:text-xs text-base leading-9 lg:leading-6 font-normal block text-quartzGray hover:text-primaryHover">
                          {item?.sub_menu_title_et}
                        </p>
                      )}
                    </div>
                  </li>
                )}
              </Fragment>
            );
          })}
        {isMobileView && !!menuItem?.menu_link_et?.length && (
          <li>
            <div className="link-wrap">
              <ExpLinkParser
                className="lg:text-xs text-base leading-9 lg:leading-6 font-normal block text-quartzGray hover:text-primaryHover"
                to={menuItem?.menu_link_et}
                target={menuItem?.open_link_in_new_page_eb ? '_blank' : '_self'}
              >
                View All
              </ExpLinkParser>
            </div>
          </li>
        )}
      </ul>
      {!!menuItem?.menu_banner_com?.length && menuItem?.menu_banner_com[0]?.banner_text_et && (
        <>
          {menuItem?.menu_banner_com[0]?.banner_link_et ? (
            <ExpLinkParser to={menuItem?.menu_banner_com[0]?.banner_link_et} ariaLabel="banner">
              <div
                style={{
                  backgroundColor: menuItem?.menu_banner_com[0]?.banner_background_color_es
                    ? menuItem?.menu_banner_com[0]?.banner_background_color_es
                    : '#ea7030',
                  color: menuItem?.banner_text_color_es
                    ? menuItem?.banner_text_color_es
                    : '#ffffff',
                }}
                className="menu-banner overflow-hidden bg-yellow text-sm leading-4 font-normal text-white p-4 py-[18px] rounded-[10px] pr-16 relative before:bg-building before:right-0 before:top-0 md:before:w-[88px] before:h-[78px] before:bg-no-repeat before:absolute before:bg-cover before:bg-bottom xl:flex hidden"
                dangerouslySetInnerHTML={{
                  __html: menuItem?.menu_banner_com[0]?.banner_text_et,
                }}
              />
            </ExpLinkParser>
          ) : (
            <div
              style={{
                backgroundColor: menuItem?.menu_banner_com[0]?.banner_background_color_es
                  ? menuItem?.menu_banner_com[0]?.banner_background_color_es
                  : '#ea7030',
                color: menuItem?.banner_text_color_es ? menuItem?.banner_text_color_es : '#ffffff',
              }}
              className="menu-banner overflow-hidden bg-yellow text-sm leading-4 font-normal text-white p-4 py-[18px] rounded-[10px] pr-16 relative before:bg-building before:right-0 before:top-0 md:before:w-[88px] before:h-[78px] before:bg-no-repeat before:absolute before:bg-cover before:bg-bottom xl:flex hidden"
              dangerouslySetInnerHTML={{
                __html: menuItem?.menu_banner_com[0]?.banner_text_et,
              }}
            />
          )}
        </>
      )}
    </div>
  );
};

export default MenuLayoutFour;
