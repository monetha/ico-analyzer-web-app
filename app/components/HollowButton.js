import styled from 'styled-components';

const HollowButton = styled.button`
  color: #0072ff;
  padding: 10px 10px;
  border-bottom-right-radius: 20px;
  border-top-left-radius: 20px;
  background-color: #fff;
  font-size: 14px;
  width: ${({ width }) => width || '100px'};
  box-shadow: 0 5px 15px 0 rgba(0, 114, 255, 0.33);
  height: 40px;
  cursor: pointer;
  border: 1px solid #0072ff;
  &:hover {
    background: linear-gradient(to bottom, #0071fe, #094da0);
    color: #fff;
  }
`;

export default HollowButton;
