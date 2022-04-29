import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class PostsService {
  async getAll(){
    const res = await api.get('api/posts')
    // logger.log(res.data.posts)
    AppState.posts = res.data.posts
  }

  async getByQuery(creatorId){
    const res = await api.get('api/posts', {creatorId})
    // this is the array of 20+ items
    logger.log(res.data)
    AppState.results = res.data
  }
}

export const postsService = new PostsService