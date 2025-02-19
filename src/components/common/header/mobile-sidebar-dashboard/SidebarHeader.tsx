import Image from "next/image";
import Link from "next/link";

const SidebarHeader = () => {
  return (
    <div className="pro-header">
      <Link href="/">
        <Image
          width={50}
          height={30}
          src="/images/SkillBuddy.svg"
          alt="brand"
        />
      </Link>
      {/* End logo */}

      <div className="fix-icon" data-bs-dismiss="offcanvas" aria-label="Close">
        <div>hello</div>
        <span className="flaticon-close"></span>
      </div>
      {/* icon close */}
    </div>
  );
};

export default SidebarHeader;
