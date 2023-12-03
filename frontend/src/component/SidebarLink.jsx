import React, { useState } from "react";
import { Link } from "react-router-dom";

const Tooltip = ({ content, children }) => {
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  const showTooltip = () => {
    setTooltipVisible(true);
  };

  const hideTooltip = () => {
    setTooltipVisible(false);
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      {children}
      {isTooltipVisible && (
        <div className="tooltip right-0 text-white p-2 absolute z-10">
          {content}
        </div>
      )}
    </div>
  );
};

const SidebarLink = ({ to, tooltipContent, text, isActive, onClick }) => {
  return (
    <Link
      className={`icon my-4 text-2xl bg-[#FFFFFF] rounded-[15px] mr-1 drop-shadow-md hover:drop-shadow-xl cursor-pointer ml-2 ${
        isActive ? "active" : ""
      }`}
      to={to}
      onClick={onClick}
    >
      <Tooltip content={tooltipContent}>
        <i>
          <span className="material-symbols-rounded text-[#2B2D31] p-2">
            {text}
          </span>
        </i>
      </Tooltip>
      {isActive && (
        <div className="vertical-rectangle absolute top-0 left-[-14px] w-2 h-10 bg-white rounded-lg"></div>
      )}
    </Link>
  );
};

export default SidebarLink;
