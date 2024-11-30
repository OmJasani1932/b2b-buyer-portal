interface ExpSearchAutoSuggestProps {
  searchObj: {
    body: {
      search_term: string;
    };
  };
  signal?: AbortSignal;
}

const ExpSearchAutoSuggest = async ({ searchObj, signal }: ExpSearchAutoSuggestProps) => {
  try {
    const searchUrl = '/apis/merchandising-service/v1/public/search-auto-suggester-with-spellcheck?locale=en-us';

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(searchObj.body),
      signal,
    };

    const response = await fetch(searchUrl, requestOptions);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    return {};
  }
};

export default ExpSearchAutoSuggest;
