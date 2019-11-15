import React from "react";
const SocialLinksList = ({ links, isCurrentUser }) => {
  return links.length !== 0 ? (
    <ul style={{ listStyleType: "none" }}>
      {links.map(el => {
        return (
          <ul>
            <a href={el.linkTo}>{el.title}</a>
          </ul>
        );
      })}
    </ul>
  ) : isCurrentUser ? (
    <p>You have no social links...</p>
  ) : null;
};

export default SocialLinksList;
