import styled from 'styled-components';

const ItemValue = styled.div`
  color: #282b33;
  text-align: right;
  font-weight: bold;
  position: relative;
  @media (max-width: 767px) {
    text-align: left;
    width: 50px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export default ItemValue;
