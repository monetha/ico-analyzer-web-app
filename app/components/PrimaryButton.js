import styled from 'styled-components';

const PrimaryButton = styled.button`
  background: ${props =>
    props.disabled
      ? '#909090'
      : 'linear-gradient(to bottom, #0071fe, #094da0)'};
  color: #ffffff;
  padding: 10px 0px;
  border-bottom-right-radius: 20px;
  border-top-left-radius: 20px;
  font-size: 14px;
  width: ${({ width }) => width || '142px'};
  height: 40px;
  box-shadow: 0 5px 15px 0 rgba(0, 114, 255, 0.33);

  cursor: ${props => (props.disabled ? 'default' : 'pointer')};
`;

export default PrimaryButton;
