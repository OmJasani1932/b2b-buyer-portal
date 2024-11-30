interface ExpSearchProps {
  searchObj?: {
    fieldsToQuery?: string;
    skip?: number;
    limit?: number;
    sortBy?: string;
    orderBy?: string;
    byPassMerchandising?: boolean;
    byPassInventory?: boolean;
    body?: any;
  };
  isAuto?: boolean;
  searchTerm?: string;
  signal?: AbortSignal;
}

const ExpSearch = async ({
  searchObj = {},
  isAuto = false,
  searchTerm,
  signal,
}: ExpSearchProps) => {
  try {
    const headers = new Headers();
    headers.append('content-type', 'application/json');

    const requestOptions: RequestInit = {
      method: 'POST',
      headers,
      redirect: 'follow',
    };

    const queryParams = new URLSearchParams({
      fields: searchObj.fieldsToQuery || '',
      isAuto: isAuto.toString(),
      locale: 'en-us',
      ...(searchObj.skip && { skip: searchObj.skip.toString() }),
      ...(searchObj.limit && { limit: searchObj.limit.toString() }),
      ...(searchObj.sortBy && { sort_by: searchObj.sortBy }),
      ...(searchObj.orderBy && { order_by: searchObj.orderBy }),
      ...(searchObj.byPassMerchandising && { by_pass_merchandising: 'true' }),
      ...(searchObj.byPassInventory && { by_pass_inventory: 'true' }),
      ...(searchTerm && { searchTerm }),
    });

    const searchUrl = `/apis/ecommerce-service/public/v1/search?${queryParams.toString()}`;

    if (searchObj.body) {
      requestOptions.body = JSON.stringify(searchObj.body);
    }

    const response = await fetch(searchUrl, { ...requestOptions, signal });

    if (!response.ok) {
      return {};
    }

    const data = await response.json();

    if (data?.Data?.items) {
      data.Data.items.forEach((item: Record<string, any>) => {
        for (const key in item) {
          if (key.endsWith('_ej') && typeof item[key] === 'string') {
            try {
              item[key] = JSON.parse(item[key]);
            } catch (err) {
              console.error(`Failed to parse field '${key}':`, err);
            }
          }
        }
      });
    }

    return data;
  } catch (error) {
    return {};
  }
};

export default ExpSearch;
