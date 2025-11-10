import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';

import { B3PaginationTable } from '@/components';
import { TableColumnItem } from '@/components/table/B3Table';
import { useMobile } from '@/hooks';
import B3Spin from '@/components/spin/B3Spin';
import CustomQuoteItemCard from './CustomQuoteItemCard';

declare let window: any;

interface CustomQuoteListItem {
  id: number;
  quoteNo: number;
  customerId: number;
  customerName: string;
  status: string;
  requestDate: string;
  lineItems: Array<{
    id: number;
    quoteNo: number;
    productName: string;
    productImageUrl: Array<{
      url: string;
      isCustomerUploaded: boolean;
    }>;
    quantity: number;
    description: string;
  }>;
}

function CustomQuoteList() {
  const [isMobile] = useMobile();
  const navigate = useNavigate();
  const [isRequestLoading, setIsRequestLoading] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
  };

  const columnAllItems: TableColumnItem<CustomQuoteListItem>[] = [
    {
      key: 'quoteNo',
      title: 'Quote No',
      width: '25%',
      isSortable: false,
    },
    {
      key: 'status',
      title: 'Quote status',
      render: (item: CustomQuoteListItem) => {
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
        const colors = getStatusColor(item.status);
        return (
          <Box
            sx={{
              display: 'inline-block',
              padding: '3px 10px',
              borderRadius: '16px',
              backgroundColor: colors.bg,
              color: colors.color,
              fontSize: '13px',
            }}
          >
            {item.status}
          </Box>
        );
      },
      width: '15%',
      isSortable: false,
    },
    {
      key: 'requestDate',
      title: 'Request Date',
      render: (item: CustomQuoteListItem) => formatDate(item.requestDate),
      width: '25%',
      isSortable: false,
    },
  ];

  const columnItems = isMobile ? [] : columnAllItems;

  const goToDetail = (item: CustomQuoteListItem) => {
    navigate(`/custom-quote/${item.quoteNo}`);
  };

  // Fetch all quotes from API and handle pagination on client-side
  const fetchList = useCallback(async (params?: any) => {
    const { offset = 0, first = 10 } = params || {};

    try {
      setIsRequestLoading(true);

      // Get customer ID from window object
      const userDetails = window.__PING_DETAILS__;
      const customerId = userDetails?.userInfo?.ecommCustomerId;

      if (!customerId) {
        console.error('Customer ID not found');
        return {
          edges: [],
          totalCount: 0,
        };
      }

      // Call the API to get all quotes
      const response = await fetch(
        `https://productaddrequest.cookandboardman.io/api/v1/customer/quotes/${customerId}`,
        {
          method: 'GET',
          headers: {
            appaccesskey: '11afb7c2-7381-4a74-ac55-9728ad6205b6',
            'Content-Type': 'application/json',
          },
        },
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const result = await response.json();

      // Extract quotes from API response
      const allQuotes = result.Data?.data || [];

      // Client-side pagination - slice the data based on offset and first
      const paginatedData = allQuotes.slice(offset, offset + first);

      return {
        edges: paginatedData.map((quote: CustomQuoteListItem) => ({ node: quote })),
        totalCount: allQuotes.length,
      };
    } catch (error) {
      console.error('Error fetching quotes:', error);
      return {
        edges: [],
        totalCount: 0,
      };
    } finally {
      setIsRequestLoading(false);
    }
  }, []);

  return (
    <B3Spin isSpinning={isRequestLoading}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}
      >
        {/* <Typography variant="h4" sx={{ marginBottom: '20px' }}>
          Custom Quotes ({SAMPLE_QUOTES.length} total)
        </Typography> */}

        <div className="[&_.MuiTablePagination-input]:py-2">
          <B3PaginationTable
            columnItems={columnItems}
            rowsPerPageOptions={[10, 20, 30]}
            getRequestList={fetchList}
            searchParams={{ q: '' }}
            isCustomRender={false}
            requestLoading={setIsRequestLoading}
            tableKey="quoteNo"
            labelRowsPerPage={isMobile ? 'Cards per page' : 'Rows per page'}
            renderItem={(row: CustomQuoteListItem) => (
              <CustomQuoteItemCard item={row} goToDetail={goToDetail} />
            )}
            onClickRow={(row: CustomQuoteListItem) => {
              goToDetail(row);
            }}
            hover
          />
        </div>
      </Box>
    </B3Spin>
  );
}

export default CustomQuoteList;
