import { RestClient } from 'ftx-api';

import { FTX_API_KEY, FTX_API_SECRET } from "./ENV"

export const ftx = new RestClient(
  FTX_API_KEY,
  FTX_API_SECRET,
);