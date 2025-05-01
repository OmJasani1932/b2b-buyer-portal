import { useRef, useState } from 'react';
import { useB3Lang } from '@b3/lang';
import { InsertDriveFile} from '@mui/icons-material';
import { Box, Button, Link, Tab, Tabs, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';

import { B3PaginationTable } from '@/components/table/B3PaginationTable';
import { TableColumnItem } from '@/components/table/B3Table';
import { useMobile } from '@/hooks';

import BulkUploadTableCard from './BulkUploadTableCard';

interface BulkUploadTableProps {
  setStep: (step: string) => void;
  fileDatas: CustomFieldItems | null;
  fileName: string;
}

interface ListItem {
  [key: string]: string;
}

const StyledTableContainer = styled(Box)(() => {
  const [isMobile] = useMobile();
  const style = {
    boxShadow: 'none',
    // borderLeft: '0px',
    // borderRight: '0px',
  };

  const mobileStyle = {
    marginTop: '0.5rem',
  };
  return {
    '& div': isMobile ? mobileStyle : style,
  };
});

function BulkUploadTable(props: BulkUploadTableProps) {
  const { setStep, fileDatas, fileName } = props;
  const [isMobile] = useMobile();
  const b3Lang = useB3Lang();

  const columnErrorsItems: TableColumnItem<ListItem>[] = [
    {
      key: 'sku',
      title: 'SKU',
      width: '25%',
      render: (row) => (
        <Typography
          sx={{
            fontSize: '14px',
          }}
        >
          {row.sku}
        </Typography>
      ),
    },
    {
      key: 'qty',
      title: 'Qty',
      width: '20%',
      render: (row) => (
        <Typography
          sx={{
            fontSize: '14px',
          }}
        >
          {row.qty}
        </Typography>
      ),
    },
    {
      key: 'row',
      title: 'Row',
      width: '20%',
      render: (row) => (
        <Typography
          sx={{
            fontSize: '14px',
          }}
        >
          {row.row + 1}
        </Typography>
      ),
    },
    {
      key: 'error',
      title: 'Error',
      width: '35%',
      render: (row) => (
        <Typography
          sx={{
            fontSize: '14px',
            color:'red'
          }}
        >
          {row.error}
        </Typography>
      ),
    },
  ];

  const columnValidItems: TableColumnItem<ListItem>[] = [
    {
      key: 'sku',
      title: 'SKU',
      width: '50%',
      render: (row) => (
        <Typography
          sx={{
            fontSize: '14px',
          }}
        >
          {row.sku}
        </Typography>
      ),
    },
    {
      key: 'qty',
      title: 'Qty',
      width: '50%',
      render: (row) => (
        <Typography
          sx={{
            fontSize: '14px',
          }}
        >
          {row.qty}
        </Typography>
      ),
    },
  ];

  const errorProduct = fileDatas?.errorProduct || [];
  const validProduct = fileDatas?.validProduct || [];
  const ref = useRef<HTMLButtonElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>(errorProduct.length > 0 ? 'error' : 'valid');

  const handleOpenBtnList = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleRemoveCsv = () => {
    handleClose();
    setStep('init');
  };

  const handleChangeTab = (_: CustomFieldItems, selectedTabValue: any) => {
    setActiveTab(selectedTabValue);
  };

  const getProductInfo = (params: CustomFieldItems) => {
    const products = activeTab === 'error' ? errorProduct : validProduct;

    const { first, offset } = params;

    const start = offset;
    const limit = first + start;
    const currentPageProduct = products.slice(start, limit);

    return {
      edges: currentPageProduct,
      totalCount: products.length || 0,
    };
  };

  return (
    <Box
      sx={{
        width: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 12px',
          border: '1px solid #D2D2D3',
          borderRadius: '4px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
          }}
        >
          <InsertDriveFile color="action" />
          <Typography
            sx={{
              marginLeft: '1rem',
              fontSize: '14px',
            }}
          >
            {fileName}
          </Typography>
        </Box>

        <Button
          variant='outlined'
          
          size='small'
          ref={ref}
          startIcon={<DeleteIcon />}
          onClick={() => {
            handleRemoveCsv();
          }}
        >
          {/* <MoreHoriz
            sx={{
              color: '#5E637A',
            }}
          /> */}
          Remove
        </Button>

        {/* <Menu anchorEl={ref.current} open={isOpen} onClose={handleClose}>
          <MenuItem
            onClick={() => {
              handleRemoveCsv();
            }}
            sx={{
              color: '#D32F2F',
              fontSize: '14px',
            }}
          >
            Remove
          </MenuItem>
        </Menu> */}
      </Box>
      <div className='[&_.MuiPaper-elevation]:border-l-0 [&_.MuiPaper-elevation]:border-r-0'>
      <Box
        sx={{
          marginTop: '20px',
          border: "1px solid #D2D2D3",
          boxShadow: isMobile
            ? 'none'
            : 'none',
          borderRadius: '4px',
          position: 'relative',
          
        }}
      >
        <Box>
          <Tabs value={activeTab} onChange={handleChangeTab} aria-label="basic tabs example">
            {errorProduct.length > 0 && (
              <Tab
                value="error"
                label={errorProduct.length ? `Errors (${errorProduct.length})` : 'Errors'}
              />
            )}
            {validProduct.length > 0 && (
              <Tab
                value="valid"
                label={validProduct.length ? `Valid (${validProduct.length})` : 'Valid'}
              />
            )}
          </Tabs>
        </Box>

        <StyledTableContainer>
          <B3PaginationTable
            columnItems={activeTab === 'error' ? columnErrorsItems : columnValidItems}
            rowsPerPageOptions={[10, 20, 50]}
            showBorder={!isMobile}
            getRequestList={getProductInfo}
            labelRowsPerPage="Products per page:"
            itemIsMobileSpacing={0}
            noDataText="No product"
            tableKey="row"
            searchParams={{
              activeTab,
            }}
            renderItem={(row: CustomFieldItems) => (
              <BulkUploadTableCard products={row} activeTab={activeTab} />
            )}
          />
        </StyledTableContainer>

        {activeTab === 'error' && (
          <Box
            sx={{
              padding: isMobile ? '18px 0' : '18px 16px 18px 16px',
            }}
          >
            <Link className='text-red' href={fileDatas?.errorFile} underline="none">
              {b3Lang('global.B3Upload.downloadErrorResults')}
            </Link>
          </Box>
        )}
      </Box>
      </div>
    </Box>
  );
}

export default BulkUploadTable;
