
export const capitalize = string => string[0].toUpperCase() + string.slice(1);

export const snakeToCamelCase = (string) => {
  const words = string.split('_');
  const wordsCapitalized = words.slice(1).map(capitalize).join('');
  return words[0] + wordsCapitalized;
};

export const keysSnakeToCamelCase = (collection) => {
  if (typeof collection !== 'object') {
    return collection;
  } else if (Array.isArray(collection)) {
    return collection.map(keysSnakeToCamelCase);
  }

  return Object.entries(collection)
    .reduce(
      (convertedObject, [key, value]) => {
        const camelCaseKey = snakeToCamelCase(key);

        convertedObject[camelCaseKey] = keysSnakeToCamelCase(value);

        return convertedObject;
      },
      {},
    );
};
