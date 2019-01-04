/**
 *
 * EditIcoForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import isEmpty from 'lodash/isEmpty';
import omit from 'lodash/omit';

import messages from './messages';
import FormWrapper from './FormWrapper';
import TermsWrapper from './TermsWrapper';
import FieldMessage from './FieldMessage';

import TextField from '../../components/TextField';
import Label from '../../components/TextField/Label';
import ErrorMessage from '../../components/TextField/ErrorMessage';
import PrimaryButton from '../../components/PrimaryButton';
import FlexBox from '../../components/FlexBox';
import FloatedView from '../../components/FloatedView';
import EmptyDiv from '../../components/EmptyDiv';
import DateField from '../../components/DateField';
import InFormHeader from './InFormHeader';
import InFormContent from './InFormContent';

function EditIcoForm(props) {
  const {
    onSubmit,
    createUpdateHandler,
    submitButtonText,
    fields,
    disabledFields,
    errors,
    inFormHeading,
    inFormContent,
  } = props;

  const isFormDisabled = !isEmpty(omit(errors, ['submit', 'crowdsaleAddress']));

  return (
    <FormWrapper>
      {inFormHeading && (
        <FormattedMessage {...inFormHeading}>
          {msg => <InFormHeader>{msg}</InFormHeader>}
        </FormattedMessage>
      )}
      {inFormContent && (
        <FormattedMessage {...inFormContent}>
          {msg => <InFormContent>{msg}</InFormContent>}
        </FormattedMessage>
      )}
      <FlexBox>
        <TextField
          required
          label={messages.icoNameLabel}
          disabled={disabledFields.includes('icoName')}
          tooltipMessage={messages.icoNameTooltip}
          tooltipWidth="450px"
          placeholder={messages.icoNamePlaceholder}
          {...createUpdateHandler('icoName')}
        />
        <EmptyDiv sizeX={3} />
        <TextField
          required
          label={messages.decimalsLabel}
          placeholder={messages.decimalsPlaceholder}
          disabled={disabledFields.includes('decimals')}
          type="number"
          {...props.createUpdateHandler('decimals', parseInt)}
        />
      </FlexBox>
      <FlexBox>
        <TextField
          label={messages.tokenContractAddressLabel}
          required
          disabled={disabledFields.includes('tokenContractAddress')}
          placeholder={messages.tokenContractAddressPlaceholder}
          {...createUpdateHandler('tokenContractAddress')}
        />
        <EmptyDiv sizeX={3} />
        <TextField
          label={messages.ownerAddressLabel}
          required
          disabled={disabledFields.includes('ownerAddress')}
          tooltipMessage={messages.ownerAddressTooltipMessage}
          placeholder={messages.ownerAddressPlaceholder}
          tooltipWidth="450px"
          {...createUpdateHandler('ownerAddress')}
        />
      </FlexBox>
      <FlexBox>
        <TextField
          label={messages.crowdsaleAddressLabel}
          placeholder={messages.crowdsaleAddressPlaceholder}
          tooltipMessage={messages.crowdsaleAddressTooltipMessage}
          {...createUpdateHandler('crowdsaleAddress')}
        />
        <EmptyDiv sizeX={3} />
        <FlexBox />
      </FlexBox>
      <FlexBox>
        {fields.includes('cfr') && (
          <TextField
            required
            label={messages.cfrLabel}
            placeholder={messages.cfrPlaceholder}
            tooltipMessage={messages.cfrTooltipMessage}
            type="number"
            {...createUpdateHandler('cfr')}
          />
        )}
        <EmptyDiv sizeX={3} />
        {fields.includes('icoPrice') && (
          <TextField
            required
            label={messages.icoPriceLabel}
            placeholder={messages.icoPricePlaceholder}
            type="number"
            {...createUpdateHandler('icoPrice')}
          />
        )}
      </FlexBox>

      <FlexBox>
        {fields.includes('icoStartDate') && (
          <FlexBox column>
            <Label>
              <FormattedMessage {...messages.icoStartDateLabel} />
            </Label>
            <DateField {...createUpdateHandler('icoStartDate')} />
          </FlexBox>
        )}
        <EmptyDiv sizeX={3} />
        {fields.includes('icoEndDate') && (
          <FlexBox column>
            <Label>
              <FormattedMessage {...messages.icoEndDateLabel} />
            </Label>
            <DateField {...createUpdateHandler('icoEndDate')} />
          </FlexBox>
        )}
      </FlexBox>

      {errors.dateRange && (
        <FormattedMessage {...errors.dateRange}>
          {msg => <ErrorMessage>{msg}</ErrorMessage>}
        </FormattedMessage>
      )}
      {!errors.submit && (
        <FormattedMessage {...messages.requiredMsgText}>
          {msg => <FieldMessage>{msg}</FieldMessage>}
        </FormattedMessage>
      )}

      {errors.submit && (
        <FormattedMessage {...errors.submit}>
          {msg => <ErrorMessage>{msg}</ErrorMessage>}
        </FormattedMessage>
      )}
      <EmptyDiv sizeY={2} />
      <TermsWrapper>
        <p>Disclaimer</p>
        <input
          type="checkbox"
          {...createUpdateHandler(null, null, cbProps => ({
            onChange: e => {
              cbProps.updateFormData('acceptedT&C', e.target.checked);
              if (e.target.checked) {
                cbProps.unsetFormDataError('acceptedT&C');
              } else {
                cbProps.setFormDataError(
                  'acceptedT&C',
                  messages.acceptDisclaimer,
                );
              }
            },
          }))}
        />
        <span>
          I understand that the data provided here is for informative&nbsp;
          purposes only
        </span>
        <br />
      </TermsWrapper>
      <FloatedView float="right">
        <FormattedMessage {...submitButtonText}>
          {msg => (
            <PrimaryButton disabled={isFormDisabled} onClick={onSubmit}>
              {msg}
            </PrimaryButton>
          )}
        </FormattedMessage>
      </FloatedView>
      {errors['acceptedT&C'] && (
        <FormattedMessage {...errors['acceptedT&C']}>
          {msg => <ErrorMessage>{msg}</ErrorMessage>}
        </FormattedMessage>
      )}
    </FormWrapper>
  );
}

EditIcoForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  createUpdateHandler: PropTypes.func.isRequired,
  submitButtonText: PropTypes.object,
  fields: PropTypes.array,
  disabledFields: PropTypes.array,
};

export default EditIcoForm;
