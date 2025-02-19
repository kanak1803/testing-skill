"use client";

import Link from "next/link";
import Image from "next/image";
import "./DashboardHeader.scss";
import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const DashboardHeader = () => {
  const [navbar, setNavbar] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 0) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
  }, []);

  return (
    // <!-- Main Header-->
    <header
      className={`main-header header-shaddow  ${navbar ? "fixed-header " : ""}`}
    >
      <div className="container-fluid">
        <div className="main-box">
          {/* Left Logo,Name,Icon */}
          <div className="nav-outer">
            <div className="logo-box">
              <div className="logo">
                <Link href="/">
                  <Image
                    alt="brand"
                    src="/images/Skillbuddy.svg"
                    width={50}
                    height={50}
                    priority
                  />
                </Link>
              </div>
              <div className="Company-Name">
                <p>
                  <b>Company Name</b>
                </p>
                <p> @KothariTech</p>
              </div>
              <div className="shared-icon">
                <Link href="/">
                  <span className="la la-external-link-alt"></span>
                </Link>
              </div>
            </div>
          </div>

          {/* Marquee Section */}
          <div className="marquee-container">
            <div className="scrolling-text">
              This is a sample scrolling text that scrolls to the left. This is
              a sample scrolling text that scrolls to the left.
            </div>
          </div>
          <div className="outer-box">
            <Dropdown>
              <Dropdown.Toggle id="dropdown-basic">
                <Image
                  alt="avatar"
                  className="thumb" // Apply circular style
                  src="/images/building-solid.svg"
                  width={50}
                  height={50}
                />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#">
                  <i className={`la la-sign-out`}></i> Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
