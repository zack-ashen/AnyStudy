import { createContext, useContext } from "react";

const RequestContext = createContext({
  withDefaults: (options?: RequestInit) => ({} as RequestInit),
});

export const useRequest = () => useContext(RequestContext);

export default RequestContext;
