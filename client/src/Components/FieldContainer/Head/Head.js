import React from "react";

const Head = (props) => {
  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      {
        <select
          id="cars"
          name="cars"
          onChange={(e) => {
            props.setType(e.target.value);
          }}
          value={props.type.toLowerCase()}
        >
          <option value="all">All</option>
          <option value="self">Self</option>
          <option value="group">Group</option>
          <option value="corporate">Corporate</option>
          <option value="others">Others</option>
        </select>
      }
      <div
        style={{
          color: "white",
          border: "1px white solid",
          padding: "1px 5px",
        }}
      >
        total : {props.length}
      </div>
    </div>
  );
};

export default Head;
