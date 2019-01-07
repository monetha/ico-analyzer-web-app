import styled from 'styled-components';

const FloatedView = styled.div`
  float: ${({ float }) => float || 'none'};
  margin-top: ${({ marginTop }) => marginTop || 'unset'};
`;

export default FloatedView;
