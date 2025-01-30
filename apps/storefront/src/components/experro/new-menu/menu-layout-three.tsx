import { Fragment } from 'react/jsx-runtime';
import { useState } from 'react';
import { ExpImageParser, ExpLinkParser } from '../utils';
import { HeroIconArrowRight } from '../assets/icons/arrow-right-two';
import { IconArrowPrev } from '../assets/icons/arrow-prev';
import { IconCross } from '../assets/icons/icon-cross';
import { IconArrowNext } from '../assets/icons/arrow-next';

const MenuLayoutThree = (props: any) => {
  const { menuItem, setClickedMainMenuItem, addClassToOpenMobileMenu } = props;

  const [clickedSubMenuList, setClickedSubMenuList] = useState<any>('');

  const removeMenuActive = () => {
    const newMenu = document.querySelector('.main-menu-list');
    if (newMenu?.classList.contains('menu-active')) {
      newMenu?.classList.remove('menu-active');
    }
    setClickedMainMenuItem(null);
  };
  const removeSubMenuActive = () => {
    const newMenu = document.querySelector('.sub-menu-list');
    if (newMenu?.classList.contains('submenu-active')) {
      newMenu?.classList.remove('submenu-active');
    }
    setClickedSubMenuList('');
  };

  const handleNavigationBlockClass = () => {
    const navigation_block = document.querySelector('.navigation-block-inner');
    navigation_block?.classList.add('active-menu');
  };

  return (
    <div className="has-nav-list xl:flex xl:bg-[#ffffff] bg-[#EBEFF2] xl:w-[804px] w-full xl:absolute fixed top-0 left-0 xl:bottom-auto bottom-0 xl:top-full xl:left-1/2 xl:-translate-x-1/2 z-10 xl:opacity-0 xl:invisible xl:group-[&.menu-active]/newMenu:opacity-100 xl:group-[&.menu-active]/newMenu:visible xl:duration-500 xl:transition-all">
      <div className="left-block  xl:w-[300px] w-full bg-[#ECEDED] xl:flex hidden flex-col justify-between">
        {!!menuItem?.sub_menu_with_toggle_com?.length &&
          menuItem?.sub_menu_with_toggle_com[0]?.sub_menu_title_et && (
            <div className="sub-menu-list px-8 py-5 flex-auto flex items-center">
              <ul className="[&_li+li]:mt-2.5 w-full">
                {!!menuItem?.sub_menu_with_toggle_com?.length &&
                  menuItem?.sub_menu_with_toggle_com?.map(
                    (item: any, index: any) => {
                      return (
                        <Fragment key={index?.toString()}>
                          {item?.sub_menu_title_et && (
                            <li>
                              {item?.sub_menu_link_et ? (
                                <ExpLinkParser
                                  ariaLabel={item?.sub_menu_link_et}
                                  to={item?.sub_menu_link_et}
                                  className="text-sm text-primary leading-7 font-medium block pr-5 relative hover:text-primaryHover">
                                  {item?.sub_menu_title_et}
                                  <i className="w-2.5 h-2.5 flex absolute right-0 top-1/2 -translate-y-1/2">
                                    <HeroIconArrowRight />
                                  </i>
                                </ExpLinkParser>
                              ) : (
                                <p className="mb-0 text-sm text-primary leading-7 font-medium hover:text-primaryHover">
                                  {item?.sub_menu_title_et}
                                </p>
                              )}
                            </li>
                          )}
                        </Fragment>
                      );
                    }
                  )}
              </ul>
            </div>
          )}
        {!!menuItem?.cta_banner_com?.length &&
          menuItem?.cta_banner_com[0]?.cta_title_et && (
            <div
              className="py-[46px] px-[33px] bg-primary text-center xl:block hidden"
              style={{
                backgroundColor: menuItem?.cta_banner_com[0]
                  ?.cta_background_color_es
                  ? menuItem?.cta_banner_com[0]?.cta_background_color_es
                  : '#004270',
              }}>
              <strong
                className="text-xl text-white leading-6 mb-2 block"
                dangerouslySetInnerHTML={{
                  __html: menuItem?.cta_banner_com[0]?.cta_title_et,
                }}
              />
              {menuItem?.cta_banner_com[0]?.cta_description_et && (
                <p
                  className="text-xs text-white leading-5 font-normal mb-3"
                  dangerouslySetInnerHTML={{
                    __html: menuItem?.cta_banner_com[0]?.cta_description_et,
                  }}
                />
              )}

              {!!menuItem?.cta_banner_com[0]?.cta_button_com?.length &&
                menuItem?.cta_banner_com[0]?.cta_button_com[0]
                  ?.button_text_et && (
                  <ExpLinkParser
                    className="button-primary button-hover-blue-border text-quartzGray text-xs font-bold py-[9px] px-10 hover:bg-[#e9e9e9] hover:text-quartzGray"
                    to={
                      menuItem?.cta_banner_com[0]?.cta_button_com[0]
                        ?.button_link_et
                    }>
                    {
                      menuItem?.cta_banner_com[0]?.cta_button_com[0]
                        ?.button_text_et
                    }
                  </ExpLinkParser>
                )}
            </div>
          )}
      </div>
      <div className="right-block p-7  xl:w-[calc(100%_-_300px)] w-full xl:flex-1">
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
              className="xl:text-[22px] text-sm xl:font-bold xl:text-left text-center text-primary hover:text-primaryHover w-[calc(100%_-_44px)]"
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
        <ul className="xl:columns-2 xl:[&>li+li]:mt-3.5 [&>li]:pr-1 [&>li]:w-full">
          {!!menuItem?.sub_menu_com?.length &&
            menuItem?.sub_menu_com?.map((item: any, index: any) => {
              return (
                <Fragment key={index?.toString()}>
                  <li
                    className={`${item?.sub_menu_title_et === clickedSubMenuList ? 'submenu-active' : ''} group/submenuActive sub-menu-list`}>
                    {item?.sub_menu_title_et && (
                      <div className="link-wrap">
                        {item?.sub_menu_link_et ? (
                          <ExpLinkParser
                            className="xl:text-xs text-base leading-10 xl:leading-6 block xl:text-primary hover:text-primaryHover text-[#111111] xl:font-bold relative"
                            to={item?.sub_menu_link_et}>
                            {item?.sub_menu_title_et}
                            <span
                              className="w-10 h-10 xl:hidden flex items-center justify-end absolute right-0 top-0"
                              onClick={() =>
                                setClickedSubMenuList(item?.sub_menu_title_et)
                              }>
                              <i className="w-5 h-5 flex items-center justify-center">
                                <IconArrowNext />
                              </i>
                            </span>
                          </ExpLinkParser>
                        ) : (
                          <p className="mb-0 xl:text-xs text-base leading-10 xl:leading-6 block xl:text-primary hover:text-primaryHover text-[#111111] xl:font-bold relative">
                            {item?.sub_menu_title_et}
                            <span className="w-10 h-10 xl:hidden flex items-center justify-end absolute right-0 top-0">
                              <i className="w-6 h-6 flex items-center justify-center">
                                <IconArrowNext />
                              </i>
                              <span
                                className="w-10 h-10 xl:hidden flex items-center justify-end absolute right-0 top-0"
                                onClick={() =>
                                  setClickedSubMenuList(item?.sub_menu_title_et)
                                }>
                                <i className="w-5 h-5 flex items-center justify-center">
                                  <IconArrowNext />
                                </i>
                              </span>
                            </span>
                          </p>
                        )}
                      </div>
                    )}
                    <ul className="block xl:opacity-100 xl:visible opacity-0 invisible xl:static fixed xl:bg-white bg-primary inset-0 xl:p-0 p-7 group-[&.submenu-active]/submenuActive:translate-x-0 group-[&.submenu-active]/submenuActive:opacity-100 group-[&.submenu-active]/submenuActive:visible group-[&.submenu-active]/submenuActive:z-50 xl:translate-x-0 translate-x-full transition-all duration-500">
                      <li className="xl:hidden block">
                        <div className="flex items-center justify-center mb-5 xl:pb-0 pb-5 xl:border-b-0 border-b-[2px] border-[#E5E5E5]">
                          <span
                            className="w-6 cursor-pointer xl:hidden flex"
                            onClick={removeSubMenuActive}>
                            <i className="w-6 h-6 flex text-white">
                              <IconArrowPrev />
                            </i>
                          </span>
                          {clickedSubMenuList && (
                            <span
                              className="xl:text-[22px] text-sm xl:font-bold text-white w-[calc(100%_-_44px)] text-center"
                              dangerouslySetInnerHTML={{
                                __html: clickedSubMenuList,
                              }}
                            />
                          )}
                          <span
                            className="w-6 cursor-pointer xl:hidden flex"
                            onClick={() => {
                              removeMenuActive();
                              addClassToOpenMobileMenu();
                              handleNavigationBlockClass();
                            }}>
                            <i className="w-6 h-6 flex text-white">
                              <IconCross />
                            </i>
                          </span>
                        </div>
                      </li>
                      {!!item?.sub_menu_list_com?.length &&
                        item?.sub_menu_list_com?.map(
                          (item: any, index: any) => {
                            return (
                              <Fragment key={index?.toString()}>
                                {item?.menu_title_et && (
                                  <li>
                                    <div className="link-wrap">
                                      {item?.menu_title_link_et ? (
                                        <ExpLinkParser
                                          className="xl:text-xs text-base leading-10 xl:leading-6 block xl:text-quartzGray hover:text-primaryHover text-white font-normal"
                                          to={item?.menu_title_link_et}>
                                          {item?.menu_title_et}
                                        </ExpLinkParser>
                                      ) : (
                                        <p className="mb-0 xl:text-xs text-base leading-10 xl:leading-6 block xl:text-quartzGray hover:text-primaryHover text-white font-normal">
                                          {item?.menu_title_et}
                                        </p>
                                      )}
                                    </div>
                                  </li>
                                )}
                              </Fragment>
                            );
                          }
                        )}
                    </ul>
                  </li>{' '}
                </Fragment>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default MenuLayoutThree;
