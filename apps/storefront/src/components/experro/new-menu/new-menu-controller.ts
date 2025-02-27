import { useEffect, useState } from 'react';
import ExpGetContentModel from '../api/get-content-model';

const ExpMenuController = () => {
  const [menuData, setMenuData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [posts, setPosts] = useState<any>();
  const [isLoadingForBlogs, setIsLoadingForBlogs] = useState<boolean>(false);

  const getBlogs = async () => {
    setIsLoadingForBlogs(true);
    try {
      const API_URL =
        'https://dev-bigcom-customer-service.cookandboardman.io/apis/customer-service/v1/blogs/posts?state__contains=PUBLISHED&sort=-publishDate&limit=2';

      const data = await fetch(API_URL, {
        headers: {
          clientid: 'customer-6d7c536b-a64b-489d-9873-b19b13e3ab33',
        },
      });

      const res = await data.json();
      if (res?.Status === 'success') {
        setPosts(res?.Data);
        setIsLoadingForBlogs(false);
      }
    } catch (err: any) {
      setIsLoadingForBlogs(false);
      console.error(err);
    }
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
          if (a?.menu_sort_order_eii === undefined) return 1;
          if (b?.menu_sort_order_eii === undefined) return -1;

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
    getBlogs()
  }, []);

  return {
    isLoading,
    menuData,
    isLoadingForBlogs,
    posts
  };
};

export default ExpMenuController;
