"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { menuToggle } from "@/lib/store/feature/toggle/toggleSlice";
import { usePathname } from "next/navigation";
import "./DashboardEmployerSidebar.scss";

// Define the types for the Redux state and dispatch
interface ToggleState {
  toggle: {
    menu: boolean;
  };
}

const DashboardEmployerSidebar: React.FC = () => {
  const { menu } = useSelector((state: ToggleState) => state.toggle);
  const dispatch = useDispatch();
  const pathname = usePathname(); // Get the current path for active link checking

  // State for managing dropdown toggle
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  console.log(isDropdownOpen, "isDropdownOpen");

  // Automatically open the dropdown if the user is on `/settings/profile` or `/settings/company`
  useEffect(() => {
    const isSettingsPath =
      pathname === "/settings/profile" || pathname === "/settings/company";
    setIsDropdownOpen(isSettingsPath);
  }, [pathname]);

  // State to manage open dropdown indices
  // State to manage open dropdown indices
  const [dropdownState, setDropdownState] = useState<{
    [key: string]: boolean;
  }>({
    dropdown1: false,
  });

  // Function to toggle specific dropdown
  const toggleDropdown = (dropdownKey: string) => {
    setDropdownState((prevState) => ({
      ...prevState,
      [dropdownKey]: !prevState[dropdownKey],
    }));
  };

  const menuToggleHandler = () => {
    dispatch(menuToggle());
  };

  const isActiveLink = (routePath: string): boolean => pathname === routePath;

  return (
    <div className={`user-sidebar ${menu ? "sidebar_open" : ""}`}>
      {/* Sidebar close icon */}
      <div className="pro-header text-end pb-0 mb-0 show-1023">
        <div className="sidebar-header">
          <div>
            <Link href="/">
              <Image
                width={50}
                height={30}
                src="/images/SkillBuddy.svg"
                alt="brand"
              />
            </Link>
          </div>
          <div className="fix-icon" onClick={menuToggleHandler}>
            <span className="flaticon-close"></span>
          </div>
        </div>
      </div>

      {/* Sidebar links */}
      <div className="sidebar-inner">
        <ul className="navigation">
          <li
            className={`postjob-button ${
              isActiveLink("/post-jobs") ? "active" : ""
            }`}
            onClick={menuToggleHandler}
          >
            <Link href="/post-jobs" className="no-underline-link">
              <button className="custom-btn btn-3 post-jobs-btn-icon">
                <span>
                  <i className="la la-user-tie"></i> Post Jobs
                </span>
              </button>
            </Link>
          </li>
          <li
            className={isActiveLink("/dashboard") ? "active" : ""}
            onClick={menuToggleHandler}
          >
            <Link href="/dashboard" className="no-underline-link">
              <i className="la la-home"></i> Dashboard
            </Link>
          </li>
          <li
            className={isActiveLink("/manage-jobs") ? "active" : ""}
            onClick={menuToggleHandler}
          >
            <Link href="/manage-jobs" className="no-underline-link">
              <i className="la la-briefcase"></i> Manage Jobs
            </Link>
          </li>
          <li
            className={isActiveLink("/talent-jobs") ? "active" : ""}
            onClick={menuToggleHandler}
          >
            <Link href="/talent-jobs" className="no-underline-link">
              <i className="la la-user-friends"></i> Talent Pool
            </Link>
          </li>
          {/* <li
            className={isActiveLink("/settings/profile") ? "active" : ""}
            onClick={menuToggleHandler}
          >
            <Link href="/settings/profile" className="no-underline-link">
              <i className="la la-user"></i> Profile
            </Link>
            </li>
          <li
            className={isActiveLink("/settings/company") ? "active" : ""}
            onClick={menuToggleHandler}
          >
            <Link href="/settings/company" className="no-underline-link">
              <i className="la la-cog"></i> Settings
            </Link>
          </li> */}
          {/* Dropdown 1 */}

          <div
            className={`${
              isActiveLink("/settings") ? "active" : ""
            } mb-1 cursor-pointer hover:bg-blue-200 p-1 rounded`}
            onClick={() => toggleDropdown("dropdown1")}
          >
            <li className="text-lg font-semibold">
              <a>
                <i className="la la-cog"></i>Settings
                <i
                  className={`la ${
                    dropdownState.dropdown1 ? "la-angle-down" : "la-angle-right"
                  } transition-transform duration-200`}
                ></i>
              </a>
            </li>
          </div>
          {dropdownState.dropdown1 && (
            <div className="mt-2 space-y-2">
              <li className=" hover:bg-blue-200 rounded cursor-pointer text-lg font-semibold linksettings">
                <Link href="/settings/profile">
                  <i className="la la-user"></i>Profile
                </Link>
              </li>
              <li className=" hover:bg-blue-200 rounded cursor-pointer text-lg font-semibold linksettings">
                <Link href="/settings/company">
                  <i className="la la-wrench"></i>Company
                </Link>
              </li>
            </div>
          )}
        </ul>
      </div>

      {/* Chat support link */}
      <div className="chat-support">
        <ul className="navigation">
          <li>
            <Link href="#">
              <i className="la la-wechat"></i> Chat Support
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardEmployerSidebar;
