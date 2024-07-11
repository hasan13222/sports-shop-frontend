import {  Layout, } from "antd";
import HeaderSection from "./Header";
import { Outlet } from "react-router-dom";
import FooterSection from "./Footer";

const {  Content, Footer } = Layout;


const MainLayout = () => {

  return (
    <>
      <Layout className="font-inter bg-bgColor">
        <HeaderSection/>
        <Content style={{ padding: "0" }}>
          <Outlet/>
          {/* <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              background: "#F5F9F6",
              minHeight: 280,
              padding: 24,
              borderRadius: borderRadiusLG,
            }}
          >
            Content
          </div> */}
        </Content>
        <Footer >
          <FooterSection/>
        </Footer>
      </Layout>
    </>
  );
};

export default MainLayout;
