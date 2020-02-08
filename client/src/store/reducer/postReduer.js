import {
  FETCH_POST,
  DELETE_POST,
  HOME_PAGE_DATA_FETCHING,
  SEARCH_POST_RESULT,
  SEARCH_POST_SCROLL_FETCH,
  SEARCH_PAGE_DATA_FETCHING,
  EDIT_POST,
  EDIT_POST_MODAL_STATE,
  ADD_NEW_POST
} from "../action/actionType";

const initialState = {
  allPost: [],
  searchResultPost: [],
  postLoading: true,
  homePageDataFetching: false,
  searchPostLoading: true,
  searchPageDataFetching: false,
  editModalState: false
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POST:
      return {
        ...state,
        postLoading: false,
        homePageDataFetching: false,
        allPost: [...state.allPost, ...action.payload.posts]
      };
    case DELETE_POST:
      return {
        ...state,
        allPost: state.allPost.filter(
          singlePost => singlePost._id !== action.payload.deletedId
        ),
        searchResultPost: state.searchResultPost.filter(
          singlePost => singlePost._id !== action.payload.deletedId
        )
      };
    case HOME_PAGE_DATA_FETCHING:
      return {
        ...state,
        homePageDataFetching: true
      };
    case SEARCH_PAGE_DATA_FETCHING:
      return {
        ...state,
        searchPageDataFetching: true
      };
    case SEARCH_POST_RESULT:
      return {
        ...state,
        searchPostLoading: false,
        searchPageDataFetching: false,
        searchResultPost: action.payload.searchPostResult
      };

    case SEARCH_POST_SCROLL_FETCH:
      return {
        ...state,
        searchPostLoading: false,
        searchPageDataFetching: false,
        searchResultPost: [
          ...state.searchResultPost,
          ...action.payload.searchPostScrollFetchResult
        ]
      };

    case EDIT_POST:
      return {
        ...state,
        editModalState: false,
        allPost: state.allPost.map(singlePost => {
          if (singlePost._id === action.payload.data._id) {
            return action.payload.data;
          }
          return singlePost;
        }),
        searchResultPost: state.searchResultPost.map(singlePost => {
          if (singlePost._id === action.payload.data._id) {
            return action.payload.data;
          }
          return singlePost;
        })
      };

    case EDIT_POST_MODAL_STATE:
      return {
        ...state,
        editModalState: action.payload.modalState
      };

    case ADD_NEW_POST:
      return {
        ...state,
        allPost: [action.payload.newPost, ...state.allPost]
      };

    default:
      return state;
  }
};

export default postReducer;
