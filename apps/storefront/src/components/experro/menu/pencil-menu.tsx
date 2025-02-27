import { HeroIconArrowRight } from '../assets/icons/arrow-right-two';
import { ExpImageParser, ExpLinkParser } from '../utils';
import ExpMenuController from './menu-controller';
import React from 'react';

interface ExpPencilMenuInterface {
  menuLinkObj?: any;
  ulClasses?: string;
  liClasses?: string;
  linkNameClasses?: string;
  childMenuItem?: any;
  keyValueForMenu: string;
  iconForNavChild?: any;
  index?: number;
  ulId?: any;
}
const ExpPencilMenu = (props: ExpPencilMenuInterface) => {
  const {
    menuLinkObj,
    ulClasses,
    liClasses,
    linkNameClasses,
    childMenuItem,
    keyValueForMenu,
    ulId,
  } = props;

  const { menuData, filterNavStringForClass, getMenuNameToShow } = ExpMenuController({
    menuLinkObj,
    childMenuItem,
    keyValueForMenu,
  });

  return (
    <ul className={`${ulClasses}`} id={ulId ? ulId : ''}>
      {menuData?.map((menuItem: any) => {
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
                id={menuItem?.id}
                key={menuItem?.id}
                className={`${liClasses} nav-item-${
                  menuItem.content_model_internal_name === 'custom_links'
                    ? filterNavStringForClass(menuItem.name_esi)
                    : filterNavStringForClass(menuItem.menu_title_es) ||
                      filterNavStringForClass(menuItem.title)
                } 
                   ${menuItem?.class_name ? menuItem?.class_name : ''}`}
              >
                {!menuItem.isExternalLink || !menuItem?.children?.length ? (
                  <ExpLinkParser
                    to={
                      menuItem?.redirectLink === `/xp5agt0qcq/wood-doors/` ||
                      menuItem?.redirectLink === '/wood-doors/'
                        ? '/commercial-wood-doors/'
                        : menuItem?.redirectLink
                    }
                    className={`${linkNameClasses} item-link`}
                    // id={menuItem?.id}
                    target={menuItem?.link_target === 'New Tab' ? '_blank' : ''}
                  >
                    {menuItem?.menu_icon_emd ? (
                      <strong className="mr-1.5 xl:flex items-center justify-center w-6 h-6">
                        <img
                          src={
                            ExpImageParser(
                              menuItem?.menu_icon_emd ? menuItem?.menu_icon_emd[0] : '',
                            )?.publicUrl
                          }
                          // name={`menu-${getMenuNameToShow(menuItem)}`}
                          alt={`menu-${getMenuNameToShow(menuItem)}`}
                          title={`menu-${getMenuNameToShow(menuItem)}`}
                          width={16}
                          height={16}
                          // lazyLoad={false}
                        />
                      </strong>
                    ) : (
                      <strong className="mr-1.5 xl:flex items-center justify-center relative w-6 h-6 menu-icon-block">
                        {/* <i
                          className="icon w-6 h-6 "
                          dangerouslySetInnerHTML={{
                            __html: menuItem?.menu_svg_code_et,
                          }}
                        ></i> */}
                        {menuItem?.menu_svg_hover_icon_et ? (
                          <>
                            <i
                              className="icon w-6 h-6 main-icon absolute left-0 right-0 top-0 bottom-0 transition-all duration-500 flex items-center justify-center"
                              dangerouslySetInnerHTML={{
                                __html: menuItem?.menu_svg_code_et,
                              }}
                            ></i>
                            <i
                              className="icon w-6 h-6 hover-icon absolute left-0 right-0 top-0 bottom-0 transition-all duration-500 opacity-0 invisible flex items-center justify-center"
                              dangerouslySetInnerHTML={{
                                __html: menuItem?.menu_svg_hover_icon_et,
                              }}
                            ></i>
                          </>
                        ) : (
                          <i
                            className="icon w-6 h-6 flex items-center justify-center"
                            dangerouslySetInnerHTML={{
                              __html: menuItem?.menu_svg_code_et,
                            }}
                          ></i>
                        )}
                      </strong>
                    )}
                    <strong className="menu-name">{getMenuNameToShow(menuItem)}</strong>
                    <strong className="xl:hidden block">
                      <i className="icon flex md:w-2 w-2 absolute right-8 top-1/2 -translate-y-1/2">
                        <HeroIconArrowRight />
                      </i>
                    </strong>
                  </ExpLinkParser>
                ) : !menuItem.isNull ? (
                  <ExpLinkParser
                    to={
                      menuItem?.redirectLink === `/xp5agt0qcq/wood-doors/` ||
                      menuItem?.redirectLink === '/wood-doors/'
                        ? '/commercial-wood-doors/'
                        : menuItem?.redirectLink
                    }
                    className={linkNameClasses}
                    // id={menuItem?.id}
                    target={menuItem?.link_target === 'New Tab' ? '_blank' : ''}
                  >
                    {menuItem?.menu_icon_emd && (
                      <span className="mr-1.5 xl:block hidden">
                        <img
                          src={
                            ExpImageParser(
                              menuItem?.menu_icon_emd ? menuItem?.menu_icon_emd[0] : '',
                            )?.publicUrl
                          }
                          // name={`menu-${getMenuNameToShow(menuItem)}`}
                          alt={`menu-${getMenuNameToShow(menuItem)}`}
                          title={`menu-${getMenuNameToShow(menuItem)}`}
                          width={16}
                          height={16}
                          // lazyLoad={false}
                        />
                      </span>
                    )}
                    <span>{getMenuNameToShow(menuItem)}</span>
                  </ExpLinkParser>
                ) : (
                  <p>
                    {menuItem?.menu_icon_emd && (
                      <span className="mr-1.5 xl:block hidden">
                        <img
                          src={
                            ExpImageParser(
                              menuItem?.menu_icon_emd ? menuItem?.menu_icon_emd[0] : '',
                            )?.publicUrl
                          }
                          // name={`menu-${getMenuNameToShow(menuItem)}`}
                          alt={`menu-${getMenuNameToShow(menuItem)}`}
                          title={`menu-${getMenuNameToShow(menuItem)}`}
                          width={16}
                          height={16}
                          // lazyLoad={false}
                        />
                      </span>
                    )}
                    <span>{getMenuNameToShow(menuItem)}</span>
                  </p>
                )}
              </li>
            </>
          </React.Fragment>
        );
      })}
    </ul>
  );
};

export default ExpPencilMenu;
