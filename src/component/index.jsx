import React from "react";
import Main from "./Main/main";
import Menu from "./Menu/menu";

class Index extends React.Component {
  render() {
    return (
      <div>
        <Menu />

        <Main />
      </div>
    );
  }
}

export default Index;
