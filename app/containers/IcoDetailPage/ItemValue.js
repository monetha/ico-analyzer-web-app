import styled from 'styled-components';

const ItemValue = styled.div`
  color: #282b33;
  text-align: right;
  font-weight: bold;
  position: relative;
  word-wrap: break-word;
  word-break: break-word;
  white-space: nowrap;

  @media (max-width: 767px) {
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
  }
`;

export default ItemValue;
