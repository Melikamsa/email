import { useState } from "react";
import { HiMenu } from "react-icons/hi";

const SideBar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className={showMenu ? "bg-[#E8EFCF] p-2" : "p-2"}>
      <div
        onClick={handleMenuClick}
        className="bg-[#C6EBC5] text-xl w-9 p-2 rounded-md cursor-pointer"
      >
        <HiMenu />
      </div>
      {showMenu && (
        <div className="bg-[#E8EFCF] w-[190px] xl:w-[250px] rounded-md">
          <ul className="capitalize">
            <li className="py-3">
              <a className="hover:bg-[#c6ebc5] py-2 rounded-md" href="#">
                home
              </a>
            </li>
            <li className="py-3">
              <a className="hover:bg-[#c6ebc5] py-2 rounded-md" href="#">
                manage e-mail addresses
              </a>
            </li>
            <li className="py-3">
              <a className="hover:bg-[#c6ebc5] py-2 rounded-md" href="#">
                settings
              </a>
            </li>
            <li className="py-3">
              <a className="hover:bg-[#c6ebc5] py-2 rounded-md" href="#">
                logout
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SideBar;
