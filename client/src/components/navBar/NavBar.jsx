import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { makeStyles, fade } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";

import { connect } from "react-redux";

import AddPost from "../addPost/AddPost";

import { editModalState } from "../../store/action/postAction";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 10,
    marginRight: 10,
    width: "80%",
    [theme.breakpoints.up("md")]: {
      marginLeft: "auto",
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 350,
      "&:focus": {
        width: 500
      }
    }
  }
}));

function NavBar(props) {
  const classes = useStyles();
  const history = useHistory();

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

  const locationHandler = ({ target }) => {
    history.replace(`/search/${target.value}`);
  };

  return (
    <div className={classes.root}>
      <AppBar>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Link style={{ color: "white", textDecoration: "none" }} to="/">
            <Typography variant="h6" className={classes.title}>
              CRUD Operation
            </Typography>
          </Link>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              onKeyPress={e => e.which === 13 && locationHandler(e)}
              onChange={e => locationHandler(e)}
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div style={{ marginLeft: "auto" }}>
            <Button onClick={() => setModalState(true)} color="inherit">
              Add Post
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <AddPost
        setModalState={state => setModalState(state)}
        modalState={modalState}
      />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    modalStateFromStore: state.postReducer.editModalState
  };
};

const mapDispatchToProps = dispatch => {
  return {
    editModalState: state => dispatch(editModalState(state))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
