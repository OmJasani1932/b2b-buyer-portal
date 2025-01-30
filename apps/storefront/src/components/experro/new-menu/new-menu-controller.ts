import { useEffect, useState } from 'react';
import { ContentService } from 'experro-storefront';
import ExpGetContentModel from '../api/get-content-model';

const ExpMenuController = () => {
  const [menuData, setMenuData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getAPIObject = () => {
    const apiObj: any = {
      modelInternalName: 'mega_menu',
      fieldKey: 'id',
      fieldValue: '*',
      fieldsToQuery: '*',
      sortBy: 'menu_sort_order_eii',
      orderBy: 'asc',
    };

    return apiObj;
  };

  const getMenuData = async () => {
    try {
      const menuData = await ExpGetContentModel({
        modelInternalName: 'mega_menu',
        fieldKey: 'id',
        fieldValue: '*',
        fieldsToQuery: '*',
        sortBy: 'menu_sort_order_eii',
        orderBy: 'asc',
      });
      if (menuData?.Status === 'success') {
        menuData?.Data?.items?.sort((a: any, b: any) => {
          // If a.menu_sort_order_eii is undefined, push it to the end
          if (a?.menu_sort_order_eii === undefined) return 1;
          if (b?.menu_sort_order_eii === undefined) return -1;

          // Otherwise, compare the menu_sort_order_eii values
          return a?.menu_sort_order_eii - b?.menu_sort_order_eii;
        });
        setMenuData(menuData?.Data?.items);
      }
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getMenuData();
  }, []);

  return {
    isLoading,
    menuData,
  };
};

export default ExpMenuController;
