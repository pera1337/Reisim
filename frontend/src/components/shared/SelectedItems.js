import React from "react";
import Chip from "@material-ui/core/Chip";
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
        {items.length > 0 &&
          items.map((element, index) => {
            return (
              <Chip
                style={{ margin: "3px 2px" }}
                color="primary"
                label={`${element.name}`}
                clickable={handleClick}
                onClick={() => handleClick(element)}
                onDelete={() => handleRemoveClick(index)}
              />
            );
          })}
      </div>
    );
  },
  isEqual
);

export default SelectedItems;
