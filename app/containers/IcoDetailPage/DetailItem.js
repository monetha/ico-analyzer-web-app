import React from 'react';
import PropTypes from 'prop-types';

import ItemLabel from './Itemlabel';
import ItemValue from './ItemValue';
import CopyLogoWrapper from './CopyLogoWrapper';
import Tooltip from '../../components/Tooltip';
import Image from '../../components/Image';
import infoIcon from '../../images/info.png';

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
  <tr>
    <td>
      <ItemLabel>
        {label}
        {tooltipMessage && (
          <Tooltip tooltipMessage={tooltipMessage}>
            <Image src={infoIcon} alt="info-icon" />
          </Tooltip>
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
  </tr>
);

DetailItem.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  needsCopyIcon: PropTypes.bool,
  tooltipMessage: PropTypes.object,
  clipboards: PropTypes.object,
  onCopy: PropTypes.func,
  valuePostfix: PropTypes.any,
};

export default DetailItem;
