import { IconCall } from '../assets/icons/icon-call';
import { IconUser } from '../assets/icons/icon-user';
import { IconBasket } from '../assets/icons/icon-basket';
import { IconSearch } from '../assets/icons/Icon-search';
// import ExpMenu from '../menu/menu';
// import { IconMenuDown } from '../assets/icons/menu-drop';
import { HeaderController } from './header-controller';
import { ExpImageParser, ExpLinkParser } from '../utils';
import { IconCross } from '../assets/icons/icon-cross';
import ExpSearchPreview from './search-preview';
import { ExpCartPreview } from '../cart-preview';
import { Fragment } from 'react/jsx-runtime';
import { HeroIconArrowLeft } from '../assets/icons/arrow-left-two';
import { HeroIconArrowRight } from '../assets/icons/arrow-right-two';
import ExpPencilMenu from '../menu/pencil-menu';
import ExpNewMenu from '../new-menu/new-menu';

const Header = ({
  globalsettings,
}: // categories,
// isCategoryLoading,
{
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
    emblaRef,
    scrollNext,
    scrollPrev,
    windowWidth,
    clickedMenuItem,
    setClickedMenuItem,
  } = HeaderController();

  const showQuote = sessionStorage.getItem('showQuote') === 'true';
  const showSearchBar = sessionStorage.getItem('showSearchBar') === 'true';

  return (
    <>
      <div className="pencil-banner bg-neutral-20 overflow-hidden relative z-[100]">
        <div className="pencil-banner-wrap relative">
          <div className="container">
            {!!globalsettings?.header_com?.length &&
              !!globalsettings?.header_com[0]?.pencil_banner_com?.length && (
                <div className="pencil-banner-inner flex justify-center py-[12px] max-w-[600px] mx-auto  relative">
                  <div className="embla__viewport max-w-[516px] overflow-hidden" ref={emblaRef}>
                    <div className="flex">
                      {globalsettings?.header_com[0]?.pencil_banner_com?.map(
                        (item: any, index: any) => {
                          return (
                            <Fragment key={index.toString()}>
                              {item?.pencil_banner_text_et && (
                                <div className="flex-[0_0_100%]">
                                  <div
                                    className="w-full embla__slide mb-0 text-center text-black sm:text-xs text-[10px] leading-5 inline-block [&_a]:underline"
                                    dangerouslySetInnerHTML={{
                                      __html: item?.pencil_banner_text_et,
                                    }}
                                  />
                                </div>
                              )}
                            </Fragment>
                          );
                        },
                      )}
                    </div>
                  </div>
                  <>
                    <button
                      className="embla__next embla__arrow text-primary absolute hover:text-primaryHover -left-2 top-1/2 md:w-[44px] md:h-[44px] w-6 h-6 p-0 flex justify-center items-center -translate-y-1/2"
                      onClick={scrollPrev}
                    >
                      <i className="icon flex md:w-2 w-2">
                        <HeroIconArrowLeft />
                      </i>
                    </button>
                    <button
                      className="embla__next embla__arrow text-primary absolute hover:text-primaryHover -right-2 top-1/2 md:w-[44px] md:h-[44px] w-6 h-6 p-0 flex justify-center items-center -translate-y-1/2"
                      onClick={scrollNext}
                    >
                      <i className="icon flex md:w-2 w-2">
                        <HeroIconArrowRight />
                      </i>
                    </button>
                  </>
                </div>
              )}
            {windowWidth >= 1024 && (
              <ExpPencilMenu
                menuLinkObj={globalsettings?.header_com}
                ulClasses={`flex absolute -right-5 top-0 [&_span]:cursor-pointer [&_span]:relative [&_strong]:text-white [&_span]:flex [&_span]:leading-4 [&_span]:font-normal [&_span]:py-3 4xl:[&_span]:px-9 [&_span]:px-5 lg:[&_span:before]:absolute lg:[&_span:before]:-left-0.5 lg:[&_span:before]:top-0 lg:[&_span:before]:bottom-0 lg:[&_span:before]:right-0 lg:[&_span:before]:content-[''] lg:[&_span:before]:skew-x-[40deg] lg:[&_span_strong]:relative [&_span_strong]:z-10 lg:[&_li:first-child_span:before]:bg-yellow lg:[&_li:nth-child(2)_span:before]:bg-magento lg:[&_li:last-child_span:before]:bg-primary 3xl:[&_li:last-child_span]:pr-[95px] 2xl:[&_li:last-child_span]:pr-[60px] [&_li:last-child_span]:pr-[40px]`}
                linkNameClasses={`group/pencilLink1 [&_.fill-svg]:transition-all [&:hover_.fill-svg]:fill-white [&:hover_.stroke-brown-color]:stroke-magento [&:hover_.fill-primary]:fill-primary [&:hover_.fill-primary]:stroke-primary items-center text-xs  xl:[&_.menu-name]:block [&_.menu-name]:hidden xl:[&_.menu-icon-block]:mr-1.5 [&_.menu-icon-block]:mr-0`}
                keyValueForMenu={'pencil_menu_navigation_id_et'}
                index={0}
              />
            )}
          </div>
        </div>
      </div>
      <header
        className="header-section bg-white relative z-50 group-[.sticky-header]/body:fixed group-[.sticky-header]/body:top-0 group-[.sticky-header]/body:left-0 group-[.sticky-header]/body:z-50 group-[.sticky-header]/body:w-full group-[.sticky-header]/body:animate-top-to-bottom group-[.sticky-header]/body:shadow-[0_5px_15px_rgba(0,0,0,.1)] group-[.transparent-header]/body:bg-transparent group-[.transparent-header.mobile-menu-open]/body:bg-white group-[.sticky-header.transparent-header]/body:bg-primary shadow-[0px_0px_15px_rgba(0,0,0,0.15)] group-[.transparent-header]/body:shadow-none"
        id={'header'}
      >
        <div className="header-container max-w-full 3xl:px-[4.6875rem] 2xl:px-10 md:px-5 px-4 lg:py-0 py-4 mx-auto">
          <div className="flex justify-end lg:flex-nowrap flex-wrap">
            <div className="logo-block flex items-center justify-start w-[80%] 3xl:w-[315px] lg:w-[200px] lg:mr-auto mr-0 xl:order-none order-0">
              <ExpLinkParser to="">
                <img
                  className="max-h-[36px] lg:h-[36px] max-w-[fit-content] mx-auto sm:w-full w-[230px] object-contain"
                  src={
                    ExpImageParser(
                      globalsettings.site_com?.length && globalsettings.site_com[0]?.logo_emd
                        ? globalsettings.site_com[0]?.logo_emd[0]
                        : '',
                    )?.publicUrl
                  }
                  width={315}
                  height={36}
                  alt="C-and-B Logo"
                  title="C-and-B Logo"
                />
              </ExpLinkParser>
            </div>
            <div className="navigation-block lg:block lg:visible invisible group-[.mobile-menu-open]:visible lg:static fixed lg:w-auto w-full bg-white left-0 top-auto right-auto bottom-0 lg:h-auto sm:h-[calc(100dvh_-168px)] h-[calc(100dvh_-164px)] z-10 lg:transform-none translate-x-full transition-all group-[.mobile-menu-open]:-translate-x-0  group-[.mobile-menu-open]:top-auto group-[.mobile-menu-open]:right-0 lg:p-0 p-7 pb-7 lg:border-t-0 border-t border-gray-50 lg:group-[.transparent-header]/body:bg-transparent duration-500">
              <div className="navigation-block-inner h-full lg:overflow-visible overflow-auto lg:pb-0 pb-0 lg:block flex flex-col justify-start [&.active-menu]:overflow-hidden">
                <div className="mobile-nav-menu lg:pb-0 pb-5 mb-6 lg:border-b-0 border-b-[2px] border-[#E5E5E5] lg:hidden flex justify-end">
                  <span
                    className="w-6 cursor-pointer xl:hidden flex"
                    onClick={addClassToOpenMobileMenu}
                  >
                    <i className="w-6 h-6 flex text-primary">
                      <IconCross />
                    </i>
                  </span>
                </div>
                {windowWidth < 1024 && (
                  <ExpPencilMenu
                    menuLinkObj={globalsettings?.header_com}
                    ulClasses="demo [&_li:first-child_span]:bg-yellow [&_li:nth-child(2)_span]:bg-primary [&_li:last-child_span]:bg-magento"
                    liClasses={
                      'group/level nav-item w-full flex items-center flex-wrap lg:flex-nowrap mb-5'
                    }
                    linkNameClasses={
                      'py-[23px] px-[30px] flex w-full text-white font-normal rounded-[10px] [&_.fill-svg]:transition-all [&:hover_.fill-svg]:fill-white [&:hover_.stroke-brown-color]:stroke-magento [&_.fill-primary]:fill-magento [&:hover_.fill-primary]:fill-magento [&:hover_.fill-primary]:stroke-magento relative'
                    }
                    keyValueForMenu={'pencil_menu_navigation_id_et'}
                    index={0}
                  />
                )}
                {/* 
                <ExpMenu
                  menuLinkObj={globalsettings?.header_com}
                  ulClasses={'nav-list xl:flex h-full'}
                  liClasses={
                    'group/level nav-item 3xl:mx-5 2xl:mx-3 xl:mx-2 flex items-center flex-wrap xl:border-0 border-b border-gray-50 xl:flex-nowrap primary-navigation'
                  }
                  linkNameClasses={
                    "flex items-center xl:justify-start justify-between text-sm 2xl:text-base font-medium text-primary xl:py-5 py-[0.625rem] leading-5 transition-all duration-200 ease-linear relative xl:before:content-[''] before:absolute xl:before:w-full xl:before:h-1 xl:before:left-0 xl:before:bottom-0 xl:before:bg-yellow xl:before:invisible xl:before:transition-all xl:before:duration-300 before:ease-linear xl:group-[:hover]/level:before:visible xl:group-[.transparent-header]/body:text-white"
                  }
                  keyValueForMenu={'primary_navigation_menu_id_et'}
                  iconForNavChild={
                    <i className="flex icon xl:text-primary text-gray-500 xl:w-[0.625rem] xl:h-[0.3125rem] xl:[&>svg]:w-auto xl:[&>svg]:h-auto [&>svg]:w-3 [&>svg]:h-[0.625rem] ml-2 xl:group-[.transparent-header]/body:text-white">
                      <IconMenuDown />
                    </i>
                  }
                  index={0}
                  handleLogout={handleLogout}
                /> */}
                <ExpNewMenu
                  addClassToOpenMobileMenu={addClassToOpenMobileMenu}
                  clickedMenuItem={clickedMenuItem}
                  setClickedMenuItem={setClickedMenuItem}
                />
              </div>
            </div>
            {showSearchBar && (
              <div className="header-search-block 3xl:ml-10 2xl:ml-5 lg:ml-[0.9375rem]  items-center lg:flex lg:bg-white relative lg:w-auto w-full flex lg:p-0 lg:py-6 p-0 border-gray-50 lg:group-[.transparent-header]/body:bg-transparent lg:order-none order-2 lg:mt-0 mt-3">
                <div className="mobile-menu-block xl:hidden w-14 flex items-center">
                  <ul className="flex items-center">
                    <li>
                      <span
                        id="hamburger-menu"
                        onClick={addClassToOpenMobileMenu}
                        className="w-6 h-5 flex items-center group"
                      >
                        <span className="bg-primary h-[0.125rem] rounded-full before:rounded-full after:rounded-full w-6 relative inline-block before:content-[''] before:bg-primary before:absolute before:h-[0.125rem] before:w-6 before:top-[-0.375rem] before:left-0 after:content-[''] after:bg-primary after:absolute after:h-[0.125rem] after:w-6 after:top-[0.375rem] after:left-0 group-[.is-open]:bg-transparent group-[.is-open]:before:rotate-45 group-[.is-open]:after:-rotate-45 group-[.is-open]:before:top-0 group-[.is-open]:after:top-0 transition-all group-[.transparent-header]/body:before:bg-white group-[.transparent-header]/body:after:bg-white group-[.transparent-header]/body:bg-white group-[.transparent-header.mobile-menu-open]/body:bg-transparent group-[.transparent-header.mobile-menu-open]/body:before:bg-primary group-[.transparent-header.mobile-menu-open]/body:after:bg-primary">
                          &nbsp;
                        </span>
                      </span>
                    </li>
                    {showSearchBar && (
                      <li className="ml-4 hidden">
                        <span id="search-icon">
                          {showSearchPreview && (
                            <i
                              onClick={removeClassToOpenSerch}
                              className="icon w-5 h-5 flex search-close-icon text-gray-100 group-[.transparent-header]/body:text-white group-[.transparent-header.mobile-menu-open]/body:text-primary"
                            >
                              <IconCross />
                              <span className="tooltip hidden">Close</span>
                            </i>
                          )}
                          {!showSearchPreview && (
                            <i
                              onClick={addClassToOpenSerch}
                              className="icon w-[1.0625rem] h-[1.0625rem] flex search-open-icon text-gray-100 group-[.transparent-header]/body:text-white group-[.transparent-header.mobile-menu-open]/body:text-primary"
                            >
                              <IconSearch />
                              <span className="tooltip hidden">Search</span>
                            </i>
                          )}
                        </span>
                      </li>
                    )}
                  </ul>
                </div>
                <form
                  action=""
                  className="3xl:w-[400px] xl:w-[250px] lg:w-[200px] w-[calc(100%_-_56px)]"
                  onSubmit={handleSubmit}
                >
                  <div className="relative">
                    <i className="icon lg:text-[#CCC4C1] text-white lg:bg-transparent bg-primary lg:w-5 lg:h-5 w-[34px] h-[34px] rounded-full flex items-center justify-center absolute lg:left-3 right-1 top-1/2 -translate-y-1/2 group-[.transparent-header]/body:text-white group-[.transparent-header]/body:bg-transparent lg:p-0 p-2 group-[.transparent-header.mobile-menu-open]/body:bg-primary">
                      <IconSearch />
                    </i>
                    <input
                      ref={searchInputRef}
                      type="text"
                      className="block border border-[#ccc4c1] lg:!pl-10 !pl-4 px-5 py-[0.6875rem] leading-4 text-sm w-full placeholder-gray-200 bg-white focus-visible:shadow-none focus-visible:outline-none focus-visible:border-primary !pl-8 rounded-[4px] placeholder-gray-900 !text-xs lg:!rounded-[5px] !rounded-[30px]"
                      placeholder="Search the store"
                      onChange={handleSearchChange}
                      value={searchText}
                      onClick={openSearchPreview}
                    />
                  </div>
                </form>

                {showSearchPreview && (
                  <div className="search-result-block flex flex-col justify-space absolute top-full bg-white lg:w-[53.125rem] w-[calc(100%_-_56px)] lg:right-0 lg:left-auto left-auto right-0 p-5 border border-[#ccc4c1]">
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
            )}
            <div className="nav-user-block 3xl:ml-10 2xl:ml-5 lg:ml-[0.9375rem] lg:order-2 order-1 lg:w-auto w-[20%]">
              <ul className="md:-mx-2.5 -mx-1.5 flex justify-end h-full">
                <li className="nav-item md:px-2.5 px-1.5 flex">
                  <ExpLinkParser
                    className="flex items-center text-[0px] xl:text-sm font-medium text-primary lg:py-5 py-0 leading-5 group-[.transparent-header]/body:text-white group-[.transparent-header.mobile-menu-open]/body:text-primary"
                    to="contact-us"
                  >
                    <i className="flex icon w-6 h-6 mr-0 xl:mr-2 text-gray-900 group-[.transparent-header]/body:text-white group-[.transparent-header.mobile-menu-open]/body:text-primary">
                      <IconCall />
                    </i>
                    Contact Us
                  </ExpLinkParser>
                </li>
                <li className="group/account nav-item md:px-2.5 px-1.5 flex items-center relative">
                  <ExpLinkParser
                    className="flex items-center text-[0px] xl:text-sm font-medium text-primary lg:py-5 leading-5 transition-all duration-200 ease-linear relative lg:before:content-['']  lg:before:absolute  lg:before:w-full  lg:before:h-0.5  lg:before:left-0  lg:before:bottom-0  lg:before:bg-primary  lg:before:invisible  lg:before:transition-all  lg:before:duration-300  lg:before:ease-linear group-[:hover]/account:before:invisible group-[.transparent-header]/body:text-white lg:group-[.transparent-header]/body:before:bg-white group-[.transparent-header.mobile-menu-open]/body:text-primary"
                    to="/#/orders"
                  >
                    <i className="flex icon w-6 h-6 xl:mr-2 text-gray-900 group-[.transparent-header]/body:text-white group-[.transparent-header.mobile-menu-open]/body:text-primary">
                      <IconUser />
                    </i>
                    My Account
                  </ExpLinkParser>
                  <ul className=" invisible group-hover/account:visible bg-white absolute top-full w-[8.75rem] shadow-[0_6px_17px_-4px_rgba(0,0,0,0.24)] p-[0.938rem] space-y-3 md:left-1/2 md:right-auto right-0 md:-translate-x-1/2">
                    <li
                      id="60155edc-1e2e-4cca-ac4f-f8054999f31c"
                      className="text-quartzGray hover:text-primaryHover nav-item-about "
                    >
                      <div className="link-wrap">
                        <ExpLinkParser
                          className="flex items-center text-xs"
                          to="https://cus.bectran.com/customer/regis/login.jsf;jsessionid=4344308E1871F1F88BC5839D6E275E6A?linkCode=2dYFU1456ZXggF1957ctTKM&gId=1957&dswid=2996"
                          target=""
                          ariaLabel="Credit Request"
                        >
                          Credit Request
                        </ExpLinkParser>
                      </div>
                    </li>
                    <li
                      id="60155edc-1e2e-4cca-ac4f-f8054999f31c"
                      className="text-quartzGray hover:text-primaryHover nav-item-about "
                    >
                      <div className="link-wrap">
                        <ExpLinkParser
                          className="flex items-center text-xs"
                          to="/faqs/"
                          target=""
                          ariaLabel="Shop FAQs"
                        >
                          Shop FAQs
                        </ExpLinkParser>
                      </div>
                    </li>
                    <li
                      id="60155edc-1e2e-4cca-ac4f-f8054999f31c"
                      className="text-quartzGray hover:text-primaryHover nav-item-about "
                    >
                      <div className="link-wrap">
                        <ExpLinkParser
                          className="flex items-center text-xs"
                          to={`/#/shoppingLists`}
                          target=""
                        >
                          Shopping List
                        </ExpLinkParser>
                      </div>
                    </li>
                    <li
                      id="60155edc-1e2e-4cca-ac4f-f8054999f31c"
                      className="text-quartzGray hover:text-primaryHover nav-item-about "
                    >
                      <div className="link-wrap">
                        <span
                          onClick={handleLogout}
                          className="flex items-center cursor-pointer text-xs"
                        >
                          Logout
                        </span>
                      </div>
                    </li>
                    {showQuote && (
                      <li
                        id="60155edc-1e2e-4cca-ac4f-f8054999f31c"
                        className="group/level1 text-quartzGray hover:text-primaryHover nav-item-about "
                      >
                        <div className="link-wrap">
                          <ExpLinkParser
                            className="flex items-center text-xs"
                            to={`/#/quotes`}
                            target=""
                          >
                            My Quote
                          </ExpLinkParser>
                        </div>
                      </li>
                    )}
                  </ul>
                </li>
                <li className="nav-item md:px-2.5 px-1.5 relative flex">
                  <span
                    onClick={openCartSlider}
                    className="cart-link flex items-center text-[0px] xl:text-sm font-medium text-primary lg:py-5 py-0 leading-5 cursor-pointer group-[.transparent-header]/body:text-white group-[.transparent-header.mobile-menu-open]/body:text-primary"
                    ref={basketRef}
                  >
                    <i className="flex icon w-6 h-6 mr-0 xl:mr-3  text-gray-900 has-tooltip relative not-italic group-[.transparent-header]/body:text-white group-[.transparent-header.mobile-menu-open]/body:text-primary">
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
        <div className="pencil-banner bg-yellow py-[0.375rem] hidden">
          <div className="pencil-banner-wrap sm:p-[0.625rem] p-1.5 border border-white">
            <div className="container">
              <div className="pencil-banner-inner flex justify-center">
                <p
                  className="mb-0 font-semibold text-center text-white sm:text-[1.375rem] text-base sm:leading-7 leading-5 inline-block underline [&_a]:text-white [&_a:hover]:text-white"
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
