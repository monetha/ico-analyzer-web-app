import styled from 'styled-components';

const FloatedView = styled.div`
  float: ${({ float }) => float || 'none'};
`;

export default FloatedView;
