import "../styles/globals.scss";

// import React from "react";

import { RestContextProvider } from "../store/rest-context";

import Layout from "../components/layout/Layout";

function MyApp({ Component, pageProps }) {
  return (
    // <React.StrictMode>
    <RestContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </RestContextProvider>
    // </React.StrictMode>
  );
}

export default MyApp;
