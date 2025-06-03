import { Link } from "react-router-dom";

import ThemeSwitch from "./themeSwitch";

const Header = () => {
  return (
    <div className="h-16 bg-paper border-b border-border">
      <div className="w-full h-full flex justify-between items-center px-8">
        <div className="flex items-center">
          <Link to="/home">
            <p className="text-2xl font-bold text-primary mt-1">Crypto App</p>
          </Link>
        </div>
        <div className="flex items-center">
          <ThemeSwitch />
        </div>
      </div>
    </div>
  );
};

export default Header;
