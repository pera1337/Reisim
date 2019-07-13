import React, { createContext, useState } from "react";

export const UserContext = createContext();

export function UserProvider(props) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || ""
  );
  const changeUser = value => setUser(value);

  return (
    <UserContext.Provider value={{ user, changeUser }}>
      {props.children}
    </UserContext.Provider>
  );
}
