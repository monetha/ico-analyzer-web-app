import styled from 'styled-components';

const NavButton = styled.button`
  background: #fff;
  color: #0072ff;
  padding: 10px 0px;
  border-bottom-right-radius: 20px;
  border-top-left-radius: 20px;
  font-size: 14px;
  font-weight: bold;
  width: 142px;
  height: 40px;
  box-shadow: 0 5px 15px 0 rgba(0, 114, 255, 0.33);

  cursor: ${props => (props.disabled ? 'default' : 'pointer')};
  &:hover {
    background-image: linear-gradient(to bottom, #00e9ab, #00ce72);
    color: #fff;
  }
`;

export default NavButton;
