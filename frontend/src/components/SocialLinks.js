import React, { useState } from "react";
import SocialLinksList from "./SocialLinksList";
import EditSocialLinks from "./EditSocialLinks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
const SocialLinks = ({ links, isCurrentUser }) => {
  const [isEditingSocialLinks, setIsEditingSocialLinks] = useState(false);
  const [socialLinks, setSocialLinks] = useState([]);
  return isEditingSocialLinks ? (
    <EditSocialLinks />
  ) : (
    <>
      <FontAwesomeIcon icon={faEdit} />
      <SocialLinksList isCurrentUser={isCurrentUser} links={links} />
    </>
  );
};

export default SocialLinks;
