import { useCallback, useEffect, useState } from 'react';
import { ExpGetMenuById } from '../api';
import { ExpNavigate } from '../utils/link-parser';

interface ExpMenuControllerProps {
  menuLinkObj: any;
  childMenuItem?: any;
  keyValueForMenu: string;
  index?: number;
  categories?: any;
  isCategoryLoading?: boolean;
  setCategories?: any;
  iconForNavChild?: any;
}
const ExpMenuController = (props: ExpMenuControllerProps) => {
  const { menuLinkObj, childMenuItem, keyValueForMenu, categories, isCategoryLoading } = props;

  const [isMenuOptionsHandled, setIsMenuOptionsHandled] = useState(false);

  let menuId = menuLinkObj && menuLinkObj[0];
  menuId = menuId && menuId[keyValueForMenu];

  const [menuData, setMenuData] = useState<any>(menuLinkObj ? [] : childMenuItem);

  const getMenuObj = useCallback(async () => {
    if (menuLinkObj && menuId) {
      const menuDataResponse = await ExpGetMenuById(menuId);
      if (menuDataResponse.Status === 'success') {
        const updatedMenuData = JSON.parse(
          JSON.stringify(menuDataResponse?.Data?.item?.content_ej),
        );
        updatedMenuData?.forEach((element: any) => {
          if (element?.name === 'Shop') {
            element.children = categories;
          }
        });
        setMenuData(updatedMenuData);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuLinkObj]);

  useEffect(() => {
    getMenuObj();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterNavStringForClass = (menuName: string) => {
    if (!menuName) return false;

    return menuName
      ?.replace(/[^a-zA-Z]/g, ' ')
      ?.split(' ')
      ?.join('-')
      ?.toLowerCase();
  };

  const getMenuNameToShow = (menuItem: any) => {
    return menuItem.content_model_internal_name === 'custom_links'
      ? menuItem.name_esi ||
          menuItem?.navigation_label ||
          menuItem.menu_title_es ||
          menuItem.navigation_title ||
          menuItem.title ||
          menuItem.name
      : menuItem?.navigation_label ||
          menuItem.menu_title_es ||
          menuItem.navigation_title ||
          menuItem.title ||
          menuItem.name ||
          menuItem.name_esi;
  };

  const toggleMenuWithChild = (id: any) => {
    const liTag: any = document.getElementById(id);
    if (window.innerWidth < 1280) {
      if (liTag?.classList.contains('is-expanded')) {
        const innerUl = liTag.querySelector('ul');
        if (innerUl) {
          innerUl.style.display = 'none';
        }
        liTag.classList.remove('is-expanded');
      } else {
        const innerUl = liTag.querySelector('ul');
        if (innerUl) {
          innerUl.style.display = 'block';
        }
        liTag?.classList.add('is-expanded');
      }
    }
  };

  const onMouseOver = (id: any, index: any) => {
    const liTag: any = document.getElementById(id);
    const innerUl: any = liTag.querySelector('ul');
    const groupLi = document.querySelectorAll(`.cl-${index}`);
    groupLi.forEach((ele: any) => {
      if (ele?.id !== innerUl?.id) {
        ele.style.display = 'none';
      } else {
        ele.style.display = 'block';
      }
    });
  };
  const onMouseOut = (id: any, index: any) => {
    const liTag: any = document.getElementById(id);
    const innerUl: any = liTag.querySelector('ul');
    const groupLi = document.querySelectorAll(`.cl-${index + 1}`);
    groupLi.forEach((ele: any) => {
      if (ele?.id !== innerUl?.id) {
        ele.style.display = 'none';
      }
    });
  };

  const updateMenuData = (categories: any) => {
    const updatedMenuData = JSON.parse(JSON.stringify(menuData));
    const megaMenu = updatedMenuData.find((menu: any) => menu.class_name === 'mega-menu');

    if (megaMenu) {
      megaMenu.children = categories;
    }

    return updatedMenuData;
  };

  function toKebabCase(string: string) {
    return string
      ?.replace(/([a-z])([A-Z])/g, '$1-$2')
      ?.replace(/\s+/g, '-')
      ?.toLowerCase();
  }

  const handleMenuMoreOptions = () => {
    if (isMenuOptionsHandled) return;
    if (keyValueForMenu?.includes('primary')) {
      let b2bIframe: any = document.getElementById('b2b-iframe');
      if (b2bIframe) {
        b2bIframe = b2bIframe?.contentDocument;

        let liTag: any = b2bIframe?.querySelectorAll('.mega-menu');

        if (liTag?.length > 0) {
          liTag?.forEach((menu: any) => {
            if (menu.id) {
              liTag = menu;
            }
          });
          const ulTag = liTag?.querySelector('ul');

          const calculateWidthAndUpdateMenu = () => {
            if (ulTag?.childNodes?.length > 0) {
              let count: number = -1;
              let totalWidth: number = 0;
              let padding: number;

              if (window.matchMedia('(min-width: 1440px)').matches) {
                padding = 150; //75+75
              } else {
                padding = 8; //0+8
              }

              for (const li of ulTag?.childNodes) {
                totalWidth += (li as HTMLElement).clientWidth;
                if (totalWidth <= ulTag.clientWidth - padding) {
                  count++;
                } else {
                  break;
                }
              }

              if (count > 0) {
                setIsMenuOptionsHandled(true);
                const megaMenuItem = menuData?.findIndex((menu: any) => {
                  return menu?.class_name === 'mega-menu';
                });
                if (megaMenuItem !== -1) {
                  const fittingItems = categories.slice(0, count);
                  const extraItems = categories.slice(count);

                  const newObj = {
                    id: 'more-childs',
                    title: 'More',
                    name_esi: 'More',
                    page_slug_esi: '/',
                    content_model_name: 'Custom Links',
                    content_model_internal_name: 'custom_links',
                    children: extraItems,
                  };

                  if (extraItems.length > 0) {
                    fittingItems.push(newObj);
                  }

                  ulTag.innerHTML = '';
                  fittingItems.forEach((item: any) => {
                    const li = document.createElement('li');
                    li.className = `cat-li-one group text-primary hover:text-primaryHover hover:bg-[#eaeaec] xl:w-auto w-full relative ${toKebabCase(
                      item?.name_esi,
                    )}`;

                    if (item.id !== 'more-childs') {
                      li.setAttribute('data-id', item.page_slug_esi);
                    }

                    const divWrapper = `
                  <div class="link-wrap xl:w-auto w-full relative navigation-mega-menu-link" data-id=${
                    item.page_slug_esi
                  }>
                    <span class="flex items-center xl:justify-start justify-between xl:text-base text-sm leading-4 xl:w-auto w-full xl:font-medium text-primary hover:text-primaryHover 2xl:px-5 xl:px-3 xl:py-5 py-[0.625rem] cursor-pointer">
                      ${item.name_esi}
                      ${
                        item.children && item.children.length > 0
                          ? `
                            <span class="">
                              <i class="flex icon xl:text-primary text-gray-500 xl:w-[0.625rem] xl:h-[0.3125rem] ml-2">
                                <svg width="20" height="11" viewBox="0 0 20 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M0 0.0134277H20L9.9251 10.0134L0 0.0134277Z" fill="currentColor" />
                                </svg>
                              </i>
                            </span>
                          `
                          : ''
                      }
                    </span>
                  </div>
                `;

                    li.innerHTML = divWrapper;

                    if (item.children && item.children.length > 0) {
                      const childUl = createChildMenu(item, 'two');
                      if (childUl) {
                        li.appendChild(childUl);
                      }
                    }

                    ulTag.appendChild(li);
                  });
                }
              }
            }
          };
          calculateWidthAndUpdateMenu();
        }
      }
    }
  };

  const createChildMenu = (item: any, index: string) => {
    if (index === 'four') return null;

    const childUl: any = document.createElement('ul');
    const Ulclasses: any = {
      two: `cat-ul-two group group-[&>.is-expanded]:block bg-white xl:absolute xl:top-full xl:w-[17.5rem] w-full xl:shadow-[0_6px_17px_-4px_rgba(0,0,0,0.24)] xl:p-[0.938rem] xl:pl-0 pl-2 pt-0 xl:space-y-3 group-[&.cat-li-one:hover]:block hidden xl:[&_li.cat-li-two]:pl-[0.938rem] [&_li+li]:mt-4 ${
        item.id === 'more-childs' ? 'right-menu !right-0 !left-auto' : ''
      }`,
      three: `cat-ul-three group group-[&>.is-expanded]:block bg-white xl:absolute xl:top-0 xl:left-auto xl:right-full xl:w-[17.5rem] w-full xl:shadow-[0_6px_17px_-4px_rgba(0,0,0,0.24)] xl:p-[0.938rem] xl:pl-[0.938rem] pl-2 pt-0 xl:space-y-3 group-[&.cat-li-two:hover]:block hidden [&_li+li]:mt-4`,
    };
    childUl.className = Ulclasses[index];

    item.children.forEach((child: any) => {
      const childLi = document.createElement('li');
      childLi.className = `cat-li-${index} group text-primary hover:text-primaryHover xl:w-auto w-full relative`;
      childLi.setAttribute('data-id', child.page_slug_esi);

      const childDivWrapper = `
        <div class="link-wrap xl:w-auto w-full relative navigation-mega-menu-link pl-4" data-id=${
          child.page_slug_esi
        }>
          <span class="${`flex items-center xl:justify-start justify-between xl:text-base text-sm leading-5 xl:w-auto w-full xl:font-medium text-primary hover:text-primaryHover cursor-pointer ${
            index === 'two' ? 'xl:flex-row-reverse xl:!justify-end' : ''
          }`}">
            ${child.name_esi}
            ${
              child.children && child.children.length > 0 && index !== 'three'
                ? `
                  <span>
                      <i class="${`flex icon xl:text-primary text-gray-500 xl:w-[0.625rem] xl:h-[0.3125rem] xl:[&>svg]:w-auto xl:[&>svg]:h-auto [&>svg]:w-3 [&>svg]:h-[0.625rem] ml-2 ${
                        index === 'two'
                          ? 'xl:!ml-0 xl:mr-2 xl:!w-2.5 xl:!h-2.5 xl:rotate-90 absolute left-0 top-1/2 -translate-y-1/2'
                          : ''
                      }`}">
                          <svg width="20" height="11" viewBox="0 0 20 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 0.0134277H20L9.9251 10.0134L0 0.0134277Z" fill="currentColor" />
                          </svg>
                      </i>
                  </span>
                  `
                : ''
            }
          </span>
        </div>
      `;

      childLi.innerHTML = childDivWrapper;

      if (child.children && child.children.length > 0) {
        const nextIndex = index === 'two' ? 'three' : 'four';
        const subMenu = createChildMenu(child, nextIndex);
        if (subMenu) childLi.appendChild(subMenu);
      }

      childUl.appendChild(childLi);
    });
    attachNavigationMenuClickEvents();
    return childUl;
  };

  const attachNavigationMenuClickEvents = () => {
    let attempts = 0;
    const maxAttempts = 20;
    const intervalTime = 500;

    const intervalId = setInterval(() => {
      const navigationMenuItems = document.querySelectorAll('.navigation-mega-menu-link');

      if (navigationMenuItems && navigationMenuItems.length) {
        navigationMenuItems.forEach((menuItem: any) => {
          if (!menuItem.getAttribute('data-click-attached')) {
            menuItem.onclick = () => {
              const pageSlug = menuItem.getAttribute('data-id');
              if (pageSlug !== 'undefined') {
                ExpNavigate(pageSlug);
              }
            };

            menuItem.setAttribute('data-click-attached', 'true');
          }
        });

        clearInterval(intervalId);
      }
      attempts++;
      if (attempts >= maxAttempts) {
        clearInterval(intervalId);
      }
    }, intervalTime);
  };

  useEffect(() => {
    if (
      categories &&
      categories?.length > 0 &&
      keyValueForMenu.includes('primary') &&
      !isCategoryLoading
    ) {
      const updatedMenuData = updateMenuData(categories);
      setMenuData(updatedMenuData);
      if (window.innerWidth >= 1280) {
        handleMenuMoreOptions();
      }
    }
  }, [isCategoryLoading]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        handleMenuMoreOptions();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuData]);

  return {
    menuData,
    onMouseOver,
    onMouseOut,
    filterNavStringForClass,
    getMenuNameToShow,
    toggleMenuWithChild,
    handleMenuMoreOptions,
    isMenuOptionsHandled,
  };
};
export default ExpMenuController;
