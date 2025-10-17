


import React, { useContext } from "react";
import { AppContext } from "../Context/Contexts";
import { NavLink } from "react-router-dom";
import Card from "./Card";

const CardsBox = () => {
  const { bData } = useContext(AppContext);

  return (
    <div className="w-full min-h-[60vh] flex flex-wrap gap-6 mt-14 items-center justify-center px-4">
      {bData.length > 0 ? (
        bData.map((obj) => (
          <NavLink
            key={obj._id}
            to={`/home/${obj._id}`}
            className="hover:scale-[1.02] transition-transform duration-300"
          >
            <Card data={obj} />
          </NavLink>
        ))
      ) : (
        <div className="text-center text-gray-500 text-lg font-medium mt-10">
          No blogs found. Try searching something else ✍️
        </div>
      )}
    </div>
  );
};

export default CardsBox;
