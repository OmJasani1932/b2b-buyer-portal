// import { IconUser } from '../assets/icons/icon-user';
import { ExpLinkParser } from '../utils';
import ExpMenuController from './menu-controller';
import React from 'react';

interface ExpMenuInterface {
  menuLinkObj?: any;
  ulClasses?: string;
  liClasses?: string;
  linkNameClasses?: string;
  childMenuItem?: any;
  keyValueForMenu: string;
  iconForNavChild?: any;
  index?: number;
  ulId?: any;
  categories?: any;
  isCategoryLoading?: any;
  handleLogout?: any;
}
const ExpMenu = (props: ExpMenuInterface) => {
  const {
    menuLinkObj,
    ulClasses,
    liClasses,
    linkNameClasses,
    childMenuItem,
    keyValueForMenu,
    iconForNavChild,
    index = 1,
    ulId,
    categories,
    isCategoryLoading,
    handleLogout,
  } = props;

  const {
    menuData,
    filterNavStringForClass,
    getMenuNameToShow,
    toggleMenuWithChild,
    onMouseOver,
    onMouseOut,
    handleMenuMoreOptions,
    isMenuOptionsHandled,
    toKebabCase,
  } = ExpMenuController({
    menuLinkObj,
    childMenuItem,
    keyValueForMenu,
    categories,
    isCategoryLoading,
    index,
  });

  return (
    <ul className={`${ulClasses}`} id={ulId ? ulId : ''}>
      {menuData?.map((menuItem: any, menuIndex: number) => {
        if (
          ((menuItem?.page_slug && menuItem.page_slug) ||
            (menuItem?.page_slug_esi && menuItem.page_slug_esi)) !== '#' ||
          (menuItem?.link_es && menuItem.link_es !== '#')
        ) {
          menuItem.redirectLink =
            menuItem?.type === 'link'
              ? menuItem?.link_es
              : menuItem?.page_slug || menuItem?.page_slug_esi;

          if (menuItem?.redirectLink?.indexOf('//') !== -1) {
            if (
              menuItem?.redirectLink &&
              new URL(menuItem?.redirectLink)?.host === new URL(window.location.href)?.host
            ) {
              menuItem.redirectLink = new URL(menuItem?.redirectLink)?.pathname;
            } else {
              menuItem.isExternalLink = true;
            }
          }
        } else {
          menuItem.isExternalLink = true;
          menuItem.isNull = true;
        }

        return (
          <React.Fragment key={menuItem?.id}>
            <>
              <li
                onMouseOver={() => {
                  if (index === 0 && window.innerWidth >= 1280) {
                    if (!isMenuOptionsHandled) {
                      handleMenuMoreOptions();
                    }
                  }
                }}
                id={menuItem?.id}
                key={menuItem?.id}
                className={`${liClasses}${
                  menuItem?.children?.length
                    ? ` text-primary hover:text-primaryHover [&.is-expanded>.link-wrap>div>.icon]:text-primary [&.is-expanded>.link-wrap>div>.icon]:rotate-180 [&.is-expanded>.link-wrap>div>.icon]:transition-all`
                    : ''
                } ${toKebabCase(menuItem?.name_esi)} nav-item-${
                  menuItem.content_model_internal_name === 'custom_links'
                    ? filterNavStringForClass(menuItem.name_esi)
                    : filterNavStringForClass(menuItem.menu_title_es) ||
                      filterNavStringForClass(menuItem.title)
                } ${menuItem?.class_name ? menuItem?.class_name : ''}`}
              >
                {!menuItem.isExternalLink || !menuItem?.children?.length ? (
                  <div
                    className="link-wrap xl:w-auto w-full relative"
                    onClick={() => toggleMenuWithChild(menuItem?.id)}
                    onMouseOver={() => {
                      if (index > 0) onMouseOver(menuItem?.id, index);
                    }}
                    onMouseOut={() => {
                      onMouseOut(menuItem?.id, index);
                    }}
                  >
                    <ExpLinkParser
                      to={
                        menuItem?.redirectLink === `/xp5agt0qcq/wood-doors/` ||
                        menuItem?.redirectLink === '/wood-doors/'
                          ? '/commercial-wood-doors/'
                          : menuItem?.redirectLink
                      }
                      className={linkNameClasses}
                      target={menuItem?.link_target === 'New Tab' ? '_blank' : ''}
                    >
                      {getMenuNameToShow(menuItem)}
                      {!!menuItem?.children?.length && (
                        <span className="xl:block hidden">{iconForNavChild}</span>
                      )}
                    </ExpLinkParser>
                    {!!menuItem?.children?.length && (
                      <div className="xl:hidden flex items-center justify-center w-9 h-9 absolute xl:top-[0.125rem] top-1/2 -xl:translate-y-0 -translate-y-1/2 right-0">
                        {iconForNavChild}
                      </div>
                    )}
                  </div>
                ) : !menuItem.isNull ? (
                  <div
                    className="link-wrap xl:w-auto w-full relative"
                    onMouseOver={() => {
                      if (index > 0) onMouseOver(menuItem?.id, index);
                    }}
                    onMouseOut={() => {
                      onMouseOut(menuItem?.id, index);
                    }}
                  >
                    <ExpLinkParser
                      to={
                        menuItem?.redirectLink === `/xp5agt0qcq/wood-doors/` ||
                        menuItem?.redirectLink === '/wood-doors/'
                          ? '/commercial-wood-doors/'
                          : menuItem?.redirectLink
                      }
                      className={linkNameClasses}
                      target={menuItem?.link_target === 'New Tab' ? '_blank' : ''}
                    >
                      {getMenuNameToShow(menuItem)}
                      <span className="xl:block hidden">{iconForNavChild}</span>
                    </ExpLinkParser>
                    <div className="xl:hidden flex items-center justify-center w-9 h-9 absolute top-[0.125rem] right-0">
                      {iconForNavChild}
                    </div>
                  </div>
                ) : (
                  <div
                    className="link-wrap xl:w-auto w-full relative"
                    onClick={() => toggleMenuWithChild(menuItem?.id)}
                  >
                    <p className="flex items-center xl:justify-start justify-between text-sm 2xl:text-base font-medium text-primary xl:py-[2.0625rem] py-[0.625rem] leading-5 transition-all duration-200 ease-linear relative xl:before:content-[''] before:absolute xl:before:w-full xl:before:h-1 xl:before:left-0 xl:before:bottom-0 xl:before:bg-primary xl:before:invisible xl:before:transition-all xl:before:duration-300 before:ease-linear xl:group-[:hover]:before:visible mb-0 cursor-pointer">
                      {getMenuNameToShow(menuItem)}{' '}
                      <span className="xl:block hidden">{iconForNavChild}</span>
                    </p>
                    <div className="xl:hidden flex items-center justify-center w-9 h-9 absolute top-[0.125rem] right-0">
                      {iconForNavChild}
                    </div>
                  </div>
                )}

                {!!menuItem?.children?.length && (
                  <>
                    <ExpMenu
                      childMenuItem={menuItem.children}
                      ulClasses={
                        menuItem?.class_name === 'mega-menu'
                          ? `group-[.is-expanded]:block xl:invisible xl:group-hover:visible xl:bg-white xl:absolute xl:top-full w-full xl:left-0 2xl:px-[4.6875rem] 2xl:pl-[4.6875rem] pl-2 xl:before:shadow-[0_7px_14px_0_rgba(0,0,0,.1)] xl:before:absolute xl:before:content-[''] xl:before:h-[0.625rem] xl:before:w-full xl:before:left-0 xl:before:top-[-0.6875rem] xl:flex flex-wrap justify-center hidden border-gray-50 xl:border-b-2 xl:[&_.brands_ul]:columns-5 [&_.brands_ul_.cat-ul-three]:!hidden [&_.brands_ul_.cat-li-two_.link-wrap_span_span]:!hidden xl:[&_.brands_ul]:py-7 xl:[&_.brands_ul]:px-12 2xl:[&_.brands_ul]:w-[1266px] xl:[&_.brands_ul]:w-[1156px] xl:[&_.brands_.cat-li-two]:pl-0 xl:[&_.commercial-washroom-accessories_ul]:columns-2 xl:[&_.commercial-washroom-accessories_ul]:w-[600px] xl:[&_.door-hardware_ul]:columns-2 xl:[&_.door-hardware_ul]:w-[600px] xl:[&_.right-menu_ul.cat-ul-two]:left-auto xl:[&_.right-menu_ul.cat-ul-two]:right-0`
                          : `${
                              index > 0
                                ? `cl-${index} xl:hidden xl:group-hover/level${index}:block group/level${index}-[.is-expanded]:block z-10 pl-2`
                                : 'xl:hidden xl:group-hover:block'
                            } group-[&>.is-expanded]:block bg-white xl:absolute xl:top-full xl:w-[17.5rem] w-full xl:shadow-[0_6px_17px_-4px_rgba(0,0,0,0.24)] xl:p-[0.938rem] xl:pl-[0.938rem] pl-2  pt-0 xl:space-y-3 xl:block hidden`
                      }
                      ulId={menuItem?.id}
                      liClasses={
                        menuItem?.class_name === 'mega-menu'
                          ? `group/level${index + 1} xl:hover:bg-gray-50 xl:w-auto w-full relative`
                          : `group/level${
                              index + 1
                            } text-primary hover:text-primaryHover xl:w-auto w-full`
                      }
                      linkNameClasses={
                        menuItem?.class_name === 'mega-menu'
                          ? 'flex items-center xl:justify-start justify-between xl:text-base text-sm leading-5 xl:w-auto w-full xl:font-medium text-primary hover:text-primaryHover 2xl:px-5 xl:px-3 xl:py-5 py-1.5 cursor-pointer'
                          : 'flex items-center xl:text-base text-sm leading-5 xl:py-0 py-1.5 cursor-pointer'
                      }
                      keyValueForMenu={keyValueForMenu}
                      iconForNavChild={iconForNavChild}
                      index={index + 1}
                    />
                  </>
                )}
              </li>
            </>
            <>
              {menuData?.length - 1 === menuIndex &&
                index === 0 &&
                window.matchMedia('(max-width: 1024px)').matches && (
                  <>
                    <li
                      key={menuItem?.id}
                      className={`${liClasses}${
                        menuItem.children.length
                          ? ` text-primary hover:text-primaryHover xl:hidden`
                          : 'xl:hidden'
                      } nav-item-${
                        menuItem.content_model_internal_name === 'custom_links'
                          ? filterNavStringForClass(menuItem.name_esi)
                          : filterNavStringForClass(menuItem.menu_title_es) ||
                            filterNavStringForClass(menuItem.title)
                      }  ${menuItem?.class_name ? menuItem?.class_name : ''}`}
                    >
                      <div className="link-wrap xl:w-auto w-full relative">
                        <ExpLinkParser
                          to="/#/shoppingLists"
                          className={`!justify-start ${linkNameClasses}`}
                          // rel="noreferrer"
                        >
                          {/* <i className="icon w-[15px] h-[15px] flex mr-2">
                          <IconPerson />
                        </i> */}
                          Shopping List
                        </ExpLinkParser>
                      </div>
                    </li>

                    <li
                      key={menuItem?.id}
                      className={`${liClasses}${
                        menuItem.children.length
                          ? ` text-primary hover:text-primaryHover xl:hidden`
                          : 'xl:hidden'
                      } nav-item-${
                        menuItem.content_model_internal_name === 'custom_links'
                          ? filterNavStringForClass(menuItem.name_esi)
                          : filterNavStringForClass(menuItem.menu_title_es) ||
                            filterNavStringForClass(menuItem.title)
                      }  ${menuItem?.class_name ? menuItem?.class_name : ''}`}
                    >
                      <div className="link-wrap xl:w-auto w-full relative">
                        <ExpLinkParser
                          to="/#/quotes"
                          className={`!justify-start ${linkNameClasses}`}
                          // rel="noreferrer"
                        >
                          {/* <i className="icon w-[15px] h-[15px] flex mr-2">
                          <IconPerson />
                        </i> */}
                          My Quote
                        </ExpLinkParser>
                      </div>
                    </li>

                    <li
                      key={menuItem?.id}
                      className={`${liClasses}${
                        menuItem?.children?.length
                          ? ` text-primary hover:text-primaryHover xl:hidden`
                          : 'xl:hidden'
                      } ${toKebabCase(menuItem?.name_esi)} nav-item-${
                        menuItem.content_model_internal_name === 'custom_links'
                          ? filterNavStringForClass(menuItem.name_esi)
                          : filterNavStringForClass(menuItem.menu_title_es) ||
                            filterNavStringForClass(menuItem.title)
                      } ${menuItem?.class_name ? menuItem?.class_name : ''}`}
                    >
                      <div className="link-wrap xl:w-auto w-full relative">
                        <ExpLinkParser
                          to={'/#/orders'}
                          className={`!justify-start ${linkNameClasses}`}
                        >
                          {/* <i className="icon w-[15px] h-[15px] flex mr-2 [&_svg]:w-full [&_svg]:h-full">
                          <IconUser />
                        </i> */}
                          Account
                        </ExpLinkParser>
                      </div>
                    </li>
                    <li
                      key={menuItem?.id}
                      className={`${liClasses}${
                        menuItem.children.length
                          ? ` text-primary hover:text-primaryHover xl:hidden`
                          : 'xl:hidden'
                      } nav-item-${
                        menuItem.content_model_internal_name === 'custom_links'
                          ? filterNavStringForClass(menuItem.name_esi)
                          : filterNavStringForClass(menuItem.menu_title_es) ||
                            filterNavStringForClass(menuItem.title)
                      }  ${menuItem?.class_name ? menuItem?.class_name : ''}`}
                    >
                      <div className="link-wrap xl:w-auto w-full relative">
                        <span
                          onClick={handleLogout}
                          className={`!justify-start ${linkNameClasses}`}
                          rel="noreferrer"
                        >
                          {/* <i className="icon w-[15px] h-[15px] flex mr-2">
                          <IconPerson />
                        </i> */}
                          Logout
                        </span>
                      </div>
                    </li>
                  </>
                )}
            </>
          </React.Fragment>
        );
      })}
    </ul>
  );
};

export default ExpMenu;
