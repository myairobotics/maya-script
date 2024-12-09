import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Link
        to="/example"
        className="text-slate-700 font-sans text-sm underline text-center"
      >
        Empty Page that only contains the script for testing
      </Link>
    </div>
  );
};

export default HomePage;
