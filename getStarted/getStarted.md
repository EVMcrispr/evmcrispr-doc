---
id: getStarted
title: Intro
slug: /
displayed_sidebar: null
---
import useBaseUrl from '@docusaurus/useBaseUrl'
import styles from '../src/css/articles.css'

# Getting Started

[**EVMcrispr**](https://evm-crispr.blossom.software/) is a powerful tool that combines a command line interface with a Javascript library to interact with Aragon DAOs. With it, you can bundle many DAO operations into just one script, generating a singular transaction/vote.

The true beauty of EVMcrispr is that you don't need to be a pro developer in order to create complex and powerful EVMscripts for DAOs. There are in fact only two requirements to start using this tool:

1. A modern web browser installed. (We recommend Brave)
2. A crypto web wallet extension installed on said modern browser. (like MetaMask)

That being said in order to fully grasp the utilities of EVMcrispr you should have some intermediate knowledge of Ethereum, Javascript and navigating Block Explorers such as [Etherscan](https://etherscan.io) for example.


## Using EVMcrispr

The most typical applications of EVMcrispr will be to create mutli-action scripts that can be sent to DAOs to be voted on. EVMcrispr in it's current form is tailor made to work within the AragonOS framework, navigating it's library of native and custom apps and system of permissions.


<img id="border" alt="example EVMcrispr terminal" src={useBaseUrl('img/getStarted/scriptExampleInstall.png')} />

The EVMcrispr terminal is where you will make your scripts. This is where the magic happpens. Simply connect with your web wallet and switch to the same EVM compatible chain of the DAO that you want to interact with (i.e Mainnet, Matic, Gnosis Chain etc..).

## Finding DAO information

You should probably figure out where to send your scripts. Collecting key DAO information such as the Organization Address and Application Addresses can be found in a typical Aragon DAO from the `Organization` page.

<img id="border" alt="navigating the aragon DAO" src={useBaseUrl('img/getStarted/findingAddresses.png')} />


### The `connect` Command

Interacting with any Aragon DAO will require you to preface your script with the `connect` command. This will tell EVMcrispr which DAO to send the script to and also which apps we need to ask permissions from. Let's take a look at this example:  

```
connect 0xaF810FaC58eD1B06A336cbc1f273fb0eBfB8a1EE 0x43acbd385e5d474330022635700ce0c706ad0ede 0x8e8ea49256421cf7f28d2f1170666da81e22e618`
```

Referencing the addresses in the example Organization above we can see we're routing our script in this manner:  

`connect Organization Address -> Tokens App -> Voting App`

 We can also make our lives a heck of a lot easier with a bit of in-house syntax sugar.

 `connect mitchcorp token-manager voting`

 This will connect us using the aragonID ENS name associated with the DAO. This can be found usually in the top right of the Aragon DAO navbar.

  More on syntax-sugar in the <a href={useBaseUrl('helpers/')} target='_blank'>Helpers Section</a>
