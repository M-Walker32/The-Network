import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
  posts: {},
  activeProfile: {},
  searchResults: {},
  Posts: {},
  billboards: {},
  liked:[],
  totalPages: 0,
  currentPage: 1
})
