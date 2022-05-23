---
id: agent
title: Agent
---
import useBaseUrl from '@docusaurus/useBaseUrl'
import styles from '../src/css/articles.css'

The Agent App executes interactions with external ethereum addresses, including smart contracts. Along with the Vault contract, the Agent can also hold it's own Treasury which can be managed by a Finance App. Having multiple Agents can be useful for a variety of reasons, including maintaining multiple treasuries and scoping permissions to external smart contracts related to your DAO or protocol (by making the Agent an owner or admin).

## Installing the App

There are no parameters needed to install a new agent to your DAO, however the agent relies on a tight set of permissions to do anything useful, review the "Granting permissions" section before proceeding. You can use this syntax to install the agent:

```
install agent:new
```

### Common use example

When installing an Agent, we recommend grating the voting app with the `TRANSFER_ROLE`, `EXECUTE_ROLE`, and `RUN_SCRIPT_ROLE` so `exec agent` and `act agent` commands can be used.

```
install agent:new
grant voting agent:new TRANSFER_ROLE voting
grant voting agent:new EXECUTE_ROLE voting
grant voting agent:new RUN_SCRIPT_ROLE voting
```

An agent is basically a vault on steroids, so after filling the agent with some tokens, we can create a vote like this (transfer 1 ANT to my address):

```
exec agent transfer @token(ANT) @me 1e18
```

## Granting Permissions

:::warning
This command can potentially burn a permission manager if it is set to the wrong address, making the permission unable to be changed in the future. We usually want to set the main voting app as the permission manager of all permissions.
:::

The agent is made to carry out the requests from other apps or DAO members, take some time to consider what entities need access to your agent.

To grant permissions you'll use the following syntax:

```
grant <entity> <app> <roleName> [defaultPermissionManager]
```

In practice this would look like:

```
grant voting agent EXECUTE_ROLE voting
```

Which would give the voting app permission to carry out interactions with external contracts or addresses using the agent app.

Here is an exhaustive list of roles for the agent app:

- `EXECUTE_ROLE` 
  - Allows an entity to execute an external transaction through the agent
- `SAFE_EXECUTE_ROLE`
  - Allows the given entity to perform the `safeExecute` function through the agent
- `TRANSFER_ROLE`
  - Allows an entity to transfer tokens from the agent's wallet
- `ADD_PROTECTED_TOKEN_ROLE`
  - Allows this entity to add tokens to a list of tokens that cannot be spent or transferred while held by the agent.
- `REMOVE_PROTECTED_TOKEN_ROLE`
  - Allows this entity to remove tokens from a list of tokens that cannot be spent or transferred while held by the agent.
- `ADD_PRESIGNED_HASH_ROLE`
  - Allows this entity to add a presigned hash to the agent. [Learn more](https://forum.aragon.org/t/agent-app-arbitrary-actions-from-daos/275) 
- `DESIGNATE_SIGNER_ROLE`
  - Designates this entity as a signer for the agent. [Learn more](https://forum.aragon.org/t/agent-app-arbitrary-actions-from-daos/275).
- `RUN_SCRIPT_ROLE`
  - Allows this entity to run an EVM script on the agent

<details>
<summary>Types of Entities</summary>

There are four eligible entities you can choose from: **App**, **Anyone**, **Token Holders**, **Specified Eth Address**.
- Anyone is expressed as `ANY_ENTITY` and can be any user visiting your DAO with a web wallet.
- Token Holders is expressed as token-manager and is affiliated with your token-managers token. Anyone holding the token-manager's token is inside of this entity.
- Specified Eth Address is expressed as the ETH address starting with `0x`, only this address will be the specified entity.
- App is the internal name of the internal Aragon App installed on your DAO, such as `voting`, `token-manager`, or `agent`.

</details>


## Revoking Permissions

To remove a permission from an entity follow this syntax:

```
revoke <entity> <app> <roleName> [removePermissionManager=false]
```

in practice this could look like:

```
revoke voting agent TRANSFER_ROLE
```

This would remove the ability for the voting app to transfer funds held by the agent, while keeping the Permission Manager in place should this permission need to be modified in the future.

## Internal Actions
The agent can also perform actions to other apps within the DAO, however the syntax is a bit different:

```
exec <app> <methodName> [...parameters]
```

For example:

```
exec agent transfer @token(ANT) agent:1 100e18
```

This would transfer 100 ANT tokens from the first agent to the second agent, given a second agent is installed.

Below is an exhaustive list of all possible internal actions you can perform with the agent. we'll identify the function in the contract and outline any parameters and permissions you need and the expected syntax to run them.

<details>
<summary>safeExecute</summary>
Executes the specified action to an external contract, while preventing protected tokens from being spent.

#### Parameters
- `target` - The ETH address of the external contract you want to interact with. (ethAddress)
- `data` - Calldata for the action. (bytes)

#### Permissions

The entity executing the action via the agent will need the `SAFE_EXECUTE_ROLE` role.

#### Syntax

`exec agent safeExecute <target> <data>`

</details>

<details>

<summary>addProtectedToken</summary>

This will add a specified token address, to a list of tokens that cannot be spent or trasnferred while held by the agent.

#### Parameters
- `token` - The token address of the token you want to protect

#### Permissions

The entity executing the action via the agent will need the `ADD_PROTECTED_TOKEN_ROLE` role. (ETHaddress)

#### Syntax

`exec agent addProtectedtoken <token>`

</details>

<details>
<summary>removeProtectedToken</summary>

This will remove a specified token address, to a list of tokens that cannot be spent or trasnferred while held by the agent.

#### Parameters
- `token` - The token address of the token you want to remove from the protected tokens list. (ETHaddress)

#### Permissions

The entity executing the action via the agent will need the `REMOVE_PROTECTED_TOKEN_ROLE` role.

#### Syntax

`exec agent removeProtectedtoken <token>`

</details>

<details>

<summary>presignHash</summary>

Identifies a hash that will automatically be considered signed

#### Parameters

- `hash` - The hash that will be considered signed automatically. (bytes)

#### Permissions
The entity executing the action via the agent will need the `ADD_PRESIGNED_HASH_ROLE` role.

#### Syntax

`exec agent presignHash <hash>`

</details>

<details>

<summary>setDesignatedSigner</summary>

Sets an ETH address as the designated signer of the app, which then can sign messages on behalf of the app. 

#### Parameters

- `address` - The address of the entity you want to designate as the signer. (ETHaddress)

#### Permissions

The entity executing the action via the agent will need the `DESIGNATE_SIGNER_ROLE` role.

#### Syntax

`exec agent setDesignatedSigner <address>`

</details>

<details>
<summary>transfer</summary>

Transfers tokens from the agent to a specified ETH adress.

#### Parameters

- `token` - The token contract address of the token you wish to transfer. (ETHaddress) 
- `to` - The ETH address to send tokens to. (ETHaddress)
- `value` - The amount of tokens you wish to send, taking into consideration the decimal precision. (uint256)

#### Permissions

The entity executing the action via the agent will need the `TRANSFER_ROLE` role.

#### Syntax 

`exec agent transfer <token> <to> <value>`

</details>


## External Actions
The agent uses the `act` command to interact with external entities such as smart contracts. The entity wishing to execute an external action will need the role `EXECUTE_ROLE`.
 The syntax is as follows:

```
act <agent> <targetEthereumAddress> <function> [inputParameters]
```

The functions for a given *verified* smart contract can be found on the `write` or `write proxy` page in the network's block explorer. For example here is the [contract for the DAI Stablecoin](https://etherscan.io/token/0x6b175474e89094c44da98b954eedeac495271d0f#writeContract). We can use the basic task of sending DAI to another address to showcase the syntax for `act`:

```
act agent @token(DAI) transfer(address,uint256) @me 100e18
```

As you can see, we make use of the helpers @token and @me to retreive the required addresses.


A more complete example could be to approve and deposit 1,000 DAI from the agent to the Agave Pool V2 ([`0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9`](https://etherscan.io/address/0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9#writeProxyContract)).

```
act agent @token(DAI) approve(address,unint256) 0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9 1000e18
act agent 0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9 deposit(address,uint256,address,uint16) @token(DAI) 1000e18 agent 0
```

For an exhaustive list of functions that agent can perform, check out the [contract's code on Github](https://github.com/aragon/aragon-apps/blob/master/apps/agent/contracts/Agent.sol)
