import React from 'react';
import styled from 'styled-components';
import Tooltip from '../../components/Tooltip';
const Text = styled.div`
  text-align: left;
  flex: 1;
`;

const getBackgroundStyles = props =>
  props.disabled ? '#909090' : 'linear-gradient(to bottom, #0071fe, #094da0)';

const Button = styled.button`
  color: #0072ff;
  padding: 10px 0px;
  border-bottom-right-radius: 20px;
  border-top-left-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  width: 100px;
  height: 38px;
  box-shadow: 0 5px 15px 0 rgba(0, 114, 255, 0.33);
  cursor: pointer;
  border: 1px solid #0072ff;
  &:hover {
    background: ${getBackgroundStyles};
    color: #fff;
  }
`;

const generateColumns = onSelect => [
  {
    Header: <Text>Ico Name</Text>,
    id: 'name',
    accessor: data => data.metadata.icoName,
    maxWidth: 250,
  },
  {
    Header: <Text>ICO pass address</Text>,
    id: 'icoPassAddress',
    accessor: data => (
      <Tooltip tooltipMessage={data.metadata.passportAddress}>
        <Text>{`${data.metadata.passportAddress.slice(0, 12)}...`}</Text>
      </Tooltip>
    ),
  },
  {
    id: 'startDate',
    Header: <Text>Sale Start</Text>,
    accessor: d => <div>{d.ico_info.ico_start_date}</div>,
    maxWidth: 150,
  },
  {
    id: 'endDate',
    Header: <Text>Sale End</Text>,
    accessor: d => <div>{d.ico_info.ico_end_date}</div>,
    maxWidth: 150,
  },
  {
    Header: 'ICO Pass',
    Cell: props => (
      <Button
        type="button"
        onClick={() => onSelect(props.original)} // eslint-disable-line
      >
        Report
      </Button>
    ),
    maxWidth: 150,
  },
];

export default generateColumns;
