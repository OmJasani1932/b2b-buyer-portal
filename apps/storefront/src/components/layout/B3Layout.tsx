import { ReactNode, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useB3Lang } from '@b3/lang';
import { Box, useMediaQuery } from '@mui/material';

import useMobile from '@/hooks/useMobile';
import { DynamicallyVariableedContext } from '@/shared/dynamicallyVariable';
import { getIsTokenGotoPage, routes } from '@/shared/routes';
import { useAppSelector } from '@/store';

import B3Dialog from '../B3Dialog';
import CompanyCredit from '../CompanyCredit';

import B3MobileLayout from './B3MobileLayout';
import B3Nav from './B3Nav';
import Header from '../experro/header';
import Footer from '../experro/footer';

const SPECIAL_PATH_TEXTS = {
  '/purchased-products': 'global.purchasedProducts.title',
  '/orders': 'global.orders.title',
  '/company-orders': 'global.companyOrders.title',
} as const;

export default function B3Layout({
  children,
  globalsettings,
  categories,
  isCategoryLoading,
}: {
  children: ReactNode;
  globalsettings?: any;
  categories?: any;
  isCategoryLoading?: undefined | boolean;
}) {
  const [isMobile] = useMobile();

  const location = useLocation();

  const [title, setTitle] = useState<string>('');

  const b3Lang = useB3Lang();

  const emailAddress = useAppSelector(({ company }) => company.customer.emailAddress);
  const customerId = useAppSelector(({ company }) => company.customer.id);

  const {
    state: { globalMessageDialog },
    dispatch,
  } = useContext(DynamicallyVariableedContext);

  useEffect(() => {
    if ((!emailAddress || !customerId) && !getIsTokenGotoPage(location.pathname)) {
      window.location.href = `${window.location.origin}/login`;
    }
    // disabling cause navigate dispatcher is not necessary here
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emailAddress, customerId, location]);

  useEffect(() => {
    const itemsRoutes = routes.find((item) => item.path === location.pathname);
    if (itemsRoutes && location.pathname !== '/quoteDraft') {
      const foundPath = Object.entries(SPECIAL_PATH_TEXTS).find(
        ([specialPath]) => specialPath === location.pathname,
      );
      if (foundPath) {
        setTitle(b3Lang(foundPath[1]));
      } else {
        setTitle(b3Lang(itemsRoutes.idLang));
      }
    } else {
      setTitle('');
    }
    dispatch({
      type: 'common',
      payload: {
        tipMessage: {
          msgs: [],
        },
      },
    });
    // disabling as dispatch is not necessary in the deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const messageDialogClose = () => {
    dispatch({
      type: 'common',
      payload: {
        globalMessageDialog: {
          open: false,
          title: '',
          message: '',
          cancelText: 'Cancel',
        },
      },
    });
  };

  return (
    <>
      <Box>
        <Header
          globalsettings={globalsettings}
          categories={categories}
          isCategoryLoading={isCategoryLoading}
        />
        {isMobile ? (
          // <B3MobileLayout title={title}>{children}</B3MobileLayout>
          <div className="bg-white">
            <Box
              className="max-w-[1310px] 2xl:px-[1.875rem] md:px-5 px-4 mx-auto"
              id="app-mainPage-layout"
            >
              <div className="flex flex-wrap pt-6">
                <Box className="w-full">
                  <Box>
                    <B3Nav />
                  </Box>
                </Box>

                <Box className="w-full pl-0">
                  <CompanyCredit />
                  <Box
                    component="main"
                    sx={{
                      mt: !isMobile && !title ? '24px' : '0',
                    }}
                  >
                    {children}
                  </Box>
                </Box>
              </div>
            </Box>
          </div>
        ) : (
          // <Box
          //   sx={{
          //     p: '40px 30px',
          //     minHeight: '100vh',
          //     display: 'flex',
          //     backgroundColor: '#d2d2d3',
          //   }}
          // >
          <div className="bg-white">
            <Box
              className="max-w-[1310px] 2xl:px-[1.875rem] md:px-5 px-4 mx-auto"
              id="app-mainPage-layout"
            >
              <div className="xl:flex pt-16">
                <Box className="xl:w-[200px] w-full">
                  <Box>
                    <B3Nav />
                  </Box>
                </Box>

                <Box className="xl:w-[calc(100%_-_200px)] w-full xl:pl-10">
                  <CompanyCredit />
                  <Box
                    component="main"
                    sx={{
                      mt: !isMobile && !title ? '24px' : '0',
                    }}
                  >
                    {children}
                  </Box>
                </Box>
              </div>
            </Box>
          </div>

          // </Box>
        )}

        <B3Dialog
          isOpen={globalMessageDialog.open}
          title={globalMessageDialog.title}
          leftSizeBtn={globalMessageDialog.cancelText}
          rightSizeBtn={globalMessageDialog.saveText}
          handleLeftClick={globalMessageDialog.cancelFn || messageDialogClose}
          handRightClick={globalMessageDialog.saveFn}
          showRightBtn={!!globalMessageDialog.saveText}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: `${isMobile ? 'center' : 'start'}`,
              width: `${isMobile ? '100%' : '450px'}`,
              height: '100%',
            }}
          >
            {globalMessageDialog.message}
          </Box>
        </B3Dialog>
        <Footer globalSettings={globalsettings} />
      </Box>
    </>
  );
}
