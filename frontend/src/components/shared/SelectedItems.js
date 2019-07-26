import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import "../../css/SelectedItems.css";

function isEqual(prevProps, nextProps) {
  if (prevProps.items.length !== nextProps.items.length) return false;
  for (var i = prevProps.items.length; i--; ) {
    if (prevProps.items[i] !== nextProps.items[i]) return false;
  }
  return true;
}

const SelectedItems = React.memo(
  ({ items, handleRemoveClick = null, handleClick = null }) => {
    return (
      <div className="items-container">
        {items.length != 0
          ? items.map((element, index) => {
              return (
                <div className="item-container" key={index}>
                  {handleRemoveClick ? (
                    <FontAwesomeIcon
                      style={{ cursor: "pointer" }}
                      icon={faTimesCircle}
                      onClick={() => handleRemoveClick(index)}
                    />
                  ) : null}
                  {handleClick ? (
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => handleClick(element)}
                    >
                      {` ${element.name}`}
                    </span>
                  ) : (
                    <span>{` ${element.name}`}</span>
                  )}
                </div>
              );
            })
          : null}
      </div>
    );
  },
  isEqual
);

export default SelectedItems;
