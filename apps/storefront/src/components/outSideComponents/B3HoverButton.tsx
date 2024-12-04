import { useContext, useEffect, useState } from 'react';

import {
  CHECKOUT_URL,

} from '@/constants';
import { type SetOpenPage } from '@/pages/SetOpenPage';
import { CustomStyleContext } from '@/shared/customStyleButton';
import { useAppSelector } from '@/store';

import {
  splitCustomCssValue,
} from './utils/b3CustomStyles';

interface B3HoverButtonProps {
  isOpen: boolean;
  productQuoteEnabled: boolean;
  setOpenPage: SetOpenPage;
}

export default function B3HoverButton(props: B3HoverButtonProps) {
  const { isOpen } = props;

  const [, setShowFinishQuote] = useState<boolean>(false);
  const draftQuoteListLength = useAppSelector(({ quoteInfo }) => quoteInfo.draftQuoteList.length);

  useEffect(() => {
    if (draftQuoteListLength) {
      setShowFinishQuote(true);
    } else setShowFinishQuote(false);
  }, [isOpen, draftQuoteListLength]);

  const { href } = window.location;

  const {
    state: { floatingAction },
  } = useContext(CustomStyleContext);


  const {
    customCss = '',
  } = floatingAction;



  const cssInfo = splitCustomCssValue(customCss);
  const {
  }: {
    cssValue: string;
    mediaBlocks: string[];
  } = cssInfo;




  if (href.includes(CHECKOUT_URL)) return null;
  return (
    <></>
  );
}
