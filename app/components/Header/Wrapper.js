import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  background-color: #006efb;
  align-items: center;
  height: 70px;
  padding: 10px 20px;
  position: fixed;
  width: 100%;
  z-index: 999;
  @media (max-width: 767px) and (orientation: portrait) {
    display: inline-block;
    height: auto;
  }
`;

export default Wrapper;
