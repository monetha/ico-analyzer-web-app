import styled from 'styled-components';

const Message = styled.div`
  color: #5b7594;
  font-size: 16px;
  font-weight: ${props => (props.fontWeight ? props.fontWeight : 'normal')};
  padding-left: 20px;
  padding-right: 20px;
`;

export default Message;
