import { Fragment } from 'react/jsx-runtime';
import { IconCross } from '../assets/icons/icon-cross';
import { ExpImageParser, ExpLinkParser } from '../utils';
import { IconArrowPrev } from '../assets/icons/arrow-prev';

const MenuLayoutFour = (props: any) => {
  const { menuItem, setClickedMainMenuItem, addClassToOpenMobileMenu } = props;

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
    <div className="has-nav-list xl:bg-[#ffffff] bg-[#EBEFF2] xl:w-[440px] w-full p-7 xl:absolute fixed top-0 left-0 xl:bottom-auto bottom-0 xl:top-full xl:left-1/2 xl:-translate-x-1/2 z-10 xl:opacity-0 xl:invisible xl:group-[&.menu-active]/newMenu:opacity-100 xl:group-[&.menu-active]/newMenu:visible xl:duration-500 xl:transition-all">
      <div className="flex items-center mb-5 xl:pb-0 pb-5 xl:border-b-0 border-b-[2px] border-[#E5E5E5]">
        <span
          className="w-6 cursor-pointer xl:hidden flex"
          onClick={removeMenuActive}>
          <i className="w-6 h-6 flex text-primary">
            <IconArrowPrev />
          </i>
        </span>
        {menuItem?.menu_icon_emd && (
          <span className="mr-3.5 xl:flex hidden w-[44px] h-[44px]">
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
            className="xl:text-[22px] text-sm xl:font-bold xl:text-left text-center text-primary w-[calc(100%_-_44px)]"
            dangerouslySetInnerHTML={{ __html: menuItem?.menu_title_et }}
          />
        )}
        <span
          className="w-6 cursor-pointer xl:hidden flex"
          onClick={() => {
            removeMenuActive();
            addClassToOpenMobileMenu();
            handleNavigationBlockClass();
          }}>
          <i className="w-6 h-6 flex text-primary">
            <IconCross />
          </i>
        </span>
      </div>
      <ul className="flex flex-wrap -mx-2.5 xl:[&>li]:w-6/12 [&>li]:w-full [&>li]:px-2.5 mb-3 xl:h-auto h-[calc(100%_-_110px)] xl:overflow-visible overflow-auto">
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
                          className="xl:text-xs text-base leading-10 xl:leading-6 font-normal block text-quartzGray hover:text-primaryHover"
                          to={item?.sub_menu_link_et}>
                          {item?.sub_menu_title_et}
                        </ExpLinkParser>
                      ) : (
                        <p className="mb-0 xl:text-xs text-base leading-10 xl:leading-6 font-normal block text-quartzGray hover:text-primaryHover">
                          {item?.sub_menu_title_et}
                        </p>
                      )}
                    </div>
                  </li>
                )}
              </Fragment>
            );
          })}
      </ul>
      {!!menuItem?.menu_banner_com?.length &&
        menuItem?.menu_banner_com[0]?.banner_text_et && (
          <div
            style={{
              backgroundColor: menuItem?.menu_banner_com[0]
                ?.banner_background_color_es
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
        )}
    </div>
  );
};

export default MenuLayoutFour;
