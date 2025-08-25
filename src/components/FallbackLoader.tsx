import React from "react";
import { GridLoader } from "react-spinners";

const FallbackLoader: React.FC = () => {
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <GridLoader color="#0B3954" />
    </div>
  );
};

export default FallbackLoader;
