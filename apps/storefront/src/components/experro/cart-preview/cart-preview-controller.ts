import { useEffect, useRef, useState } from 'react';

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
    if (userDetails?.line_items?.physical_items) {
      setCartItems(userDetails?.line_items?.physical_items);
    } else {
      setCartItems([]);
    }
  };

  const updateUserDetails = async () => {
    updateCartItems(cartDetails);
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

  return { cartItems, divRef };
};

export default ExpCartPreviewController;
