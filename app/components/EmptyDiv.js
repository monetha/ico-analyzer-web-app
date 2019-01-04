import styled from 'styled-components';

const EmptyDiv = styled.div`
  width: ${props => (props.sizeX ? props.sizeX * 10 : 10)}px;
  height: ${props => (props.sizeY ? props.sizeY * 10 : 10)}px;
  background-color: ${props => (props.color ? props.color : 'transparent')};
`;

export default EmptyDiv;
