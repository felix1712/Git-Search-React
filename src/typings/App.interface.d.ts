import "react";
// import { RouteComponentProps, match } from "react-router-dom";

declare module "react" {
  interface IChildrenOnly {
    children: React.ReactNode;
  }

  interface IPostAxiosContext {
    (query: string, payload: any, signalToken: any);
  }

  interface IGetAxiosContext {
    (query: string, signalToken: any, arrayBuffer?: string);
  }

  interface IServiceActionsContext {
    getAxios: IGetAxiosContext;
    postAxios: IPostAxiosContext;
  }
}
