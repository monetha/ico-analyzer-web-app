# Monetha ICO Analyzer

Monetha’s ICO Analyzer gives its users a way to estimate how much money a blockchain project has raised during the Initial Coin Offering. It achieves this by checking the wallet addresses associated with the crowdsale and comparing that data with what information the project has made available to the public. The data is then recorded and stored safely on the blockchain in a designated ICO [passport](https://github.com/monetha/reputation-contracts). If necessary, the analysis can be rerun multiple times by any person providing additional details that they know about the project. Each run leaves a separate entry in the identity.

## Motivation

ICO Analyzer was built as a problem-solving tool, to let its users verify whether an ICO can be trusted. On the other hand, it serves as a showcase of Monetha’s Decentralized Reputation Framework and its capabilities. We hope that it will manage to fulfill both of these roles and that you will find the Analyzer useful.

The ICO Analyzer makes use of Monetha’s Decentralized Reputation Framework, namely its Payments and Reputation layers. 

### Reputation layer

You can read more about the Reputation layer [here](https://github.com/monetha/reputation-layer)

Monetha’s ICO Analyzer demonstrates a simplified use case for the Reputation layer. It allows the user to create a Reputational Identity for an ICO and make a data request. Monetha, which functions as a Facts Provider, aggregates (using the websites icorating.com and etherscan.io) and calculates defined metrics and insights. The results are then displayed in the form of a simple pass/fail check, summarising the plurality of criteria involved in the analysis.


### Payment layer

You can read more about the Payments layer here: https://github.com/monetha/payment-layer

Monetha’s ICO Analyzer makes use of the Payments layer at two points. Transactions are facilitated via the Metamask app:

* upon creating a new ICO Identity. The creator is charged a small gas fee for deploying a smart contract on the blockchain;
* upon starting the analysis. The requestor is asked to pay a small service fee held in an escrow account until the process is completed and funds are refunded in case if analysis fails

## Build status

[![Build Status](https://travis-ci.org/monetha/ico-analyzer-web-app.svg?branch=master)](https://travis-ci.org/monetha/ico-analyzer-web-app)

## Tech/framework used

<b>Built with</b>

* [React Redux](https://github.com/reduxjs/react-redux)
* [Monetha Reputation JS SDK](https://github.com/monetha/reputation-js-sdk)

## Features

* Creation of Monetha's Reputational Identity for ICO analysis
* Listing of Reputation Passports from blockchain
* Metamask integration for signing onchain operations
* Integation of [Monetha's Payments Layer](https://github.com/monetha/payment-layer)

## Installation

### Steps to setup

Navigate to the project directory:

`cd ico-analyzer-web-app`

Install necessary dependencies:

`npm install`

or

`yarn install`

Start the node.js development server by:

`npm start`

or

`yarn start`

Server should be running on `https://localhost:3000`.

## Contribute

### Community

* If you have any questions regarding ICO Analyzer, open an [issue](https://github.com/monetha/ico-analyzer-web-app/issues/new) or ask it on https://t.me/Monethagroup.

### Issue

Ensure the bug was not already reported by searching on GitHub under [issues](https://github.com/monetha/ico-analyzer-web-app/issues). If you're unable to find an open issue addressing the bug, open a [new issue](https://github.com/monetha/ico-analyzer-web-app/issues/new).

#### Write detailed information

Detailed information is very helpful to understand an issue.

For example:

* How to reproduce the issue, step-by-step.
* The expected behavior (or what is wrong).
* Screenshots for GUI issues.
* The browser/operating system.

#### Pull Requests

Pull Requests are always welcome.

When you edit the code, please run `npm run build` to check the formatting of your code before you git commit.
Ensure the PR description clearly describes the problem and solution. It should include:

* The operating system on which you tested.
* The relevant issue number, if applicable.
