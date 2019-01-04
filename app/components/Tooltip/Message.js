import styled from 'styled-components';

const Message = styled.div`
  position: absolute;
  bottom: 100%;
  right: ${({ leftAlign }) => (leftAlign ? '125px' : 'auto')};
  bottom: ${({ leftAlign }) => (leftAlign ? '15px' : '12px')};
  left: ${({ leftAlign }) => (leftAlign ? 'auto' : '10px')};
  color: white;
  background-color: #000000;
  padding: 10px 20px;
  display: none;
  text-transform: ${({ textTransform }) => textTransform || 'none'};
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  border-bottom-right-radius: ${({ leftAlign }) =>
    leftAlign ? '0px' : '30px'};
  border-bottom-left-radius: ${({ leftAlign }) => (leftAlign ? '30px' : '0px')};
  width: ${({ tooltipWidth }) => `${tooltipWidth} !important` || '250px'};
  @media (max-width: 767px) {
    width: auto;
  }
`;

export default Message;
