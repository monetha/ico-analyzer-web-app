import styled from 'styled-components';

const BorderedItem = styled.div`
  border-top: ${({ borderTop }) => borderTop || '1px solid #dfedfd'};
  border-right: ${({ borderRight }) => borderRight || '1px solid #dfedfd'};
  border-bottom: ${({ borderBottom }) => borderBottom || '1px solid #dfedfd'};
  border-left: ${({ borderLeft }) => borderLeft || '1px solid #dfedfd'};
  padding: ${({ padding }) => padding || '20px'};
  span {
    font-size: 18px;
  }
  @media (max-width: 1024px) {
    padding-top: 0;
  }
`;

export default BorderedItem;
