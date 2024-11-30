const ExpGetMenuById = async (menuId: string) => {
  try {
    const headers = new Headers();
    headers.append('content-type', 'application/json');

    const requestOptions: any = {
      method: 'GET',
      headers,
      redirect: 'follow',
    };

    const apiUrl = `/apis/menu-service/public/v1/menu-items-by-language/${menuId}?dataFieldsToQuery=id,internal_name,title,page_slug,current_version_id&locale=en-us`;

    const response = await fetch(apiUrl, requestOptions);
    if (!response.ok) {
      throw new Error(`Failed to fetch data for navigation ID: ${menuId}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
};

export default ExpGetMenuById;
