const apiURL = import.meta.env.VITE_API_COSMOS ?? "https://rest.inns.fun";
const rpcURL = import.meta.env.VITE_WS_TENDERMINT ?? "https://rpc.inns.fun";
const prefix = import.meta.env.VITE_ADDRESS_PREFIX ?? "inns";

export const env = {
  apiURL,
  rpcURL,
  prefix,
};
