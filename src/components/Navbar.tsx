import React from "react";
import type { ReactNode } from "react";
import { TypeAnimation } from "react-type-animation";

const Navbar = ({ children }: { children: ReactNode | undefined }) => {
  return (
    <div className="nav">
      <div className="logo-banner rounded-bottom">
        <TypeAnimation
          className=" mt-[70px] text-center text-[6rem] text-black2"
          sequence={["SecPad"]}
          speed={1}
          wrapper="h1"
          cursor={false}
        />
        <div className="mt-[30px] mb-[20px] flex justify-center">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
