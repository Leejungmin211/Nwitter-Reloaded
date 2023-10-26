import { NavLink, useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { AiFillHome } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';
import { TbSquareArrowLeftFilled } from 'react-icons/tb';
import { auth } from '../firebase';

const commonStyles = css`
  color: var(--color-gray8);
  transition: color 0.3s ease-in-out;
  font-weight: 500;
  &:hover {
    color: var(--color-darkgray);
    transition: color 0.3s ease-in-out;
  }
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  gap: 35px;
  padding: 50px 0px;
`;

const MenuLink = styled(NavLink)`
  ${commonStyles}
  &.active {
    color: var(--color-darkgray);
    font-weight: 700;
  }
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 21px;
  cursor: pointer;
  &.logout {
    ${commonStyles}
  }
`;

const Icon = styled.svg`
  height: 35px;
  width: 35px;
`;

export default function AsideNav() {
  const navigate = useNavigate();
  const logOut = async () => {
    const ok = confirm('Are you sure you want to log out?');
    if (ok) {
      await auth.signOut();
      navigate('/login');
    }
  };

  return (
    <MenuContainer>
      <MenuLink to="/">
        <Menu>
          <Icon as={AiFillHome} />
          <span>Home</span>
        </Menu>
      </MenuLink>
      <MenuLink to="/profile">
        <Menu>
          <Icon as={FaUserCircle} />
          <span>Profile</span>
        </Menu>
      </MenuLink>
      <Menu onClick={logOut} className="logout">
        <Icon as={TbSquareArrowLeftFilled} />
        <span>Logout</span>
      </Menu>
    </MenuContainer>
  );
}
