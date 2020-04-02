export const NumberFormat = number => {
  return new Intl.NumberFormat().format(number);
};
