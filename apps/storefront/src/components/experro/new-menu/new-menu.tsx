import ExpMenuController from './new-menu-controller';
import { Fragment, useCallback, useEffect, useState } from 'react';
import MenuLayoutOne from './menu-layout-one';
import MenuLayoutFour from './menu-layout-four';
import MenuLayoutTwo from './menu-layout-two';
import MenuLayoutThree from './menu-layout-three';
import { ExpImageParser, ExpLinkParser } from '../utils';
import { IconArrowUpFill } from '../assets/icons/arrow-up-fill';

const ExpNewMenu = (props: any) => {
  const { addClassToOpenMobileMenu, clickedMenuItem, setClickedMenuItem } = props;
  const { isLoading, menuData, isLoadingForBlogs, posts } = ExpMenuController();
  const [activeSubMenu, setActiveSubMenu] = useState<any>(null);
  // const [clickedMenuItem, setClickedMenuItem] = useState<number | null>(null);
  const [isMobileView, setIsMobileView] = useState<boolean>(false);

  // const addClass = (item: any) => {
  //   const menutitle = item?.menu_title_et;
  //   const className = menutitle
  //     ? menutitle.toLowerCase().replace(/\s+/g, '-')
  //     : '';

  //   return menutitle === 'In-Home Consultation'
  //     ? 'free-at-home-consultation'
  //     : className;
  // };

  const handleMenuClick = useCallback((event: any, index: number, submenu: any) => {
    event.preventDefault();
    event.stopPropagation();
    const navigation_block = document.querySelector('.navigation-block-inner');
    navigation_block?.classList.add('active-menu');
    setClickedMenuItem((prevIndex: any) => (prevIndex === index ? null : index));
    setActiveSubMenu(submenu || null);
  }, []);

  const handleSubmenuClick = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
  }, []);

  const renderMenuLayout = (item: any) => {
    switch (item?.menu_layout_es) {
      case 'Layout 1':
        return (
          <MenuLayoutOne
            setClickedMainMenuItem={setClickedMenuItem}
            activeSubMenu={activeSubMenu}
            menuItem={item}
            addClassToOpenMobileMenu={addClassToOpenMobileMenu}
            posts={posts}
            isLoadingForBlogs={isLoadingForBlogs}
            isMobileView={isMobileView}
          />
          // <></>
        );
      case 'Layout 2':
        return (
          <MenuLayoutTwo
            addClassToOpenMobileMenu={addClassToOpenMobileMenu}
            setClickedMainMenuItem={setClickedMenuItem}
            menuItem={item}
            isMobileView={isMobileView}
          />
          // <></>
        );
      case 'Layout 3':
        return (
          <MenuLayoutThree
            addClassToOpenMobileMenu={addClassToOpenMobileMenu}
            setClickedMainMenuItem={setClickedMenuItem}
            menuItem={item}
            isMobileView={isMobileView}
          />
          // <></>
        );
      case 'Layout 4':
        return (
          <MenuLayoutFour
            addClassToOpenMobileMenu={addClassToOpenMobileMenu}
            setClickedMainMenuItem={setClickedMenuItem}
            menuItem={item}
            isMobileView={isMobileView}
          />
          // <></>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const menuContainer = document.querySelector('.menu-container');
      if (menuContainer && !menuContainer.contains(event.target as Node)) {
        setClickedMenuItem(null);
        setActiveSubMenu(null);
      }
    };

    if (isMobileView) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMobileView]);

  return (
    <>
      <ul className="lg:flex 2xl:gap-x-7 lg:gap-x-3 relative z-50 nav-list lg:h-full lg:mt-0 mt-auto">
        {!isLoading &&
          menuData?.length &&
          menuData?.map((item: any, index: any) => {
            return (
              <Fragment key={index.toString()}>
                <li
                  className={`${
                    activeSubMenu && index === clickedMenuItem ? 'menu-active' : ''
                  } group/newMenu flex items-center main-menu-list cursor-pointer`}
                  onMouseEnter={() => {
                    !isMobileView && setActiveSubMenu(item?.sub_menu_com || null);
                    !isMobileView && setClickedMenuItem(index);
                  }}
                  onMouseLeave={() => {
                    !isMobileView && setActiveSubMenu(null);
                    !isMobileView && setClickedMenuItem(null);
                  }}
                  onClick={(e: any) => {
                    isMobileView && handleMenuClick(e, index, item?.sub_menu_com);
                  }}
                >
                  <div className="link-wrap flex">
                    {isMobileView ? (
                      <>
                        {item?.sub_menu_com?.length > 0 ? (
                          <>
                            {' '}
                            <p className="mb-0 lg:text-sm text-base leading-5 font-medium text-primary lg:py-5 py-2.5 flex items-center relative before:h-0.5 before:bg-primary before:w-0 before:bottom-0.5 before:left-0 before:absolute lg:group-[.transparent-header]/body:text-white lg:group-[.transparent-header]/body:before:bg-white lg:group-[.menu-active]/newMenu:before:w-full before:transition-all cursor-pointer">
                              {' '}
                              {item?.menu_icon_emd && (
                                <span className="mr-3.5 lg:hidden flex w-6 h-6">
                                  <img
                                    src={ExpImageParser(item?.menu_icon_emd[0])?.absolutePath}
                                    width={44}
                                    height={44}
                                    alt={`menu-${item?.menu_title_et}`}
                                    title={item?.menu_title_et}
                                    // name={item?.menu_title_et}
                                  />
                                </span>
                              )}
                              {item?.menu_title_et}
                              <i className="icon lg:flex hidden ml-2.5 text-primary w-2 h-1.5 group-[.menu-active]/newMenu:rotate-180 transition-all lg:group-[.transparent-header]/body:text-white">
                                <IconArrowUpFill />
                              </i>
                            </p>
                          </>
                        ) : (
                          <>
                            {item?.menu_link_et ? (
                              <ExpLinkParser
                                className="lg:text-sm text-base leading-5 font-medium text-primary lg:py-5 py-2.5 flex items-center relative before:h-0.5 before:bg-primary before:w-0 before:bottom-0.5 before:left-0 before:absolute lg:group-[.transparent-header]/body:text-white lg:group-[.transparent-header]/body:before:bg-white lg:group-[.menu-active]/newMenu:before:w-full before:transition-all"
                                to={item?.menu_link_et}
                              >
                                {item?.menu_icon_emd && (
                                  <span className="mr-3.5 lg:hidden flex w-6 h-6">
                                    <img
                                      src={ExpImageParser(item?.menu_icon_emd[0])?.absolutePath}
                                      width={44}
                                      height={44}
                                      alt={`menu-${item?.menu_title_et}`}
                                      title={item?.menu_title_et}
                                      // name={item?.menu_title_et}
                                    />
                                  </span>
                                )}
                                {item?.menu_title_et}
                                <i className="icon lg:flex hidden ml-2.5 text-primary w-2 h-1.5 group-[.menu-active]/newMenu:rotate-180 transition-all lg:group-[.transparent-header]/body:text-white">
                                  <IconArrowUpFill />
                                </i>
                              </ExpLinkParser>
                            ) : (
                              <p className="mb-0 lg:text-sm text-base leading-5 font-medium text-primary lg:py-5 py-2.5 flex items-center relative before:h-0.5 before:bg-primary before:w-0 before:bottom-0.5 before:left-0 before:absolute lg:group-[.transparent-header]/body:text-white lg:group-[.transparent-header]/body:before:bg-white lg:group-[.menu-active]/newMenu:before:w-full before:transition-all cursor-pointer">
                                {' '}
                                {item?.menu_icon_emd && (
                                  <span className="mr-3.5 lg:hidden flex w-6 h-6">
                                    <img
                                      src={ExpImageParser(item?.menu_icon_emd[0])?.absolutePath}
                                      width={44}
                                      height={44}
                                      alt={`menu-${item?.menu_title_et}`}
                                      title={item?.menu_title_et}
                                      // name={item?.menu_title_et}
                                    />
                                  </span>
                                )}
                                {item?.menu_title_et}
                                <i className="icon lg:flex hidden ml-2.5 text-primary w-2 h-1.5 group-[.menu-active]/newMenu:rotate-180 transition-all lg:group-[.transparent-header]/body:text-white">
                                  <IconArrowUpFill />
                                </i>
                              </p>
                            )}
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        {' '}
                        {item?.menu_link_et ? (
                          <ExpLinkParser
                            className="lg:text-sm text-base leading-5 font-medium text-primary lg:py-5 py-2.5 flex items-center relative before:h-0.5 before:bg-primary before:w-0 before:bottom-0.5 before:left-0 before:absolute lg:group-[.transparent-header]/body:text-white lg:group-[.transparent-header]/body:before:bg-white lg:group-[.menu-active]/newMenu:before:w-full before:transition-all"
                            to={item?.menu_link_et}
                          >
                            {item?.menu_icon_emd && (
                              <span className="mr-3.5 lg:hidden flex w-6 h-6">
                                <img
                                  src={ExpImageParser(item?.menu_icon_emd[0])?.absolutePath}
                                  width={44}
                                  height={44}
                                  alt={`menu-${item?.menu_title_et}`}
                                  title={item?.menu_title_et}
                                  // name={item?.menu_title_et}
                                />
                              </span>
                            )}
                            {item?.menu_title_et}
                            <i className="icon lg:flex hidden ml-2.5 text-primary w-2 h-1.5 group-[.menu-active]/newMenu:rotate-180 transition-all lg:group-[.transparent-header]/body:text-white">
                              <IconArrowUpFill />
                            </i>
                          </ExpLinkParser>
                        ) : (
                          <p className="mb-0 lg:text-sm text-base leading-5 font-medium text-primary lg:py-5 py-2.5 flex items-center relative before:h-0.5 before:bg-primary before:w-0 before:bottom-0.5 before:left-0 before:absolute lg:group-[.transparent-header]/body:text-white lg:group-[.transparent-header]/body:before:bg-white lg:group-[.menu-active]/newMenu:before:w-full before:transition-all cursor-pointer">
                            {' '}
                            {item?.menu_icon_emd && (
                              <span className="mr-3.5 lg:hidden flex w-6 h-6">
                                <img
                                  src={ExpImageParser(item?.menu_icon_emd[0])?.absolutePath}
                                  width={44}
                                  height={44}
                                  alt={`menu-${item?.menu_title_et}`}
                                  title={item?.menu_title_et}
                                  // name={item?.menu_title_et}
                                />
                              </span>
                            )}
                            {item?.menu_title_et}
                            <i className="icon lg:flex hidden ml-2.5 text-primary w-2 h-1.5 group-[.menu-active]/newMenu:rotate-180 transition-all lg:group-[.transparent-header]/body:text-white">
                              <IconArrowUpFill />
                            </i>
                          </p>
                        )}
                      </>
                    )}
                  </div>
                  <div
                    className={`${
                      isMobileView
                        ? 'lg:translate-x-0 h-full bg-[#EBEFF2] top-0 w-full fixed translate-x-full group-[.menu-active]/newMenu:translate-x-0 group-[.menu-active]/newMenu:right-0 duration-500 lg:transition-none transition-all lg:visible invisible group-[.menu-active]/newMenu:visible z-50'
                        : ''
                    }`}
                    style={{
                      opacity: activeSubMenu === item?.sub_menu_com ? '1' : '0',
                    }}
                    onClick={handleSubmenuClick}
                  >
                    {item?.menu_layout_es &&
                      activeSubMenu &&
                      index === clickedMenuItem &&
                      renderMenuLayout(item)}
                    {/* {renderMenuLayout(item)} */}
                  </div>
                </li>
              </Fragment>
            );
          })}
      </ul>
    </>
  );
};

export default ExpNewMenu;
