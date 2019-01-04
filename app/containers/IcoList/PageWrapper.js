import styled from 'styled-components';

const PageWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  min-height: 65vh;
  h3 {
    color: #000;
    font-size: 32px;
    font-weight: bold;
  }
  @media (max-width: 767px) {
    width: 100%;
    padding-left: 15px;
    padding-right: 15px;
  }
`;

export default PageWrapper;
