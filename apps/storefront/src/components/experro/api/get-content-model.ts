interface ExpGetContentModelProps {
  modelInternalName: string;
  fieldKey: string;
  fieldValue: string;
  fieldsToQuery: string;
  sortBy?: string;
  orderBy?: string;
  limit?: string;
  skip?: string;
  relationField?: string;
  relationFieldDataToQuery?: string;
  filter?: any;
  ssrKey?: string;
  enableSSR?: any;
  fieldType?: 'parent' | 'child';
  callForceFully?: boolean;
}

function  contentServiceResponseParser(response: any) {
  try {
    if (response.Status === 'failure') {
      return;
    }
    const { Data, Status } = response;
    const { meta, records } = Data;
    const { total_rows } = meta;

    const transformed_records: any = records?.map((record_data: any) => {
      let transformed_record: any = {};

      Object.keys(record_data).forEach((key) => {
        if (key !== 'version_data') {
          transformed_record[key] = record_data[key];
        }
      });

      if (record_data?.version_data) {
        transformed_record = {
          ...transformed_record,
          ...record_data['version_data'],
        };
      }
      return transformed_record;
    });
    return {
      Status,
      Data: {
        items: transformed_records,
        total_record: total_rows,
      },
    };
  } catch (e) {
    console.error(e, 'Something went wrong at parsing content service response');
    return response;
  }
}

const ExpGetContentModel = async ({
  modelInternalName,
  fieldKey,
  fieldValue,
  fieldsToQuery,
  sortBy,
  orderBy,
  limit,
  skip,
  relationField,
  relationFieldDataToQuery,
  filter,
  fieldType,
}: ExpGetContentModelProps) => {
  try {
    const headers = new Headers();
    headers.append('content-type', 'application/json');

    const requestOptions: RequestInit = {
      method: 'GET',
      headers,
      redirect: 'follow',
    };

    let url = `/content/v1/content-models/${modelInternalName}/records/search?field_name=${fieldKey}&field_value=${fieldValue}&fields_data_to_query=${fieldsToQuery}&locale=en-us`;

    if (sortBy) url += `&sort_by=${sortBy}`;
    if (orderBy) url += `&order_by=${orderBy}`;
    if (limit) url += `&limit=${limit}`;
    if (skip) url += `&offset=${skip}`;
    if (relationField) url += `&relation_field=${relationField}`;
    if (relationFieldDataToQuery) url += `&relationFieldDataToQuery=${relationFieldDataToQuery}`;
    if (filter) url += `&filter=${filter}`;
    if (fieldType) url += `&field_type=${fieldType}`;
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return contentServiceResponseParser(data);
  } catch (error) {
    return null;
  }
};

export default ExpGetContentModel;
