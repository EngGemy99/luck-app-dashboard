import React from "react";
import { useParams } from "react-router-dom";

function UserDetails() {
  let { id } = useParams(); // here is _id
  return (
    <div>
      <h3>Requested user ID: {id}</h3>
    </div>
  );
}

export default UserDetails;
