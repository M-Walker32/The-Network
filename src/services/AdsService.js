import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class AdsService {
  async getBills(){
    const res = await api.get('api/ads')
    // logger.log(res.data)
    AppState.billboards = res.data
  }
}

export const adsService = new AdsService