import { useEffect, useRef, useState } from 'react';
import { ExpGetCart, ExpSearch, ExpSearchAutoSuggest, ExpSearchCount } from '../api';
import { ExpNavigate } from '../utils/link-parser';
import { getFilteredAccessibleCategoryQuery } from '../utils/customer-group';

declare let window: any;

const HeaderController = () => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const basketRef = useRef<HTMLDivElement>(null);
  const searchController = useRef<any>(null);
  const searchCountController = useRef<any>(null);
  const autoSuggestController = useRef<any>(null);

  const [searchResult, setSearchResult] = useState<any>([]);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [searchSuggestion, setSearchSuggestion] = useState([]);
  const [searchText, setSearchText] = useState<string>('');

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cartQuantity, setCartQuantity] = useState<number>(0);
  const [isOpenCartPreview, setIsOpenCartPreview] = useState<boolean>(false);
  const [cartDetails, setCartDetails] = useState<any>({});

  let b2bIframe: any = document.getElementById('b2b-iframe');
  let iframeWindow: any = null;
  let iframeDocument: any = null;

  if (b2bIframe) {
    iframeWindow = b2bIframe.contentWindow;
    iframeDocument = b2bIframe.contentDocument;
  }

  let prevScrollpos = iframeWindow.scrollY;
  const header = iframeDocument.getElementById('header');
  const headerHeight = header?.offsetHeight;
  const scrlOffsetDown = 230;
  const scrlOffsetUp = 100;

  iframeWindow.onscroll = function () {
    const currentScrollPos = iframeWindow.scrollY;
    if (prevScrollpos > currentScrollPos) {
      // Scrolling up
      if (currentScrollPos < scrlOffsetUp) {
        iframeDocument.body.classList.remove('sticky-header');
        iframeDocument.body.style.paddingTop = `0px`;
      }
    } else {
      // Scrolling down
      // eslint-disable-next-line no-lonely-if
      if (currentScrollPos > scrlOffsetDown) {
        iframeDocument.body.style.paddingTop = `${headerHeight}px`;
        iframeDocument.body.classList.add('sticky-header');
      } else if (currentScrollPos <= scrlOffsetDown) {
        iframeDocument.body.classList.remove('sticky-header');
        iframeDocument.body.style.paddingTop = `0px`;
      }
    }

    prevScrollpos = currentScrollPos;
  };

  // end of stickey header script.

  const handleHeaderClass = (event: Event) => {
    const targetElement = event.target as Element;
    if (targetElement.closest('#search-icon') !== null) {
      return;
    }
    const targetElement1 = event.target as Element;
    if (targetElement1 && targetElement1.closest('.header-search-section') === null) {
      // document.body.classList.remove('search-open');
    }
  };

  const closeSearchPreviewWhenClickOutSide = () => {
    iframeDocument.querySelector('body')?.addEventListener('click', (event: Event) => {
      const targetElement = event.target as Element;
      if (
        targetElement.closest('.search-open-icon') !== null ||
        targetElement.tagName === 'INPUT' ||
        targetElement.closest('.search-result-block')
      ) {
        return;
      }
      const targetElement1 = event.target as Element;
      if (targetElement1 && targetElement1.closest('.search-bar-inner') === null) {
        iframeDocument.body.classList.remove('search-open');
        setShowPreview(false);
      }
    });
  };
  /*
  Handling event listners.
  It manages addEventListner and removeEventListner.
  */
  const eventListeners = (event: 'addEventListener' | 'removeEventListener') => {
    iframeDocument[event]('CART_REFRESH', () => {
      getCart();
    });

    // b2bIframe[event]('LOGIN_SUCCESSFUL', (e: any) => {
    //   checkUserLoggedInStatus(e.detail);
    // });
  };

  // Form here we start initiating all event listeners.
  const initiateEventListeners = () => {
    closeSearchPreviewWhenClickOutSide();
    eventListeners('addEventListener');

    // As body object is possible null so it has to be done manually...
    iframeDocument
      .querySelector('body')
      ?.addEventListener('click', (event: Event) => handleHeaderClass(event));

    return (() => {
      eventListeners('removeEventListener');
      iframeDocument
        .querySelector('body')
        ?.removeEventListener('click', (event: Event) => handleHeaderClass(event));
    })();
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //  create signal for abort unnecessary search API call
    if (searchController?.current) {
      searchController?.current?.abort();
    }
    searchController.current = new AbortController();

    //  create signal for abort unnecessary searchCount API call
    if (searchCountController?.current) {
      searchCountController?.current?.abort();
    }
    searchCountController.current = new AbortController();

    //  create signal for abort unnecessary AutoSuggest API call
    if (autoSuggestController?.current) {
      autoSuggestController?.current.abort();
    }
    autoSuggestController.current = new AbortController();
    setSearchText(event.target.value);
  };

  const triggerProductSearchEvent = (searchResponse: any) => {
    if (searchResponse?.Data?.items) {
      searchResponse?.Data?.items?.forEach((element: any) => {
        element?.rule_details?.forEach((rule: any) => {
          delete rule?.rule_name;
          rule?.conditions?.forEach((condition: any) => {
            delete condition?.name;
          });
        });
      });
    }

    const skusForAnalyticsRules: any = [];
    searchResponse?.Data?.items?.forEach((item: any) => {
      const tempItem: any = {};
      tempItem.sku = item?.sku_esi;
      tempItem.rules = item?.rule_details;
      skusForAnalyticsRules.push(tempItem);
    });
    // AnalyticsService.trackProductSearched({
    //   search_location: 'quick',
    //   searchTerm: searchText,
    //   noOfResults: searchResponse.Data.total_count,
    //   products_detail: skusForAnalyticsRules,
    //   sku: searchResponse?.Data?.items?.map((elem: any) => elem.sku_esi),
    // });
  };

  const getSearchedProducts = async () => {
    try {
      const fieldsToQuery =
        'sku_esi,images_ej,price_efi,retail_price_ef,custom_url,page_slug_esi,brand_esi,brand_page_slug_esi,calculated_price_efi,sale_price_efi,sku_for_analytics_esli';
      const searchObj: any = {
        body: {
          search_terms: searchText?.trim(),
        },
        skip: 0,
        limit: 10,
        fieldsToQuery,
        sortBy: 'relevance',
      };

      const accessibleCategories = getFilteredAccessibleCategoryQuery();

      if (accessibleCategories) {
        searchObj.body.filter = {
          fq: `provider_categories_id_esai:${accessibleCategories}`,
        };
      }

      const searchPromise = [];
      const searchApiPromise = ExpSearch({
        searchObj,
        signal: searchController?.current?.signal,
      });
      searchPromise.push(searchApiPromise);
      const searchCountApiPromise = ExpSearchCount({
        searchObj,
        signal: searchCountController?.current?.signal,
      });
      searchPromise.push(searchCountApiPromise);
      const [searchResponse, searchCountResponse] = await Promise.all(searchPromise);

      if (searchResponse?.Status === 'success') {
        searchResponse.Data.total_count = searchCountResponse?.Data?.total_count;
      }

      if (searchResponse?.Status === 'success') {
        triggerProductSearchEvent(searchResponse);
        setShowPreview(true);
        setSearchResult(searchResponse?.Data);
      }
      setIsLoading(false);
    } catch (err: any) {
      if (
        err.message === 'AbortError: The user aborted a request.' ||
        err.message === 'AbortError: Fetch is aborted'
      ) {
        setIsLoading(true);
      } else {
        setIsLoading(false);
        console.error(err);
      }
    }
  };

  const getAutoSuggesterData = async () => {
    try {
      const searchObj: any = {
        body: {
          search_term: searchText?.trim(),
        },
      };
      const response = await ExpSearchAutoSuggest({
        searchObj,
        signal: autoSuggestController?.current?.signal,
      });
      if (response?.Status === 'success') {
        setSearchSuggestion(response?.Data?.auto_suggester);
      }
    } catch (err: any) {
      if (
        !(
          err.message === 'AbortError: The user aborted a request.' ||
          err.message === 'AbortError: Fetch is aborted'
        )
      ) {
        console.error(err);
      }
    }
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (searchResult?.isRedirects && searchResult?.redirectURL) {
      ExpNavigate(searchResult?.redirectURL);
    } else if (searchResult?.total_count > 1) {
      ExpNavigate(`search?q=${searchText}`);
      setSearchText('');
      removeClassToOpenSearch();
    } else if (searchResult?.total_count === 1) {
      ExpNavigate(`${searchResult?.items[0]?.page_slug_esi}?m=search&st=${searchText}&aq=true`);
      setSearchText('');
      removeClassToOpenSearch();
    }
  };

  const openSearchPreview = () => {
    setShowPreview(true);
    if (!searchSuggestion?.length && !searchText) {
      getAutoSuggesterData();
    }
    setIsLoading(false);
  };

  const openCartSlider = () => {
    // eslint-disable-next-line no-restricted-globals
    if (screen.width < 757) {
      ExpNavigate('cart');
      return;
    } else {
      setIsOpenCartPreview(!isOpenCartPreview);
    }
  };

  const getCartQuantity = (cartObj: any) => {
    let quantity = 0;
    if (cartObj) {
      cartObj?.line_items?.physical_items.forEach((elem: any) => {
        quantity += elem.quantity;
      });
    }
    setCartQuantity(quantity);
  };

  const addClassToOpenSearch = () => {
    iframeDocument.body.classList.add('search-open');
    iframeDocument.body.classList.add('group');
    iframeDocument.body.classList.add('fixed');
    iframeDocument.body.classList.add('overflow-hidden');
    iframeDocument.body.classList.add('w-full');
    searchInputRef.current && searchInputRef.current.focus();
    setShowPreview(true);
    if (!searchSuggestion?.length && !searchText) {
      getAutoSuggesterData();
    }
    setIsLoading(false);
  };

  const removeClassToOpenSearch = () => {
    iframeDocument.body.classList.remove('search-open');
    iframeDocument.body.classList.remove('group');
    iframeDocument.body.classList.remove('fixed');
    iframeDocument.body.classList.remove('overflow-hidden');
    iframeDocument.body.classList.remove('w-full');
    setSearchText('');
    setShowPreview(false);
  };

  const addClassToOpenMobileMenu = () => {
    const element: any = iframeDocument.getElementById('hamburger-menu');
    if (iframeDocument.body.classList.contains('mobile-menu-open')) {
      iframeDocument.body.classList.remove('mobile-menu-open');
      iframeDocument.body.classList.remove('group');
      iframeDocument.body.classList.remove('fixed');
      iframeDocument.body.classList.remove('overflow-hidden');
      iframeDocument.body.classList.remove('w-full');
      element?.classList.remove('is-open');
    } else {
      element.classList.add('is-open');
      iframeDocument.body.classList.add('mobile-menu-open');
      iframeDocument.body.classList.add('group');
      iframeDocument.body.classList.add('fixed');
      iframeDocument.body.classList.add('overflow-hidden');
      iframeDocument.body.classList.add('w-full');
    }
  };

  const removeClassToCloseMobileMenu = () => {
    iframeDocument.body.classList.remove('mobile-menu-open');
    iframeDocument.body.classList.remove('group');
    iframeDocument.body.classList.remove('fixed');
    iframeDocument.body.classList.remove('overflow-hidden');
    iframeDocument.body.classList.remove('w-full');
  };

  const handleMyAccountButtonClick = () => {
    ExpNavigate('login/');
  };

  const getCart = async () => {
    const userCartObj = await ExpGetCart();
    setCartDetails(userCartObj);
    getCartQuantity(userCartObj);
  };

  useEffect(() => {
    if (searchText && searchText.length > 1) {
      setIsLoading(true);
      getSearchedProducts();
    }
    if (searchText.length === 0) {
      setShowPreview(false);
      setSearchResult([]);
    }
    if (searchText?.length > 1) {
      getAutoSuggesterData();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  // const checkUserLoggedInStatus = (userDetails: any = false) => {
  //   const userObj = userDetails ? userDetails : AuthService.getUserDetails();
  //   if (userObj?.userInfo?.id) {
  //     setUserLoggedInStatus(true);
  //   } else {
  //     setUserLoggedInStatus(false);
  //   }
  // };

  const handleLanguageChange = (language: string) => {
    document.dispatchEvent(
      new CustomEvent('LANGUAGE_CHANGE', {
        detail: {
          language,
        },
      }),
    );
  };

  const handleLogout = () => {
    window.dispatchEvent(new Event('LOGOUT_FROM_B2B'));
    localStorage.removeItem('persist:company');
    localStorage.removeItem('categories');
    document.dispatchEvent(new Event('CART_REFRESH'));
    window.location.href = `${window.location.origin}/login/`;
  };

  useEffect(() => {
    setIsLoading(false);
    setShowPreview(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.href]);

  useEffect(() => {
    initiateEventListeners();
    // checkUserLoggedInStatus();

    getCart();
    const handlePushstate = () => {
      if (iframeDocument.body.classList.contains('mobile-menu-open')) {
        const element: any = iframeDocument.getElementById('hamburger-menu');
        element?.classList.remove('is-open');
      }
    };
    window.addEventListener('pushstate', handlePushstate);
    return () => {
      window.removeEventListener('pushstate', handlePushstate);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    // userDetails,
    // selectedCurrency,
    isLoading,
    cartQuantity,
    searchText,
    showSearchPreview: showPreview,
    searchResult,
    setSearchText,
    searchSuggestion,
    handleSubmit,
    handleSearchChange,
    handleMyAccountButtonClick,
    addClassToOpenSerch: addClassToOpenSearch,
    removeClassToOpenSerch: removeClassToOpenSearch,
    addClassToOpenMobileMenu,
    removeClassToCloseMobileMenu,
    openCartSlider,
    isOpenCartPreview,
    setIsOpenCartPreview,
    cartDetails,
    handleLogout,
    searchInputRef,
    basketRef,
    openSearchPreview,
    handleLanguageChange,
  };
};

export { HeaderController };
