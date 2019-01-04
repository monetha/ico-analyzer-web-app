import styled from 'styled-components';

const Input = styled.input`
  color: #282b33;
  background-color: ${props => (props.disabled ? '#f3f3f3' : '#ffffff')};
  padding: 10px;
  border-bottom-color: #ababab;
  border-bottom-width: ${props => (props.disabled ? '0' : '1px')};
  border-bottom-style: solid;
  border-radius: ${props => (props.disabled ? '6px' : '0')};
  width: 100%;
  margin-top: 5px;
  height: 44px;
  &::-webkit-input-placeholder {
    color: #000000;
  }
  &:focus {
    border-bottom: 1px solid #0072ff;
    box-shadow: none;
    outline: none;
  }
`;

export default Input;
