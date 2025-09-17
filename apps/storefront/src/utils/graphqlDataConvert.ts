import _ from 'lodash-es';

// export const convertObjectToGraphql = (data: CustomFieldItems) => {
//   if (typeof data === 'string') {
//     return `"${data}"`;
//   }
//   if (typeof data === 'number') {
//     return `${data},`;
//   }
//   let str = '{';

//   Object.keys(data).forEach((item: any, index) => {
//     const isLast = index === Object.keys(data).length - 1;
//     if (typeof data[item] === 'string') {
//       str += `${item}: ${JSON.stringify(`${data[item]}`)}${isLast ? '' : ','} `;
//     }

//     if (typeof data[item] === 'number') {
//       if (index === Object.keys(data).length - 1) {
//         str += `${item}: `;
//         str += `${data[item]}`;
//       } else {
//         str += `${item}: `;
//         str += `${data[item]}, `;
//       }
//     }

//     if (Object.prototype.toString.call(data[item]) === '[object Object]') {
//       str += `${item}: `;
//       str += convertObjectToGraphql(data[item]);
//     }

//     if (Object.prototype.toString.call(data[item]) === '[object Array]') {
//       str += `${item}: [`;
//       data[item].forEach((list: any, index: number) => {
//         str += convertObjectToGraphql(list);
//         if (index < data[item].length - 1) {
//           str += ',';
//         }
//       });
//       str += '],';
//     }
//   });
//   str += '},';

//   return str;
// };
export const escapeGraphQLForSearchString = (str: any) => {
  let actualValue: string;

  try {
    const parsed = JSON.parse(str);
    actualValue = String(parsed);
  } catch {
    actualValue = String(str);
  }

  // Trim outer quotes if they exist
  if (
    (actualValue.startsWith('"') && actualValue.endsWith('"')) ||
    (actualValue.startsWith("'") && actualValue.endsWith("'"))
  ) {
    actualValue = actualValue.slice(1, -1);
  }

  // Normalize trailing quotes if needed
  actualValue = actualValue.replace(/"+$/g, '"'); // or remove all with ''

  return JSON.stringify(actualValue); // GraphQL-safe
};

// Helper function to escape strings for GraphQL
export const escapeGraphQLString = (str: any) => {
  let actualValue: string;

  try {
    // Try parsing JSON-encoded strings
    const parsed = JSON.parse(str);
    actualValue = String(parsed); // force into string
  } catch {
    actualValue = String(str); // fallback to raw string
  }

  // Remove leading/trailing quotes if present
  if (
    (actualValue.startsWith('"') && actualValue.endsWith('"')) ||
    (actualValue.startsWith("'") && actualValue.endsWith("'"))
  ) {
    actualValue = actualValue.slice(1, -1);
  }

  // Collapse multiple quotes at end → keep only one
  actualValue = actualValue.replace(/"{2,}$/g, '"');

  // Final escape for GraphQL
  return JSON.stringify(actualValue);
};

export const convertObjectToGraphql = (data: CustomFieldItems) => {
  if (typeof data === 'string') {
    return escapeGraphQLString(data);
  }

  if (typeof data === 'number') {
    return `${data}`;
  }

  let str = '{';

  Object.keys(data).forEach((item: any, index) => {
    const isLast = index === Object.keys(data).length - 1;

    if (typeof data[item] === 'string') {
      str += `${item}: ${escapeGraphQLString(data[item])}${isLast ? '' : ', '} `;
    }

    if (typeof data[item] === 'number') {
      str += `${item}: ${data[item]}${isLast ? '' : ', '} `;
    }

    if (Object.prototype.toString.call(data[item]) === '[object Object]') {
      str += `${item}: ${convertObjectToGraphql(data[item])}${isLast ? '' : ', '} `;
    }

    if (Array.isArray(data[item])) {
      str += `${item}: [`;
      data[item].forEach((list: any, i: number) => {
        str += convertObjectToGraphql(list);
        if (i < data[item].length - 1) {
          str += ',';
        }
      });
      str += `]${isLast ? '' : ', '} `;
    }
  });

  str += '}';

  return str;
};

export const convertArrayToGraphql = (data: CustomFieldItems) => {
  let str = '[';
  data.forEach((list: CustomFieldItems, index: number) => {
    if (index === data.length - 1) {
      str += convertObjectToGraphql(list);
    } else {
      str += `${convertObjectToGraphql(list)},`;
    }
  });
  str += ']';

  return str;
};

// Define the types that can be converted.
type ConvertibleTypes = string | Record<string, any> | any[];

/**
 * Converts a given string from camel case to snake case.
 * @param str The string to be converted.
 * @returns The converted string.
 */
function camelToSnake(str: string): string {
  return _.snakeCase(str);
}

/**
 * Converts a given string from snake case to camel case.
 * @param str The string to be converted.
 * @returns The converted string.
 */
function snakeToCamel(str: string): string {
  return _.camelCase(str);
}

/**
 * Recursively converts the keys of an object or array from camel case to snake case.
 * @param input The object or array to be converted.
 * @returns A new object or array with keys in snake case.
 */
export function convertObjectOrArrayKeysToSnake(input: ConvertibleTypes): ConvertibleTypes {
  if (typeof input === 'string') {
    return input;
  }
  if (_.isArray(input)) {
    return input.map((item) => convertObjectOrArrayKeysToSnake(item));
  }
  if (_.isObject(input) && !_.isPlainObject(input)) {
    // Handle special cases like Date or RegExp objects
    return input;
  }
  if (_.isPlainObject(input)) {
    const result: Record<string, any> = {};
    Object.keys(input).forEach((key) => {
      result[camelToSnake(key)] = convertObjectOrArrayKeysToSnake((input as CustomFieldItems)[key]);
    });
    return result;
  }
  return input;
}

/**
 * Recursively converts the keys of an object or array from snake case to camel case.
 * @param input The object or array to be converted.
 * @returns A new object or array with keys in camel case.
 */
export function convertObjectOrArrayKeysToCamel(input: ConvertibleTypes): ConvertibleTypes {
  if (typeof input === 'string') {
    return input;
  }
  if (_.isArray(input)) {
    return input.map((item) => convertObjectOrArrayKeysToCamel(item));
  }
  if (_.isObject(input) && !_.isPlainObject(input)) {
    // Handle special cases like Date or RegExp objects
    return input;
  }
  if (_.isPlainObject(input)) {
    const result: Record<string, any> = {};
    Object.keys(input).forEach((key) => {
      result[snakeToCamel(key)] = convertObjectOrArrayKeysToCamel((input as CustomFieldItems)[key]);
    });
    return result;
  }
  return input;
}
