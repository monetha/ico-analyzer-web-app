import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Previous from '../../images/previous-icon.png';
import Next from '../../images/next-icon.png';
import Image from '../Image';

const Text = styled.p`
  color: ${props => (props.isDisabled ? '#282b33' : '#0072ff')};
  font-size: 16px;
  margin-left: 10px;
  margin-right: 10px;
  cursor: pointer;
`;

export const PrevPaginationItem = ({ onClick, disabled }) => {
  if (disabled) {
    return null;
  }

  return (
    <Text onClick={onClick}>
      <Image width="15" src={Previous} alt="previous" /> Previous
    </Text>
  );
};

export const NextPaginationItem = ({ disabled, onClick }) => {
  if (disabled) {
    return null;
  }

  return (
    <Text onClick={onClick}>
      Next <Image width="15" src={Next} alt="next" />
    </Text>
  );
};

const PaginationItemProptypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

NextPaginationItem.propTypes = PaginationItemProptypes;
PrevPaginationItem.propTypes = PaginationItemProptypes;
