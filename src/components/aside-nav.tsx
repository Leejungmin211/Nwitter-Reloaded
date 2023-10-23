import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AiFillHome } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { TbSquareArrowLeftFilled } from "react-icons/tb";
import { auth } from "../firebase";

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  gap: 50px;
  padding: 50px 0px;
`;

const Menu = styled.div`
  color: white;
  cursor: pointer;
  height: 35px;
  width: 35px;
  svg {
    width: 100%;
    height: 100%;
  }
`;

export default function AsideNav() {
  const navigate = useNavigate();
  const logOut = async () => {
    const ok = confirm("Are you sure you want to log out?");
    if (ok) {
      await auth.signOut();
      navigate("/login");
    }
  };

  return (
    <MenuContainer>
      <Link to="/">
        <Menu>
          <AiFillHome />
        </Menu>
      </Link>
      <Link to="/profile">
        <Menu>
          <FaUserCircle />
        </Menu>
      </Link>
      <Menu onClick={logOut}>
        <TbSquareArrowLeftFilled />
      </Menu>
    </MenuContainer>
  );
}
