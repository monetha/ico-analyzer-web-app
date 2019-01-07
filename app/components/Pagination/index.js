import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { PrevPaginationItem, NextPaginationItem } from './PaginationItems';
import Wrapper from './Wrapper';

class Pagination extends Component {
  renderPaginationItems() {
    const {
      isDisabledNext,
      isDisabledPrev,
      onClickNext,
      onClickPrev,
    } = this.props;

    const paginationItems = [];

    paginationItems.push(
      <PrevPaginationItem
        key="prev-button"
        disabled={isDisabledPrev}
        onClick={onClickPrev}
      />,
    );

    paginationItems.push(
      <NextPaginationItem
        key="next-button"
        disabled={isDisabledNext}
        onClick={onClickNext}
      />,
    );

    return paginationItems;
  }

  render() {
    return <Wrapper>{this.renderPaginationItems()}</Wrapper>;
  }
}

Pagination.propTypes = {
  isDisabledNext: PropTypes.bool,
  isDisabledPrev: PropTypes.bool,
  onClickNext: PropTypes.func.isRequired,
  onClickPrev: PropTypes.func.isRequired,
};

export default Pagination;
