export const debounce = (callback: CallableFunction, timeout: number) => {
  let id;
  return (...args) => {
    clearTimeout(id);
    return (id = setTimeout(() => callback(...args), timeout));
  };
};
