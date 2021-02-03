const isProduction = process.env.NODE_ENV === 'production';

const apiBase = process.env.REACT_APP_API_BASE;

if (!apiBase) {
  throw new Error('Env Error: REACT_APP_API_BASE is not set.');
}

export default { isProduction, apiBase };
