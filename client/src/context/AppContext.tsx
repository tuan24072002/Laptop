import { createContext, ReactNode, useContext, useState } from "react";
interface AppContextType {
  search: string;
  setSearch: (value: string) => void;
}
const AppContext = createContext<AppContextType | null>(null);
export const AppContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [search, setSearch] = useState("");
  return (
    <AppContext.Provider
      value={{
        search,
        setSearch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within a AppContextProvider");
  }
  return context;
};
