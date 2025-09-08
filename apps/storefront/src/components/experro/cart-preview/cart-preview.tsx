import { CurrencyFormat, ExpLinkParser } from '../utils';
import ExpCartPreviewController from './cart-preview-controller';

export interface ExpCartPreviewProps {
  isCartPreview: boolean;
  setIsCartPreview: (value: boolean) => void;
  basketRef: any;
  cartDetails: any;
}

const ExpCartPreview = (props: ExpCartPreviewProps) => {
  const { isCartPreview, setIsCartPreview, basketRef, cartDetails } = props;

  const { cartItems, divRef, handelCheckOut, showCheckoutButton } = ExpCartPreviewController({
    isCartPreview,
    setIsCartPreview,
    basketRef,
    cartDetails,
  });

  return (
    <div
      ref={divRef}
      className={`hidden dropdown-menu w-[28.125rem] absolute bg-white right-0 top-full ${
        isCartPreview ? 'is-open !block' : ''
      }`}
    >
      <div className="previewCart border">
        {cartItems.length > 0 ? (
          <ul className="previewCartList hidden-x p-5 space-y-4 [&_li+li]:pt-4 [&_li+li]:border-t [&_li+li]:border-gray-50 h-[400px] overflow-auto">
            {cartItems?.map((item: any, index: number) => {
              const itemUrl = item?.url?.replace('https://', '')?.split('/')?.splice(1)?.join('/');
              const newUrl = item.options?.find((option: any) =>
                option.name?.toLowerCase().includes('image_url'),
              )?.value;
              return (
                <li key={index} className="previewCartItem">
                  <div className="row flex">
                    <div className="col col-4 w-20">
                      <div className="previewCartItem-image [&_span]:flex [&_span]:items-center [&_span]:justify-center">
                        {item?.sku === 'MASTERPRODUCT' ? (
                          <>
                            <p>
                              <img
                                className="max-h-[80px] object-contain"
                                src={item.sku === 'MASTERPRODUCT' ? newUrl : item.image_url}
                                alt={item.name}
                                width={80}
                                height={80}
                              />
                            </p>
                          </>
                        ) : (
                          <>
                            {itemUrl ? (
                              <ExpLinkParser to={`/${itemUrl}`}>
                                <img
                                  className="max-h-[80px] object-contain"
                                  src={item.image_url}
                                  alt=""
                                />
                              </ExpLinkParser>
                            ) : (
                              <p>
                                <img
                                  className="max-h-[80px] object-contain"
                                  src={item.image_url}
                                  alt={item.name}
                                  width={80}
                                  height={80}
                                />
                              </p>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                    <div className="col col-8 w-[calc(100%_-_5rem)] pl-5">
                      <div className="previewCartItem-content">
                        <span className="previewCartItem-brand block">{item.brand}</span>

                        <h6 className="previewCartItem-name text-gray-200 mb-1 leading-5 hover:text-primary">
                          {item?.sku === 'MASTERPRODUCT' ? (
                            <>{item.name}</>
                          ) : (
                            <>
                              {itemUrl ? (
                                <ExpLinkParser className="hover:text-primary" to={`/${itemUrl}`}>
                                  {item.name}
                                </ExpLinkParser>
                              ) : (
                                <p className="hover:text-primary">{item.name}</p>
                              )}
                            </>
                          )}
                        </h6>

                        <span className="previewCartItem-sku hidden">
                          <span className="previewCartItem-sku-key">SKU:</span>
                          <span>
                            {item.sku} {item.variant_id ? '/ ' : ''}
                          </span>
                          <span className="previewCartItem-sku-value">{item.variant_id}</span>
                        </span>
                        <span className="previewCartItem-price block text-primary">
                          <CurrencyFormat
                            value={item?.sale_price || item?.extended_list_price}
                            thousandSeparator={','}
                            decimalSeparator={'.'}
                            prefixSymbol={'$'}
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <h6 className="text-center p-10 mb-0 text-base text-gray-200 font-normal">
            Your cart is empty
          </h6>
        )}
        {cartItems.length > 0 ? (
          <div className="previewCartAction p-5 border-t border-gray-50">
            <div className="row gutter-sm flex gap-4">
              <div className="col col-6 previewCartAction-checkout w-1/2">
                {showCheckoutButton && (
                  <span
                    // to="/checkout/"
                    onClick={handelCheckOut}
                    className="inline-block md:text-base text-sm leading-5 border bg-primary border-primary text-white md:py-3 md:px-8 py-[0.5625rem] px-5 font-normal hover:bg-white hover:text-primary transition-all duration-200 ease-linear rounded w-full text-center cursor-pointer"
                  >
                    Checkout Now
                  </span>
                )}
              </div>

              <div className="col col-6 previewCartAction-viewCart w-1/2">
                <ExpLinkParser
                  to="/cart/"
                  onClick={() => setIsCartPreview(false)}
                  className="inline-block md:text-base text-sm leading-5 border border-primary text-primary bg-white md:py-3 md:px-8 py-[0.5625rem] px-5 font-normal hover:bg-primary hover:text-white hover:border-white transition-all duration-200 ease-linear rounded w-full text-center"
                >
                  View Cart
                </ExpLinkParser>
              </div>
            </div>
            {/* <div className="w-full mt-6">
              <PaypalCheckout />
            </div> */}
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default ExpCartPreview;
