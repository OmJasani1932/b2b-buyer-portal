import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Box, Card, CardContent, Grid, Stack, Tooltip, Typography } from '@mui/material';

import { useMobile } from '@/hooks';
import B3Spin from '@/components/spin/B3Spin';

declare let window: any;

interface LineItem {
  id: number;
  quoteNo: number;
  productName: string;
  productImageUrl: Array<{
    url: string;
    isCustomerUploaded: boolean;
  }>;
  quantity: number;
  description: string;
}

interface CustomQuoteDetail {
  id: number;
  quoteNo: number;
  customerId: number;
  customerName: string;
  status: string;
  requestDate: string;
  lineItems: LineItem[];
}

function CustomQuoteDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isMobile] = useMobile();
  const [isRequestLoading, setIsRequestLoading] = useState(false);
  const [quoteDetail, setQuoteDetail] = useState<CustomQuoteDetail | null>(null);

  useEffect(() => {
    const fetchQuoteDetail = async () => {
      setIsRequestLoading(true);

      try {
        // Get customer ID from window object
        const userDetails = window.__PING_DETAILS__;
        const customerId = userDetails?.userInfo?.ecommCustomerId;

        if (!customerId) {
          console.error('Customer ID not found');
          setQuoteDetail(null);
          setIsRequestLoading(false);
          return;
        }

        // Call the API to get all quotes
        const response = await fetch(
          `https://productaddrequest.cookandboardman.io/api/v1/customer/quotes/${customerId}`,
          {
            method: 'GET',
            headers: {
              'appaccesskey': '11afb7c2-7381-4a74-ac55-9728ad6205b6',
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const result = await response.json();
        const allQuotes = result.Data?.data || [];

        // Find the quote by quoteNo (id parameter is the quoteNo)
        const foundQuote = allQuotes.find((quote: CustomQuoteDetail) => quote.quoteNo === Number(id));
        setQuoteDetail(foundQuote || null);
      } catch (error) {
        console.error('Error fetching quote detail:', error);
        setQuoteDetail(null);
      } finally {
        setIsRequestLoading(false);
      }
    };

    if (id) {
      fetchQuoteDetail();
    }
  }, [id]);

  const handleBack = () => {
    navigate('/custom-quote');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return { bg: '#C4DD6C', color: 'rgba(0, 0, 0, 0.87)' }; // Same as Completed/Shipped
      case 'Pending':
        return { bg: '#899193', color: '#FFFFFF' }; // Same as order Pending
      case 'Submitted':
        return { bg: '#87CBF6', color: 'rgba(0, 0, 0, 0.87)' }; // Same as Awaiting Fulfillment
      case 'Processing':
        return { bg: '#516FAE', color: '#FFFFFF' }; // Same as Partially Shipped
      case 'Cancelled':
        return { bg: '#000000', color: '#FFFFFF' }; // Same as order Cancelled
      default:
        return { bg: '#899193', color: '#FFFFFF' };
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
  };

  if (!quoteDetail) {
    return <></>;
  }

  const statusColors = getStatusColor(quoteDetail?.status);

  return (
    <B3Spin isSpinning={isRequestLoading}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px',
            cursor: 'pointer',
          }}
          onClick={handleBack}
        >
          <ArrowBackIosNewIcon
            sx={{
              fontSize: '16px',
              marginRight: '8px',
            }}
          />
          <Typography
            sx={{
              fontSize: '16px',
              fontWeight: 500,
            }}
          >
            Back to Custom Quotes
          </Typography>
        </Box>

        <div className="flex mt-4 mb-2 justify-between">
          <div className="flex gap-4 items-center">
            <Typography
              variant="h4"
              sx={{
                color: 'rgba(0, 0, 0, 0.87)',
                marginBottom: '0',
              }}
            >
              Quote #{quoteDetail.quoteNo}
            </Typography>
            <Box
              sx={{
                display: 'inline-block',
                padding: '3px 10px',
                borderRadius: '16px',
                backgroundColor: statusColors.bg,
                color: statusColors.color,
                fontSize: '13px',
              }}
            >
              {quoteDetail.status}
            </Box>
          </div>
        </div>

        <Grid
          container
          spacing={2}
          sx={{
            marginTop: '0',
            overflow: 'auto',
            flexWrap: isMobile ? 'wrap' : 'nowrap',
            paddingBottom: '20px',
          }}
        >
          <Grid
            item
            sx={
              isMobile
                ? {
                    flexBasis: '100%',
                  }
                : {
                    flexBasis: '690px',
                    flexGrow: 1,
                  }
            }
          >
            <Stack spacing={3}>
              {/* Quote Information */}
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      wordBreak: 'break-word',
                      color: 'rgba(0, 0, 0, 0.87)',
                      borderBottom: '1px solid #e0e0e0',
                      paddingBottom: '20px',
                    }}
                  >
                    {/* <Typography
                      variant="h6"
                      sx={{
                        fontSize: '20px',
                        fontWeight: '500',
                        marginBottom: '10px',
                      }}
                    >
                      {quoteDetail.customerName}
                    </Typography> */}
                    <Typography variant="body1">
                      Request Date: {formatDate(quoteDetail.requestDate)}
                    </Typography>
                  </Box>

                  {/* Line Items Table */}
                  <Box
                    sx={{
                      marginTop: '20px',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr 2fr',
                        gap: '10px',
                        padding: '10px 0',
                        borderBottom: '1px solid #e0e0e0',
                        fontWeight: 'bold',
                      }}
                    >
                      <Typography variant="body2">PRODUCT</Typography>
                      {!isMobile && (
                        <>
                          <Typography variant="body2" sx={{ textAlign: 'center' }}>
                            QTY
                          </Typography>
                          <Typography variant="body2">DESCRIPTION</Typography>
                        </>
                      )}
                    </Box>

                    {quoteDetail.lineItems.map((item) => (
                      <Box
                        key={item.id}
                        sx={{
                          display: 'grid',
                          gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr 2fr',
                          gap: '10px',
                          padding: isMobile ? '15px' : '20px 0',
                          borderBottom: '1px solid #e0e0e0',
                          alignItems: isMobile ? 'flex-start' : 'center',
                          backgroundColor: isMobile ? '#f9f9f9' : 'transparent',
                          borderRadius: isMobile ? '8px' : '0',
                          marginBottom: isMobile ? '15px' : '0',
                        }}
                      >
                        {!isMobile ? (
                          <>
                            <Box
                              sx={{
                                display: 'flex',
                                gap: '15px',
                                alignItems: 'center',
                              }}
                            >
                              {item.productImageUrl && item.productImageUrl.length > 0 ? (
                                <Box
                                  sx={{
                                    display: 'flex',
                                    gap: '8px',
                                    flexWrap: 'wrap',
                                  }}
                                >
                                  {item.productImageUrl.map((image, index) => (
                                    <img
                                      key={index}
                                      src={image.url}
                                      alt={`${item.productName} - ${index + 1}`}
                                      style={{
                                        width: '60px',
                                        height: '60px',
                                        objectFit: 'cover',
                                        border: '1px solid #e0e0e0',
                                        borderRadius: '4px',
                                      }}
                                    />
                                  ))}
                                </Box>
                              ) : (
                                <Box
                                  sx={{
                                    width: '60px',
                                    height: '60px',
                                    backgroundColor: '#f5f5f5',
                                    border: '1px solid #e0e0e0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: '4px',
                                  }}
                                >
                                  <Typography variant="caption" color="text.secondary">
                                    No Image
                                  </Typography>
                                </Box>
                              )}
                              <Box>
                                <Typography
                                  variant="body1"
                                  sx={{
                                    fontWeight: 500,
                                  }}
                                >
                                  {item.productName}
                                </Typography>
                              </Box>
                            </Box>
                            <Typography variant="body1" sx={{ textAlign: 'center' }}>
                              {item.quantity}
                            </Typography>
                            <Tooltip title={item.description} arrow placement="top">
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  display: '-webkit-box',
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: 'vertical',
                                  cursor: 'pointer',
                                }}
                              >
                                {item.description}
                              </Typography>
                            </Tooltip>
                          </>
                        ) : (
                          <Box>
                            <Box
                              sx={{
                                display: 'flex',
                                gap: '12px',
                                alignItems: 'center',
                                marginBottom: '15px',
                              }}
                            >
                              {item.productImageUrl && item.productImageUrl.length > 0 ? (
                                <Box
                                  sx={{
                                    display: 'flex',
                                    gap: '8px',
                                    flexWrap: 'wrap',
                                  }}
                                >
                                  {item.productImageUrl.map((image, index) => (
                                    <img
                                      key={index}
                                      src={image.url}
                                      alt={`${item.productName} - ${index + 1}`}
                                      style={{
                                        width: '80px',
                                        height: '80px',
                                        objectFit: 'cover',
                                        border: '1px solid #e0e0e0',
                                        borderRadius: '4px',
                                      }}
                                    />
                                  ))}
                                </Box>
                              ) : (
                                <Box
                                  sx={{
                                    width: '80px',
                                    height: '80px',
                                    backgroundColor: '#f5f5f5',
                                    border: '1px solid #e0e0e0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: '4px',
                                  }}
                                >
                                  <Typography variant="caption" color="text.secondary">
                                    No Image
                                  </Typography>
                                </Box>
                              )}
                              <Box sx={{ flex: 1 }}>
                                <Typography
                                  variant="body1"
                                  sx={{
                                    fontWeight: 500,
                                    color: 'rgba(0, 0, 0, 0.87)',
                                  }}
                                >
                                  {item.productName}
                                </Typography>
                              </Box>
                            </Box>
                            <Box
                              sx={{
                                borderTop: '1px solid #e0e0e0',
                                paddingTop: '12px',
                                marginBottom: '12px',
                              }}
                            >
                              <Typography
                                variant="body2"
                                sx={{
                                  color: 'rgba(0, 0, 0, 0.87)',
                                }}
                              >
                                <strong>Qty:</strong> {item.quantity}
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                borderTop: '1px solid #e0e0e0',
                                paddingTop: '12px',
                              }}
                            >
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                  wordBreak: 'break-word',
                                  lineHeight: 1.6,
                                }}
                              >
                                <strong style={{ color: 'rgba(0, 0, 0, 0.87)' }}>DESCRIPTION:</strong> {item.description}
                              </Typography>
                            </Box>
                          </Box>
                        )}
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </B3Spin>
  );
}

export default CustomQuoteDetail;
