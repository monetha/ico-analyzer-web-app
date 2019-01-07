import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import DetailCard from './DetailCard';
import PaddedView from '../../components/PaddedView';
import FlexBox from '../../components/FlexBox';
import Image from '../../components/Image';
import DetailItem from './DetailItem';
import PageHeader from '../../components/H3';
import { DynamicTooltip } from '../../components/DynamicTooltip';
import infoIcon from '../../images/info.png';

const HeaderTooltipImage = styled(Image)`
  margin-left: 10px;
`;

const IcoDetailCard = ({
  details,
  headerMessage,
  headerMessageTooltip,
  clipboards,
  onCopy,
}) => (
  <PaddedView>
    <DetailCard>
      <PageHeader>
        <FormattedMessage {...headerMessage}>
          {msg => (
            <FlexBox>
              {msg}
              {headerMessageTooltip && (
                <DynamicTooltip content={headerMessageTooltip}>
                  <HeaderTooltipImage
                    width="14px"
                    src={infoIcon}
                    alt="info-icon"
                  />
                </DynamicTooltip>
              )}
            </FlexBox>
          )}
        </FormattedMessage>
      </PageHeader>
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
  headerMessageTooltip: PropTypes.object,
  onCopy: PropTypes.func,
};

export default IcoDetailCard;
