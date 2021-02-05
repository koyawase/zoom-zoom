import spinner from "../../images/loading-spinner.gif";

import "./LoadingSpinner.css";

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      <img src={spinner} alt="loading"></img>
      <h1>Loading</h1>
    </div>
  );
};

export default LoadingSpinner;
