import { Fragment } from 'react/jsx-runtime';
import { IconArrowPrev } from '../assets/icons/arrow-prev';
import { IconCross } from '../assets/icons/icon-cross';
import { ExpImageParser, ExpLinkParser } from '../utils';
import { removeHtmlTags } from '../utils/remove-html-tags';

const MenuLayoutOne = (props: any) => {
  const {
    menuItem,
    setClickedMainMenuItem,
    addClassToOpenMobileMenu,
    isLoadingForBlogs,
    posts,
    isMobileView,
  } = props;

  const removeMenuActive = () => {
    const newMenu = document.querySelector('.main-menu-list');
    const navigation_block = document.querySelector('.navigation-block-inner');
    navigation_block?.classList.remove('active-menu');
    if (newMenu?.classList.contains('menu-active')) {
      newMenu?.classList.remove('menu-active');
    }
    setClickedMainMenuItem(null);
  };

  return (
    <div className="has-nav-list lg:flex hidden lg:bg-white bg-[#EBEFF2] lg:w-[848px] w-full lg:absolute fixed top-0 left-0 lg:bottom-auto bottom-0 lg:top-full lg:left-1/2 lg:-translate-x-1/2 lg:shadow-[inset_0px_7px_9px_-7px_rgba(0,0,0,0.15),0px_7px_9px_0px_rgba(0,0,0,0.15)] lg:group-[.transparent-header]/body:shadow-none z-10 group-[&.menu-active]/newMenu:flex lg:opacity-0 lg:invisible lg:group-[&.menu-active]/newMenu:opacity-100 lg:group-[&.menu-active]/newMenu:visible lg:duration-500 lg:transition-all">
      <div className="left-block p-7 xl:bg-[#ECEDED] xl:w-[295px] w-full">
        <div className="flex items-center lg:justify-start justify-between lg:mb-5 mb-3 lg:pb-0 pb-5 lg:border-b-0 border-b-[2px] border-[#E5E5E5]">
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
            }}
          >
            <i className="w-6 h-6 flex text-primary">
              <IconCross />
            </i>
          </span>
        </div>
        <ul className="lg:flex flex-wrap -mx-2 xl:[&_li]:w-1/2 [&_li]:px-2 mb-3.5 lg:h-auto h-[calc(100%_-_110px)] lg:overflow-visible overflow-auto">
          {!!menuItem?.sub_menu_com?.length &&
            menuItem?.sub_menu_com?.map((item: any, index: any) => {
              return (
                <Fragment key={index.toString()}>
                  {item?.sub_menu_title_et && (
                    <li>
                      <div className="link-wrap">
                        {item?.sub_menu_link_et ? (
                          <ExpLinkParser
                            ariaLabel={item?.sub_menu_title_et}
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
          <div
            style={{
              backgroundColor: menuItem?.menu_banner_com[0]?.banner_background_color_es
                ? menuItem?.menu_banner_com[0]?.banner_background_color_es
                : '#ea7030',
              color: menuItem?.banner_text_color_es ? menuItem?.banner_text_color_es : '#ffffff',
            }}
            className="menu-banner text-sm leading-4 p-3.5 rounded-[10px] lg:block hidden"
            dangerouslySetInnerHTML={{
              __html: menuItem?.menu_banner_com[0]?.banner_text_et,
            }}
          />
        )}
      </div>
      <div className="right-block lg:w-[calc(100%_-_295px)] py-8 px-4 lg:flex hidden items-center justify-center">
        <div className="blog-list [&_.blog-item+.blog-item]:border-t-2 [&_.blog-item+.blog-item]:mt-[23px] [&_.blog-item+.blog-item]:pt-[23px] [&_.blog-item+.blog-item]:border-[#ECEDED]">
          {isLoadingForBlogs && (
            <div className="relative flex justify-center items-center">
              <div className="w-14 h-14 rounded-full absolute border-[3px] border-solid border-gray-400"></div>
              <div className="w-14 h-14 rounded-full animate-spin absolute border-[3px] border-solid border-primaryHover border-t-transparent"></div>
            </div>
          )}
          {!isLoadingForBlogs &&
            !!posts?.results?.length &&
            posts?.results?.slice(0, 2)?.map((blogItemData: any) => (
              <ExpLinkParser className="blog-item flex" to={blogItemData?.url} target="_blank">
                <div className=" flex">
                  <div className="img-block w-[170px] bg-[#ECEDED] [&_img]:w-full [&_img]:h-full [&_img]:object-cover [&_img]:aspect-[1/0.62] [&_img]:rounded-[10px] rounded-[10px]">
                    <img
                      className="lg:h-[16.25rem] h-[10.625rem] object-contain w-full"
                      src={blogItemData?.featuredImage}
                      width={170}
                      height={105}
                      // name={`ExpBlogItem_${blogItemData?.name}`}
                      alt={blogItemData?.name}
                      title={blogItemData?.name}
                    />
                  </div>
                  <div className="content-block w-[calc(100%_-_170px)] pl-4">
                    <strong className="block text-primary hover:text-primaryHover text-base leading-6 mb-2.5 line-clamp-2">
                      {blogItemData?.name}
                    </strong>
                    <p
                      className="mb-0 text-xs leading-5 line-clamp-2"
                      dangerouslySetInnerHTML={{
                        __html: removeHtmlTags(blogItemData?.postSummary),
                      }}
                    />
                  </div>
                </div>
              </ExpLinkParser>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MenuLayoutOne;
