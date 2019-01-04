import styled from 'styled-components';

const InfoWrapper = styled.span`
  position: relative;
  top: -2px;
  left: 5px;

  &:hover {
    div {
      display: block;
      width: 250px;
      @media (max-width: 767px) {
        width: auto;
      }
    }
  }
`;

export default InfoWrapper;
