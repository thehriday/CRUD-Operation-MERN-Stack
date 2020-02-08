import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Grid, Button } from "@material-ui/core";
import moment from "moment";
import reactStringReplace from "react-string-replace";

import { connect } from "react-redux";

import { deletePostAsync, editModalState } from "../../store/action/postAction";

import EditPost from "../editPost/EditPost";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

function SinglePost(props) {
  const classes = useStyles();
  const [modalState, setModalState] = useState(false);

  useEffect(() => {
    if (modalState === true) {
      props.editModalState(modalState);
    }
  }, [modalState, props]);

  useEffect(() => {
    if (props.modalStateFromStore === false) {
      setModalState(false);
    }
  }, [props.modalStateFromStore]);

  const renderHightLightTitle = () => {
    const { title } = props.singlePost;
    const { matchWord } = props;
    if (!matchWord) {
      return title;
    }
    return reactStringReplace(title, matchWord, (match, i) => (
      <span key={i} className="highlight">
        {match}
      </span>
    ));
  };

  return (
    <Grid item xs={12}>
      <Paper className={classes.paper}>
        <h3 style={{ marginBottom: 0 }}>{renderHightLightTitle()}</h3>
        <small style={{ margin: 0 }}>
          {moment(props.singlePost.createdAt).format("llll")}
        </small>
        <p>{props.singlePost.body}</p>
        <Button
          onClick={() => setModalState(true)}
          variant="contained"
          color="primary"
        >
          Edit
        </Button>
        <Button
          onClick={() => props.deletePost(props.singlePost._id)}
          style={{ marginLeft: 10 }}
          variant="contained"
          color="secondary"
        >
          Delete
        </Button>
      </Paper>
      <EditPost
        setModalState={state => setModalState(state)}
        modalState={modalState}
        singlePost={props.singlePost}
      />
    </Grid>
  );
}

const mapStateToProps = state => {
  return {
    modalStateFromStore: state.postReducer.editModalState
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deletePost: _id => dispatch(deletePostAsync(_id)),
    editModalState: state => dispatch(editModalState(state))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SinglePost);
