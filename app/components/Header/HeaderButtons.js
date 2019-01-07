import styled from 'styled-components';

const HeaderButtons = styled.div`
  width: 100%;
  text-align: right;
  display: inline-flex;
  justify-content: flex-end;

  @media (max-width: 767px) {
    display: inline-flex;
    justify-content: center;
  }
`;

export default HeaderButtons;
