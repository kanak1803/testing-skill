import { FC } from "react";
import SidebarHeader from "@/components/header/mobilehome-sidebar/SidebarHeader";
// Define the prop types for MobileSidebarDashboard
interface MobileSidebarDashboardProps {
  isMenuOpen: boolean;
}

const MobileSidebarDashboard: FC<MobileSidebarDashboardProps> = ({
  isMenuOpen,
}) => {
  return (
    <div
      className={`offcanvas offcanvas-start mobile_menu-contnet ${
        isMenuOpen ? "open" : ""
      }`}
      tabIndex={-1}
      id="offcanvasMenu"
      data-bs-scroll="true"
    >
      {/* Sidebar content goes here */}
      <SidebarHeader />
      {/* End pro-header */}
    </div>
  );
};

export default MobileSidebarDashboard;
