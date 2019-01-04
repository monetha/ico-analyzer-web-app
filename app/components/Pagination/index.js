import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PaginationItem, {
  PrevPaginationItem,
  NextPaginationItem,
} from './PaginationItems';
import Wrapper from './Wrapper';

class Pagination extends Component {
  renderPaginationItems() {
    const {
      itemsPerPage,
      itemsCount,
      onSelect,
      selectedPage,
      getPaginationItem,
    } = this.props;

    const totalPageCount = Math.floor(itemsCount / itemsPerPage);
    const paginationItems = [];

    const isFirstPage = selectedPage === 0;
    const isLastPage = selectedPage === totalPageCount - 1;
    const hasOnlyOnePage = itemsCount < itemsPerPage;

    if (totalPageCount) {
      paginationItems.push(
        <PrevPaginationItem
          key={0}
          pageNumber={selectedPage}
          isSelected={isFirstPage}
          onSelect={onSelect}
        />,
      );
    }

    for (let page = 1; page <= totalPageCount; page += 1) {
      if (getPaginationItem) {
        paginationItems.push(getPaginationItem(page, totalPageCount));
      } else {
        paginationItems.push(
          <PaginationItem
            key={page}
            pageNumber={page}
            isSelected={page === selectedPage + 1}
            onSelect={onSelect}
          />,
        );
      }
    }

    if (totalPageCount) {
      paginationItems.push(
        <NextPaginationItem
          key={totalPageCount + 1}
          pageNumber={selectedPage}
          isSelected={isLastPage || hasOnlyOnePage}
          onSelect={onSelect}
        />,
      );
    }

    return paginationItems;
  }

  render() {
    return <Wrapper>{this.renderPaginationItems()}</Wrapper>;
  }
}

Pagination.propTypes = {
  itemsPerPage: PropTypes.number.isRequired,
  itemsCount: PropTypes.number.isRequired,
  selectedPage: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
  getPaginationItem: PropTypes.func,
};

export default Pagination;
