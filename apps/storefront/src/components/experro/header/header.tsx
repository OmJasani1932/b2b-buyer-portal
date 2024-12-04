import { IconCall } from '../assets/icons/icon-call';
import { IconUser } from '../assets/icons/icon-user';
import { IconBasket } from '../assets/icons/icon-basket';
import { IconSearch } from '../assets/icons/Icon-search';
import ExpMenu from '../menu/menu';
import { IconMenuDown } from '../assets/icons/menu-drop';
import { HeaderController } from './header-controller';
import { ExpImageParser, ExpLinkParser } from '../utils';
import { IconCross } from '../assets/icons/icon-cross';
import ExpSearchPreview from './search-preview';
import { ExpCartPreview } from '../cart-preview';

const Header = ({
  globalsettings,
  categories,
  isCategoryLoading,
}: {
  globalsettings: any;
  categories: any;
  isCategoryLoading?: boolean;
}) => {
  const {
    openCartSlider,
    basketRef,
    cartQuantity,
    isOpenCartPreview,
    setIsOpenCartPreview,
    cartDetails,
    addClassToOpenMobileMenu,
    showSearchPreview,
    removeClassToOpenSerch,
    addClassToOpenSerch,
    setSearchText,
    searchSuggestion,
    searchResult,
    isLoading,
    handleSubmit,
    searchText,
    searchInputRef,
    handleSearchChange,
    openSearchPreview,
    handleLogout,
  } = HeaderController();

  return (
    <>
      <header
        className="header-section bg-white relative xl:z-20 z-50 group-[.sticky-header]/body:fixed group-[.sticky-header]/body:top-0 group-[.sticky-header]/body:left-0 group-[.sticky-header]/body:bg-white group-[.sticky-header]/body:z-50 group-[.sticky-header]/body:w-full group-[.sticky-header]/body:animate-top-to-bottom group-[.sticky-header]/body:shadow-[0_5px_15px_rgba(0,0,0,.1)]"
        id={'header'}
      >
        <div className="header-container max-w-[120rem] 3xl:px-[4.6875rem] 2xl:px-10 md:px-5 px-4 xl:py-0 py-4">
          <div className="flex justify-end">
            <div className="mobile-menu-block xl:w-auto w-[20%] xl:hidden flex items-center">
              <ul className="flex items-center">
                <li>
                  <span
                    id="hamburger-menu"
                    onClick={addClassToOpenMobileMenu}
                    className="w-[1.125rem] h-5 flex items-center group"
                  >
                    <span className="bg-primary h-[0.125rem] w-[0.875rem] relative inline-block before:content-[''] before:bg-primary before:absolute before:h-[0.125rem] before:w-[1.125rem] before:top-[-0.375rem] before:left-0 after:content-[''] after:bg-primary after:absolute after:h-[0.125rem] after:w-[1.125rem] after:top-[0.375rem] after:left-0 group-[.is-open]:bg-transparent group-[.is-open]:before:rotate-45 group-[.is-open]:after:-rotate-45 group-[.is-open]:before:top-0 group-[.is-open]:after:top-0 transition-all">
                      &nbsp;
                    </span>
                  </span>
                </li>
                <li className="ml-4">
                  <span id="search-icon">
                    {showSearchPreview && (
                      <i
                        onClick={removeClassToOpenSerch}
                        className="icon w-5 h-5 flex search-close-icon text-gray-100"
                      >
                        <IconCross />
                        <span className="tooltip hidden">Close</span>
                      </i>
                    )}
                    {!showSearchPreview && (
                      <i
                        onClick={addClassToOpenSerch}
                        className="icon w-[1.0625rem] h-[1.0625rem] flex search-open-icon text-gray-100 [&_svg]:w-full [&_svg]:h-full"
                      >
                        <IconSearch />
                        <span className="tooltip hidden">Search</span>
                      </i>
                    )}
                  </span>
                </li>
              </ul>
            </div>
            <div className="logo-block flex items-center xl:justify-start justify-center w-[80%] xl:w-[15.9375rem] xl:mr-auto mr-0 xl:order-none order-2">
              <ExpLinkParser to="">
                <img
                  className="xsm:max-h-[60px] max-h-[50px] max-w-[fit-content] mx-auto"
                  src={
                    ExpImageParser(
                      globalsettings.site_com?.length && globalsettings.site_com[0]?.logo_emd
                        ? globalsettings.site_com[0]?.logo_emd[0]
                        : '',
                    )?.publicUrl
                  }
                  width={188}
                  height={60}
                  alt="C-and-B Logo"
                  title="C-and-B Logo"
                />
              </ExpLinkParser>
            </div>
            <div className="navigation-block xl:block xl:visible invisible group-[.mobile-menu-open]:visible xl:static fixed xl:w-auto w-full bg-white left-0 top-0 right-0 xl:h-auto h-[calc(100vh_-_92px)] z-10 xl:transform-none -translate-y-full transition-all group-[.mobile-menu-open]:translate-y-0  group-[.mobile-menu-open]:top-auto group-[.mobile-menu-open]:bottom-0 xl:p-0 p-5 pt-0 pb-7 xl:border-t-0 border-t border-gray-50">
              <div className="navigation-block-inner h-full xl:overflow-visible overflow-auto xl:pb-0 pb-8">
                <ExpMenu
                  menuLinkObj={globalsettings?.header_com}
                  ulClasses={'nav-list xl:flex h-full'}
                  liClasses={
                    'group nav-item 3xl:mx-5 2xl:mx-3 xl:mx-2 flex items-center flex-wrap xl:border-0 border-b border-gray-50 xl:flex-nowrap primary-navigation'
                  }
                  linkNameClasses={
                    "flex items-center xl:justify-start justify-between text-sm 2xl:text-base font-medium text-primary xl:py-[2.0625rem] py-[0.625rem] leading-5 transition-all duration-200 ease-linear relative xl:before:content-[''] before:absolute xl:before:w-full xl:before:h-1 xl:before:left-0 xl:before:bottom-0 xl:before:bg-primary xl:before:invisible xl:before:transition-all xl:before:duration-300 before:ease-linear xl:group-[:hover]:before:visible"
                  }
                  keyValueForMenu={'primary_navigation_menu_id_et'}
                  iconForNavChild={
                    <i className="flex icon xl:text-primary text-gray-500 xl:w-[0.625rem] xl:h-[0.3125rem] xl:[&>svg]:w-auto xl:[&>svg]:h-auto [&>svg]:w-3 [&>svg]:h-[0.625rem] ml-2 ">
                      <IconMenuDown />
                    </i>
                  }
                  index={0}
                  categories={categories}
                  isCategoryLoading={isCategoryLoading}
                />
              </div>
            </div>
            <div className="header-search-block 3xl:ml-10 2xl:ml-[0.75rem] xl:ml-[0.9375rem]  items-center xl:flex hidden xl:bg-white bg-primary xl:relative fixed group-[.search-open]:block xl:w-auto w-full xl:top-auto top-[92px] xl:left-auto left-0 xl:p-0 p-5">
              <form action="" className="xl:w-[200px] w-full" onSubmit={handleSubmit}>
                <div className="relative">
                  <i className="icon text-gray-200 w-[0.75rem] h-[0.75rem] flex absolute left-3 top-1/2 -translate-y-1/2 [&_svg]:w-full [&_svg]:h-full">
                    <IconSearch />
                  </i>
                  <input
                    ref={searchInputRef}
                    type="text"
                    className="block border border-gray-300 px-5 py-[0.6875rem] leading-4 text-sm w-full placeholder-gray-200 bg-white focus-visible:shadow-none focus-visible:outline-none focus-visible:border-primary !pl-8"
                    placeholder="Search the store"
                    onChange={handleSearchChange}
                    value={searchText}
                    onClick={openSearchPreview}
                  />
                </div>
              </form>

              {showSearchPreview && (
                <div className="search-result-block flex flex-col justify-space absolute top-full bg-white xl:w-[53.125rem] w-[calc(100%_-_40px)] xl:right-0 xl:left-auto left-[20px] p-5 border border-gray-300">
                  <ExpSearchPreview
                    setSearchText={setSearchText}
                    searchSuggestion={searchSuggestion}
                    productData={searchResult}
                    isLoading={isLoading}
                    handleSubmit={handleSubmit}
                    searchText={searchText}
                  />
                </div>
              )}
            </div>
            <div className="nav-user-block 3xl:ml-10 2xl:ml-5 xl:ml-[0.9375rem] xl:order-2 order-3 xl:w-auto w-[20%]">
              <ul className="3xl:-mx-5 2xl:-mx-4 xl:-mx-3 -mx-3 flex justify-end">
                <li className="nav-item 3xl:px-5 2xl:px-4 xl:px-3 px-3">
                  <ExpLinkParser
                    className="flex items-center text-[0px] xl:text-sm 2xl:text-base font-medium text-primary xl:py-[2.0625rem] py-5 leading-5"
                    to="contact-us"
                  >
                    <i className="flex icon 3xl:w-[1.375rem] 3xl:h-[1.375rem] 2xl:w-[1.375rem] 2xl:h-[1.375rem] xl:w-[1.25rem] xl:h-[1.25rem] h-[1.25rem] w-[1.25rem] mr-0 xl:mr-2 xl:text-gray-500 text-gray-100 [&_svg]:w-full [&_svg]:h-full">
                      <IconCall />
                    </i>
                    Contact Us
                  </ExpLinkParser>
                </li>
                <li className="group nav-item 3xl:px-5 2xl:px-4 xl:px-3 xl:block hidden">
                  <ExpLinkParser
                    className="flex items-center xl:text-sm 2xl:text-base font-medium text-primary py-[2.0625rem] leading-5 transition-all duration-200 ease-linear relative before:content-[''] before:absolute before:w-full before:h-1 before:left-0 before:bottom-0 before:bg-primary before:invisible before:transition-all before:duration-300 before:ease-linear group-[:hover]:before:visible"
                    to="/#/orders"
                  >
                    <i className="flex icon 3xl:w-[1.375rem] 3xl:h-[1.375rem] 2xl:w-[1.375rem] 2xl:h-[1.375rem] xl:w-[1.25rem] xl:h-[1.25rem] h-[1.25rem] w-[1.25rem] mr-2 xl:text-gray-500 text-gray-100 [&_svg]:w-full [&_svg]:h-full">
                      <IconUser />
                    </i>
                    Account
                  </ExpLinkParser>
                  <ul className=" invisible group-hover:visible bg-white absolute top-full w-[8.75rem] shadow-[0_6px_17px_-4px_rgba(0,0,0,0.24)] p-[0.938rem] space-y-3">
                    <li
                      id="60155edc-1e2e-4cca-ac4f-f8054999f31c"
                      className="text-primary hover:text-primaryHover nav-item-about "
                    >
                      <div className="link-wrap">
                        <ExpLinkParser
                          className="flex items-center"
                          to={`/#/shoppingLists`}
                          target=""
                        >
                          Shopping List
                        </ExpLinkParser>
                      </div>
                    </li>
                    <li
                      id="60155edc-1e2e-4cca-ac4f-f8054999f31c"
                      className="text-primary hover:text-primaryHover nav-item-about "
                    >
                      <div className="link-wrap">
                        <span onClick={handleLogout} className="flex items-center cursor-pointer">
                          Logout
                        </span>
                      </div>
                    </li>
                    <li
                      id="60155edc-1e2e-4cca-ac4f-f8054999f31c"
                      className="group/level1 text-primary hover:text-primaryHover nav-item-about "
                    >
                      <div className="link-wrap">
                        <ExpLinkParser className="flex items-center" to={`/#/quotes`} target="">
                          My Quote
                        </ExpLinkParser>
                      </div>
                    </li>
                  </ul>
                </li>
                <li className="nav-item 3xl:px-5 2xl:px-4 xl:px-3 px-3 relative">
                  <span
                    onClick={openCartSlider}
                    className="cart-link flex items-center text-[0px] xl:text-sm 2xl:text-base font-medium text-primary xl:py-[2.0625rem] py-5 leading-5 cursor-pointer"
                    ref={basketRef}
                  >
                    <i className="flex icon 3xl:w-[1.375rem] 3xl:h-[1.375rem] 2xl:w-[1.375rem] 2xl:h-[1.375rem] xl:w-[1.25rem] xl:h-[1.25rem] h-[1.25rem] w-[1.25rem] mr-0 xl:mr-3  xl:text-gray-500 text-gray-100 has-tooltip relative not-italic [&_svg]:w-full [&_svg]:h-full">
                      <IconBasket />
                      <span className="cart-count absolute w-4 h-4 bg-primary text-white flex items-center justify-center text-[0.563rem] rounded-full leading-[0.563rem] -top-[0.563rem] -right-[0.188rem]">
                        {cartQuantity}
                      </span>
                      <span className="tooltip hidden">Cart</span>
                    </i>
                    Cart
                  </span>
                  <ExpCartPreview
                    isCartPreview={isOpenCartPreview}
                    setIsCartPreview={setIsOpenCartPreview}
                    basketRef={basketRef}
                    cartDetails={cartDetails}
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
      {globalsettings.header_com[0].pencil_banner_text_et && (
        <div className="pencil-banner bg-yellow py-[0.375rem]">
          <div className="pencil-banner-wrap sm:p-[0.625rem] p-1.5 border border-white">
            <div className="container">
              <div className="pencil-banner-inner flex justify-center">
                <p
                  className="mb-0 font-semibold text-center text-white sm:text-[1.375rem] text-base sm:leading-7 leading-5 inline-block underline"
                  dangerouslySetInnerHTML={{
                    __html: globalsettings.header_com[0].pencil_banner_text_et,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
