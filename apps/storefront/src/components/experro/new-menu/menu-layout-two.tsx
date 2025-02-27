import { useState } from 'react';
import { Fragment } from 'react/jsx-runtime';
import { IconArrowPrev } from '../assets/icons/arrow-prev';
import { IconCross } from '../assets/icons/icon-cross';
import { ExpImageParser, ExpLinkParser } from '../utils';
import { IconArrowNext } from '../assets/icons/arrow-next';

const MenuLayoutTwo = (props: any) => {
  const { menuItem, setClickedMainMenuItem, addClassToOpenMobileMenu, isMobileView } = props;

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
    <>
      <div className="has-nav-list flex lg:h-auto h-full lg:bg-white bg-[#EBEFF2] xl:w-[1000px] lg:w-[942px] w-full lg:absolute lg:bottom-auto lg:top-full lg:left-1/2 lg:-translate-x-1/2 lg:shadow-[inset_0px_7px_9px_-7px_rgba(0,0,0,0.15),0px_7px_9px_0px_rgba(0,0,0,0.15)] lg:group-[.transparent-header]/body:shadow-none z-10 lg:opacity-0 lg:invisible lg:group-[&.menu-active]/newMenu:opacity-100 lg:group-[&.menu-active]/newMenu:visible lg:duration-500 lg:transition-all ">
        <div className="left-block p-7 xl:w-[calc(100%_-_300px)] lg:w-[calc(100%_-_250px)] w-full relative">
          <div className="flex items-center lg:mb-5 mb-3 lg:pb-0 pb-5 lg:border-b-0 border-b-[2px] border-[#E5E5E5]">
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
          <ul className="flex flex-wrap -mx-2.5 lg:[&>li]:w-4/12 [&>li]:w-full [&>li]:px-2.5 mb-3.5">
            {menuItem?.sub_menu_com?.length &&
              menuItem?.sub_menu_com?.map((item: any, index: any) => {
                return (
                  <Fragment key={index.toString()}>
                    <li
                      className={`${
                        item?.sub_menu_title_et === clickedSubMenuList?.sub_menu_title_et
                          ? 'submenu-active'
                          : ''
                      } group/submenuActive sub-menu-list`}
                    >
                      <div className="link-wrap">
                        {isMobileView ? (
                          <>
                            {item?.sub_menu_link_et ? (
                              <>
                                {!!item?.sub_menu_list_com?.length &&
                                item?.sub_menu_list_com[0]?.menu_title_et?.length === 0 ? (
                                  <>
                                    <div className="link-wrap relative">
                                      <ExpLinkParser
                                        className="xl:text-xs text-base leading-10 xl:leading-6 block xl:text-primary text-[#111111] xl:font-bold relative xl:w-auto w-[calc(100%_-_40px)]"
                                        to={item?.sub_menu_link_et}
                                        target={item?.open_link_in_new_page_eb ? '_blank' : '_self'}
                                      >
                                        {item?.sub_menu_title_et}
                                      </ExpLinkParser>
                                      <span
                                        className="w-10 h-10 hidden items-center justify-end absolute right-0 top-0 text-[#111111]"
                                        onClick={() => setClickedSubMenuList(item)}
                                      >
                                        <i className="w-5 h-5 flex items-center justify-center">
                                          <IconArrowNext />
                                        </i>
                                      </span>
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <div
                                      className="link-wrap"
                                      onClick={() => setClickedSubMenuList(item)}
                                    >
                                      <p className="mb-0 xl:text-xs text-base leading-10 xl:leading-6 block xl:text-primary text-[#111111] xl:font-bold cursor-pointer relative">
                                        {item?.sub_menu_title_et}
                                        <span className="w-10 h-10 hidden items-center justify-end absolute right-0 top-0">
                                          <i className="w-5 h-5 flex items-center justify-center">
                                            <IconArrowNext />
                                          </i>
                                        </span>
                                      </p>
                                    </div>
                                  </>
                                )}
                              </>
                            ) : (
                              <>
                                <div
                                  className="link-wrap"
                                  onClick={() => setClickedSubMenuList(item)}
                                >
                                  <p className="mb-0 xl:text-xs text-base leading-10 xl:leading-6 block xl:text-primary text-[#111111] xl:font-bold cursor-pointer relative">
                                    {item?.sub_menu_title_et}
                                    <span className="w-10 h-10 hidden items-center justify-end absolute right-0 top-0">
                                      <i className="w-5 h-5 flex items-center justify-center">
                                        <IconArrowNext />
                                      </i>
                                    </span>
                                  </p>
                                </div>
                              </>
                            )}
                          </>
                        ) : (
                          <>
                            {item?.sub_menu_link_et ? (
                              <div className="link-wrap relative">
                                <ExpLinkParser
                                  className="xl:text-xs text-base leading-10 xl:leading-6 block xl:text-primary text-[#111111] xl:font-bold relative xl:w-auto w-[calc(100%_-_40px)]"
                                  to={item?.sub_menu_link_et}
                                  target={item?.open_link_in_new_page_eb ? '_blank' : '_self'}
                                >
                                  {item?.sub_menu_title_et}
                                </ExpLinkParser>
                                <span
                                  className="w-10 h-10 hidden items-center justify-end absolute right-0 top-0 text-[#111111]"
                                  onClick={() => setClickedSubMenuList(item)}
                                >
                                  <i className="w-5 h-5 flex items-center justify-center">
                                    <IconArrowNext />
                                  </i>
                                </span>
                              </div>
                            ) : (
                              <div
                                className="link-wrap"
                                onClick={() => setClickedSubMenuList(item)}
                              >
                                <p className="mb-0 xl:text-xs text-base leading-10 xl:leading-6 block xl:text-primary text-[#111111] xl:font-bold cursor-pointer relative">
                                  {item?.sub_menu_title_et}
                                  <span className="w-10 h-10 hidden items-center justify-end absolute right-0 top-0">
                                    <i className="w-5 h-5 flex items-center justify-center">
                                      <IconArrowNext />
                                    </i>
                                  </span>
                                </p>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                      <ul className="lg:block block lg:opacity-100 lg:visible opacity-0 invisible lg:static fixed lg:bg-white bg-primary inset-0 lg:p-0 p-7 group-[&.submenu-active]/submenuActive:translate-x-0 group-[&.submenu-active]/submenuActive:opacity-100 group-[&.submenu-active]/submenuActive:visible group-[&.submenu-active]/submenuActive:z-50 lg:translate-x-0 translate-x-full transition-all duration-500">
                        <li className="lg:hidden block">
                          <div className="flex items-center justify-center lg:mb-5 mb-3 lg:pb-0 pb-5 lg:border-b-0 border-b-[2px] border-[#E5E5E5]">
                            <span
                              className="w-6 cursor-pointer lg:hidden flex"
                              onClick={removeSubMenuActive}
                            >
                              <i className="w-6 h-6 flex text-white">
                                <IconArrowPrev />
                              </i>
                            </span>
                            {clickedSubMenuList?.sub_menu_title_et && (
                              <span
                                className="lg:text-[22px] text-sm lg:font-bold text-white w-[calc(100%_-_44px)] text-center"
                                dangerouslySetInnerHTML={{
                                  __html: clickedSubMenuList?.sub_menu_title_et,
                                }}
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
                              <i className="w-6 h-6 flex text-white">
                                <IconCross />
                              </i>
                            </span>
                          </div>
                        </li>
                        {!!item?.sub_menu_list_com?.length &&
                          item?.sub_menu_list_com[0]?.menu_title_et &&
                          item?.sub_menu_list_com?.map((child: any, index: any) => {
                            return (
                              <Fragment key={index.toString()}>
                                {' '}
                                {child?.menu_title_et && (
                                  <li>
                                    <div className="link-wrap">
                                      {child?.menu_title_link_et ? (
                                        <ExpLinkParser
                                          className="lg:text-xs text-base leading-10 lg:leading-6 block lg:text-quartzGray lg:hover:text-primaryHover text-white font-normal"
                                          to={child?.menu_title_link_et}
                                          target={
                                            child?.open_link_in_new_page_eb === true ||
                                            child?.open_link_in_new_page_eb === 'true'
                                              ? '_blank'
                                              : '_self'
                                          }
                                        >
                                          {child?.menu_title_et}
                                        </ExpLinkParser>
                                      ) : (
                                        <p className="mb-0 lg:text-xs text-base leading-10 lg:leading-6 block lg:text-quartzGray lg:hover:text-primaryHover text-white font-normal">
                                          {child?.menu_title_et}
                                        </p>
                                      )}
                                    </div>
                                  </li>
                                )}
                              </Fragment>
                            );
                          })}
                        {isMobileView &&
                          !!item?.sub_menu_list_com?.length &&
                          item?.sub_menu_list_com[0]?.menu_title_et &&
                          clickedSubMenuList?.sub_menu_link_et && (
                            <ExpLinkParser
                              className="xl:text-xs text-base leading-10 xl:leading-6 block xl:text-quartzGray xl:hover:text-primaryHover text-white font-normal"
                              to={clickedSubMenuList?.sub_menu_link_et}
                              target={
                                clickedSubMenuList?.open_link_in_new_page_eb ? '_blank' : '_self'
                              }
                              ariaLabel="view-all"
                            >
                              View All
                            </ExpLinkParser>
                          )}
                      </ul>
                    </li>
                  </Fragment>
                );
              })}
            {isMobileView && !!menuItem?.menu_link_et?.length && (
              <li>
                <div className="link-wrap">
                  <ExpLinkParser
                    className="xl:text-xs text-base leading-10 xl:leading-6 block xl:text-primary text-[#111111] xl:font-bold relative xl:w-auto w-[calc(100%_-_40px)]"
                    to={menuItem?.menu_link_et}
                    target={menuItem?.open_link_in_new_page_eb ? '_blank' : '_self'}
                  >
                    View All
                  </ExpLinkParser>
                </div>
              </li>
            )}
          </ul>
        </div>
        <div className="right-block xl:w-[300px] lg:w-[250px] bg-[#ECEDED] lg:flex hidden flex-col justify-between">
          {!!menuItem?.cta_banner_com?.length && menuItem?.cta_banner_com[0]?.cta_title_et && (
            <div
              className="py-[46px] xl:px-[33px] lg:px-5 bg-[#5F1248] text-center flex-1"
              style={{
                backgroundColor: menuItem?.cta_banner_com[0]?.cta_background_color_es
                  ? menuItem?.cta_banner_com[0]?.cta_background_color_es
                  : '#5f1248',
              }}
            >
              {menuItem?.cta_banner_com[0]?.cta_title_et && (
                <strong
                  className="text-xl text-white leading-6 mb-2 block"
                  dangerouslySetInnerHTML={{
                    __html: menuItem?.cta_banner_com[0]?.cta_title_et,
                  }}
                />
              )}
              {menuItem?.cta_banner_com[0]?.cta_description_et && (
                <p
                  className="text-xs text-white leading-5 font-normal mb-3"
                  dangerouslySetInnerHTML={{
                    __html: menuItem?.cta_banner_com[0]?.cta_description_et,
                  }}
                />
              )}
              {!!menuItem?.cta_banner_com[0]?.cta_button_com?.length &&
                menuItem?.cta_banner_com[0]?.cta_button_com[0]?.button_text_et && (
                  <ExpLinkParser
                    className="inline-block button-primary button-hover-blue-border bg-white text-quartzGray text-xs font-bold py-[11px] px-10 hover:bg-[#e9e9e9] hover:text-quartzGray rounded-[4px]"
                    to={menuItem?.cta_banner_com[0]?.cta_button_com[0]?.button_link_et}
                  >
                    {menuItem?.cta_banner_com[0]?.cta_button_com[0]?.button_text_et}
                  </ExpLinkParser>
                )}
            </div>
          )}
          {menuItem?.custom_layout_editor_et && (
            <div
              className={
                "custom-editor py-10 xl:px-14 px-5 text-quartzGray [&_.review-img]:mb-1 [&_.review-block]:flex [&_.review-block]:flex-col [&_.review-block]:w-full [&_.review-block]:justify-center [&_.review-block]:items-center [&_.review-img]:w-[130px] [&_.review-img]:h-[26px] [&_.review-block_strong]:text-lg [&_.review-block_strong]:font-medium [&_.review-block_strong]:block [&_.review-block_strong]:mb-1 [&_.review-block_a]:text-xs [&_.review-block_a:hover]:opacity-70 [&_.review-block_a]:pr-4 [&_.review-block_a]:relative [&_.review-block_a:after]:w-[5px] [&_.review-block_a:after]:h-[11px] [&_.review-block_a:after]:bg-reviewrightarrow [&_.review-block_a:after]:bg-no-repeat [&_.review-block_a:after]:bg-[5px_auto] [&_.review-block_a:after]:content-[''] [&_.review-block_a:after]:inline-block [&_.review-block_a:after]:top-1/2 [&_.review-block_a:after]:right-0 [&_.review-block_a:after]:absolute [&_.review-block_a:after]:-translate-y-1/2"
              }
              dangerouslySetInnerHTML={{
                __html: menuItem?.custom_layout_editor_et,
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default MenuLayoutTwo;
