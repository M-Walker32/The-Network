import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class PostsService {
  async getAll(){
    const res = await api.get('api/posts')
    // logger.log(res.data.posts)
    AppState.posts = res.data.posts
  }

  async getByQuery(id){
    const res = await api.get('api/profiles/'+ id +'/posts')
    // const res = await api.get('api/posts/', {params})
    logger.log(res.data.posts)
    AppState.searchResults = res.data.posts
  }
  async createPost(newPost){
    const res = await api.post('api/posts', newPost)
    // logger.log(res.data)
    AppState.posts.push(res.data)
  }

  async deletePost(post) {
    logger.log(post)
    const res = await api.delete('api/posts/'+ post)
    logger.log(res)
    // AppState.posts.splice(i,1)
    // AppState.posts = AppState.posts
    // await api.delete('api/posts/'+ post)
  }
  async likePost(like) {
    // this will be an edit request? to add a likeId to the array of the post
    const res = await api.put('api/posts/'+ id, like)
    logger.log(res.data)
  }
}

export const postsService = new PostsService