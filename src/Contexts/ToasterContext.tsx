import React, { useState, IChildrenOnly } from "react";
import { Toastr } from "../components/Toastrs/Toastr";

interface IToastrActionContext {
  addToastr: any;
}

const IToastrContextProperties = {
  addToastr: () => {}
};

export const ToasterActionsContext = React.createContext<IToastrActionContext>(
  IToastrContextProperties
);

const ToasterProvider = (props: IChildrenOnly) => {
  const { children } = props;
  const [toasters, setToasters] = useState<any>([]);

  const toastUID = () => {
    let first: any = (Math.random() * 46656) | 0;
    let second: any = (Math.random() * 46656) | 0;
    first = ("000" + first.toString(36)).slice(-3);
    second = ("000" + second.toString(36)).slice(-3);

    return first + second;
  };

  const addToastr = (
    toastHeader: string,
    toastMessages: string,
    toastType: string
  ) => {
    const id = toastUID();
    const toastContent = {
      id: id,
      toastHeader: toastHeader,
      toastType: toastType,
      toastMessages: toastMessages
    };

    setToasters([...toasters, toastContent]);
  };

  const toastStyle: any = {
    position: "fixed",
    right: 0,
    top: "1rem",
    zIndex: 9
  };

  const remove = (id: string) =>
    setToasters(toasters.filter((t: any) => t.id !== id));

  const toasterActionsValue = { addToastr };

  return (
    <ToasterActionsContext.Provider value={toasterActionsValue}>
      <div style={toastStyle}>
        {toasters.map((t: any) => (
          <Toastr
            key={t.id}
            header={t.toastHeader}
            messages={t.toastMessages}
            type={t.toastType}
            remove={() => remove(t.id)}
          />
        ))}
      </div>
      {children}
    </ToasterActionsContext.Provider>
  );
};

export default ToasterProvider;