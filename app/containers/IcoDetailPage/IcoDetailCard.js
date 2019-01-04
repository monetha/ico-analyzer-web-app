import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import DetailCard from './DetailCard';
import PaddedView from '../../components/PaddedView';
import DetailItem from './DetailItem';
import PageHeader from '../../components/H3';

const IcoDetailCard = ({ details, headerMessage, clipboards, onCopy }) => (
  <PaddedView>
    <DetailCard>
      <FormattedMessage {...headerMessage}>
        {msg => <PageHeader>{msg}</PageHeader>}
      </FormattedMessage>
      <table>
        <tbody>
          {details.map(detail => (
            <DetailItem
              key={detail.label}
              clipboards={clipboards}
              onCopy={onCopy}
              {...detail}
            />
          ))}
        </tbody>
      </table>
    </DetailCard>
  </PaddedView>
);

IcoDetailCard.propTypes = {
  details: PropTypes.array,
  clipboards: PropTypes.object,
  onCopy: PropTypes.func,
};

export default IcoDetailCard;
