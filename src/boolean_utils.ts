export const cToBooleanSafe = (value: any): boolean => {
  return value ? value.toString() === "true" : false;
};
