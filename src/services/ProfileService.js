import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class ProfilesService{
  // This is grabbing the profile id
  async getProfile(id){
    const res = await api.get('api/profiles/'+ id)
    logger.log(res.data)
    AppState.activeProfile = res.data
    // logger.log('this is the active profile',res.data)
  }
}

export const profilesService = new ProfilesService()