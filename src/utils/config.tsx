const APIURL_AUTH =
  process.env.REACT_APP_MODE === "development"
    ? process.env.REACT_APP_DEV_APIURL_AUTH
    : process.env.REACT_APP_PROD_APIURL_AUTH;
const CRYPTO_KEY = process.env.REACT_APP_CRYPTO_KEY as string;

export { APIURL_AUTH, CRYPTO_KEY };
