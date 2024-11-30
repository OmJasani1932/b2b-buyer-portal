import { CurrencyFormat, ExpLinkParser } from '../utils';
import ExpCartPreviewController from './cart-preview-controller';

export interface ExpCartPreviewProps {
  isCartPreview: boolean;
  setIsCartPreview: (value: boolean) => void;
  basketRef: any;
  cartDetails:any;
}

const ExpCartPreview = (props: ExpCartPreviewProps) => {
  const { isCartPreview, setIsCartPreview, basketRef,cartDetails } = props;

  const { cartItems, divRef } = ExpCartPreviewController({
    isCartPreview,
    setIsCartPreview,
    basketRef,
    cartDetails,
  });

  return (
    <div
      ref={divRef}
      className={`hidden dropdown-menu w-[28.125rem] 3xl:mr-5 2xl:mr-4 xl:mr-3 mr-3 absolute bg-white right-0 ${
        isCartPreview ? 'is-open !block' : ''
      }`}
    >
      <div className="previewCart border">
        {cartItems.length > 0 ? (
          <ul className="previewCartList hidden-x p-5 space-y-4 [&_li+li]:pt-4 [&_li+li]:border-t [&_li+li]:border-gray-50">
            {cartItems?.map((item: any, index: number) => {
              const itemUrl = item?.url.replace('https://', '').split('/').splice(1).join('/');

              return (
                <li key={index} className="previewCartItem">
                  <div className="row flex">
                    <div className="col col-4 w-20">
                      <div className="previewCartItem-image">
                        <ExpLinkParser to={`/${itemUrl}`}>
                          <img src={item.image_url} alt="" />
                        </ExpLinkParser>
                      </div>
                    </div>
                    <div className="col col-8 w-[calc(100%_-_5rem)] pl-5">
                      <div className="previewCartItem-content">
                        <span className="previewCartItem-brand block">{item.brand}</span>

                        <h6 className="previewCartItem-name text-gray-200 mb-1 leading-5 hover:text-primary">
                          <ExpLinkParser className="hover:text-primary" to={`/${itemUrl}`}>
                            {item.name}
                          </ExpLinkParser>
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
                            value={item?.sale_price}
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
                <ExpLinkParser
                  to="/checkout/"
                  onClick={() => setIsCartPreview(false)}
                  className="button button-secondary w-full text-center"
                >
                  Checkout Now
                </ExpLinkParser>
              </div>

              <div className="col col-6 previewCartAction-viewCart w-1/2">
                <ExpLinkParser
                  to="/cart/"
                  onClick={() => setIsCartPreview(false)}
                  className="button button-primary w-full text-center"
                >
                  View Cart
                </ExpLinkParser>
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default ExpCartPreview;
