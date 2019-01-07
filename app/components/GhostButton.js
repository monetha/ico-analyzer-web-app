import styled from 'styled-components';

// prettier-ignore
const NavButton = styled.button`
  background: ${props =>
    props.emphasized ? 'linear-gradient(to bottom, #00e9ab, #00ce72)' : '#fff'};
  color: ${props => (props.emphasized ? '#fff' : '#0072ff')};
  padding: 10px 0px;
  border-bottom-right-radius: 20px;
  border-top-left-radius: 20px;
  font-size: 14px;
  font-weight: bold;
  width: ${({ width }) => width || '142px'};
  height: 40px;
  box-shadow: 0 5px 15px 0 rgba(0, 114, 255, 0.33);

  cursor: ${props => (props.disabled ? 'default' : 'pointer')};
  &:hover {
    font-weight: bold;
    background: ${props => props.emphasized ? '#fff' : 'linear-gradient(to bottom, #00e9ab, #00ce72)'};
    color: ${props => (props.emphasized ? '#0072ff' : '#fff')};
  }

  @media (max-width: 767px) and (orientation: landscape) {
    font-size: 12px;
    width: auto;
    padding: 5px 0;
  }
`;

export default NavButton;
