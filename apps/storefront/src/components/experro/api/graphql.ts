const ExpGraphQl = async (query: string) => {
  try {
    const response = await fetch('/exp-sf-cms/api/bc/storefront?locale=en-us', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (errorr) {
    return null;
  }
};

export default ExpGraphQl;
