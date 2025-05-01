import  { useCallback, useContext } from 'react';
import { useB3Lang } from '@b3/lang';
import { Box } from '@mui/material';

import CustomButton from '@/components/button/CustomButton';
import { useMobile } from '@/hooks';
import { useAppSelector } from '@/store';
import { snackbar } from '@/utils';

import { ShoppingListProductItem } from '../../../types';
import { ShoppingListDetailsContext } from '../context/ShoppingListDetailsContext';
import B3QuickPadProductList from './B3QuickPadProductList';

interface ProductTableActionProps {
  product: ShoppingListProductItem;
  onAddToListClick: (id: number) => void;
  onChooseOptionsClick: (id: number) => void;
  addButtonText: string;
}

export function ProductTableAction(props: ProductTableActionProps) {
  const {
    product: { id, allOptions: productOptions },
    onAddToListClick,
    onChooseOptionsClick,
    addButtonText,
  } = props;

  const {
    state: { isLoading = false },
  } = useContext(ShoppingListDetailsContext);

  const [isMobile] = useMobile();

  const b3Lang = useB3Lang();

  return productOptions && productOptions.length > 0 ? (
    <CustomButton
      variant="outlined"
      onClick={() => {
        onChooseOptionsClick(id);
      }}
      disabled={isLoading}
      fullWidth={isMobile}
    >
      {b3Lang('global.searchProduct.chooseOptionsButton')}
    </CustomButton>
  ) : (
    <CustomButton
      variant="outlined"
      onClick={() => {
        onAddToListClick(id);
      }}
      disabled={isLoading}
      fullWidth={isMobile}
    >
      {addButtonText}
    </CustomButton>
  );
}

function QuickPadProductListing(props: any) {
  const b3Lang = useB3Lang();
  const {
    productList,
    onProductQuantityChange,
    onAddToListClick,
    onChooseOptionsClick,
    isLoading,
    type,
    addButtonText = b3Lang('shoppingLists.addButtonText'),
    setIsLoading,
    isB2BUser,
    setSearchFields,
    index,
    searchFields,
    pageNumber,
    setPageNumber,
  } = props;

  const isEnableProduct = useAppSelector(
    ({ global }) => global.blockPendingQuoteNonPurchasableOOS.isEnableProduct,
  );

  const [isMobile] = useMobile();

  const validateQuantityNumber = useCallback(
    (product: ShoppingListProductItem) => {
      const { variants = [] } = product || {};
      const { purchasing_disabled: purchasingDisabled = true } = variants[0] || {};

      if (type !== 'shoppingList' && purchasingDisabled === true && !isEnableProduct) {
        snackbar.error(b3Lang('shoppingList.chooseOptionsDialog.productNoLongerForSale'));
        return false;
      }

      return true;
    },
    // ignore b3Lang it's not reactive
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isEnableProduct, type],
  );

  const handleAddToList = (id: number) => {
    const product = productList.find((product: any) => product.id === id);

    if (product && validateQuantityNumber(product || {})) {
      let variantId: number | string = product.variantId || 0;

      if (!product.variantId && product.variants?.[0]) {
        variantId = product.variants[0].variant_id;
      }

      onAddToListClick([
        {
          ...product,
          newSelectOptionList: [],
          quantity: parseInt(product.quantity.toString(), 10) || 1,
          variantId,
        },
      ]);
    }
  };
  return (
    <>
      {productList && productList.length > 0 && (
        <Box>
          {searchFields[index].isVisibleProductOption && (
            <B3QuickPadProductList
              products={productList}
              quantityEditable
              type={type}
              textAlign={isMobile ? 'left' : 'right'}
              canToProduct
              onProductQuantityChange={onProductQuantityChange}
              renderAction={(product: any) => (
                <ProductTableAction
                  product={product}
                  onAddToListClick={handleAddToList}
                  onChooseOptionsClick={onChooseOptionsClick}
                  addButtonText={addButtonText}
                />
              )}
              actionWidth="180px"
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              isB2BUser={isB2BUser}
              searchFields={searchFields}
              setSearchFields={setSearchFields}
              index={index}
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
            />
          )}
        </Box>
      )}
      <>
        {searchFields[index] && !!searchFields[index]?.errors?.length && (
          <span className="text-red block pl-[54px] mt-1 text-sm">
            {searchFields[index]?.errors}
          </span>
        )}
      </>
    </>
  );
}
export default QuickPadProductListing;
