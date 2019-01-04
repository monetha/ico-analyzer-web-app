import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CopyIcon from '../../images/copy-icon.png';
import RightIcon from '../../images/right-icon.png';
import Image from '../../components/Image';

const Wrapper = styled.span`
  margin-left: 10px;
  cursor: pointer;
`;

const CopiedMessage = styled.div`
  color: #0072ff;
  position: absolute;
  font-size: 12px;
  right: 0;
  font-weight: normal;
  img {
    margin-right: 4px;
  }
`;

const CopyLogoWrapper = ({ onCopy, showCopied }) => (
  <Wrapper onClick={onCopy}>
    <Image width="15" src={CopyIcon} alt="copy" />
    {showCopied && (
      <CopiedMessage>
        <Image width="15" src={RightIcon} alt="copy" />
        Copied to clipboard
      </CopiedMessage>
    )}
  </Wrapper>
);

CopyLogoWrapper.propTypes = {
  onCopy: PropTypes.func,
  showCopied: PropTypes.bool,
};

export default CopyLogoWrapper;
