import React, { useRef } from "react";

export default function SearchBox(props) {
  const { placeHolder = "Find Gifs", onSearch, value } = props;
  return (
    <div className="search-box">
      <input
        ref={props.inputRef}
        type="text"
        value={value}
        className="search-input"
        placeholder={placeHolder}
        onChange={onSearch}
      />
    </div>
  );
}
