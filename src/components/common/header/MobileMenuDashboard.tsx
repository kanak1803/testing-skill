"use client";

import Link from "next/link";
import MobileSidebarDashboard from "./mobile-sidebar-dashboard";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/lib/store/hook";
import { menuToggle } from "@/lib/store/feature/toggle/toggleSlice";

const MobileMenuDashboard = () => {
  const dispatch = useAppDispatch();
  const isMenuOpen = useAppSelector((state) => state.toggle.menu); // Access menu state

  const handleToggle = () => {
    dispatch(menuToggle()); // Dispatch toggle action
  };

  return (
    // <!-- Main Header-->
    <header className="main-header main-header-mobile">
      <div className="auto-container">
        {/* <!-- Main box --> */}
        <div className="inner-box">
          <div className="nav-outer">
            <div className="logo-box">
              <div className="logo">
                <Link href="/">
                  <Image
                    width={50}
                    height={30}
                    src="/images/SkillBuddy.svg"
                    alt="brand"
                  />
                </Link>
              </div>
            </div>
            {/* End .logo-box */}

            <MobileSidebarDashboard isMenuOpen={isMenuOpen} />
            {/* <!-- Main Menu End--> */}
          </div>
          {/* End .nav-outer */}

          <div className="outer-box">
            <div className="login-box">
              {/* <a
                href="#"
                className="call-modal"
              >
                <span className="icon icon-user"></span>
              </a> */}
            </div>
            {/* login popup end */}

            <a
              className="mobile-nav-toggler"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasMenu"
            >
              <button
                className="mobile-nav-toggler"
                onClick={handleToggle} // Toggle the sidebar
              >
                <span className="flaticon-menu-1"></span>
              </button>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MobileMenuDashboard;
