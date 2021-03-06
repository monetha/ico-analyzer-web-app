/**
 *
 * EditIcoPage: Common page to be used for creating new ICO Identity and update existing one.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import isValidDateRange from 'utils/isValidDateRange';
import { push } from 'connected-react-router';

import injectReducer from 'utils/injectReducer';
import makeSelectEditIcoPage from './selectors';
import reducer from './reducer';
import {
  analyseNewIco,
  reanalyseIco,
  updateFormData,
  resetFormData,
  setFormDataError,
  unsetFormDataError,
  prepareToEditIcopassStart,
} from './actions';
import messages, { createCustomMessages } from './messages';

import PageHeader from '../../components/H3';
import PageWrapper from './PageWrapper';
import EditIcoForm from './EditIcoForm';
import FieldDescription from './FieldDescription';
import requiredMetamaskLogin from '../../utils/requiredMetamaskLogin';
import { extractICONameFromUrl } from '../../utils/ico';

class EditIcoPage extends React.Component {
  constructor(props) {
    super(props);

    this.formArtifacts = this.extractFormArtifactsFromUrl(props);
    this.createUpdateHandler = this.createUpdateHandler.bind(this);

    if (
      props.editIcoPage.passportAddress === '' &&
      props.editIcoPage.passportAddress !== props.match.params.id
    ) {
      props.prepareToEditIcopassStart();
    }
  }

  createUpdateHandler(fieldName, formatValue, customHandler) {
    if (customHandler) {
      return customHandler(this.props);
    }
    const error = this.props.editIcoPage.errors[fieldName];
    return {
      error,
      value: this.props.editIcoPage[fieldName],
      onChange: (e, props) => {
        const value = formatValue
          ? formatValue(e.target.value)
          : e.target.value;
        const isDateRange = moment.isMoment(value);

        const finalValue = typeof value === 'string' ? value.trim() : value;

        this.props.updateFormData(fieldName, finalValue);

        if (
          (props.required && error && e.target.value) ||
          (error && !props.required)
        ) {
          this.props.unsetFormDataError(fieldName);
        }

        if (isDateRange) {
          let fromDate;
          let toDate;

          if (fieldName === 'icoStartDate') {
            fromDate = value;
            toDate = this.props.editIcoPage.icoEndDate;
          } else {
            fromDate = this.props.editIcoPage.icoStartDate;
            toDate = value;
          }

          if (isValidDateRange(fromDate, toDate)) {
            this.props.unsetFormDataError('dateRange');
          } else {
            this.props.setFormDataError(
              'dateRange',
              messages.invalidDateRangeErrorMessage,
            );
          }
        }
      },
      onBlur: (e, props) => {
        if (props.required && !error && !e.target.value) {
          this.props.setFormDataError(
            fieldName,
            messages.blankFieldErrorMessage,
          );
        }
      },
    };
  }

  extractFormArtifactsFromUrl() {
    const { icoName } = this.props.editIcoPage;
    const { path, params } = this.props.match;
    const formArtifacts = {
      '/analyse-icopass/:id': {
        onSubmit: this.props.analyseNewIco,
        onBack: this.props.navigateToList,
        pageHeaderMessage: messages.analyseMessage,
        pageDescriptionMessage: messages.analyseDescription,
        inFormHeading: createCustomMessages({
          passportAddress: params.id,
        }).passportAddressMessage,
        buttonText: messages.analyseText,
        fields: [
          'icoName',
          'decimals',
          'tokenContractAddress',
          'ownerAddress',
          'crowdsaleAddress',
        ],
        disabledFields: [],
        isAnalysing: true,
      },
      '/reanalyse-icopass/:id': {
        onSubmit: this.props.reanalyseIco,
        onBack: () => this.props.navigateToDetails(params.id),
        pageHeaderMessage: {
          id: 'icoName',
          defaultMessage:
            extractICONameFromUrl(icoName) || icoName || 'ICO name',
        },
        inFormHeading: messages.rerunHeading,
        inFormContent: messages.rerunContent,
        buttonText: messages.reanalyseText,
        fields: [
          'icoName',
          'decimals',
          'tokenContractAddress',
          'ownerAddress',
          'crowdsaleAddress',
          'cfr',
          'icoPrice',
          'icoStartDate',
          'icoEndDate',
        ],
        disabledFields: ['icoName', 'decimals', 'tokenContractAddress'],
        isAnalysing: false,
      },
    };

    return formArtifacts[path];
  }

  render() {
    const {
      onSubmit,
      pageHeaderMessage,
      buttonText,
      fields,
      disabledFields,
      inFormHeading,
      inFormContent,
      onBack,
      pageDescriptionMessage,
    } = this.extractFormArtifactsFromUrl();

    return (
      <PageWrapper>
        <FormattedMessage {...pageHeaderMessage}>
          {msg => <PageHeader>{msg}</PageHeader>}
        </FormattedMessage>
        {pageDescriptionMessage && (
          <FormattedMessage {...pageDescriptionMessage}>
            {msg => <FieldDescription>{msg}</FieldDescription>}
          </FormattedMessage>
        )}

        <EditIcoForm
          createUpdateHandler={this.createUpdateHandler}
          onSubmit={onSubmit}
          submitButtonText={buttonText}
          onBack={onBack}
          backButtonText={messages.backButtonText}
          errors={this.props.editIcoPage.errors}
          fields={fields}
          disabledFields={disabledFields}
          inFormHeading={inFormHeading}
          inFormContent={inFormContent}
        />
      </PageWrapper>
    );
  }

  componentWillUnmount() {
    this.props.resetFormData();
  }
}

EditIcoPage.propTypes = {
  analyseNewIco: PropTypes.func.isRequired,
  updateFormData: PropTypes.func.isRequired,
  resetFormData: PropTypes.func.isRequired,
  setFormDataError: PropTypes.func.isRequired,
  unsetFormDataError: PropTypes.func.isRequired,
  reanalyseIco: PropTypes.func.isRequired,
  navigateToList: PropTypes.func.isRequired,
  navigateToDetails: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  editIcoPage: makeSelectEditIcoPage(),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateFormData,
      resetFormData,
      analyseNewIco,
      reanalyseIco,
      setFormDataError,
      unsetFormDataError,
      prepareToEditIcopassStart,
      navigateToDetails: passportAddress =>
        push(`/ico-list/${passportAddress}`),
      navigateToList: () => push('/'),
    },
    dispatch,
  );

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'editIcoPage', reducer });

export default compose(
  withReducer,
  withConnect,
  requiredMetamaskLogin,
)(EditIcoPage);
