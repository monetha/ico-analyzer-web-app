import styled from 'styled-components';

const PaddedView = styled.div`
  padding: ${props => (props.padding ? props.padding : 10)}px;
  flex: 1;
  @media (max-width: 767px) {
    padding: 0;
  }
`;

export default PaddedView;
