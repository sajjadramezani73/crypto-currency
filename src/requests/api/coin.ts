import axios from "axios";

import { API_ROUTES } from "../apiRoutes";

export const getCoins = async () =>
  await axios.get<ICoinProps[]>(API_ROUTES.coin_list);
