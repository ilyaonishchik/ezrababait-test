export const createClassName = (defaultClassName: string, propsClassName: string | undefined) =>
  defaultClassName.concat(propsClassName ? ` ${propsClassName}` : '');
