import styled from 'styled-components';

const TermsWrapper = styled.div`
  width: 100%:
  display: inline-block;
  padding-bottom: 10px;
  p {
  	margin: 0;
  	padding-bottom: 10px;
  	font-size: 16px;
    font-weight: bold;
  }
  button {
  	float: right;
  	position: relative;
  	top: -15px;
  	font-weight: bold;
  }
  input {
  	margin-right: 10px;
  	position: relative;
  	top: 1px;
  }
  span {
  	color: #777;
  }
  #t-and-s-link {
  	color: #0072ff;
    text-decoration: none;
    cursor: pointer;
  }
`;

export default TermsWrapper;
