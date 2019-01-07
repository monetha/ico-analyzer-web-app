import styled from 'styled-components';

const BorderedTable = styled.div`
  border-top: ${({ borderTop }) => borderTop || '1px solid #dfedfd'};
  border-right: ${({ borderRight }) => borderRight || '1px solid #dfedfd'};
  border-left: ${({ borderLeft }) => borderLeft || '1px solid #dfedfd'};
  height: 100%;

  @media (max-width: 1024px) {
    border-left: 0;
    border-right: 0;
  }
`;

export default BorderedTable;
