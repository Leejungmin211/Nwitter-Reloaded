import { Outlet } from "react-router-dom";
import { styled } from "styled-components";
import AsideNav from "./aside-nav";

const Wrapper = styled.div`
  display: flex;
  gap: 20px;
  height: 100%;
  width: 860px;
`;

export default function Layout() {
  return (
    <Wrapper>
      <AsideNav />
      <Outlet />
    </Wrapper>
  );
}
