import styled from '@emotion/styled';
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

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

export interface CustomQuoteItemCardProps {
  item: CustomQuoteListItem;
  goToDetail: (item: CustomQuoteListItem) => void;
}

const Flex = styled('div')({
  display: 'flex',
  '&.between-flex': {
    justifyContent: 'space-between',
  },
});

export default function CustomQuoteItemCard({ item, goToDetail }: CustomQuoteItemCardProps) {
  const theme = useTheme();

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

  const colors = getStatusColor(item.status);

  return (
    <Card key={item.quoteNo}>
      <CardContent
        sx={{
          color: 'rgba(0, 0, 0, 0.6)',
          cursor: 'pointer',
        }}
        onClick={() => goToDetail(item)}
      >
        <Flex className="between-flex">
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: 'rgba(0, 0, 0, 0.87)',
              }}
            >
              Quote No: {item.quoteNo}
            </Typography>
          </Box>
          <Box>
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
          </Box>
        </Flex>

        <Typography
          variant="body2"
          sx={{
            mt: theme.spacing(1.5),
          }}
        >
          {formatDate(item.requestDate)}
        </Typography>
      </CardContent>
    </Card>
  );
}

