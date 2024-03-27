const MOCKING = process.env.REACT_APP_MOCKING ?? 'false';

export const isMocking = () => MOCKING === 'true';
