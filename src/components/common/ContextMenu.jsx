import React, { useEffect, useRef } from "react";

const ContextMenu = ({ optios, cordinates, contextMenu, setContextMenue }) => {
  const contextMenuRef = useRef(null);

  // closing the contextMenue when each menue lists are clicked.
  const handleClick = (e, callBack) => {
    e.stopPropagation();
    callBack();
  };

  useEffect(()=> {

    // Close contextMenue when clicked on the windos, outside of the menue section area.
    const handleClickOutside = (event) => {
      if(
        contextMenuRef.current && // Ensure the ref is set
        !contextMenuRef.current.contains(event.target) // Check if the click is outside the menu
      ) {
        setContextMenue(false);
      }
    }

    document.addEventListener("click", handleClickOutside);

    // Cleanup the event listener
    return () => {
      document.removeEventListener("click", handleClickOutside);
    }
  }, [setContextMenue]);

  return (
    <div
    ref={contextMenuRef}
    style={{
      boxShadow:"0 2px 5px 0 rgba(var(11, 20, 26),.26),0 2px 10px 0 rgba(11,20, 26;),.16)",
      top: cordinates.y,
      left: cordinates.x
    }}
    className="bg-white shadow-2xl fixed py-5 z-[100] rounded-lg border border-gray-200"
    >
      <ul>
        {optios.map(({name, callBack}) => (
          <li
            className="hover:bg-gray-100 pl-5 pr-10 py-2 cursor-pointer"
            key={name}
            onClick={(e) => handleClick(e, callBack)}
          >
            <span>{name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContextMenu;
