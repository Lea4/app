import {Navigate, useLocation, useNavigate} from "react-router-dom"
import { useState } from "react";

const divStyle = {
  width: "640px",
  height: "25px",
  margin: "100px 70px",
  fontSize: "20px",
  fontWeight:"bold",
  color:"white"
};

export const EstablishmentDetailsPage =()  => {
  const location = useLocation();
  const state = location.state;
  const [redirect, setRedirect] = useState(false);

  return redirect ? (
    <Navigate
      to="/"
      replace={true}
    />
  ) : (
    <div style={divStyle}>
    <p>Ratings: {state.ratingValue}</p>
    <p>Address: {state.address}</p>
    <button onClick={()=>setRedirect(true) } className="redirectButton">Go back</button>
    </div>
  );
};

