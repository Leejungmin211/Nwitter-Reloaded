import { Outlet } from "react-router-dom";
import { styled } from "styled-components";
import AsideNav from "./aside-nav";

const Wrapper = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  height: 100%;
  max-width: 860px;
`;

export default function Layout() {
  return (
    <Wrapper>
      <AsideNav />
      <Outlet />
    </Wrapper>
  );
}
