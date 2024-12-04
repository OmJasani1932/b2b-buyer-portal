import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useB3Lang } from '@b3/lang';
import styled from '@emotion/styled';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import isEmpty from 'lodash-es/isEmpty';

import { rolePermissionSelector, useAppSelector } from '@/store';
import { displayFormat, getB3PermissionsList } from '@/utils';

import { ShoppingListsItemsProps } from './config';
import { ShoppingStatus } from './ShoppingStatus';
import ShoppingDownload from './ShoppingDownload';

export interface OrderItemCardProps {
  item: ShoppingListsItemsProps;
  onEdit: (data: ShoppingListsItemsProps) => void;
  onDelete: (data: ShoppingListsItemsProps) => void;
  onCopy: (data: ShoppingListsItemsProps) => void;
  isPermissions: boolean;
  isB2BUser: boolean;
  isb2bCustome?: boolean;
}

interface PermissionLevelInfoProps {
  permissionType: string;
  permissionLevel?: number | string;
}

const Flex = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const FontBold = styled(Typography)(() => ({
  fontWeight: '500',
  paddingRight: '8px',
}));

const FlexItem = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'start',
}));

function ShoppingListsCard(props: OrderItemCardProps) {
  const { item: shoppingList, onEdit, onDelete, onCopy, isPermissions, isB2BUser,isb2bCustome } = props;
  const b3Lang = useB3Lang();

  const [isCanEditShoppingList, setIsCanEditShoppingList] = useState<boolean>(true);
  const permissions = useAppSelector(({ company }) => company.permissions);

  const { submitShoppingListPermission, approveShoppingListPermission } =
    useAppSelector(rolePermissionSelector);

  const getEditPermissions = (status: number) => {
    if (submitShoppingListPermission) {
      if (status === 30 || status === 0) return false;
      return true;
    }

    if (status === 40) return true;

    return false;
  };

  const getDeletePermissions = (status: number) => {
    if (submitShoppingListPermission) {
      if (status === 20 || status === 30) return false;
      return true;
    }

    return false;
  };

  const navigate = useNavigate();

  const goToDetail = (shoppingList: ShoppingListsItemsProps) =>
    navigate(`/shoppingList/${shoppingList.id}`, {
      state: {
        from: 'shoppingList',
      },
    });

  useEffect(() => {
    if (isB2BUser) {
      const editShoppingListPermission = permissions.find(
        (item) => item.code === 'deplicate_shopping_list',
      );
      const param: PermissionLevelInfoProps[] = [];
      if (editShoppingListPermission && !isEmpty(editShoppingListPermission)) {
        const currentLevel = editShoppingListPermission.permissionLevel;
        const isOwner = shoppingList?.isOwner || false;
        param.push({
          permissionType: 'shoppingListActionsPermission',
          permissionLevel: currentLevel === 1 && isOwner ? currentLevel : 2,
        });
      }
      const { shoppingListActionsPermission } = getB3PermissionsList(param);

      setIsCanEditShoppingList(shoppingListActionsPermission);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shoppingList, isB2BUser]);

  return (
    <Card
      key={shoppingList.id}
      sx={{
        '& .b2b-card-content': {
          paddingBottom: '0',
        },
      }}
    >
      <CardContent className="b2b-card-content !p-0">
        <Typography
          variant="h5"
          className="leading-5"
          sx={{
            width: '100%',
            wordBreak: 'break-all',
          }}
        >
          {shoppingList.name}
        </Typography>
        <Box>
          {isB2BUser &&
            (submitShoppingListPermission ||
              (approveShoppingListPermission && shoppingList.approvedFlag)) && (
              <Box className="mb-2">
                <ShoppingStatus status={shoppingList.status} />
              </Box>
            )}
          <Box
            className="mb-2 text-gray-200 text-base"
            sx={{
              width: '100%',
              wordBreak: 'break-all',
            }}
          >
            {shoppingList.description}
          </Box>

          {isB2BUser && (
            <FlexItem className="mb-1 text-gray-200">
              <FontBold className="text-gray-200">
                {b3Lang('shoppingLists.card.createdBy')}
              </FontBold>
              {shoppingList.customerInfo.firstName} {shoppingList.customerInfo.lastName}
            </FlexItem>
          )}
          <FlexItem className="mb-1 text-gray-200">
            <FontBold className="text-gray-200">{b3Lang('shoppingLists.card.products')}</FontBold>
            {shoppingList.products.totalCount}
          </FlexItem>
          <FlexItem className="mb-1 text-gray-200">
            <FontBold className="text-gray-200">
              {b3Lang('shoppingLists.card.lastActivity')}
            </FontBold>
            {`${displayFormat(shoppingList.updatedAt)}`}
          </FlexItem>
        </Box>
        <Flex className="mt-4">
          <span
            className="text-primary font-medium underline cursor-pointer hover:text-primaryHover"
            onClick={() => goToDetail(shoppingList)}
          >
            {b3Lang('shoppingLists.card.view')}
          </span>
          <Box
            sx={{
              display: `${isPermissions ? 'block' : 'none'}`,
            }}
          >
            {!getEditPermissions(shoppingList.status) && isCanEditShoppingList && (
              <IconButton
                aria-label="edit"
                size="small"
                sx={{
                  marginRight: '8px',
                }}
                onClick={() => {
                  onEdit(shoppingList);
                }}
              >
                <EditIcon fontSize="inherit" />
              </IconButton>
            )}

            <IconButton
              aria-label="duplicate"
              size="small"
              sx={{
                marginRight: '8px',
              }}
              onClick={() => {
                onCopy(shoppingList);
              }}
            >
              <ContentCopyIcon fontSize="inherit" />
            </IconButton>
            {!getDeletePermissions(shoppingList.status) && isCanEditShoppingList && (
              <IconButton
                aria-label="delete"
                size="small"
                onClick={() => {
                  onDelete(shoppingList);
                }}
              >
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            )}
          </Box>
        </Flex>

        {shoppingList.id && isb2bCustome && (
          <div className="mt-4">
            <ShoppingDownload shoppingList={shoppingList} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default ShoppingListsCard;
