import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "./actions/userActions";

const DataComponent = () => {
  const dispatch = useDispatch();

  const { loading, data, error, token } = useSelector((state) => state.user);

  //   useEffect(() => {
  //     dispatch(fetchData("gabrieleinsfeld@gmail.com", "123"));
  //   }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Data</h1>
      {console.log(token)}
      {data && <div>{data.username}</div>}
      {data && <div>{token}</div>}
    </div>
  );
};

export default DataComponent;
