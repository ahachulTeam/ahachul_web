import Cookies from 'js-cookie';

export const getCurrentPath = () => {
  const currentPath = Cookies.get('currentPath') || '';
  const previousPath = Cookies.get('previousPath') || '';

  return { previousPath, currentPath };
};
