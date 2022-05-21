---
id: getStarted
title: What is EVMcrispr?
slug: /
---
import useBaseUrl from '@docusaurus/useBaseUrl'
import styles from '../src/css/articles.css'


[**EVMcrispr**](https://evm-crispr.blossom.software/) is a powerful tool that combines a command line interface with a Javascript library to interact with Aragon DAOs. With it, you can bundle many DAO operations into just one script, generating a singular transaction/vote.

In it's current state EVMcrispr is geared towards management of DAO's using the AaragonOS framework, including [Garden DAOs](https://gardens.1hive.org/#/home). It currently supports AragonOS v4 and v5, allowing for a wealth of possible DAO actions, including:

- Installing new native and custom aragon apps
- Granting or Revoking permissions
- Modifying the settings of apps
- Creating internal actions with installed apps or interacting with external contracts on the blockchain.

The true beauty of EVMcrispr is that you don't need to be a pro developer in order to create complex and powerful EVMscripts for DAOs. There are in fact only two requirements to start using this tool:

1. A modern web browser installed. (We recommend Brave)
2. A crypto web wallet extension installed on said modern browser. (like MetaMask)

That being said in order to fully grasp the utilities of EVMcrispr you should have some intermediate knowledge of Ethereum, Javascript and navigating Block Explorers such as [Etherscan](https://etherscan.io) for example.


## Using EVMcrispr

The most typical applications of EVMcrispr will be to create mutli-action scripts that can be sent to DAOs to be voted on. As mentioned, EVMcrispr in it's current form is tailor made to work within the AragonOS framework, navigating it's library of native and custom apps and system of permissions.


<img id="border" alt="example EVMcrispr terminal" src={useBaseUrl('img/getStarted/scriptExampleInstall.png')} />

The EVMcrispr terminal is where you will make your scripts. This is where the magic happpens. Simply connect with your web wallet and switch to the same EVM compatible chain of the DAO that you want to interact with (i.e Mainnet, Matic, Gnosis Chain etc..). When writing a script each line on the terminal is used to define another action that will be bundled into the same script.


## Who uses EVMcrispr? 

Some notable DAOs have already found great success using EVMcrispr, check out some of the use cases these formidable DAOs have found:

- [**CurveDAO**](https://curve.fi/) used it to [upgrade it’s voting app](https://gov.curve.fi/t/allowing-for-fractional-votes-by-curve-dao/2456) implementation contract.
- [**1Hive**](https://1hive.org/) used it to claim it’s ENS airdrop and transfer the funds of it’s mainnet DAO.
- [**Giveth**](https://giveth.io/) used it to replace the Unipool contract for another one in their gardens DAO and currently uses it to [distribute GIVbacks](https://giveth.io/givbacks).
- [**TECommons**](https://tecommons.org/) used it for [minting and burning tokens](https://forum.tecommons.org/t/one-time-change-of-tech-addresses-as-requested-by-owner-because-access-was-lost-or-another-reason/571) and also for migrating to a [gardens DAO and installing a bonding curve](https://forum.tecommons.org/t/commons-upgrade-demo-part-2/723).
- [**BrightId**](https://brightid.org/) is using it to change the [parameters on their garden’s conviction voting app](https://forum.brightid.org/t/revisiting-the-brightdao-parameters-with-general-magic-support/355), and will use it to install the [BrightId Gatekeeper](https://forum.brightid.org/t/brightid-gatekeeper-for-aragon-permissions/131) as an ACL oracle.
- [**Agave**](https://agave.finance/) used it to remove the vesting of some of their seeds and transfer funds from their agent to many contributors.


## Who made EVMcrispr?

EVMcrispr is a product of Blossom Labs, a duo of two top-notch smart contract developers, Sem and Elessar. You can check out all of the open-source products they have built on their [Github Organization](https://github.com/BlossomLabs).

