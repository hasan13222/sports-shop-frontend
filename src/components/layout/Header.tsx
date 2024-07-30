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
      
    </>
  );
};

export default HeaderSection;
