const APIURL_AUTH =
  process.env.REACT_APP_MODE === "development"
    ? process.env.REACT_APP_DEV_APIURL_AUTH
    : process.env.REACT_APP_PROD_APIURL_AUTH;

export { APIURL_AUTH };
