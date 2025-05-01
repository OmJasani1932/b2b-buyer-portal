import { useEffect, useMemo, useState } from 'react';
import { Box, Checkbox, FormControlLabel } from '@mui/material';
import noop from 'lodash-es/noop';
import { useMobile } from '@/hooks';
import QuickPadChooseOptions from './QuickPadChooseOptions';
import { ProductItem } from '@/types';
import { ExpPagination } from '../pagination';

function B3QuickPadProductList(props: any) {
  const {
    products,
    showCheckbox = false,
    setCheckedArr = noop,
    selectAllText = 'Select all products',
    type,
    isLoading,
    setIsLoading,
    isB2BUser,
    setSearchFields,
    index,
    searchFields,
    pageNumber,
    setPageNumber,
  } = props;

  const [list, setList] = useState<ProductItem[]>([]);
  const [isMobile] = useMobile();
  const handleSelectAllChange = () => {
    const newList = [...list];
    if (newList.length === products.length) {
      setList([]);
    } else {
      setList([...products]);
    }
  };

  useEffect(() => {
    setCheckedArr(list);
    // disabling because dispatchers are not supposed to be here
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list]);

  useEffect(() => {
    setList([]);
  }, [products]);

  const productLimit = 3;
  const currentTableData = useMemo(() => {
    if (products?.length) {
      const firstPageIndex = (pageNumber - 1) * productLimit;
      const lastPageIndex = firstPageIndex + productLimit;
      return products?.slice(firstPageIndex, lastPageIndex);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber, products]);

  return products.length > 0 ? (
    <Box sx={{ padding: '30px 34px 20px 34px' }}>
      {isMobile && showCheckbox && (
        <FormControlLabel
          label={selectAllText}
          control={
            <Checkbox checked={list.length === products.length} onChange={handleSelectAllChange} />
          }
          sx={{
            paddingLeft: '0.6rem',
          }}
        />
      )}

      {currentTableData?.map((product: any) => {
        return (
          <>
            <QuickPadChooseOptions
              isLoading={isLoading}
              type={type}
              setIsLoading={setIsLoading}
              product={product}
              isB2BUser={isB2BUser}
              setSearchFields={setSearchFields}
              index={index}
              searchFields={searchFields}
            />
          </>
        );
      })}
      <ExpPagination
        itemList={products}
        setPageNumber={setPageNumber}
        skip={productLimit}
        totalCount={products.length}
        pageNumber={pageNumber}
      />
    </Box>
  ) : null;
}
export default B3QuickPadProductList;
