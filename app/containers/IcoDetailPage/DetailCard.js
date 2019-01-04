import styled from 'styled-components';

const DetailCard = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding-bottom: 10px;
  h3 {
    font-size: 22px;
    margin: 0;
    padding: 12px 20px;
    border-bottom: 1px solid #dfedfd;
  }
  @media (max-width: 1024px) {
    margin-bottom: 15px;
  }
`;

export default DetailCard;
