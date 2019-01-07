import styled from 'styled-components';

const IcolistHeader = styled.div`
  background-image: linear-gradient(181deg,#0071fe,#094da0);
  background-attachment: fixed;
  color: #fff;
  text-align: center;
  padding: 25px 0;
  position: relative;
  white-space: pre-line;
  & > div {
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
  	position: relative;
  	bottom: -25px;
    width: 100%;
  }
}
`;

export default IcolistHeader;
