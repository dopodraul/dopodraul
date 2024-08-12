const getObjectValue = (object: object, keyPath: string) => {
  return keyPath.split('.').reduce((acc: any, key) => {
    return acc && acc[key] !== undefined ? acc[key] : undefined;
  }, object);
}

export { getObjectValue };
