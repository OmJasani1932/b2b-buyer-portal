import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useB3Lang } from '@b3/lang';
import { ArrowBackIosNew } from '@mui/icons-material';
import { Box, Grid, styled, Typography } from '@mui/material';

import CustomButton from '@/components/button/CustomButton';
import { getContrastColor } from '@/components/outSideComponents/utils/b3CustomStyles';
import { useMobile } from '@/hooks';
import { type SetOpenPage } from '@/pages/SetOpenPage';
import { CustomStyleContext } from '@/shared/customStyleButton';
import { rolePermissionSelector, useAppSelector } from '@/store';

import { ShoppingStatus } from '../../ShoppingLists/ShoppingStatus';
import ShoppingDownload from '@/pages/ShoppingLists/ShoppingDownload';

const StyledCreateName = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: '16px',
}));

interface ShoppingDetailHeaderProps {
  shoppingListInfo: any;
  role: string | number;
  customerInfo: any;
  goToShoppingLists: () => void;
  handleUpdateShoppingList: (status: number) => void;
  isB2BUser: boolean;
  setOpenPage: SetOpenPage;
  isAgenting: boolean;
  openAPPParams: {
    shoppingListBtn: string;
  };
  customColor: string;
}

function ShoppingDetailHeader(props: ShoppingDetailHeaderProps) {
  const b3Lang = useB3Lang();
  const [isMobile] = useMobile();

  const {
    shoppingListInfo,
    customerInfo,
    handleUpdateShoppingList,
    goToShoppingLists,
    isB2BUser,
    setOpenPage,
    openAPPParams,
  } = props;

  const {
    state: {
      portalStyle: { backgroundColor = '#FEF9F5' },
    },
  } = useContext(CustomStyleContext);
  const navigate = useNavigate();

  const isDisabledBtn = shoppingListInfo?.products?.edges.length === 0;
  // Shopping Download states
  const [isb2bCustome, setb2bCustome] = useState<boolean>(false);
  const [quoteConfigurationId, setQuoteConfigurationId] = useState<number>(0);
  const { submitShoppingListPermission, approveShoppingListPermission } =
    useAppSelector(rolePermissionSelector);

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

  const gridOptions = (xs: number) =>
    isMobile
      ? {}
      : {
          xs,
        };
  return (
    <>
      <Box
        sx={{
          marginBottom: '16px',
          width: 'fit-content',
        }}
      >
        <div
          className="flex text-sm items-center cursor-pointer hover:text-primary"
          onClick={() => {
            if (openAPPParams.shoppingListBtn !== 'add') {
              goToShoppingLists();
            } else {
              navigate('/');
              setOpenPage({
                isOpen: false,
                openUrl: '',
              });
            }
          }}
        >
          <ArrowBackIosNew
            sx={{
              fontSize: '16px',
              marginRight: '8px',
              fontWeight: 'bold',
            }}
          />
          <span className="font-semibold">
            {openAPPParams.shoppingListBtn !== 'add'
              ? b3Lang('shoppingList.header.backToShoppingLists')
              : b3Lang('shoppingList.header.backToProduct')}
          </span>
        </div>
      </Box>
      <Grid
        container
        spacing={2}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: `${isMobile ? 'column' : 'row'}`,
          mb: `${isMobile ? '32px' : '16px'}`,
        }}
      >
        <Grid
          item
          {...gridOptions(8)}
          sx={{
            color: getContrastColor(backgroundColor),
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: `${isMobile ? 'start' : 'center'}`,
              flexDirection: `${isMobile ? 'column' : 'row'}`,
            }}
          >
            <Typography
              variant="h2"
              className="mb-0"
              sx={{
                marginRight: '1rem',
                wordBreak: 'break-all',
              }}
            >
              {`${shoppingListInfo?.name || ''}`}
            </Typography>
            {isB2BUser &&
              (submitShoppingListPermission ||
                (approveShoppingListPermission && shoppingListInfo?.approvedFlag)) && (
                <Typography
                  sx={{
                    m: `${isMobile ? '10px 0' : '0'}`,
                  }}
                >
                  {shoppingListInfo && <ShoppingStatus status={shoppingListInfo?.status} />}
                </Typography>
              )}
          </Box>
          <Box>
            <Typography
              sx={{
                width: '100%',
                wordBreak: 'break-all',
                marginTop: '10px',
              }}
            >
              {shoppingListInfo?.description}
            </Typography>
            {isB2BUser && (
              <StyledCreateName>
                <Typography
                  variant="subtitle2"
                  sx={{
                    marginRight: '0.5rem',
                    // marginTop: '10px',
                  }}
                >
                  {b3Lang('shoppingList.header.createdBy')}
                </Typography>
                <span>{`${customerInfo?.firstName || ''} ${customerInfo?.lastName || ''}`}</span>
              </StyledCreateName>
            )}
          </Box>
        </Grid>
        {((approveShoppingListPermission && shoppingListInfo?.status === 40) ||
          (submitShoppingListPermission && shoppingListInfo?.status === 30) ||
          (shoppingListInfo?.products?.totalCount > 0 && shoppingListInfo?.id && isb2bCustome)) && (
          <Grid
            item
            sx={{
              textAlign: `${isMobile ? 'none' : 'end'}`,
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              pl: isMobile ? '16px !important' : '24px !important',
            }}
            {...gridOptions(4)}
          >
            {submitShoppingListPermission && shoppingListInfo?.status === 30 && (
              <CustomButton
                variant="outlined"
                disabled={isDisabledBtn}
                onClick={() => {
                  handleUpdateShoppingList(40);
                }}
              >
                {b3Lang('shoppingList.header.submitForApproval')}
              </CustomButton>
            )}
            {approveShoppingListPermission && shoppingListInfo?.status === 40 && (
              <Box>
                <CustomButton
                  variant="outlined"
                  sx={{
                    width: '100%',
                    marginBottom: '16px',
                  }}
                  onClick={() => {
                    handleUpdateShoppingList(20);
                  }}
                >
                  {b3Lang('shoppingList.header.reject')}
                </CustomButton>
                {approveShoppingListPermission && (
                  <CustomButton
                    variant="outlined"
                    sx={{
                      width: '100%',
                    }}
                    onClick={() => {
                      handleUpdateShoppingList(0);
                    }}
                  >
                    {b3Lang('shoppingList.header.approve')}
                  </CustomButton>
                )}
              </Box>
            )}
            {shoppingListInfo?.products?.totalCount > 0 && shoppingListInfo?.id && isb2bCustome && (
              <div className="mt-4 text-left flex">
                <ShoppingDownload
                  shoppingListId={shoppingListInfo?.id}
                  quoteConfigurationId={quoteConfigurationId}
                  changeButton={true}
                />
              </div>
            )}
          </Grid>
        )}
      </Grid>
    </>
  );
}

export default ShoppingDetailHeader;
