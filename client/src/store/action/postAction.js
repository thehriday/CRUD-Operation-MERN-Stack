import axios from "axios";

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

const fetchPost = posts => {
  return {
    type: FETCH_POST,
    payload: { posts }
  };
};

export const fetchPostAsync = skipNum => {
  return dispatch => {
    dispatch({ type: HOME_PAGE_DATA_FETCHING });
    axios
      .get(`/api/get_all_post?skipNum=${skipNum}`)
      .then(result => {
        dispatch(fetchPost(result.data));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

const deletePost = _id => {
  return {
    type: DELETE_POST,
    payload: { deletedId: _id }
  };
};

export const deletePostAsync = _id => {
  return dispatch => {
    axios
      .delete(`/api/delete_post`, {
        data: {
          _id
        }
      })
      .then(({ data }) => {
        dispatch(deletePost(data.result._id));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

const searchPostResult = searchPostResult => {
  return {
    type: SEARCH_POST_RESULT,
    payload: { searchPostResult }
  };
};

export const searchPostResultAsync = (title, skipNum) => {
  return dispatch => {
    axios
      .get(`/api/search_post/${title}?skipNum=${skipNum}`)
      .then(result => {
        dispatch(searchPostResult(result.data));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

const searchPostScrollFetch = searchPostScrollFetchResult => {
  return {
    type: SEARCH_POST_SCROLL_FETCH,
    payload: { searchPostScrollFetchResult }
  };
};

export const searchPostScrollFetchAsync = (title, skipNum) => {
  return dispatch => {
    dispatch({ type: SEARCH_PAGE_DATA_FETCHING });
    axios
      .get(`/api/search_post/${title}?skipNum=${skipNum}`)
      .then(result => {
        dispatch(searchPostScrollFetch(result.data));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

const editPost = data => {
  return {
    type: EDIT_POST,
    payload: { data }
  };
};

export const editPostAsync = ({ _id, title, body }) => {
  return dispatch => {
    axios
      .put("/api/update_post", {
        _id,
        title,
        body
      })
      .then(({ data }) => {
        dispatch(editPost(data.updatedPost));
        dispatch(editModalState(false));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const editModalState = state => {
  return {
    type: EDIT_POST_MODAL_STATE,
    payload: { modalState: state }
  };
};

const addPost = newPost => {
  return {
    type: ADD_NEW_POST,
    payload: { newPost }
  };
};

export const addPostAsync = ({ title, body }) => {
  return dispatch => {
    axios
      .post("/api/add_post", {
        title,
        body
      })
      .then(({ data }) => {
        dispatch(addPost(data.post));
        dispatch(editModalState(false));
      })
      .catch(err => {
        console.log(err);
      });
  };
};
