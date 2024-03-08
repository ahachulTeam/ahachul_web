const MOCKING = process.env.REACT_APP_PUBLIC_MOCKING ?? 'false';

export const isMocking = () => MOCKING === 'true';
