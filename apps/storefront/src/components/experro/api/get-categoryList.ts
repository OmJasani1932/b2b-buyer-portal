const ExpGetCategoryList = async (categoryId?: string) => {
  try {
    const headers = new Headers();
    headers.append('content-type', 'application/json');

    const requestOptions: RequestInit = {
      method: 'GET',
      headers,
      redirect: 'follow',
    };

    let apiUrl = `/apis/merchandising-service/v1/public/category-list?locale=en-us`;
    if (categoryId) {
      apiUrl += `&category_id=${categoryId}`;
    }
    const response = await fetch(apiUrl, requestOptions);
    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
};

export default ExpGetCategoryList;
