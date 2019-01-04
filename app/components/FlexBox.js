import styled from 'styled-components';

const FlexBox = styled.div`
  display: flex;
  flex-direction: ${({ column }) => (column ? 'column' : 'row')};
  flex: ${({ flex }) => flex || 1};
  align-items: ${({ alignItems }) => alignItems || 'unset'};
  justify-content: ${({ justifyContent }) => justifyContent || 'unset'};
  @media (max-width: 1024px) {
    display: inline-block;
    width: 100%;
    margin-top: 10px;
    margin-bottom: 10px;
  }
`;

export default FlexBox;
