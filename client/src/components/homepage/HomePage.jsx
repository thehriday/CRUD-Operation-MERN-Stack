import React from "react";
import { connect } from "react-redux";
import { Grid, Container, CircularProgress } from "@material-ui/core";

import SinglePost from "../singlePost/SinglePost";
import { fetchPostAsync } from "../../store/action/postAction";

let skipNum = 10;

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
  }

  componentDidMount() {
    document.title = "Eboo";
    window.scrollTo(0, 0);
    if (this.props.postReducer.allPost.length === 0) {
      this.props.fetchPost(0);
    }
    window.addEventListener("scroll", this.scrollHandler);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollHandler);
  }

  scrollHandler = () => {
    if (!this.props.postReducer.homePageDataFetching) {
      const scrollAbleHeigth =
        this.containerRef.current.scrollHeight - window.innerHeight;

      const beforeBottom = 300;

      if (scrollAbleHeigth < window.scrollY + beforeBottom) {
        this.props.fetchPost(skipNum);
        skipNum += skipNum;
      }
    }
  };

  render() {
    const { postReducer } = this.props;
    return (
      <Container
        ref={this.containerRef}
        maxWidth="md"
        style={{ paddingTop: 90 }}
      >
        <div>
          <Grid container spacing={3}>
            {postReducer.postLoading ? (
              <div style={{ width: "100%", textAlign: "center" }}>
                <h3>Loading...</h3>
              </div>
            ) : postReducer.allPost.length ? (
              postReducer.allPost.map(singlePost => (
                <SinglePost singlePost={singlePost} key={singlePost._id} />
              ))
            ) : (
              <div style={{ width: "100%", textAlign: "center" }}>
                <h3>No post found</h3>
              </div>
            )}
          </Grid>
        </div>
        {postReducer.homePageDataFetching && (
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
    fetchPost: skipNum => dispatch(fetchPostAsync(skipNum))
  };
};

export default connect(mapStateToProps, mapDispatchTopProps)(HomePage);
