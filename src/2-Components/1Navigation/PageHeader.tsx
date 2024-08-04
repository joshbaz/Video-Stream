  import React from "react";
import logo from "../../1-Assets/logo/logo.svg";
import { ArrowLeft, Bell, Menu, Mic, Search, Upload, User } from "lucide-react";
import Button from "../2Button/Button.tsx";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import { useSidebarContext } from "../../5-State/contexts/SidebarContext.tsx";

const PageHeader = () => {
  const [showFullWidthSearch, setShowFullWidthSearch] = React.useState(false);
 // const {toggle} = useSidebarContext()

  const handleSearchClick = () => {
    setShowFullWidthSearch(true);
  };
  return (
    <div className="flex gap-10 lg:gap-20 justify-between pt-2 mb-6 mx-4">
      {/** header */}
      <PageHeaderFirstSection hidden={showFullWidthSearch} />
      {/** search bar */}
      <form
        className={` gap-4 flex-grow justify-center ${
          showFullWidthSearch ? "flex" : "hidden md:flex"
        } `}
      >
        {showFullWidthSearch && (
          <Button
            onClick={() => setShowFullWidthSearch(false)}
            type="button"
            size="icon"
            variant="ghost"
            className="flex-shrink-0"
          >
            <ArrowLeft />
          </Button>
        )}
        <div className="flex flex-grow max-w-[600px]">
          <input
            type="search"
            placeholder="Search"
            className="rounded-l-full border border-secondary-border shadow-inner shadow-secondary py-1 px-4 text-lg w-full focus:border-blue-500 outline-none"
          />
          <Button className="py-2 px-4 rounded-r-full  border-secondary-border border border-l-0">
            <Search />
          </Button>
        </div>
        <Button type="button" size="icon" className="flex-shrink-0">
          <Mic />
        </Button>
      </form>
      {/**  */}
      <div
        className={`flex-shrink-0 md:gap-2 ${
          showFullWidthSearch ? "hidden" : "flex"
        }`}
      >
        <Button
          onClick={handleSearchClick}
          size="icon"
          variant="ghost"
          className="md:hidden"
        >
          <Search />
        </Button>
        <Button size="icon" variant="ghost" className="md:hidden">
          <Mic />
        </Button>
        <Button size="icon" variant="ghost">
          <VideoCallOutlinedIcon />
        </Button>
        <Button size="icon" variant="ghost">
          <Bell />
        </Button>
        <Button size="icon" variant="ghost">
          <User />
        </Button>
      </div>
    </div>
  );
};

export default PageHeader;

type PageHeaderFirstSectionProps = {
  hidden?: boolean,
}
export function PageHeaderFirstSection({ hidden = false }: PageHeaderFirstSectionProps) {
  const { toggle } = useSidebarContext();
  
  return (
    <div
      className={`gap-4 items-center flex-shrink-0 ${
        hidden ? "hidden" : "flex"
      }`}
    >
      <Button onClick={toggle} variant={"ghost"} size="icon">
        <Menu />
      </Button>
      <a
        href="/"
        className="flex gap-2 items-center justify-center font-bold h-6 text-pink-700 text-xl"
      >
        <img src={logo} alt="" className="h-8" />
        <h1>Nyati</h1>
      </a>
    </div>
  );
}
