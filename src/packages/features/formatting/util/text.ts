const capitalize = (text?: string): string =>
  text ? text.charAt(0).toUpperCase() + text.slice(1) : "";

export { capitalize };
