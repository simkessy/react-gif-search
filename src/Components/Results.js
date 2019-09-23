import React, { Fragment } from "react";

export default function Results({ results }) {
  return (
    <Fragment>
      {!results ? (
        <p>Sorry, we don't have results</p>
      ) : (
        results.map(gif => {
          return (
            <div className="gif-container" key={gif.id}>
              <img src={gif.url} alt={gif.title} />
            </div>
          );
        })
      )}
    </Fragment>
  );
}
