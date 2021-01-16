import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import "../css/GuideList.css";

import axios from "../utils/axiosProxy";
import { List, ListItem } from "@material-ui/core";
import GuideShort from "./shared/GuideShort";
import GuidesList from "./shared/GuidesList";
const SignedUp = ({ history }) => {
  const { user, changeUser } = useContext(UserContext);
  const [data, setData] = useState([]);
  useEffect(() => {
    const headers = {
      "X-Auth-Token": localStorage.getItem("token"),
    };
    async function getData() {
      const response = await axios.get("/api/guide/going", { headers });
      console.log("SIGNED UP RESPONSE < ", response);
      setData(response.data);
    }
    getData();
  }, []);

  const handleLinkClick = (element) => {
    history.push(`/guide/${element.id}`);
  };

  return (
    <div className="guides">
      <List style={{ margin: "10px 30px" }} component="nav">
        {data.map((element, index) => {
          return (
            <ListItem
              key={index}
              onClick={() => handleLinkClick(element)}
              divider
              button
            >
              <div style={{ width: "100%" }}>
                <h3>
                  {new Date(element.nextTour)
                    .toUTCString()
                    .toString()
                    .slice(0, -7)}
                </h3>
                <hr />
                <GuideShort
                  //key={element.id}
                  guide={element}
                  username={element.username ? element.username : ""}
                  displayAuthor
                />
              </div>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default SignedUp;
