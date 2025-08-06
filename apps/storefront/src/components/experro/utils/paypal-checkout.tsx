import { useEffect, useRef } from 'react';
import { ExpGetCart } from '../api';
declare let window: any;

export const PaypalCheckout = () => {
  // const { cartObj } = props;
  const paypalRef = useRef<HTMLDivElement>(null);
  const currentCartAmount = useRef<string>('');

  useEffect(() => {
    const loadPaypalScript = () => {
      // Check if script already exists
      if (document.getElementById('paypal-sdk-script')) {
        renderPaypalButtons();
        return;
      }

      const script = document.createElement('script');
      script.id = 'paypal-sdk-script';
      script.src =
        'https://www.paypal.com/sdk/js?client-id=AQ3RkiNHQ53oodRlTz7z-9ETC9xQNUgOLHjVDII9sgnF19qLXJzOwShAxcFW7OT7pVEF5B9bwjIArOvE&merchant-id=FKSAW4VSNL4MS&enable-funding=credit%2Cpaylater&disable-funding=card%2Cvenmo&commit=false&components=buttons%2Chosted-fields%2Cpayment-fields%2Clegal&currency=USD&intent=capture';
      script.async = true;
      script.onload = () => renderPaypalButtons();
      document.body.appendChild(script);
    };

    const renderPaypalButtons = async () => {
      const cartObj = await ExpGetCart();

      const cartAmount = cartObj?.cart_amount || cartObj?.cart_amount_ex_tax;

      if (window.paypal && paypalRef.current && cartAmount?.toString()?.length) {
        // Only re-render if cart amount has changed or buttons haven't been rendered yet
        if (currentCartAmount.current !== cartAmount.toString()) {
          // Clear any existing content
          paypalRef.current.innerHTML = '';

          window.paypal
            .Buttons({
              style: {
                height: 40,
                label: 'checkout', // This makes it like the second image
              },
              createOrder: (_data: any, actions: any) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: cartAmount,
                      },
                    },
                  ],
                });
              },
              onApprove: (_data: any, actions: any) => {
                return actions.order.capture().then((details: any) => {
                  alert(`Transaction completed by ${details.payer.name.given_name}`);
                });
              },
            })
            .render(paypalRef.current)
            .then(() => {
              currentCartAmount.current = cartAmount.toString();
            });
        }
      }
    };

    if (!window.paypal) {
      loadPaypalScript();
    } else {
      renderPaypalButtons();
    }
  }, []); // Only depend on cart amount

  // Cleanup effect
  useEffect(() => {
    return () => {
      if (paypalRef.current) {
        paypalRef.current.innerHTML = '';
      }
      currentCartAmount.current = '';
    };
  }, []);
  return (
    <>
      <p className="or-use-label w-full text-right mb-5">-- or use --</p>
      <div
        ref={paypalRef}
        className="w-full min-h-[40px] sm:max-w-[250px] flex items-center justify-center ml-auto relative z-10"
      />
    </>
  );
};
