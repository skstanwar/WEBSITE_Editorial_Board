import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const IconLink = ({ icon, href, size, ...props }) => {
  return (
    <a href={href} target="_blank" rel="noopener">
      <FontAwesomeIcon size={size} icon={icon} {...props} />
    </a>
  );
};

export default IconLink;
