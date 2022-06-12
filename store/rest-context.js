import React, { useState } from "react";

const RestContext = React.createContext({
  isDarkMode: false,

  setIsDarkMode: () => {},
});

export default RestContext;

export const RestContextProvider = (props) => {
  const [darkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = (mode) => {
    localStorage.setItem("darkMode", mode);
    setIsDarkMode(mode);
  };

  return (
    <RestContext.Provider
      value={{
        isDarkMode: darkMode,

        setIsDarkMode: toggleDarkMode,
      }}
    >
      {props.children}
    </RestContext.Provider>
  );
};
