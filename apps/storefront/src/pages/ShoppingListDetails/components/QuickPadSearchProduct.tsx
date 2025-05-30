import { ChangeEvent, Fragment, useState } from 'react';
import { useB3Lang } from '@b3/lang';
import SearchIcon from '@mui/icons-material/Search';
import { Box, InputAdornment, TextField, Typography } from '@mui/material';

import CustomButton from '@/components/button/CustomButton';
import { useBlockPendingAccountViewPrice, useMobile } from '@/hooks';
import {
  getB2BVariantInfoBySkus,
  getBcVariantInfoBySkus,
  searchB2BProducts,
  searchBcProducts,
} from '@/shared/service/b2b';
import { useAppSelector } from '@/store';
import { snackbar } from '@/utils';
import { LineItems } from '@/utils/b3Product/b3Product';
import { conversionProductsList } from '@/utils/b3Product/shared/config';
import RemoveIcon from '@mui/icons-material/Remove';

import {
  ShoppingListAddProductOption,
  ShoppingListProductItem,
  SimpleObject,
} from '../../../types';

import QuickPadProductListing from './QuickPadProductListing';
import { IconCross } from '@/components/experro/assets/icons/icon-cross';
import { callCart } from '@/utils/cartUtils';
import { CART_URL } from '@/constants';
import { successTip } from '@/components';
import b3TriggerCartNumber from '@/utils/b3TriggerCartNumber';
import { getCartProductInfo } from '@/pages/QuickOrder/utils';
import styled from '@emotion/styled';
import { ExpSearch } from '@/components/experro/api';

interface SearchProductProps {
  updateList?: () => void;
  addToList: (products: CustomFieldItems[]) => void;
  searchDialogTitle?: string;
  addButtonText?: string;
  isB2BUser: boolean;
  type?: string;
}
const VariantSkuBlock = styled.div`
  display: flex;
  align-items: center;
`;
const HeadingBlock = styled.div`
  p {
    font-size: 20px;
    margin-bottom: 20px;
    font-weight: 600;
    color: #000000;
  }
`;

const RemoveIconBlock = styled.div`
  padding: 4px;
  border: 1px solid #cccccc;
  background: #dddddd;
  color: #808285;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  margin-right: 10px;
  font-size: 20px;
  cursor: pointer;
  &:hover {
    background: #808285;
    color: white;
    border-color: #808285;
  }
`;

const QtyWraper = styled.div`
  width: 80px;

  .MuiTextField-root {
    margin: 0px;
  }
`;
export default function QuickPadSearchProduct({
  updateList = () => {},
  // addToList,
  searchDialogTitle,
  addButtonText,
  isB2BUser,
  type,
}: SearchProductProps) {
  const b3Lang = useB3Lang();
  const initialState = [
    {
      searchText: '',
      productList: [] as ShoppingListProductItem[],
      productListOpen: false,
      isLoading: false,
      isVisibleProductOption: true,
      variantSku: '',
      quantity: '',
      errors: '',
    },
    {
      searchText: '',
      productList: [] as ShoppingListProductItem[],
      productListOpen: false,
      isLoading: false,
      isVisibleProductOption: true,
      variantSku: '',
      quantity: '',
      errors: '',
    },
    {
      searchText: '',
      productList: [] as ShoppingListProductItem[],
      productListOpen: false,
      isLoading: false,
      isVisibleProductOption: true,
      variantSku: '',
      quantity: '',
      errors: '',
    },
  ];
  const [isMobile] = useMobile();
  const [searchFields, setSearchFields] = useState<any>(initialState);
  const companyInfoId = useAppSelector(({ company }) => company.companyInfo.id);
  const customerGroupId = useAppSelector((state) => state.company.customer.customerGroupId);
  const companyStatus = useAppSelector(({ company }) => company.companyInfo.status);
  const salesRepCompanyId = useAppSelector(({ b2bFeatures }) => b2bFeatures.masqueradeCompany.id);
  const companyId = companyInfoId || salesRepCompanyId;
  const [isLoading, setIsLoading] = useState(false);
  // const [productListOpen, setProductListOpen] = useState(false);
  // const [isAdded, setIsAdded] = useState(false);
  // const [searchText, setSearchText] = useState('');
  // const [productList, setProductList] = useState<ShoppingListProductItem[]>([]);
  // const [chooseOptionsOpen, setChooseOptionsOpen] = useState(false);
  // const [optionsProduct, setOptionsProduct] = useState<ShoppingListProductItem>();
  const [pageNumber, setPageNumber] = useState<any>(1);

  const [blockPendingAccountViewPrice] = useBlockPendingAccountViewPrice();

  const handleSearchTextChange = (e: any, index: any) => {
    const updatedFields: any = [...searchFields];
    updatedFields[index].searchText = e.target.value;
    if (e.target.value.length === 0) {
      updatedFields[index].errors = '';
    }

    setSearchFields([...updatedFields]);
  };

  const handleQuantityChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const updatedFields: any = [...searchFields];
    updatedFields[index].quantity = e.target.value;
    if (e.target.value.length === 0) {
      updatedFields[index].errors = '';
    } else {
      updatedFields[index].errors = '';
    }
    setSearchFields(updatedFields);
  };
  const handleAddRow = () => {
    setSearchFields([
      ...searchFields,
      { searchText: '', productList: [], productListOpen: false, isLoading: false },
    ]);
  };
  const searchProduct = async (index: number) => {
    const field: any = searchFields[index];
    if (!field.searchText || field.isLoading) {
      return;
    }

    if (blockPendingAccountViewPrice && companyStatus === 0) {
      snackbar.info(b3Lang('global.searchProductAddProduct.businessAccountPendingApproval'));
      return;
    }
    const getProducts = isB2BUser ? searchB2BProducts : searchBcProducts;
    const updatedFields: any = [...searchFields];
    updatedFields[index].isLoading = true;
    setSearchFields(updatedFields);
    // setIsLoading(true);
    try {
      const { productsSearch }: CustomFieldItems = await getProducts({
        search: field.searchText,
        companyId,
        customerGroupId,
        categoryFilter: true,
      });
      const product: any = conversionProductsList(productsSearch);
      updatedFields[index].productList = product;
      setPageNumber(1);
      if (product?.length === 0) {
        updatedFields[index].errors = 'No products found';
      } else {
        updatedFields[index].isVisibleProductOption = true;
        updatedFields[index].errors = '';
      }
      updatedFields[index].productListOpen = true;
      setSearchFields([...updatedFields]);
      // setProductList(product);
      // setProductListOpen(true);
    } finally {
      updatedFields[index].isLoading = false;
      setSearchFields([...updatedFields]);
      // setIsLoading(false);
    }
  };

  const [lineItemCount, setLineItemCount] = useState<any>(0);
  const clearProductInfo = () => {
    // setProductList([]);
    const updatedFields = [...searchFields]?.filter((ele: any) => ele?.errors?.length !== 0);
    setIsLoading(false);
    setSearchFields(updatedFields.length === 0 ? initialState : updatedFields);
  };

  const handleDeleteRow = (index: number) => {
    if (searchFields?.length <= 1) {
      return;
    }
    const updatedFields = searchFields.filter((_: any, idx: any) => idx !== index);
    setSearchFields(updatedFields);
  };

  const validateSkuInput = (index: number, sku: string, qty: string) => {
    if (!sku && !qty) {
      return true;
    }
    let isValid = true;
    const quantity = parseInt(qty, 10) || 0;

    if (!sku) {
      isValid = false;
    }

    if (!qty) {
      isValid = false;
      const updatedFields: any = [...searchFields];
      updatedFields[index].errors = 'Quantity is required';
      setSearchFields(updatedFields);
    } else if (quantity <= 0) {
      isValid = false;
      const updatedFields: any = [...searchFields];
      updatedFields[index].errors = 'Incorrect quantity';
      setSearchFields(updatedFields);
    }
    return isValid;
  };

  const handleCrossIcon = (index: any) => {
    const updatedFields: any = [...searchFields];
    updatedFields[index].searchText = '';
    updatedFields[index].productList = [];
    updatedFields[index].isVisibleProductOption = true;
    updatedFields[index].errors = '';
    setSearchFields(updatedFields);
  };
  const getProductData = () => {
    const skuValue: SimpleObject = {};
    let isValid = true;
    searchFields.forEach((element: any, index: any) => {
      const sku = element.variantSku ? element.variantSku : '';
      const qty = element.quantity;
      if (sku.length) {
        isValid = validateSkuInput(index, sku, qty) === false ? false : isValid;
        if (isValid && sku) {
          const quantity = parseInt(qty, 10) || 0;
          skuValue[sku] = skuValue[sku] ? (skuValue[sku] as number) + quantity : quantity;
        }
      }
    });

    return {
      skuValue,
      isValid,
      skus: Object.keys(skuValue),
    };
  };
  const getVariantList = async (skus: string[]) => {
    const searchObj = {
      skip: 0,
      limit: 1000,
      sortBy: 'relevance',
      orderBy: '',
      body: {
        filter: {
          sku_esi: skus,
        },
      },
      fieldsToQuery:
        'brand_esi,brand_page_slug_esi,categories_esai,category_ids_esai,provider_id_esi,provider_specific_data_ej,sku_esi, sku_for_analytics_esli,variant_options_ej,variants_ej',
      byPassMerchandising: true,
    };
    const data = await ExpSearch({
      searchObj,
    });
    const allvaildSku: any = [];

    data.Data?.items.forEach((product: any) => {
      const iSDefaultSku = skus?.filter(
        (sku: any) => product?.sku_esi.toLowerCase() == sku.toLowerCase(),
      );

      if (iSDefaultSku.length) {
        iSDefaultSku?.forEach((ele: any) => {
          allvaildSku.push(ele);
        });
      }

      skus.forEach((enterdSku: any) => {
        const filterdValidSku = product?.variants_ej.filter(
          (varaint: any) => varaint.sku.toLowerCase() === enterdSku.toLowerCase(),
        );
        if (filterdValidSku.length) {
          filterdValidSku?.forEach((element: any) => {
            if (element.sku) {
              allvaildSku.push(element.sku);
            }
          });
        }
      });
    });

    const invalidSkus = skus.filter((sku) => !allvaildSku.includes(sku));

    const updatedFields1 = [...searchFields];
    invalidSkus?.forEach((invalidSku: any) => {
      const matchAll = updatedFields1?.filter((ele) => ele?.variantSku === invalidSku);
      matchAll.forEach((match: any) => {
        if (match) {
          match.errors = b3Lang('purchasedProducts.quickAdd.notFoundSku', {
            notFoundSku: invalidSku,
          });
        } else {
          match.errors = '';
        }
      });
      setSearchFields(updatedFields1);
    });
    // const getProducts = isB2BUser ? searchB2BProducts : searchBcProducts;

    // Parallel API calls for all SKUs
    // const productPromises = skus.map((sku) =>
    //   getProducts({
    //     search: sku,
    //     companyId,
    //     customerGroupId,
    //     categoryFilter: true,
    //   })
    //     .then((result) => ({ status: 'fulfilled', sku, result }))
    //     .catch(() => ({ status: 'rejected', sku })),
    // );

    // const results = await Promise.all(productPromises);

    // const validSkus: string[] = [];
    // const updatedFields = [...searchFields];

    // results.forEach((res: any) => {
    //   if (res.status === 'fulfilled') {
    //     const product = conversionProductsList(res.result.productsSearch);
    //     if (product.length === 0) {
    //       const matchAll = updatedFields.filter((ele) => ele.searchText === res.sku);
    //       matchAll.forEach((match: any) => {
    //         if (match) {
    //           match.errors = b3Lang('purchasedProducts.quickAdd.notFoundSku', {
    //             notFoundSku: res.sku,
    //           });
    //         } else {
    //           match.errors = '';
    //         }
    //       });
    //     } else {
    //       const matchAll = updatedFields.filter((ele) => ele.searchText === res.sku);
    //       matchAll.forEach((match: any) => {
    //         if (match) {
    //           match.errors = '';
    //         }
    //       });
    //       validSkus.push(res.sku);
    //     }
    //   } else {
    //     const matchAll = updatedFields.filter((ele) => ele.searchText === res.sku);
    //     matchAll.forEach((match: any) => {
    //       if (match) {
    //         match.errors = '';
    //       }
    //     });
    //   }
    // });

    // setSearchFields(updatedFields);

    if (allvaildSku.length === 0) {
      setIsLoading(false);
      return [];
    }
    allvaildSku.forEach((validSku: any) => {
      const matchAll = updatedFields1.filter((ele) => ele.searchText === validSku);
      matchAll.forEach((match: any) => {
        if (match) {
          match.errors = '';
        } else {
          match.errors = '';
        }
      });
      setSearchFields(updatedFields1);
    });
    const getVariantInfoBySku = isB2BUser ? getB2BVariantInfoBySkus : getBcVariantInfoBySkus;
    try {
      // setIsLoading(true);
      const { variantSku: variantInfoList }: CustomFieldItems = await getVariantInfoBySku(
        { skus: allvaildSku },
        true,
      );

      return variantInfoList;
    } catch (error) {
      setIsLoading(false);
      return [];
    } finally {
      // setIsLoading(false);
    }
  };

  const getProductItems = async (
    variantInfoList: CustomFieldItems,
    skuValue: SimpleObject,
    skus: string[],
  ) => {
    const notFoundSku: string[] = [];
    const notPurchaseSku: string[] = [];
    const productItems: CustomFieldItems[] = [];
    const passSku: string[] = [];
    const notStockSku: {
      sku: string;
      stock: number;
    }[] = [];
    const orderLimitSku: {
      sku: string;
      min: number;
      max: number;
    }[] = [];

    const cartProducts = await getCartProductInfo();
    skus.forEach((sku) => {
      const variantInfo: CustomFieldItems | null = (variantInfoList || []).find(
        (variant: CustomFieldItems) => variant.variantSku.toUpperCase() === sku.toUpperCase(),
      );

      if (!variantInfo) {
        notFoundSku.push(sku);
        return;
      }

      const {
        productId,
        variantId,
        option: options,
        purchasingDisabled = '1',
        stock,
        isStock,
        maxQuantity,
        minQuantity,
        variantSku,
      } = variantInfo;

      const num =
        cartProducts.find(
          (item: LineItems) =>
            item.sku === variantSku && +(item?.variantEntityId || 0) === +(variantId || 0),
        )?.quantity || 0;

      const quantity = (skuValue[sku] as number) || 0;

      const allQuantity = (skuValue[sku] as number) + num || 0;

      if (purchasingDisabled === '1') {
        notPurchaseSku.push(sku);
        return;
      }

      if (isStock === '1' && quantity > +stock) {
        notStockSku.push({
          sku,
          stock: +stock,
        });

        return;
      }

      if (
        maxQuantity !== 0 &&
        minQuantity !== 0 &&
        allQuantity > 0 &&
        (allQuantity > maxQuantity || allQuantity < minQuantity)
      ) {
        orderLimitSku.push({
          sku,
          min: allQuantity < minQuantity ? minQuantity : 0,
          max: allQuantity > maxQuantity ? maxQuantity : 0,
        });

        return;
      }

      const optionList = (options || []).reduce(
        (arr: ShoppingListAddProductOption[], optionStr: string) => {
          try {
            const option = typeof optionStr === 'string' ? JSON.parse(optionStr) : optionStr;
            arr.push({
              optionId: `attribute[${option.option_id}]`,
              optionValue: `${option.id}`,
            });
            return arr;
          } catch (error) {
            return arr;
          }
        },
        [],
      );

      passSku.push(sku);

      productItems.push({
        ...variantInfo,
        newSelectOptionList: optionList,
        productId: parseInt(productId, 10) || 0,
        quantity,
        variantId: parseInt(variantId, 10) || 0,
      });
    });

    return {
      notFoundSku,
      notPurchaseSku,
      notStockSku,
      productItems,
      passSku,
      orderLimitSku,
    };
  };

  const quickAddToList = async (products: CustomFieldItems[]) => {
    const res = await callCart(products);

    if (res && res.errors) {
      snackbar.error(res.errors[0].message, {
        isClose: true,
      });
    } else {
      snackbar.success('', {
        jsx: successTip({
          message: b3Lang('purchasedProducts.quickOrderPad.productsAdded'),
          link: CART_URL,
          linkText: b3Lang('purchasedProducts.quickOrderPad.viewCart'),
          isOutLink: true,
          isCustomEvent: true,
        }),
        isClose: true,
      });
    }

    b3TriggerCartNumber();
    clearProductInfo();
    setIsLoading(false);
    return res;
  };
  const handleAddToList = async () => {
    if (blockPendingAccountViewPrice && companyStatus === 0) {
      snackbar.info(
        'Your business account is pending approval. This feature is currently disabled.',
      );
      return;
    }
    try {
      const { skuValue, isValid, skus }: any = getProductData();

      if (!isValid || skus.length <= 0) {
        return;
      }
      setIsLoading(true);
      const variantInfoList: any = await getVariantList(skus);

      const { notFoundSku, notPurchaseSku, productItems, passSku, notStockSku, orderLimitSku } =
        await getProductItems(variantInfoList, skuValue, skus);

      setLineItemCount(passSku.length ? passSku.length : 0);
      if (notFoundSku.length > 0) {
        // showErrors(value, notFoundSku, 'sku', '');
        // snackbar.error(
        //   b3Lang('purchasedProducts.quickAdd.notFoundSku', {
        //     notFoundSku: notFoundSku.join(','),
        //   }),
        //   {
        //     isClose: true,
        //   },
        // );
      }

      if (notPurchaseSku.length > 0) {
        // showErrors(value, notPurchaseSku, 'sku', '');
        snackbar.error(
          b3Lang('purchasedProducts.quickAdd.notPurchaseableSku', {
            notPurchaseSku: notPurchaseSku.join(','),
          }),
          {
            isClose: true,
          },
        );
      }

      if (notStockSku.length > 0) {
        const stockSku = notStockSku.map((item) => item.sku);

        notStockSku.forEach((_item) => {
          // const { sku, stock } = item;
          // showErrors(value, [sku], 'qty', `${stock} in stock`);
        });

        snackbar.error(
          b3Lang('purchasedProducts.quickAdd.insufficientStockSku', {
            stockSku: stockSku.join(','),
          }),
          {
            isClose: true,
          },
        );
      }

      if (orderLimitSku.length > 0) {
        orderLimitSku.forEach((item) => {
          const { min, max, sku } = item;

          // const type = min === 0 ? 'Max' : 'Min';
          const limit = min === 0 ? max : min;
          // showErrors(value, [sku], 'qty', `${type} is ${limit}`);

          const typeText = min === 0 ? 'maximum' : 'minimum';
          snackbar.error(
            b3Lang('purchasedProducts.quickAdd.purchaseQuantityLimitMessage', {
              typeText,
              limit,
              sku,
            }),
            {
              isClose: true,
            },
          );
        });
      }

      if (productItems.length > 0) {
        await quickAddToList(productItems);
        // clearInputValue(value, passSku);

        updateList();
      }
    } finally {
      // setIsLoading(false);
    }
  };
  return (
    <>
      <style>
        {`
                        .lds-spinner,
                        .lds-spinner div,
                        .lds-spinner div:after {
                          box-sizing: border-box;
                        }
                        .lds-spinner {
                          color: white;
                          display: inline-block;
                          position: relative;
                          width: 80px;
                          height: 80px;
                        }
                        .lds-spinner div {
                          transform-origin: 40px 40px;
                          animation: lds-spinner 1.2s linear infinite;
                        }
                        .lds-spinner div:after {
                          content: " ";
                          display: block;
                          position: absolute;
                          top: 3.2px;
                          left: 36.8px;
                          width: 6.4px;
                          height: 17.6px;
                          border-radius: 20%;
                          background: white;
                        }
                        .lds-spinner div:nth-child(1) {
                          transform: rotate(0deg);
                          animation-delay: -1.1s;
                        }
                        .lds-spinner div:nth-child(2) {
                          transform: rotate(30deg);
                          animation-delay: -1s;
                        }
                        .lds-spinner div:nth-child(3) {
                          transform: rotate(60deg);
                          animation-delay: -0.9s;
                        }
                        .lds-spinner div:nth-child(4) {
                          transform: rotate(90deg);
                          animation-delay: -0.8s;
                        }
                        .lds-spinner div:nth-child(5) {
                          transform: rotate(120deg);
                          animation-delay: -0.7s;
                        }
                        .lds-spinner div:nth-child(6) {
                          transform: rotate(150deg);
                          animation-delay: -0.6s;
                        }
                        .lds-spinner div:nth-child(7) {
                          transform: rotate(180deg);
                          animation-delay: -0.5s;
                        }
                        .lds-spinner div:nth-child(8) {
                          transform: rotate(210deg);
                          animation-delay: -0.4s;
                        }
                        .lds-spinner div:nth-child(9) {
                          transform: rotate(240deg);
                          animation-delay: -0.3s;
                        }
                        .lds-spinner div:nth-child(10) {
                          transform: rotate(270deg);
                          animation-delay: -0.2s;
                        }
                        .lds-spinner div:nth-child(11) {
                          transform: rotate(300deg);
                          animation-delay: -0.1s;
                        }
                        .lds-spinner div:nth-child(12) {
                          transform: rotate(330deg);
                          animation-delay: 0s;
                        }
                        @keyframes lds-spinner {
                          0% {
                            opacity: 1;
                          }
                          100% {
                            opacity: 0;
                          }
                        }
        `}
      </style>
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-dvh bg-black/50 z-[9999] flex items-center justify-center">
          <div className="lds-spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
      <Box sx={{ padding: isMobile ? '0px 0px 20px 0px' : '0px 20px 20px 20px' }}>
        <HeadingBlock>
          <Typography className="text-gray-200">Quick Order via SKU</Typography>
        </HeadingBlock>

        <Box
          sx={{
            paddingLeft: '54px',
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '10px',
          }}
        >
          <Box sx={{ fontSize: '18px', fontWeight: '600', width: 'calc(100% - 80px);' }}>
            Variant SKU
          </Box>
          <Box sx={{ fontSize: '18px', fontWeight: '600', width: '80px', textAlign: 'left' }}>
            Quantity
          </Box>
        </Box>
        <div>
          {searchFields.map((field: any, index: any) => {
            return (
              <Fragment key={index}>
                {field.isLoading && (
                  <>
                    <div className="fixed top-0 left-0 w-full h-dvh bg-black/50 z-[9999] flex items-center justify-center">
                      <div className="lds-spinner">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                    </div>
                  </>
                )}
                <>
                  <Box
                    sx={{
                      mb: '24px',
                    }}
                  >
                    <VariantSkuBlock>
                      <RemoveIconBlock
                        className={searchFields.length <= 1 ? 'opacity-50 pointer-events-none' : ''}
                        onClick={() => handleDeleteRow(index)}
                      >
                        <RemoveIcon />
                      </RemoveIconBlock>

                      <Box
                        sx={{
                          width: 'calc(100% - 128px)',
                          paddingRight: isMobile ? '10px' : '20px',
                        }}
                      >
                        <TextField
                          hiddenLabel
                          placeholder={b3Lang(`global.searchProduct.placeholder.${type}`)}
                          variant="filled"
                          fullWidth
                          size="small"
                          autoComplete="off"
                          value={field.searchText}
                          onChange={(e: any) => handleSearchTextChange(e, index)}
                          onKeyDown={(e) => e.key === 'Enter' && searchProduct(index)}
                          InputProps={{
                            endAdornment: (
                              <>
                                <InputAdornment
                                  position="start"
                                  onClick={() => searchProduct(index)}
                                  className="cursor-pointer"
                                  disablePointerEvents={field.isLoading}
                                >
                                  <SearchIcon />
                                </InputAdornment>
                                {/* {field?.productList?.length === 0 ? (
                                <InputAdornment
                                  position="start"
                                  onClick={() => searchProduct(index)}
                                  className="cursor-pointer"
                                  disablePointerEvents={field.isLoading}
                                >
                                  <SearchIcon />
                                </InputAdornment>
                              ) : (
                                <span
                                  className="w-6 cursor-pointer flex"
                                  onClick={() => handleCrossIcon(index)}
                                >
                                  <i className="w-6 h-5 flex text-primary">
                                    <IconCross />
                                  </i>
                                </span>
                              )} */}
                              </>
                            ),
                          }}
                          sx={{
                            '& input': {
                              padding: '12px 12px 12px 0',
                            },
                          }}
                        />
                      </Box>
                      <QtyWraper>
                        <TextField
                          inputProps={{ className: 'qty-pad' }}
                          hiddenLabel
                          type="number"
                          variant="filled"
                          size="small"
                          autoComplete="off"
                          value={field.quantity}
                          onChange={(e: any) => handleQuantityChange(index, e)}
                          // onKeyDown={(e) => e.key === 'Enter' && searchProduct(index)}
                          sx={{
                            '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button':
                              {
                                display: 'none',
                              },
                            '& input[type=number]': {
                              MozAppearance: 'textfield',
                            },
                            margin: '12px 0',
                            '& input': {
                              padding: '12px 12px 12px 0',
                            },
                          }}
                        />
                      </QtyWraper>
                    </VariantSkuBlock>
                    {field?.productList?.length > 0 && field?.isVisibleProductOption && (
                      <div className="md:pr-[120px] pr-[110px] pt-3 flex justify-end">
                        <span
                          className="w-6 cursor-pointer flex"
                          onClick={() => handleCrossIcon(index)}
                        >
                          <i className="w-6 h-5 flex text-primary">
                            <IconCross />
                          </i>
                        </span>
                      </div>
                    )}

                    <QuickPadProductListing
                      isOpen={field.productListOpen}
                      isLoading={field.isLoading}
                      productList={field.productList}
                      searchText={field.searchText}
                      type={type}
                      // onSearchTextChange={(e: any) => handleSearchTextChange(index, e)}
                      // onSearch={() => searchProduct(index)}
                      // onCancel={() => handleProductListDialogCancel(index)}
                      // onProductQuantityChange={(id, qty) => handleProductQuantityChange(index, id, qty)}
                      // onChooseOptionsClick={(id) => handleChangeOptionsClick(index, id)}
                      // onAddToListClick={(products: any) => handleProductListAddToList(products)}
                      searchDialogTitle={searchDialogTitle}
                      addButtonText={addButtonText}
                      setIsLoading={(loading: any) => {
                        const updatedFields = [...searchFields];
                        updatedFields[index].isLoading = loading;
                        setSearchFields(updatedFields);
                      }}
                      isB2BUser={isB2BUser}
                      setSearchFields={setSearchFields}
                      index={index}
                      searchFields={searchFields}
                      pageNumber={pageNumber}
                      setPageNumber={setPageNumber}
                    />
                  </Box>
                </>
              </Fragment>
            );
          })}
        </div>
        {lineItemCount > 0 && !isLoading && (
          <span className="text-green block pl-[54px] mb-5">
            {lineItemCount} Line Items has been added to cart
          </span>
        )}
        <Box sx={{ gap: '20px', display: 'flex' }}>
          <CustomButton onClick={handleAddRow} type="button">
            Add Row
          </CustomButton>
          <CustomButton
            onClick={handleAddToList}
            type="button"
            disabled={searchFields?.every((ele: any) => ele.searchText.length === 0)}
          >
            Add to cart
          </CustomButton>
        </Box>
      </Box>
    </>
  );
}
