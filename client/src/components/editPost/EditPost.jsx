import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Modal, TextField, Button, TextareaAutosize } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import { connect } from "react-redux";

import { editPostAsync } from "../../store/action/postAction";

import "./EditPost.css";

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: 5,
    width: 500
  }
}));

function EditPost(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [state, setState] = useState({
    title: props.singlePost.title,
    body: props.singlePost.body
  });

  useEffect(() => {
    setOpen(props.modalState);
  }, [props]);

  const handleClose = () => {
    setOpen(false);
    props.setModalState(false);
  };

  const savePostHandler = () => {
    props.editPost({
      _id: props.singlePost._id,
      title: state.title,
      body: state.body
    });
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2
              style={{ marginBottom: 0, textAlign: "center" }}
              id="transition-modal-title"
            >
              Edit Post
            </h2>
            <hr />
            <div className="EditPostBody" style={{ paddingTop: 20 }}>
              <TextField
                onChange={e => setState({ ...state, title: e.target.value })}
                style={{ width: "100%" }}
                value={state.title}
                label="Post Title"
                variant="outlined"
              />
              <div style={{ display: "flex" }}>
                <p className="postBodyLabal">Post Title</p>
              </div>
              <TextareaAutosize
                className="postBodyInput"
                onChange={e => setState({ ...state, body: e.target.value })}
                value={state.body}
                style={{ width: "99%" }}
                aria-label="Post Body"
                rowsMin={6}
                placeholder="Post Body"
              />
            </div>
            <div style={{ textAlign: "center", marginTop: 20 }}>
              <Button
                onClick={handleClose}
                style={{ marginRight: 10 }}
                variant="contained"
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => savePostHandler()}
              >
                Save
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    editPost: data => dispatch(editPostAsync(data))
  };
};

export default connect(null, mapDispatchToProps)(EditPost);
