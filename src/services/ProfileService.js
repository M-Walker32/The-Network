import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class ProfilesService{
  // This is grabbing the profile id
  async getProfile(id){
    const res = await api.get('api/profiles/'+id)
    AppState.activeProfile = res.data
    // logger.log(res.data)
  }
}

export const profilesService = new ProfilesService()