import styled from 'styled-components';

const PageWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  padding-top: 20px;
  padding-bottom: 40px;
  table {
    width: 100%;
    td {
      padding: 10px 25px;
    }
  }
  @media (max-width: 1024px) {
    width: 100%;
    padding-left: 15px;
    padding-right: 15px;
  }
`;

export default PageWrapper;
