const ExpGetCart = async () => {
  try {
    const headers = new Headers();
    headers.append('content-type', 'application/json');

    const requestOptions: RequestInit = {
      method: 'GET',
      headers,
      redirect: 'follow',
    };

    const apiUrl = `/exp-sf-cms/api/bc/cart?include=line_items.physical_items.options&locale=en-us`;

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

export { ExpGetCart };
