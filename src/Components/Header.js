import React from "react";

export default function Header(props) {
  return (
    <header className="header">
      <p>{props.children}</p>
    </header>
  );
}

Header.defaultProps = {
  children: "Hiiiii"
};
