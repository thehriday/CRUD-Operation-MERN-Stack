import React, { Component } from "react";
import { Container } from "@material-ui/core";

export class EmptySearch extends Component {
  render() {
    return (
      <Container maxWidth="md" style={{ paddingTop: 90 }}>
        <div style={{ width: "100%", textAlign: "center" }}>
          <h3>Please search for a post</h3>
        </div>
      </Container>
    );
  }
}

export default EmptySearch;
