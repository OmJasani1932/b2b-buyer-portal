import { CurrencyFormat, ExpLinkParser } from '../utils';
import { ExpNavigate } from '../utils/link-parser';

interface ExpSearchPreviewProps {
  productData: any;
  isLoading: boolean;
  handleSubmit: any;
  searchText: string;
  searchSuggestion?: any;
  setSearchText?: any;
}

function ExpSearchPreview(props: ExpSearchPreviewProps) {
  const { productData, isLoading, handleSubmit, searchText, searchSuggestion, setSearchText } =
    props;

  const onSearchProduct = (product: any) => {
    setSearchText('');
    const analyticsData: any = {
      mode: 'search',
      search_location: 'quick',
      sku: product?.sku_esi,
      sku_for_analytics_esli: product?.sku_for_analytics_esli,
      product_categories: product?.categories_esai,
    };

    if (product?.rule_details) {
      analyticsData.rules = product?.rule_details;
    }
    let localstorageAnalyticsData = [];
    if (localStorage.getItem('search_a_d_')) {
      localstorageAnalyticsData = JSON.parse(localStorage.getItem('search_a_d_') as string);
    }

    let isProductid: any;
    if (localstorageAnalyticsData.length) {
      isProductid = localstorageAnalyticsData?.find(
        (analyticsProduct: any) => analyticsProduct?.sku === product?.sku_esi,
      );
    }
    if (!isProductid) {
      localstorageAnalyticsData.push(analyticsData);
    }
    localStorage.setItem('search_a_d_', JSON.stringify(localstorageAnalyticsData));
  };

  if (
    productData?.items?.length === 1 &&
    (productData?.items[0]?.name_eti === searchText ||
      productData?.items[0]?.sku_esi === searchText) &&
    window.location.pathname !== productData?.items[0]?.page_slug_esi
  ) {
    setSearchText('');
    ExpNavigate(productData?.items[0]?.page_slug_esi);
  }
  return (
    <>
      <div className="search-result-list w-full flex xl:flex-nowrap flex-wrap">
        <div className="left-block xl:w-[18.75rem] w-full xl:pr-5">
          <h6 className="border-b border-gray-400 pb-2 mb-2">Popular Searches</h6>
          {!!searchSuggestion?.length && (
            <ul className="list-style-none xl:h-[13.0625rem] h-[8.4375rem] overflow-y-auto space-y-1 pl-3">
              {searchSuggestion?.map((item: string, index: number) => (
                <li key={`${(index.toString(), 'id')}`}>
                  {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
                  <span
                    className="link-primary text-primary hover:text-gray-200 cursor-pointer"
                    onClick={() => {
                      setSearchText('');
                    }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
        {!isLoading ? (
          <>
            {/* eslint-disable-next-line no-nested-ternary */}
            {productData?.items?.length ? (
              <div className="right-block flex flex-wrap custom-scrollbar xl:w-[calc(100%_-_18.75rem)] w-full xl:border-l xl:border-gray-400 xl:pl-5 h-[18.75rem] overflow-y-auto">
                <div className="search-item-inner w-full">
                  {productData?.items?.map((product: any, index: number) => (
                    <div
                      key={index?.toString()}
                      className="search-item [&:last-child]:border-0 flex items-center border-b border-gray-400 py-4"
                    >
                      <div className="search-item-image w-[5rem]">
                        <ExpLinkParser
                          onClick={() => onSearchProduct(product)}
                          to={`${product?.page_slug_esi}?m=search&st=${searchText}&aq=true`}
                          className="flex justify-center items-center"
                        >
                          <img
                            src={
                              product?.images_ej?.length
                                ? `${product?.images_ej[0]?.url_zoom?.replace(
                                    'https://cdn11.bigcommerce.com',
                                    'https://product-images.experro.app',
                                  )}&width=160`
                                : 'https://via.placeholder.com/736x450.png?text=Image+coming+soon'
                            }
                            alt={product?.name_eti}
                            loading="lazy"
                            width={56}
                            height={56}
                          />
                        </ExpLinkParser>
                      </div>

                      <div className="search-item-detail w-[calc(100%_-_5rem)] xl:pl-5 pl-4">
                        <p className="search-product-title brand-title hidden">
                          <ExpLinkParser
                            className="reverse-color brand-link uppercase"
                            to={`${product?.brand_page_slug_esi}`}
                          >
                            {product?.brand_esi}
                          </ExpLinkParser>
                        </p>

                        <p className="search-product-title capitalize text-[0.9375rem] mb-[0.25rem] text-primary">
                          <ExpLinkParser
                            className="reverse-color"
                            onClick={() => onSearchProduct(product)}
                            to={`${product?.page_slug_esi}?m=search&st=${searchText}&aq=true`}
                          >
                            {product?.name_eti}
                          </ExpLinkParser>
                        </p>

                        <div className="price-section">
                          <span className="price-item">
                            <CurrencyFormat
                              value={
                                product?.sale_price_efi ||
                                product?.price_efi ||
                                product?.retail_price_ef
                              }
                              thousandSeparator={','}
                              decimalSeparator={'.'}
                              prefixSymbol={'$'}
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : searchText?.length < 1 ? (
              <>
                {' '}
                <div className="right-block flex flex-wrap custom-scrollbar xl:w-[calc(100%_-_18.75rem)] w-full xl:border-l xl:border-gray-400 xl:pl-5 h-[18.75rem] overflow-y-auto">
                  {' '}
                  <p className="col">Start typing to search.</p>{' '}
                </div>
              </>
            ) : (
              !isLoading &&
              productData?.items?.length === 0 && (
                <div className="right-block flex flex-wrap custom-scrollbar no-product-found">
                  <h5 className="text-center no-product m-t-30 m-b-30">No Products Found...</h5>
                </div>
              )
            )}
          </>
        ) : (
          <div className="loader-wrapper">
            <div className="loader-main flex">
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>
        )}
      </div>
      {!isLoading && productData?.items?.length > 0 ? (
        <div className="search-result-message text-center border-t border-gray-400 xl:pt-5 pt-4">
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
          <span
            onClick={handleSubmit}
            className="text-primary hover:text-gray-200 cursor-pointer text-lg"
          >
            More result {productData?.total_count > 1 ? '' : ''} ({productData?.total_count})
            {productData?.total_count === 1 ? '' : ''}
          </span>
        </div>
      ) : (
        ''
      )}
    </>
  );
}

export default ExpSearchPreview;
