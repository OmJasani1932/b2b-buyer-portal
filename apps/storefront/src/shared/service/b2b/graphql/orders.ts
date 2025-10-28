import { OrderStatusItem } from '@/types';

import B3Request from '../../request/b3Fetch';

declare let window: any;

const getOrderStatusTypeQl = (fn: string) => `{
  ${fn} {
    systemLabel,
    customLabel,
    statusCode,
  }
}`;

const getCreatedByUser = (companyId: number, module: number, fn: string) => `{
  ${fn}(
    companyId: ${companyId},
    module: ${module},
  ){
    results,
  }
}`;

const convertExpToBcResponse = (data: any) => {
  const toEpoch = (dateStr: string | null | undefined): number | null =>
    dateStr ? Math.floor(new Date(dateStr).getTime() / 1000) : null;
  const extractPONumber = (customerMessage: string): string | null => {
    if (!customerMessage) return null;

    // Look for "PO Number: " followed by the actual number
    const poMatch =
      customerMessage.match(/Purchase Order:\s*([^\n\r]+)/i) ||
      customerMessage.match(/PO Number:\s*([^\n\r]+)/i);

    return poMatch ? poMatch[1].trim() : null;
  };

  return {
    orderId: String(data.id),
    createdAt: data.date_created ? toEpoch(data.date_created) : null,
    updatedAt: data.date_modified ? toEpoch(data.date_modified) : null,
    totalIncTax: parseFloat(data.total_inc_tax) || 0,
    currencyCode: data.currency_code || null,
    usdIncTax: parseFloat(data.total_inc_tax) || 0,
    money: JSON.stringify(
      JSON.stringify({
        currency_location: 'left',
        currency_token: '$',
        decimal_token: '.',
        decimal_places: 2,
        thousands_token: ',',
      }),
    ),
    items: data.items_total || 0,
    cartId: data.cart_id || null,
    userId: null, // Not available in Obj2
    poNumber: extractPONumber(data?.customer_message)
      ? extractPONumber(data?.customer_message)
      : null,
    referenceNumber: null,
    status: data.status || null,
    customStatus: data.custom_status || null,
    statusCode: data.status_id || null,
    isArchived: data.is_deleted ? true : false,
    isInvoiceOrder: 'A_0',
    invoiceId: null,
    invoiceNumber: null,
    invoiceStatus: null,
    ipStatus: 'A_0',
    flag: 'A_1',
    billingName: data.billing_address
      ? `${data.billing_address.first_name || ''} ${data.billing_address.last_name || ''}`.trim() ||
        null
      : null,
    merchantEmail: data.billing_address?.email || null,
    firstName: data.shipping_addresses?.[0]?.first_name || null,
    lastName: data.shipping_addresses?.[0]?.last_name || null,
    companyName: data.billing_address?.company || null,
  };
};

const getImageUrlForProducts = async (orderToDisplay: any) => {
  const productsIds = orderToDisplay?.products?.map((item: any) => item.product_id) || [];
  const query = `provider_id_esi:(${productsIds.map((id: string) => `"${id}"`).join(',')})`;
  const headers = new Headers();
  headers.append('content-type', 'application/json');
  const body = JSON.stringify({
    filter: {
      fq: query,
    },
  });
  const requestOptions: any = {
    method: 'POST',
    headers: headers,
    body: body,
    redirect: 'follow',
  };
  const productData = await fetch(
    '/apis/ecommerce-service/public/v1/search?fields=images_ej,page_slug,provider_id_esai&isAuto=false&locale=en-us',
    requestOptions,
  );
  const products = await productData?.json();
  if (products?.Data?.items?.length) {
    const updatedProducts = orderToDisplay?.products?.map((elem: any) => {
      const foundData = products?.Data?.items?.find(
        (item: any) => +item?.provider_id_esi === +elem?.product_id,
      );
      console.log('this is found data', foundData);
      elem.image_url = JSON.parse(foundData?.images_ej || '[]')?.[0]?.url_zoom || '';
      return elem;
    });
    return updatedProducts;
  } else {
    return orderToDisplay?.products;
  }
};

const convertOrderData = async (data: any) => {
  const obj = {
    id: data?.id,
    companyName: window?.__PING_DETAILS__?.userInfo?.company,
    firstName: window?.__PING_DETAILS__?.userInfo?.firstName,
    lastName: window?.__PING_DETAILS__?.userInfo?.lastName,
    createdEmail: window?.__PING_DETAILS__?.userInfo?.email,
    status: data?.status || '',
    statusId: data?.status_id || '',
    customerId: window?.__PING_DETAILS__?.userInfo?.ecommCustomerId,
    customStatus: data?.custom_status,
    dateCreated: data?.date_created,
    dateModified: data?.date_modified,
    dateShipped: data?.date_shipped,
    subtotalExTax: data?.subtotal_ex_tax,
    subtotalIncTax: data?.subtotal_inc_tax,
    baseShippingCost: data.base_shipping_cost,
    shippingCostExTax: data.shipping_cost_ex_tax,
    shippingCostIncTax: data.shipping_cost_inc_tax,
    shippingCostTax: data.shipping_cost_tax,
    shippingCostTaxClassId: data.shipping_cost_tax_class_id,
    baseHandlingCost: data.base_handling_cost,
    handlingCostExTax: data.handling_cost_ex_tax,
    handlingCostIncTax: data.handling_cost_inc_tax,
    handlingCostTax: data.handling_cost_tax,
    handlingCostTaxClassId: data.handling_cost_tax_class_id,
    baseWrappingCost: data.base_wrapping_cost,
    wrappingCostExTax: data.wrapping_cost_ex_tax,
    wrappingCostIncTax: data.wrapping_cost_inc_tax,
    wrappingCostTax: data.wrapping_cost_tax,
    wrappingCostTaxClassId: data.wrapping_cost_tax_class_id,
    totalExTax: data.total_ex_tax,
    totalIncTax: data.total_inc_tax,
    totalTax: data.total_tax,
    itemsTotal: data.items_total,
    itemsShipped: data.items_shipped,
    paymentMethod: data.payment_method,
    paymentProviderId: data.payment_provider_id,
    paymentStatus: data.payment_status,
    refundedAmount: data.refunded_amount,
    orderIsDigital: data.order_is_digital,
    storeCreditAmount: data.store_credit_amount,
    giftCertificateAmount: data.gift_certificate_amount,
    ipAddress: data.ip_address,
    geoipCountry: data.geoip_country,
    geoipCountryIso2: data.geoip_country_iso2,
    currencyId: data.currency_id,
    currencyCode: data.currency_code,
    currencyExchangeRate: data.currency_exchange_rate,
    defaultCurrencyId: data.default_currency_id,
    defaultCurrencyCode: data.default_currency_code,
    staffNotes: data.staff_notes,
    customerMessage: data.customer_message,
    discountAmount: data.discount_amount,
    couponDiscount: data.coupon_discount,
    shippingAddressCount: data.shipping_address_count,
    isDeleted: data.is_deleted,
    ebayOrderId: data.ebay_order_id,
    cartId: data.cart_id,
    ipAddressV6: data.ip_address_v6,
    isEmailOptIn: data.is_email_opt_in,
    storeDefaultCurrencyCode: data.store_default_currency_code,
    storeDefaultToTransactionalExchangeRate: data.store_default_to_transactional_exchange_rate,
    customerLocale: data.customer_locale,
    channelId: data.channel_id,
    orderSource: data.order_source,
    externalSource: data.external_source,
    creditCardType: data.credit_card_type,
    externalId: data.external_id,
    externalMerchantId: data.external_merchant_id,
    taxProviderId: data.tax_provider_id,
    externalOrderId: data.external_order_id,
    extraFields: [],
    shipments: [],
    money: {
      currency_location: 'left',
      currency_token: '$',
      decimal_token: '.',
      decimal_places: 2,
      thousands_token: ',',
    },
    orderHistoryEvent: [],
    coupons: Array.isArray(data.coupons) ? data.coupons : [],
    billingAddress: {
      first_name: data.billing_address?.first_name,
      last_name: data.billing_address?.last_name,
      company: data.billing_address?.company,
      street_1: data.billing_address?.street_1,
      street_2: data.billing_address?.street_2,
      city: data.billing_address?.city,
      state: data.billing_address?.state,
      zip: data.billing_address?.zip,
      country: data.billing_address?.country,
      countryIso2: data.billing_address?.country_iso2,
      phone: data.billing_address?.phone,
      email: window?.__PING_DETAILS__?.userInfo?.email,
    },
    shippingAddress:
      data.shipping_addresses?.map((addr: any) => ({
        id: addr.id,
        order_id: addr.order_id,
        first_name: addr.first_name,
        last_name: addr.last_name,
        company: addr.company,
        street_1: addr.street_1,
        street_2: addr.street_2,
        city: addr.city,
        state: addr.state,
        zip: addr.zip,
        country: addr.country,
        email: addr.email,
        phone: addr.phone,
        items_total: addr.items_total,
        items_shipped: addr.items_shipped,
        shipping_method: addr.shipping_method,
        base_cost: addr.base_cost,
        cost_ex_tax: addr.cost_ex_tax,
        cost_inc_tax: addr.cost_inc_tax,
        cost_tax: addr.cost_tax,
        cost_tax_class_id: addr.cost_tax_class_id,
      })) ?? [],
    products:
      data.products?.map((p: any) => ({
        id: p.id,
        sku: p.sku,
        upc: p.upc,
        name: p.name,
        type: p.type,
        brand: p.brand,
        depth: p.depth,
        width: p.width,
        height: p.height,
        weight: p.weight,
        order_id: p.order_id,
        quantity: p.quantity,
        price_tax: p.price_tax,
        return_id: p.return_id,
        total_tax: p.total_tax,
        base_price: p.base_price,
        base_total: p.base_total,
        event_date: p.event_date,
        event_name: p.event_name,
        product_id: p.product_id,
        variant_id: p.variant_id,
        external_id: p.external_id,
        is_refunded: p.is_refunded,
        wrapping_id: p.wrapping_id,
        ebay_item_id: p.ebay_item_id,
        price_ex_tax: p.price_ex_tax,
        total_ex_tax: p.total_ex_tax,
        name_customer: p.name_customer,
        name_merchant: p.name_merchant,
        option_set_id: p.option_set_id,
        price_inc_tax: p.price_inc_tax,
        refund_amount: p.refund_amount,
        total_inc_tax: p.total_inc_tax,
        wrapping_name: p.wrapping_name,
        cost_price_tax: p.cost_price_tax,
        base_cost_price: p.base_cost_price,
        product_options: p.product_options,
        order_address_id: p.order_address_id,
        quantity_shipped: p.quantity_shipped,
        wrapping_message: p.wrapping_message,
        applied_discounts: p.applied_discounts,
        cost_price_ex_tax: p.cost_price_ex_tax,
        quantity_refunded: p.quantity_refunded,
        wrapping_cost_tax: p.wrapping_cost_tax,
        base_wrapping_cost: p.base_wrapping_cost,
        bin_picking_number: p.bin_picking_number,
        cost_price_inc_tax: p.cost_price_inc_tax,
        fulfillment_source: p.fulfillment_source,
        is_bundled_product: p.is_bundled_product,
        configurable_fields: p.configurable_fields,
        ebay_transaction_id: p.ebay_transaction_id,
        fixed_shipping_cost: p.fixed_shipping_cost,
        gift_certificate_id: p.gift_certificate_id,
        wrapping_cost_ex_tax: p.wrapping_cost_ex_tax,
        wrapping_cost_inc_tax: p.wrapping_cost_inc_tax,
        order_pickup_method_id: p.order_pickup_method_id,
        parent_order_product_id: p.parent_order_product_id,
        discounted_total_inc_tax: p.discounted_total_inc_tax,
        imageUrl: p.image_url,
        productUrl: p.page_slug_esi,
        optionList: (data.product_options || []).map((opt: any) => ({
          type: opt.type,
          optionId: opt.product_option_id,
          optionValue: opt.value,
        })),
      })) ?? [],
  };
  return obj;
};

const sortOrders = (orders: any, sortKey: any) => {
  // detect direction
  const isDescending = sortKey.startsWith('-');
  const key = isDescending ? sortKey.slice(1) : sortKey;

  return orders.sort((a: any, b: any) => {
    let valA, valB;

    switch (key) {
      case 'bcOrderId':
        valA = a.id;
        valB = b.id;
        break;

      case 'poNumber':
        // safely handle missing values
        valA = a.poNumber || '';
        valB = b.poNumber || '';
        break;

      case 'totalIncTax':
        valA = parseFloat(a.total_inc_tax);
        valB = parseFloat(b.total_inc_tax);
        break;

      case 'createdAt':
        valA = new Date(a.date_created).getTime();
        valB = new Date(b.date_created).getTime();
        break;

      default:
        return 0; // no sorting if key invalid
    }

    // handle ascending vs descending
    if (valA < valB) return isDescending ? 1 : -1;
    if (valA > valB) return isDescending ? -1 : 1;
    return 0;
  });
};

const getExpAllOrders = async (data: any, companyId: string) => {
  const responseToReturn = { edges: [], totalCount: 0 };
  const headers = new Headers();
  headers.append('content-type', 'application/json');
  const requestOptions: any = {
    method: 'GET',
    headers: headers,
    redirect: 'follow',
  };
  const ordersResponse = window?.b2b?.utils?.user?.getProfile()?.companyRoleName === 'Admin'
    ? await fetch(
        `https://bigcom-order-service.cookandboardman.io/apis/order-service/v1/orders/by-company-id/${companyId}`,
      )
    : await fetch('/exp-sf-cms/api/bc/account/orders?locale=en-us', requestOptions);
  const ordersData: any = await ordersResponse?.json();
  const orders = ordersData?.Data?.orders;
  if (typeof data !== 'number') {
    if (orders?.length) {
      const convertedObj = sortOrders(orders, data?.orderBy)
        ?.slice(data?.offset, data?.offset + data?.first)
        ?.map((item: any) => {
          return { node: convertExpToBcResponse(item) };
        });
      responseToReturn['edges'] = convertedObj;
      responseToReturn['totalCount'] = orders?.length;
    }
    return responseToReturn;
  } else {
    const orderToDisplay = orders?.find((item: any) => item.id === data);
    const updatedProducts = await getImageUrlForProducts(orderToDisplay);
    orderToDisplay['products'] = updatedProducts;
    const finalData = await convertOrderData(orderToDisplay);
    return finalData;
  }
};

export const getB2BAllOrders = (data: CustomFieldItems, companyId: string) =>
  getExpAllOrders(data, companyId);

export const getBCAllOrders = (data: CustomFieldItems, companyId: string) =>
  getExpAllOrders(data, companyId);

export const getB2BOrderDetails = async (id: number, companyB2BId: string) => {
  return getExpAllOrders(id, companyB2BId);
};

export const getBCOrderDetails = (id: number, companyB2BId: string) => {
  return getExpAllOrders(id, companyB2BId);
};

export const getOrderStatusType = (): Promise<OrderStatusItem[]> =>
  B3Request.graphqlB2B({
    query: getOrderStatusTypeQl('orderStatuses'),
  }).then((res) => res.orderStatuses);

export const getBcOrderStatusType = (): Promise<OrderStatusItem[]> =>
  B3Request.graphqlB2B({
    query: getOrderStatusTypeQl('bcOrderStatuses'),
  }).then((res) => res.bcOrderStatuses);

export const getOrdersCreatedByUser = (companyId: number, module: number) =>
  B3Request.graphqlB2B({
    query: getCreatedByUser(companyId, module, 'createdByUser'),
  });
