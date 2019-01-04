import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Previous from '../../images/previous-icon.png';
import Next from '../../images/next-icon.png';
import Image from '../Image';

const getBackgroundColor = ({ isSelected, isDisabled }) => {
  if (isSelected) return '#0072ff';
  if (isDisabled) return '#d8d5de';

  return 'transparent';
};

const getFontColor = ({ isSelected }) => {
  if (isSelected) return '#ffffff';

  return '#0072ff';
};

const getCursorType = ({ isSelected }) => {
  if (isSelected) return 'not-allowed';

  return 'pointer';
};

const getBorder = ({ isSelected }) => {
  if (isSelected) return '2px solid #0072ff;';

  return '0px';
};

const Wrapper = styled.div`
  padding: 5px 10px;
  border-radius: 5px;
  border: ${props => getBorder(props)};
  color: ${props => getFontColor(props)};
  cursor: ${props => getCursorType(props)};
  margin-left: 5px;
  margin-right: 5px;
  justify-content: center;
  align-items: center;
  display: flex;
  font-size: 10px;
  background-color: ${props => getBackgroundColor(props)};
  width: 24px;
  height: 24px;
  border-radius: 50%;
  font-size: 16px;
`;

const Text = styled.p`
  color: ${props => (props.isDisabled ? '#0072ff' : '#0072ff')};
  font-size: 16px;
  margin-left: 10px;
  margin-right: 10px;
  cursor: pointer;
`;

const PaginationItem = ({ pageNumber, isSelected, onSelect }) => (
  <Wrapper
    isSelected={isSelected}
    onClick={() => !isSelected && onSelect(pageNumber - 1)}
  >
    {pageNumber}
  </Wrapper>
);

export const PrevPaginationItem = ({ pageNumber, onSelect, isSelected }) => (
  <Text
    isDisabled={isSelected}
    onClick={() => !isSelected && onSelect(pageNumber - 1)}
  >
    <Image width="15" src={Previous} alt="previous" /> Previous
  </Text>
);

export const NextPaginationItem = ({ pageNumber, onSelect, isSelected }) => (
  <Text
    isDisabled={isSelected}
    onClick={() => !isSelected && onSelect(pageNumber + 1)}
  >
    Next <Image width="15" src={Next} alt="next" />
  </Text>
);

const PaginationItemPropTypes = {
  pageNumber: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
};

PaginationItem.propTypes = PaginationItemPropTypes;
NextPaginationItem.propTypes = PaginationItemPropTypes;
PrevPaginationItem.propTypes = PaginationItemPropTypes;

export default PaginationItem;
