import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";

const Drawer = ({ navItems }) => {
  return (
    <div className="drawer drawer-end absolute z-10">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label
          htmlFor="my-drawer-4"
          className="drawer-button right-0 w-[50px] absolute top-[calc((47px/2)-(25px/2))]"
        >
          <GiHamburgerMenu style={{ width: "25px", height: "25px" }} />
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-60 min-h-full bg-base-200 text-base-content fixed">
          {/* Sidebar content here */}
          {/* <li>
            <a>Sidebar Item 1</a>
          </li>
          <li>
            <a>Sidebar Item 2</a>
          </li> */}
          {navItems()}
        </ul>
      </div>
    </div>
  );
};

export default Drawer;
