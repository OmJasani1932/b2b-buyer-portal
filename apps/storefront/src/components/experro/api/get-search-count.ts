interface ExpSearchCountProps {
  searchObj: {
    orderBy?: string;
    sortBy?: string;
    body?: any;
  };
  signal?: AbortSignal;
}

const ExpSearchCount = async ({ searchObj, signal }: ExpSearchCountProps) => {
  try {
    let searchUrl: string = `/apis/ecommerce-service/public/v1/search/count?sort_by=${searchObj?.sortBy}&locale=en-us`;
    if (searchObj?.orderBy) {
      searchUrl = `${searchUrl}&order_by=${searchObj?.orderBy}`;
    }

    const headers = new Headers();
    headers.append('content-type', 'application/json');

    const requestOptions: RequestInit = {
      method: 'POST',
      headers,
      redirect: 'follow',
    };

    if (searchObj.body) {
      requestOptions.body = JSON.stringify(searchObj.body);
    }

    const response = await fetch(searchUrl, { ...requestOptions, signal });

    if (!response.ok) {
      return {};
    }

    const data = await response.json();

    return data;
  } catch (e) {
    return {};
  }
};

export default ExpSearchCount;
