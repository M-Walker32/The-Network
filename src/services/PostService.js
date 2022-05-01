import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

const params ={
  query: null,
  creatorId: null,
  page: 1
}
class PostsService {
  async getAll(){
    const res = await api.get('api/posts')
    AppState.posts = res.data.posts
    AppState.totalPages = res.data.totalPages
    AppState.currentPage = 1
    // logger.log('total pages', AppState.totalPages, 'currentpage', AppState.currentPage)
  }
  async search(query){
    params.query = query
    params.page = 1
    params.creatorId = null
    // const res = await api.get('api/posts/?query='+ query)
    const res = await api.get('api/posts', {params})
    AppState.posts = res.data.posts
    AppState.totalPages = res.data.totalPages
  }
  async clearParams(){
    params.creatorId = null
    params.page = 1
    params.query = null
    logger.log({params})
  }
  async changePage(page){
    // This does not work on the profile page because im making the creatordId null, but if i don't do that I cna't swicth pages on the homepage
    params.page = page
    params.query = null
    const res = await api.get('api/posts/',{params})
    // const res = await api.get('api/posts/?page='+ page)
    // The page content is not chnaging on the profile but it is on the home page and but the network link is correct
    logger.log('1',res.data, '2', res.data.posts)
    logger.log({params})
    AppState.posts = res.data.posts
    AppState.searchResults = res.data.posts    
    AppState.currentPage = page
  }
  async getByQuery(id){
    params.creatorId = id
    params.page = 1
    AppState.currentPage = 1
    const res = await api.get('api/posts/', {params})
    // logger.log('this is hopefully an array of posts', res.data.posts)
    // logger.log('profile total pages:',res.data.totalPages)
    AppState.searchResults = res.data.posts
    AppState.totalPages = res.data.totalPages
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
  }
  async likePost(like) {
    // this will be an edit request? to add a likeId to the array of the post
    const res = await api.put('api/posts/'+ id, like)
    logger.log(res.data)
  }
}

export const postsService = new PostsService