import { useState } from "react";
import { Navigate } from "react-router-dom";
import { getEstablishmentDetail } from "../api/ratingsAPI";

export const EstablishmentsTableRow: React.FC<{
  establishment: { [key: string]: string } | null | undefined;
}> = ({ establishment }) => {
  const [redirect, setRedirect] = useState(false);
  const [ratingVal, setRatingVal] = useState("");
  const [addressVal, setaddressVal] = useState("");

  async function navigateToRatingInfo() {
    var result = await getEstablishmentDetail(
      establishment?.FHRSID,
      establishment?.BusinessName
    );
    var addressList = [
      result?.AddressLine1,
      result?.AddressLine2,
      result?.AddressLine3,
      result?.AddressLine4,
    ];

    var address = "";
    if (!result) {
      address = "no data";
    } else {
      address = addressList.filter((a) => a !== "").join(", ");
    }

    setaddressVal(address);
    var ratingValue = result ? result?.RatingValue : "no data";
    setRatingVal(ratingValue);
    setRedirect(true);
  }

  return redirect ? (
    <Navigate
      to="/details"
      replace={true}
      state={{
        ratingValue: ratingVal,
        address: addressVal,
      }}
    />
  ) : (
    // eslint-disable-next-line react/jsx-no-comment-textnodes
    <tr>
      <td onClick={async () => navigateToRatingInfo()} className="link">
        {establishment?.BusinessName}
      </td>
      <td>{establishment?.RatingValue}</td>
    </tr>
  );
};
