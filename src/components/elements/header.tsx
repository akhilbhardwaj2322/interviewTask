import React from "react";
import Logo from "../../assets/nxvet.svg?react";
import "../../assets/nxvet.svg";
import "../../assets/nxvet.png";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  return (
    <>
      <div className="flex w-full justify-between items-center px-10 py-5">
        <div>
          <Logo width="100%" height="50px" viewBox="0 0 1138 477" />
        </div>
        <div>
          {location.pathname === "/login" && (
            <p>
              Don't have account yet? <Link to="/signup">Sign Up</Link>
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
