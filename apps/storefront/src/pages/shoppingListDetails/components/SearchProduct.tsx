import {
  ChangeEvent,
  KeyboardEvent,
  useContext,
  useState,
} from 'react'

import {
  Box,
  Typography,
  TextField,
  InputAdornment,
} from '@mui/material'

import SearchIcon from '@mui/icons-material/Search'

import {
  B3Sping,
  CustomButton,
} from '@/components'

import {
  ProductListDialog,
} from './ProductListDialog'

import {
  ChooseOptionsDialog,
} from './ChooseOptionsDialog'

import {
  ShoppingListProductItem,
} from '../../../types'

import {
  searchB2BProducts,
  searchBcProducts,
} from '@/shared/service/b2b'

import {
  conversionProductsList,
} from '../shared/config'

import {
  CustomStyleContext,
} from '@/shared/customStyleButtton'

interface SearchProductProps {
  updateList: () => void,
  addToList: (products: CustomFieldItems[]) => CustomFieldItems,
  searchDialogTitle?: string,
  addButtonText?: string,
  isB2BUser: boolean,
}

export const SearchProduct = ({
  updateList,
  addToList,
  searchDialogTitle,
  addButtonText,
  isB2BUser,
}: SearchProductProps) => {
  const {
    state: {
      portalStyle: {
        primaryColor = '',
      },
    },
  } = useContext(CustomStyleContext)

  const [isLoading, setIsLoading] = useState(false)

  const [productListOpen, setProductListOpen] = useState(false)
  const [isAdded, setIsAdded] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [productList, setProductList] = useState<ShoppingListProductItem[]>([])
  const [chooseOptionsOpen, setChooseOptionsOpen] = useState(false)
  const [optionsProduct, setOptionsProduct] = useState<ShoppingListProductItem>()

  const handleSearchTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }

  const searchProduct = async () => {
    if (!searchText || isLoading) {
      return
    }
    const getProducts = isB2BUser ? searchB2BProducts : searchBcProducts

    setIsLoading(true)
    try {
      const {
        productsSearch,
      } : CustomFieldItems = await getProducts({
        search: searchText,
      })

      const product = conversionProductsList(productsSearch)

      setProductList(product)
      setProductListOpen(true)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearchTextKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      searchProduct()
    }
  }

  const handleSearchButtonClicked = () => {
    searchProduct()
  }

  const clearProductInfo = () => {
    setProductList([])
  }

  const handleProductListDialogCancel = () => {
    setChooseOptionsOpen(false)
    setProductListOpen(false)

    if (isAdded) {
      setIsAdded(false)
      updateList()
    }

    clearProductInfo()
  }

  const handleProductQuantityChange = (id: number, newQuantity: number) => {
    const product = productList.find((product) => product.id === id)
    if (product) {
      product.quantity = newQuantity
    }

    setProductList([...productList])
  }

  const handleAddToListClick = async (products: CustomFieldItems[]) => {
    try {
      setIsLoading(true)
      await addToList(products)

      updateList()
    } finally {
      setIsLoading(false)
    }
  }

  const handleProductListAddToList = (products: CustomFieldItems[]) => {
    handleAddToListClick(products)
  }

  const handleChangeOptionsClick = (productId: number) => {
    const product = productList.find((product) => product.id === productId)
    if (product) {
      setOptionsProduct({
        ...product,
      })
    }
    setProductListOpen(false)
    setChooseOptionsOpen(true)
  }

  const handleChooseOptionsDialogCancel = () => {
    setChooseOptionsOpen(false)
    setProductListOpen(true)
  }

  const handleChooseOptionsDialogConfirm = (products: CustomFieldItems[]) => {
    handleAddToListClick(products)
    setChooseOptionsOpen(false)
    setProductListOpen(true)
  }

  return (
    <Box sx={{
      margin: '24px 0',
    }}
    >
      <Typography>Search by SKU or product name</Typography>
      <TextField
        hiddenLabel
        placeholder="eg Towel"
        variant="filled"
        fullWidth
        size="small"
        value={searchText}
        onChange={handleSearchTextChange}
        onKeyDown={handleSearchTextKeyDown}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{
          margin: '12px 0',
          '& input': {
            padding: '12px 12px 12px 0',
          },
          '& .MuiFilledInput-root:after': {
            borderBottom: `2px solid ${primaryColor || '#1976d2'}`,
          },
        }}
      />
      <CustomButton
        variant="outlined"
        fullWidth
        disabled={isLoading}
        onClick={handleSearchButtonClicked}
      >
        <B3Sping
          isSpinning={isLoading}
          tip=""
          size={16}
        >
          <Box
            sx={{
              flex: 1,
              textAlign: 'center',
            }}
          >
            Search product
          </Box>
        </B3Sping>
      </CustomButton>

      <ProductListDialog
        isOpen={productListOpen}
        isLoading={isLoading}
        productList={productList}
        searchText={searchText}
        onSearchTextChange={handleSearchTextChange}
        onSearch={handleSearchButtonClicked}
        onCancel={handleProductListDialogCancel}
        onProductQuantityChange={handleProductQuantityChange}
        onChooseOptionsClick={handleChangeOptionsClick}
        onAddToListClick={handleProductListAddToList}
        searchDialogTitle={searchDialogTitle}
        addButtonText={addButtonText}
      />

      <ChooseOptionsDialog
        isOpen={chooseOptionsOpen}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        product={optionsProduct}
        onCancel={handleChooseOptionsDialogCancel}
        onConfirm={handleChooseOptionsDialogConfirm}
        addButtonText={addButtonText}
        isB2BUser={isB2BUser}
      />

    </Box>
  )
}
