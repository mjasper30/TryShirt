import React from "react";

const CardsComponent = ({ bgColor, icon, title, value }) => {
  return (
    <div className={`max-w-sm ${bgColor}`}>
      <h5 className="p-10 rounded-md text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        <span className="material-symbols-rounded text-[#2B2D31] p-2">
          {icon}
        </span>
        {title}
      </h5>
      <p className="text-center font-normal text-xl text-gray-700 dark:text-gray-400">
        {value}
      </p>
    </div>
  );
};

export default CardsComponent;
