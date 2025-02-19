"use client";

import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import mobileMenuHomeData from "../../../data/mobileMenuHomeData";
// import SidebarFooter from "./SidebarFooter";
import SidebarHeader from "./SidebarHeader";
import { isActiveLink } from "../../../utils/linkActiveChecker";
import { usePathname, useRouter } from "next/navigation";

const Index = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div
      className="offcanvas offcanvas-start mobile_menu-contnet"
      tabIndex={-1}
      id="offcanvasMenu"
      data-bs-scroll="true"
    >
      <SidebarHeader />
      <Sidebar>
        <Menu>
          {mobileMenuHomeData.map((item) =>
            item.items.map((menuItem) => (
              <MenuItem
                onClick={() => router.push(menuItem.routePath)}
                className={
                  isActiveLink(menuItem.routePath,pathname)
                    ? "menu-active-link"
                    : ""
                }
                key={menuItem.routePath}
              >
                {menuItem.name}
              </MenuItem>
            ))
          )}
        </Menu>
      </Sidebar>
    </div>
  );
};

export default Index;
