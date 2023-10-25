import { Dispatch, SetStateAction } from 'react'
import type { OpenPageState } from '@b3/hooks'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice, Draft } from '@reduxjs/toolkit'

export interface TaxZoneRates {
  rate?: number
  taxClassId?: number
}

interface Rates {
  enabled: boolean
  id: number
  name: string
  priority: number
  classRates: TaxZoneRates[]
}

export interface TaxZoneRatesProps {
  enabled: boolean
  id: number
  name: string
  rates: Rates[]
}

interface GlobalMessageDialog {
  open: boolean
  title: string
  message: string
  cancelText?: string
  cancelFn?: () => void
  saveText?: string
  saveFn?: () => void
}

export interface GlabolState {
  taxZoneRates?: TaxZoneRatesProps[]
  isClickEnterBtn?: boolean
  currentClickedUrl?: string
  isRegisterAndLogin?: boolean
  isPageComplete?: boolean
  globalMessage?: GlobalMessageDialog
  enteredInclusive?: boolean
  setOpenPageFn?: Dispatch<SetStateAction<OpenPageState>>
  showInclusiveTaxPrice?: boolean
  blockPendingAccountViewPrice?: boolean
  bcUrl?: string
  cartNumber?: number
}

const initialState: GlabolState = {
  taxZoneRates: [],
  isClickEnterBtn: false,
  currentClickedUrl: '',
  isRegisterAndLogin: false,
  isPageComplete: false,
  globalMessage: {
    open: false,
    title: '',
    message: '',
    cancelText: 'Cancel',
  },
  enteredInclusive: false,
  setOpenPageFn: undefined,
  showInclusiveTaxPrice: false,
  blockPendingAccountViewPrice: false,
  bcUrl: '',
  cartNumber: 0,
}

export const glabolSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    clearglabol: () => initialState,
    setTaxZoneRates: (
      state,
      { payload }: PayloadAction<TaxZoneRatesProps[]>
    ) => {
      state.taxZoneRates = payload as Draft<TaxZoneRatesProps[]>
    },
    setGlabolCommonState: (state, { payload }: PayloadAction<GlabolState>) => ({
      ...state,
      ...payload,
    }),
    setEnteredInclusive: (state, { payload }: PayloadAction<boolean>) => {
      state.enteredInclusive = payload as Draft<boolean>
    },
    setOpenPageReducer: (
      state,
      { payload }: PayloadAction<Dispatch<SetStateAction<OpenPageState>>>
    ) => {
      state.setOpenPageFn = payload as Draft<
        Dispatch<SetStateAction<OpenPageState>>
      >
    },
    setShowInclusiveTaxPrice: (state, { payload }: PayloadAction<boolean>) => {
      state.showInclusiveTaxPrice = payload as Draft<boolean>
    },
    setBlockPendingAccountViewPrice: (
      state,
      { payload }: PayloadAction<boolean>
    ) => {
      state.blockPendingAccountViewPrice = payload as Draft<boolean>
    },
    setHeadLessBcUrl: (state, { payload }: PayloadAction<string>) => {
      state.bcUrl = payload as Draft<string>
    },
    setCartNumber: (state, { payload }: PayloadAction<number>) => {
      state.cartNumber = payload as Draft<number>
    },
  },
})

export const {
  clearglabol,
  setTaxZoneRates,
  setGlabolCommonState,
  setEnteredInclusive,
  setOpenPageReducer,
  setShowInclusiveTaxPrice,
  setBlockPendingAccountViewPrice,
  setHeadLessBcUrl,
  setCartNumber,
} = glabolSlice.actions

export default glabolSlice.reducer
