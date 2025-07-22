import { useEffect, useRef, useState } from 'react';
import { ExpSearch } from '../api';
import { ExpGetCartRedirectUrls } from '../api/cart-redirect-url';

interface ExpCartPreviewControllerProps {
  isCartPreview: boolean;
  setIsCartPreview: (value: boolean) => void;
  basketRef: any;
  cartDetails: any;
}

const ExpCartPreviewController = (props: ExpCartPreviewControllerProps) => {
  const { isCartPreview, setIsCartPreview, basketRef, cartDetails } = props;
  let b2bIframe: any = document.getElementById('b2b-iframe');
  let iframeDocument: any = null;

  if (b2bIframe) {
    iframeDocument = b2bIframe.contentDocument;
  }

  const divRef: any = useRef(null);
  const [cartItems, setCartItems] = useState<any>([]);

  const updateCartItems = (userDetails: any) => {
    if (
      [
        ...(userDetails?.line_items?.physical_items || []),
        ...(userDetails?.line_items?.custom_items || []),
      ].length
    ) {
      setCartItems([
        ...(userDetails?.line_items?.physical_items || []),
        ...(userDetails?.line_items?.custom_items || []),
      ]);
    } else {
      setCartItems([]);
    }
  };

  const updateUserDetails = async () => {
    updateCartItems(cartDetails);
  };
  const getProductsBySkus = async (productSku: any) => {
    if (productSku && productSku.length > 0) {
      try {
        const searchObj = {
          skip: 0,
          limit: 1000,
          sortBy: 'relevance',
          orderBy: '',
          body: {
            filter: {
              sku_esi: productSku,
            },
          },
          fieldsToQuery:
            'brand_esi,brand_page_slug_esi,categories_esai,category_ids_esai,provider_id_esi,provider_specific_data_ej,sku_esi, sku_for_analytics_esli,variant_options_ej,variants_ej',
          byPassMerchandising: true,
        };
        const productsResponse = await ExpSearch({
          searchObj,
        });
        return productsResponse?.Data.items;
      } catch (e) {
        return [];
        console.error(e);
      }
    } else {
      return [];
    }
  };

  const addProductSkuCategoryToCartItemsData = (cartObj: any, products: any) => {
    if (cartObj.line_items?.physical_items) {
      const cartPhysicalItems = cartObj.line_items?.physical_items;
      for (const i in cartPhysicalItems) {
        const productId = cartPhysicalItems[i].product_id;
        if (products[productId] && products[productId].sku_esi) {
          cartPhysicalItems[i].product_sku = products[productId].sku_esi;
        }
        if (products[productId] && products[productId].categories_esai) {
          cartPhysicalItems[i].categories_esai = products[productId].categories_esai;
        }
        if (products[productId] && products[productId].sku_for_analytics_esli) {
          cartPhysicalItems[i].sku_for_analytics_esli = products[productId].sku_for_analytics_esli;
        }
        if (products[productId] && products[productId].brand_esi) {
          cartPhysicalItems[i].brand_esi = products[productId].brand_esi;
        }
        if (products[productId] && products[productId].brand_page_slug_esi) {
          cartPhysicalItems[i].brand_page_slug_esi = products[productId].brand_page_slug_esi;
        }
        if (products[productId] && products[productId].variants_ej) {
          cartPhysicalItems[i].variants_ej = products[productId].variants_ej;
        }
        if (products[productId] && products[productId].variant_options_ej) {
          cartPhysicalItems[i].variant_options_ej = products[productId].variant_options_ej;
        }
        if (products[productId] && products[productId].provider_specific_data_ej) {
          cartPhysicalItems[i].provider_specific_data_ej =
            products[productId].provider_specific_data_ej;
        }
      }
    }
    return cartObj;
  };
  const handelCheckOut = async () => {
    try {
      const body: any = { data: { customer_group: '', line_items: [] } };
      const userGroup = localStorage.getItem('user-group');
      const products: any = {};
      const productIds = [
        ...(cartDetails?.line_items?.physical_items || []),
        ...(cartDetails?.line_items?.custom_items || []),
      ]?.map((product: any) => {
        return product.product_id;
      });
      const productSku = [
        ...(cartDetails?.line_items?.physical_items || []),
        ...(cartDetails?.line_items?.custom_items || []),
      ]?.map((product: any) => {
        return product.sku;
      });
      const prodDetailedRespBySkus = await getProductsBySkus(productSku);
      productIds?.forEach((elem: any) => {
        const productFromSearchApi = prodDetailedRespBySkus?.find(
          (item: any) => item?.provider_id_esi === elem?.toString(),
        );
        products[elem] = {
          brand_esi: productFromSearchApi.brand_esi,
          brand_page_slug_esi: productFromSearchApi.brand_page_slug_esi,
          sku_esi: productFromSearchApi.sku_esi,
          categories_esai: productFromSearchApi?.categories_esai,
          sku_for_analytics_esli: productFromSearchApi?.sku_for_analytics_esli,
          category_ids_esai: productFromSearchApi?.category_ids_esai,
          variant_options_ej: productFromSearchApi?.variant_options_ej,
          provider_specific_data_ej: productFromSearchApi?.provider_specific_data_ej,
          variants_ej: productFromSearchApi?.variants_ej,
        };
      });
      const updatedCartObj = addProductSkuCategoryToCartItemsData(cartDetails, products);
      body.data.cart_id = updatedCartObj?.id;
      body.data.customer_group = userGroup ? JSON.parse(userGroup) : 'Default';
      updatedCartObj.line_items.physical_items?.forEach((item: any) => {
        body.data.line_items.push({
          sku: item.sku,
          product_id: item.product_id,
          category: item?.categories_esai,
        });
      });
      await fetch(
        'https://dev-bigcom-order-service.cookandboardman.io/apis/order-service/v1/surcharge',
        {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            clientid: 'order-56aaf9ef-770e-46b1-aeae-d72f62d9b279',
          },
          body: JSON.stringify(body),
        },
      );
      const redirectUrls = await ExpGetCartRedirectUrls();
      setIsCartPreview(false);
      if (redirectUrls?.redirect_urls?.checkout_url) {
        window.open(redirectUrls?.redirect_urls?.checkout_url, '_self');
      }
      // window.location.href = '/checkout/'
    } catch (error: any) {
      console.error(error);
    }
  };

  /*
  Handling event listners. 
  It manages addEventListner and removeEventListner.
  */
  const initiateEventListners = (event: 'addEventListener' | 'removeEventListener') => {
    document[event]('CART_REFRESH', () => updateUserDetails());
  };

  useEffect(() => {
    updateUserDetails();
    initiateEventListners('addEventListener');

    return initiateEventListners('removeEventListener');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    updateUserDetails();
  }, [cartDetails]);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        divRef.current &&
        !divRef.current?.contains(event.target) &&
        isCartPreview &&
        !basketRef.current.contains(event.target)
      ) {
        setIsCartPreview(false);
      }
    }
    iframeDocument.addEventListener('mousedown', handleClickOutside);
    return () => {
      iframeDocument.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [divRef, isCartPreview, setIsCartPreview]);

  return { cartItems, divRef, handelCheckOut };
};

export default ExpCartPreviewController;
