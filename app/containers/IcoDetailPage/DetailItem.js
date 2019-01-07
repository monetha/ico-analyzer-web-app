import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ItemLabel from './Itemlabel';
import ItemValue from './ItemValue';
import CopyLogoWrapper from './CopyLogoWrapper';
import Image from '../../components/Image';
import infoIcon from '../../images/info.png';
import { DynamicTooltip } from '../../components/DynamicTooltip';

const Row = styled.tr`
  @media (max-width: 767px) {
    display: block;
    padding: 0 20px;
    padding-top: 20px;

    & > td {
      display: block;
      padding: 0 !important;
    }

    &:last-child {
      padding-bottom: 15px;
    }
  }
`;

const LabelImage = styled(Image)`
  padding-left: 10px;
  padding-bottom: 4px;
`;

export const truncateAddress = address =>
  `${address.slice(0, 11)}...${address.slice(35)}`;

const DetailItem = ({
  label,
  value,
  valuePostfix,
  needsCopyIcon,
  type,
  tooltipMessage,
  clipboards,
  onCopy,
}) => (
  <Row>
    <td>
      <ItemLabel>
        {label}
        {tooltipMessage && (
          <DynamicTooltip content={tooltipMessage}>
            <LabelImage width="24px" src={infoIcon} alt="info-icon" />
          </DynamicTooltip>
        )}
      </ItemLabel>
    </td>
    <td>
      <ItemValue>
        {type === 'address' ? truncateAddress(value) : value}
        {valuePostfix && valuePostfix}
        {needsCopyIcon && (
          <CopyLogoWrapper
            showCopied={clipboards[label]}
            onCopy={() => onCopy(label, value)}
          />
        )}
      </ItemValue>
    </td>
  </Row>
);

DetailItem.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  needsCopyIcon: PropTypes.bool,
  tooltipMessage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  clipboards: PropTypes.object,
  onCopy: PropTypes.func,
  valuePostfix: PropTypes.any,
};

export default DetailItem;
