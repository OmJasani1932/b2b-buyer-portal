import { ReactNode, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useB3Lang } from '@b3/lang';
import { Box, Collapse, Typography } from '@mui/material';

import useMobile from '@/hooks/useMobile';
import { DynamicallyVariableedContext } from '@/shared/dynamicallyVariable';
import { getIsTokenGotoPage, routes } from '@/shared/routes';
import { useAppSelector } from '@/store';

import B3Dialog from '../B3Dialog';
import CompanyCredit from '../CompanyCredit';

import B3Nav from './B3Nav';
import Header from '../experro/header';
import Footer from '../experro/footer';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

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

  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

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

        {/* <Box
          sx={{
            p: '40px 30px',
            minHeight: '100vh',
            display: 'flex',
            backgroundColor: '#d2d2d3',
          }}
        ></Box> */}
        <div className="bg-white">
          <Box
            className="max-w-[1310px] 2xl:px-[1.875rem] md:px-5 px-4 mx-auto"
            id="app-mainPage-layout"
          >
            <div className="xl:flex pt-10">
              <Box className="xl:w-[200px] w-full">
                <div className="xl:border-0 border border-gray-40">
                  <Typography
                    onClick={handleClick}
                    className="mb-0 px-5 py-3 xl:hidden block relative"
                    variant="h4"
                  >
                    Account Details
                    <span className="absolute right-5 top-1/2 flex -mt-3">
                      {open ? <ExpandLess /> : <ExpandMore />}
                    </span>
                  </Typography>
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <div className="xl:px-0 px-5 xl:py-0 py-3 xl:border-0 border-t border-gray-40">
                      <B3Nav />
                    </div>
                  </Collapse>
                </div>
              </Box>

              <Box className="xl:w-[calc(100%_-_200px)] w-full xl:pl-10 xl:mt-0 mt-8">
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
