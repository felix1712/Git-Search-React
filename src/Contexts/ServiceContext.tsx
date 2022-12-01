import React, { IChildrenOnly, IServiceActionsContext } from "react";
import axios, { AxiosRequestConfig, CancelToken } from "axios";

export const ServiceActionsContext = React.createContext({} as IServiceActionsContext);

const ServiceProvider = (props: IChildrenOnly) => {
  const { children } = props;

  const endpointUrl = (query: string) => {
    const endpoint = process.env.REACT_APP_API_URL + 'search/';
    return endpoint + query;
  };

  const getAxios = async (
    query: string,
    cancelToken: CancelToken,
    arrayBuffer?: string
  ) => {
    let config: AxiosRequestConfig = {
      cancelToken
    };

    if (!!arrayBuffer) config.responseType = "arraybuffer";

    const combinedUrl = endpointUrl(query)!;

    try {
      const response = await axios.get(combinedUrl, config);

      return response;
    } catch (error) {
      throw error;
    }
  };

  const postAxios = async (
    query: string,
    payload: any,
    cancelToken: CancelToken
  ) => {
    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "application/json"
      },
      cancelToken
    };

    if (!payload) payload = {};

    const combinedUrl = endpointUrl(query)!;

    try {
      const response = await axios.post(combinedUrl, payload, config);

      return response;
    } catch (error) {
      throw error;
    }
  };

  const serviceActionsValue = {
    getAxios,
    postAxios
  };

  return (
    <ServiceActionsContext.Provider value={serviceActionsValue}>
      {children}
    </ServiceActionsContext.Provider>
  );
};

export default ServiceProvider;