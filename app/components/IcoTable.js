import React from 'react';
import PropTypes from 'prop-types';
import ReactTable, { ReactTableDefaults } from 'react-table';
import 'react-table/react-table.css';

const tableDefaults = {
  ...ReactTableDefaults,

  // controlled paginations
  pageSize: 8,
  resizable: false,
  showPaginationBottom: false,
  showPageSizeOptions: false,
  minRows: 0,
  NoDataComponent: () => null,

  // basic table styles
  style: { border: 'none' },
  getTrGroupProps: () => ({
    style: {
      border: 'none',
      minHeight: 60,
      background: '#fff',
      borderRadius: 10,
      marginTop: 10,
    },
  }),
  getTheadProps: () => ({
    style: {
      border: 'none',
      boxShadow: 'none',
      marginBottom: 10,
      textTransform: 'uppercase',
      fontWeight: 600,
    },
  }),
  getTheadThProps: () => ({
    style: {
      border: 'none',
      boxShadow: 'none',
      padding: '0 20px',
      textAlign: 'center',
      justifyContent: 'center',
    },
  }),
  getTdProps: () => ({
    style: {
      border: 'none',
      padding: '10px 20px',
      color: '#777',
      whiteSpace: 'normal',
      display: 'flex',
      alignItems: 'center',
    },
  }),
};

const IcoTable = props => <ReactTable {...tableDefaults} {...props} />;

IcoTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
};

export default IcoTable;
