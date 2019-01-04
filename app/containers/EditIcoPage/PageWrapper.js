import styled from 'styled-components';

const PageWrapper = styled.div`
  padding: 0 25%;
  h3 {
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  @media (max-width: 767px) {
    padding-left: 15px;
    padding-right: 15px;
  }
`;

export default PageWrapper;
