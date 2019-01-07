import styled from 'styled-components';

const ItemLabel = styled.div`
  color: #888888;
  display: flex;

  @media (max-width: 767px) {
    justify-content: space-between;
  }
`;

export default ItemLabel;
