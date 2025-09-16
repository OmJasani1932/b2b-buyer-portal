import { useContext, useEffect, useState } from 'react';
import { B2BEvent, useB2BCallback } from '@b3/hooks';
import { useB3Lang } from '@b3/lang';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Box, Card, CardContent, Divider, Typography } from '@mui/material';

import { B3Upload } from '@/components';
import CustomButton from '@/components/button/CustomButton';
import { useBlockPendingAccountViewPrice, useMobile } from '@/hooks';
import { addProductToBcShoppingList, addProductToShoppingList } from '@/shared/service/b2b';
import { useAppSelector } from '@/store';
import { snackbar } from '@/utils';
import { getValidOptionsList } from '@/utils/b3Product/b3Product';

import ShoppingDownload from '../../ShoppingLists/ShoppingDownload';

import { getAllModifierDefaultValue } from '../../../utils/b3Product/shared/config';
import { ShoppingListDetailsContext } from '../context/ShoppingListDetailsContext';

import QuickAdd from './QuickAdd';
import SearchProduct from './SearchProduct';

interface AddToListProps {
  updateList: () => void;
  isB2BUser: boolean;
  type?: string;
}

export default function AddToShoppingList(props: AddToListProps) {
  const {
    state: { id },
  } = useContext(ShoppingListDetailsContext);

  const companyStatus = useAppSelector(({ company }) => company.companyInfo.status);
  const { updateList, isB2BUser, type: pageType = '' } = props;
  const b3Lang = useB3Lang();

  const [isOpenBulkLoadCSV, setIsOpenBulkLoadCSV] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile] = useMobile();
  const [blockPendingAccountViewPrice] = useBlockPendingAccountViewPrice();

  // Shopping Download states
  const [isb2bCustome, setb2bCustome] = useState<boolean>(false);
  const [quoteConfigurationId, setQuoteConfigurationId] = useState<number>(0);

  const addItemsToShoppingList = isB2BUser ? addProductToShoppingList : addProductToBcShoppingList;

  const addToList = useB2BCallback(
    B2BEvent.OnAddToShoppingList,
    async (dispatchOnAddToShoppingListEvent, products: CustomFieldItems[]) => {
      try {
        if (!dispatchOnAddToShoppingListEvent(products)) {
          throw new Error();
        }

        const items = products.map((product) => {
          const newOptionLists = getValidOptionsList(product.newSelectOptionList, product);
          return {
            optionList: newOptionLists,
            productId: product.id,
            quantity: product.quantity,
            variantId: product.variantId,
          };
        });

        const res: CustomFieldItems = await addItemsToShoppingList({
          shoppingListId: id,
          items,
        });

        snackbar.success(b3Lang('shoppingList.addToShoppingList.productsAdded'), {
          isClose: true,
        });

        return res;
      } catch (e: any) {
        if (e.message.length > 0) {
          snackbar.error(e.message, { isClose: true });
        }
      }
      return true;
    },
  );

  const quickAddToList = async (products: CustomFieldItems[]) => {
    const items = products.map((product) => {
      const newOptionLists = getValidOptionsList(
        product.newSelectOptionList || product.optionList,
        product?.products || product,
      );
      return {
        optionList: newOptionLists || [],
        productId: parseInt(product.productId, 10) || 0,
        quantity: product.quantity,
        variantId: parseInt(product.variantId, 10) || 0,
      };
    });

    const res: CustomFieldItems = await addItemsToShoppingList({
      shoppingListId: id,
      items,
    });

    snackbar.success(b3Lang('shoppingList.addToShoppingList.productsAdded'), {
      isClose: true,
    });

    return res;
  };

  const getValidProducts = (products: CustomFieldItems) => {
    const notPurchaseSku: string[] = [];
    const productItems: CustomFieldItems[] = [];
    const notAddAble: string[] = [];

    products.forEach((item: CustomFieldItems) => {
      const { products: currentProduct, qty } = item;
      const { option, purchasingDisabled, variantSku, variantId, productId, modifiers } =
        currentProduct;

      const defaultModifiers = getAllModifierDefaultValue(modifiers);
      if (purchasingDisabled && pageType !== 'shoppingList') {
        notPurchaseSku.push(variantSku);
        return;
      }

      const notPassedModifier = defaultModifiers.filter(
        (modifier: CustomFieldItems) => !modifier.isVerified,
      );
      if (notPassedModifier.length > 0) {
        notAddAble.push(variantSku);

        return;
      }

      const optionsList = option.map((item: CustomFieldItems) => ({
        optionId: `attribute[${item.option_id}]`,
        optionValue: item.id.toString(),
      }));

      defaultModifiers.forEach((modifier: CustomFieldItems) => {
        const { type } = modifier;

        if (type === 'date') {
          const { defaultValue } = modifier;
          Object.keys(defaultValue).forEach((key) => {
            optionsList.push({
              optionId: `attribute[${modifier.option_id}][${key}]`,
              optionValue: `${modifier.defaultValue[key]}`,
            });
          });
        } else {
          optionsList.push({
            optionId: `attribute[${modifier.option_id}]`,
            optionValue: `${modifier.defaultValue}`,
          });
        }
      });

      productItems.push({
        productId: parseInt(productId, 10) || 0,
        variantId: parseInt(variantId, 10) || 0,
        quantity: +qty,
        optionList: optionsList,
        products: item.products,
      });
    });

    return {
      notPurchaseSku,
      productItems,
      notAddAble,
    };
  };

  const handleCSVAddToList = async (productsData: CustomFieldItems) => {
    setIsLoading(true);
    try {
      const { validProduct } = productsData;

      const { notPurchaseSku, productItems, notAddAble } = getValidProducts(validProduct);

      if (productItems.length > 0) {
        await quickAddToList(productItems);

        updateList();
      }

      if (notAddAble.length > 0 && pageType !== 'shoppingList') {
        snackbar.error(
          b3Lang('shoppingList.addToShoppingList.skuNotAddable', {
            notAddAble: notAddAble.join(', '),
          }),
          {
            isClose: true,
          },
        );
      }

      if (notPurchaseSku.length > 0 && pageType !== 'shoppingList') {
        snackbar.error(
          b3Lang('shoppingList.addToShoppingList.skuNotPurchasable', {
            notPurchaseSku: notPurchaseSku.join(', '),
          }),
          {
            isClose: true,
          },
        );
      }

      setIsOpenBulkLoadCSV(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenUploadDiag = () => {
    if (blockPendingAccountViewPrice && companyStatus === 0) {
      snackbar.info(
        'Your business account is pending approval. This feature is currently disabled.',
      );
    } else {
      setIsOpenBulkLoadCSV(true);
    }
  };

  // Fetch custom store configuration for shopping download
  const fetchCustomStoreConfig = async () => {
    const userDetails = (window as any).__PING_DETAILS__;
    try {
      const URL = userDetails?.environmentType.toLowerCase().includes('dev')
        ? 'https://dev-bigcom-order-service.cookandboardman.io/apis/order-service/v1/custom-store-configuration'
        : 'https://bigcom-order-service.cookandboardman.io/apis/order-service/v1/custom-store-configuration';
      const response = await fetch(URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          clientid: 'product-3a6fc5d8-1c9c-4844-af6e-d45204f95f8b',
        },
      });

      if (!response.ok) {
        console.error(`Error: Failed to fetch data. Status: ${response.status}`);
        return null;
      }

      const data = await response.json();
      const userGroup = localStorage.getItem('user-group');
      const groupName = userGroup ? JSON.parse(userGroup) : null;

      if (!groupName) {
        setb2bCustome(false);
        return;
      }

      const quoteType = data?.Data?.find(
        (item: any) => item?.storeName?.toLowerCase() === groupName?.toLowerCase(),
      )?.quoteType;

      const quoteConfigurationId = data?.Data?.find(
        (item: any) => item?.storeName?.toLowerCase() === groupName?.toLowerCase(),
      )?.quoteConfiguration;
      if (quoteConfigurationId?.toString()?.length) {
        setQuoteConfigurationId(quoteConfigurationId);
      }
      setb2bCustome(quoteType === 'custom');
    } catch (error) {
      setb2bCustome(false);
    }
  };

  useEffect(() => {
    fetchCustomStoreConfig();
  }, []);

  return (
    <Card
      sx={{
        marginBottom: isMobile ? '0px' : '50px',
      }}
    >
      <CardContent className="!p-0">
        <Box>
          <Typography variant="h3">{b3Lang('shoppingList.addToShoppingList.addToList')}</Typography>
          <SearchProduct
            updateList={updateList}
            addToList={addToList}
            isB2BUser={isB2BUser}
            type="shoppingList"
          />

          <Divider />

          <QuickAdd type="shoppingList" updateList={updateList} quickAddToList={quickAddToList} />

          <Divider />

          <Box
            sx={{
              margin: '20px 0 0',
            }}
          >
            <CustomButton variant="text" onClick={() => handleOpenUploadDiag()}>
              <UploadFileIcon
                sx={{
                  marginRight: '8px',
                }}
              />
              {b3Lang('shoppingList.addToShoppingList.bulkUploadCsv')}
            </CustomButton>

            {id && isb2bCustome && (
              <div className="mt-4 text-left flex">
                <ShoppingDownload shoppingListId={id} quoteConfigurationId={quoteConfigurationId} changeButton={true}/>
              </div>
            )}
          </Box>

          <B3Upload
            isOpen={isOpenBulkLoadCSV}
            setIsOpen={setIsOpenBulkLoadCSV}
            handleAddToList={handleCSVAddToList}
            isLoading={isLoading}
            withModifiers
          />
        </Box>
      </CardContent>
    </Card>
  );
}
