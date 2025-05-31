export const API_URL = import.meta.env.VITE_BASE_URL;

export const PATH = (path: string): string => `${API_URL}/api/${path}`;

export const API_ROUTES = {
  // PATH(`v3/coins/markets?vs_currency=usd&ids=${coins}&sparkline=true`),
  coin_list: PATH(
    `v3/coins/markets?vs_currency=usd&ids=bitcoin,tron,ethereum&sparkline=true`
  ),
};
