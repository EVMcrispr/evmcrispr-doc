---
id: agent
title: Agent
---
import useBaseUrl from '@docusaurus/useBaseUrl'
import styles from '../src/css/articles.css'

The Agent App executes interactions with external ethereum addresses, including smart contracts. Along with the Vault contract, the Agent can also hold it's own Treasury which can be managed by a Finance App. Having multiple Agents can be useful for a variety of reasons, including maintaining multiple treasuries and scoping permissions to external smart contracts related to your DAO or protocol (by making the Agent an owner or admin).


## App Roles

Before installing an app you should consider any permissions it will need to fit your purposes. Here is an exhaustive list of roles for the agent app:

EXECUTE_ROLE 
 - Allows an entity to execute an external transaction through the agent
SAFE_EXECUTE_ROLE
TRANSFER_ROLE
    - Allows an entity to transfer tokens from the agent's wallet
ADD_PROTECTED_TOKEN_ROLE
REMOVE_PROTECTED_TOKEN_ROLE
ADD_PRESIGNED_HASH_ROLE
    - Allows this entity to add a presigned hash to the agent. [Learn more](https://forum.aragon.org/t/agent-app-arbitrary-actions-from-daos/275 
DESIGNATE_SIGNER_ROLE
    - Designates this entity as a signer for the agent. [Learn more](https://forum.aragon.org/t/agent-app-arbitrary-actions-from-daos/275).
RUN_SCRIPT_ROLE
    - Allows this entity to run an EVM script on the agent

### Types of Entities

There are four eligible entities you can choose from: App, Anyone, Token Holders, Specified Eth Address.

- Anyone is expressed as `ANY_ENTITY` and can be any user visiting your DAO with a web wallet.
- Token Holders is expressed as token-manager and is affiliated with your token-managers token. Anyone holding the token-manager's token is inside of this entity
- Specified Eth Address is expressed as the ETH address starting with `0x`, only this address will be the specified entity.
- App is the internal name of the internal Aragon App installed on your DAO, such as `voting`, `token-manager`, or `agent`

## Granting Permissions

The agent is made to carry out the requests from other apps or DAO members, take some time to consider what entities need access to your agent.

To grant permissions you'll use the following syntax:

`grant {entity} {app} {role} {defaultPermissionManager}`

In practice this would look like:

`grant voting agent EXECUTE_ROLE voting`

Which would give the voting app permission to carry out interactions with external contracts or addresses using the agent app.

## Installing the App

There are no parameters needed to install a new agent to your DAO, however the agent relies on a tight set of permissions to do anything useful, review the `grant` section before proceeding. You can use this syntax to install the agent:

```
install agent:new
// add any permissions you want to grant here.
```

## Revoking Permissions

:::warning
 This command can potentially remove a permission that is needed for the DAO to work. Be careful to not remove the permissions to create votes in voting, create permissions in ACL, or manage apps in the Kernel.
:::

To remove a permission from an entity follow this syntax:

`revoke {entity} {app} {role} {removePermissionManager?}`

in practice this could look like:

`revoke voting agent TRANSFER_ROLE false`

This would remove the ability for the voting app to transfer funds held by the agent, while keeping the Permission Manager in place should this permission need to be modified in the future.

## Creating External Actions
The agent uses the `act` command to interact with external entities such as smart contracts. The syntax is as follows:

`act {agent} {targetEthereumAddress} {function} {inputParameters}`

The functions for a given *verified* smart contract can be found on the `write` or `write proxy` page in the network's block explorer. For example here is the [contract for the Aragon token `ANT`](https://etherscan.io/token/0xa117000000f279d81a1d3cc75430faa017fa5a2e#writeContract). We can use the basic task of sending ANT to another address to showcase the syntax for `act`:

`act agent 0xa117000000f279d81a1d3cc75430faa017fa5a2e approve(address,unint256) 0x123456789abcdef123456789abcdef0123456789 10e18`

To approve sending 10 ANT tokens from the agent, and then:

`act agent 0xa117000000f279d81a1d3cc75430faa017fa5a2e transfer(address,unint256) 0x62Bb362d63f14449398B79EBC46574F859A6045D 10e18`

This would transfer 10 ANT from the agent's wallet to the specified ETH address `0x62Bb362d63f14449398B79EBC46574F859A6045D`

## Modifying the App

Using the `exec` command we can create internal actions.

An exhaustive list of actions that can be performed on the voting app can be found on the [base implementation contract](https://etherscan.io/address/0x8b2bc1aa673aae1ec9c75704f9ad2a475804cec8#writeProxyContract)

We'll use the `newImmediatePayment` function to show the syntax of the `exec` command. This is the base syntax:

`exec {app} {methodName} {parameters}`