import { useState, useEffect } from "react";
import { EstablishmentsTable } from "./EstablishmentsTable";
import { EstablishmentsTableNavigation } from "./EstablishmentsTableNavigation";
import { getAuthorities, getEstablishmentRatings, getEstablishmentRatingsFiltered } from "../api/ratingsAPI";
import { LoadingInfo } from "./LoadingInfo";

const tableStyle = {
  background: "rgba(51, 51, 51, 0.9)",
  padding: "10px",
  width: "max-content",
  marginLeft: "50px",
  color: "white",
  fontSize: "20px",
};

const selectStyle = {
  background: "rgba(51, 51, 51, 0.9)",
  marginLeft: "50px",
  color:"white"
}

export const PaginatedEstablishmentsTable = () => {
  const [error, setError] = useState<{
    message: string;
    [key: string]: string;
  }>();
  const [establishments, setEstablishments] = useState<
    { [key: string]: string }[]
  >([]);
  const [pageNum, setPageNum] = useState(1);
  const [pageCount] = useState(100);
  const [isLoading, setIsLoading] = useState(true);
  const [authorities, setAuthorities] = useState<{ [key: string]: string }[]>(
    []
  );

  useEffect(() => {
    getEstablishmentRatings(pageNum).then(
      (result) => {
        setEstablishments(result?.establishments);
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
      },
      (error) => {
        setError(error);
      }
    );
    getAuthorities().then(
      (result) => {
        setAuthorities(result.authorities);
      },
      (error) => {
        setError(error);
      }
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handlePreviousPage() {
    pageNum > 1 && setPageNum(pageNum - 1);
    setIsLoading(true);

    getEstablishmentRatings(pageNum).then(
      (result) => {
        setTimeout(() => {
          setIsLoading(false);
          setEstablishments(result.establishments);
        }, 1500);
      },
      (error) => {
        setError(error);
      }
    );
  }

  
  async function handleNextPage() {
    pageNum < pageCount && setPageNum(pageNum + 1);
    setIsLoading(true);
    getEstablishmentRatings(pageNum).then(
      (result) => {
        setTimeout(() => {
          setIsLoading(false);
          setEstablishments(result.establishments);
        }, 1500);
      },
      (error) => {
        setError(error);
      }
    );
  }

  async function getFiltered(id:string){
    setIsLoading(true);

    getEstablishmentRatingsFiltered(id).then(
      (result) => {
        setTimeout(() => {
          setIsLoading(false);
          setEstablishments(result.establishments);
        }, 1500);
      },
      (error) => {
        setError(error);
      }
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <div>
        <select name="localAuthority" id="localAuthority" onChange={()=>getFiltered('197')} style={selectStyle}>
          {authorities.map((item) => {
            return (
              <option key={item.LocalAuthorityID} value={item.LocalAuthorityID}>
                {item.Name}
              </option>
            );
          })}
        </select>
        <div style={tableStyle}>
          <h2>Food Hygiene Ratings</h2>
          {isLoading && <LoadingInfo />}
          <EstablishmentsTable establishments={establishments} />
          <EstablishmentsTableNavigation
            pageNum={pageNum}
            pageCount={pageCount}
            onPreviousPage={handlePreviousPage}
            onNextPage={handleNextPage}
          />
        </div>
      </div>
    );
  }
};
