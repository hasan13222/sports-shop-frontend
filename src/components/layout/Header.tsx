import { Layout } from "antd";
import MenuSection from "./Menu";
import '../../styles/header.css'

const { Header } = Layout;

const HeaderSection = () => {
  return (
    <>
      <Header
        style={{
          display: "flex",
          color: "#5EB06C",
          alignItems: "center",
          backgroundColor: "#F5F9F6",
          position: "sticky",
          top: 0,
          zIndex:1
        }}
      >
        <MenuSection />
      </Header>
      <Header
        style={{
          display: "flex",
          color: "#ffffff",
          alignItems: "center",
          backgroundColor: "#5EB06C",
          boxShadow: "0 2px 3px 1px #e2e3e2",
        }}
      >
        <div className="categories">
          <div className="item hover:bg-white hover:text-primary cursor-pointer">
            <button>Category 1</button>
          </div>
          <div className="item hover:bg-white hover:text-primary cursor-pointer">
            <button>Category 1</button>
          </div>
          <div className="item hover:bg-white hover:text-primary cursor-pointer">
            <button>Category 1</button>
          </div>
          <div className="item hover:bg-white hover:text-primary cursor-pointer">
            <button>Category 1</button>
          </div>
        </div>
      </Header>
    </>
  );
};

export default HeaderSection;
