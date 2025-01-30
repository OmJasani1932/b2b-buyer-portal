import { Fragment } from 'react/jsx-runtime';
import { useEffect, useState } from 'react';
import { IconArrowPrev } from '../assets/icons/arrow-prev';
import { IconCross } from '../assets/icons/icon-cross';
import { ExpImageParser, ExpLinkParser } from '../utils';
import { removeHtmlTags } from '../utils/remove-html-tags';

const MenuLayoutOne = (props: any) => {
  const { menuItem, setClickedMainMenuItem, addClassToOpenMobileMenu } = props;
  const [posts, setPosts] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getBlogs = async () => {
    setIsLoading(true);
    try {
      const API_URL =
        'https://dev-bigcom-customer-service.cookandboardman.io/apis/customer-service/v1/blogs/posts?state__contains=PUBLISHED&sort=-publishDate&limit=2';

      const data = await fetch(API_URL, {
        headers: {
          clientid: 'customer-6d7c536b-a64b-489d-9873-b19b13e3ab33',
        },
      });

      const res = await data.json();
      if (res?.Status === 'success') {
        setPosts(res?.Data);
        setIsLoading(false);
      }
    } catch (err: any) {
      setIsLoading(false);
      console.error(err);
    }
  };

  const removeMenuActive = () => {
    const newMenu = document.querySelector('.main-menu-list');
    const navigation_block = document.querySelector('.navigation-block-inner');
    navigation_block?.classList.remove('active-menu');
    if (newMenu?.classList.contains('menu-active')) {
      newMenu?.classList.remove('menu-active');
    }
    setClickedMainMenuItem(null);
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <div className="has-nav-list xl:flex hidden xl:bg-[#ffffff] bg-[#EBEFF2] xl:w-[848px] w-full xl:absolute fixed top-0 left-0 xl:bottom-auto bottom-0 xl:top-full xl:left-1/2 xl:-translate-x-1/2 z-10 group-[&.menu-active]/newMenu:flex xl:opacity-0 xl:invisible xl:group-[&.menu-active]/newMenu:opacity-100 xl:group-[&.menu-active]/newMenu:visible xl:duration-500 xl:transition-all">
      <div className="left-block p-7 xl:bg-[#ECEDED] xl:w-[295px] w-full">
        <div className="flex items-center xl:justify-start justify-between mb-5 xl:pb-0 pb-5 xl:border-b-0 border-b-[2px] border-[#E5E5E5]">
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
            }}>
            <i className="w-6 h-6 flex text-primary">
              <IconCross />
            </i>
          </span>
        </div>
        <ul className="xl:flex flex-wrap -mx-2 xl:[&_li]:w-1/2 [&_li]:px-2 mb-3.5 xl:h-auto h-[calc(100%_-_110px)] xl:overflow-visible overflow-auto">
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
              className="menu-banner text-sm leading-4 p-3.5 rounded-[10px] xl:block hidden"
              dangerouslySetInnerHTML={{
                __html: menuItem?.menu_banner_com[0]?.banner_text_et,
              }}
            />
          )}
      </div>
      <div className="right-block xl:w-[calc(100%_-_295px)] py-8 px-4 xl:flex hidden items-center justify-center">
        <div className="blog-list [&_.blog-item+.blog-item]:border-t-2 [&_.blog-item+.blog-item]:mt-[23px] [&_.blog-item+.blog-item]:pt-[23px] [&_.blog-item+.blog-item]:border-[#ECEDED]">
          {isLoading && (
            <div className="relative flex justify-center items-center">
              <div className="w-14 h-14 rounded-full absolute border-[3px] border-solid border-gray-400"></div>
              <div className="w-14 h-14 rounded-full animate-spin absolute border-[3px] border-solid border-primaryHover border-t-transparent"></div>
            </div>
          )}
          {!isLoading &&
            !!posts?.results?.length &&
            posts?.results?.slice(0, 2)?.map((blogItemData: any) => (
              <ExpLinkParser
                className="blog-item flex"
                to={blogItemData?.url}
                target="_blank">
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
