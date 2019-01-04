import styled from 'styled-components';

const BannerFooter = styled.span`
  background: rgba(0, 41, 91, 0.3);
  font-size: 16px;
  width: 100%;
  display: inline-block;
  padding: 10px 0;
  @media (max-width: 767px) {
    padding: 10px 15px;
  }
`;

export default BannerFooter;
