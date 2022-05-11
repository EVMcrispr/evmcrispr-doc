---
id: aragonOSintro
title: Introduction to Aragon DAOs
slug: /
---
import useBaseUrl from '@docusaurus/useBaseUrl'
import styles from '../src/css/articles.css'

AragonOS is the main framework that EVMcrispr has been tailored to interact with. Aragon DAOs are easily deployable and highly customizable governance platforms that can be launched using the [Aragon Client](https://aragon.org/aragon-client) on Mainnet or on Gnosis Chain via [1hive's Aragon Deployment](https://aragon.1hive.org/#/)

<img alt='create an aragon DAO homepage' src={useBaseUrl('img/aragonOS/createAragonDAO.png')} />

This DAO structure allows a variety of native and custom apps to be plugged into the DAO using the system's `Kernel` and each apps permissions in relation to other apps is dictated by the `ACL` - If you want to go deep and learn more technicals of Aragon DAOs you can check out the [Aragon Developer documentation](https://hack.aragon.org/docs/getting-started)

In this section we'll be breaking down all of the possible DAO commands that can be done via EVM crispr to modify the DNA of your Aaragon DAO.

## The `connect` Command

Interacting with any Aragon DAO will require you to preface your script with the `connect` command. This will tell EVMcrispr which DAO to send the script to and also the forwarding path which specifies through which apps we need to ask permissions from.

By default an Aragon DAO will route EVM scripts through the voting app, creating a vote to execute your script. Depending on your permissions you'll need to pass through the token-manager, making sure you have DAO tokens and permission to create a vote. Let's take a look at this example:  

`connect 0xaF810FaC58eD1B06A336cbc1f273fb0eBfB8a1EE 0x43acbd385e5d474330022635700ce0c706ad0ede 0x8e8ea49256421cf7f28d2f1170666da81e22e618`

Referencing the addresses in the example Organization above we can see we're routing our script in this manner:  

`connect Organization Address -> Token-manager App -> Voting App`

 We can also make our lives a heck of a lot easier with a bit of in-house syntax sugar.

 `connect mitchcorp token-manager voting`

 This will connect us using the aragonID ENS name associated with the DAO. This can be found usually in the top left of the Aragon DAO navbar.

  More on syntax-sugar in the <a href={useBaseUrl('helpers/')} target='_blank'>Helpers Section</a>


## Aliasing Multiple Apps in Aragon DAOs

If you have multiple instances of the same app installed you can specify which app you want to interact with by a simple numbering nomenclature. The first app installed on your DAO can always be referenced by `{appName}:0`, as in `agent:0`, `finance:0` or `token-manager:0`. Any additional apps installed will have the next number appended to their name. For example if you have 1 agent installed and you install another, the second agent can be referenced by `agent:1`, the third by `agent:2` and so on.