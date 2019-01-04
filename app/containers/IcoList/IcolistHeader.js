import styled from 'styled-components';

const IcolistHeader = styled.div`
  background-image: linear-gradient(181deg,#0071fe,#094da0);
  background-attachment: fixed;
  color: #fff;
  text-align: center;
  padding: 25px 0;
  position: relative;
  div {
  	width: 85%;
  	margin: 0 auto;
  	margin-top: 0px;
    @media (max-width: 767px) {
      width: 100%;
      padding-left: 15px;
      padding-right: 15px;
    }
  }	
  p {
  	margin: 0;
  	position: absolute;
  	bottom: 0;
  	width: 100%;
  }
  #rotateDiv {
  	width: 532px;
  	height: 452px;
  	transform: rotate(-79deg);
  	opacity: 0.06;
  	border-radius: 268.4px;
  	background-image: linear-gradient(102deg, #ffffff, rgba(255, 255, 255, 0.25));
  	position: absolute;
  	top: 190px;
  	left: 190px;
    @media (max-width: 767px) {
      display: none;
    }
  }
}
`;

export default IcolistHeader;
