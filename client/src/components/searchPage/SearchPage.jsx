import React from "react";
import { connect } from "react-redux";
import { Grid, Container, CircularProgress } from "@material-ui/core";

import SinglePost from "../singlePost/SinglePost";
import {
  searchPostResultAsync,
  searchPostScrollFetchAsync
} from "../../store/action/postAction";

let skipNum = 10;

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.title !== this.props.match.params.title) {
      this.props.searchPost(this.props.match.params.title, 0);
      document.title = this.props.match.params.title;
    }
  }

  componentDidMount() {
    document.title = this.props.match.params.title;
    this.props.searchPost(this.props.match.params.title, 0);
    window.scrollTo(0, 0);

    window.addEventListener("scroll", this.scrollHandler);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollHandler);
  }

  scrollHandler = () => {
    if (!this.props.postReducer.searchPageDataFetching) {
      const scrollAbleHeigth =
        this.containerRef.current.scrollHeight - window.innerHeight;

      const beforeBottom = 300;

      if (scrollAbleHeigth < window.scrollY + beforeBottom) {
        this.props.scrollFetch(this.props.match.params.title, skipNum);
        console.log("Fit The server");

        skipNum += skipNum;
      }
    }
  };

  render() {
    const { postReducer } = this.props;
    const { title } = this.props.match.params;

    return (
      <Container
        ref={this.containerRef}
        maxWidth="md"
        style={{ paddingTop: 90 }}
      >
        <div>
          <Grid container spacing={3}>
            {postReducer.searchPostLoading ? (
              <div style={{ width: "100%", textAlign: "center" }}>
                <h3>Loading...</h3>
              </div>
            ) : postReducer.searchResultPost.length ? (
              postReducer.searchResultPost.map(singlePost => (
                <SinglePost
                  matchWord={title}
                  singlePost={singlePost}
                  key={singlePost._id}
                />
              ))
            ) : (
              <div style={{ width: "100%", textAlign: "center" }}>
                <h3>No post found</h3>
              </div>
            )}
          </Grid>
        </div>
        {postReducer.searchPageDataFetching && (
          <div
            style={{
              position: "fixed",
              bottom: 10,
              left: "50%",
              transform: "translate(-50%, 0)"
            }}
          >
            <CircularProgress color="secondary" />
          </div>
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    postReducer: state.postReducer
  };
};

const mapDispatchTopProps = dispatch => {
  return {
    searchPost: (title, skipNum) =>
      dispatch(searchPostResultAsync(title, skipNum)),
    scrollFetch: (title, skipNum) =>
      dispatch(searchPostScrollFetchAsync(title, skipNum))
  };
};

export default connect(mapStateToProps, mapDispatchTopProps)(SearchPage);
