---
id: vote-aggregator
title: Vote Aggregator
---
import useBaseUrl from '@docusaurus/useBaseUrl'
import styles from '../src/css/articles.css'

This is an Aragon App that can aggregate voting weight from multiple checkpointed ERC20 tokens into a single voting token. It has no UI and can only be manipulated directly from the smart contract or using EVMcrispr. For ERC20 tokens without checkpointing you can use the [Token Wrapper app](./token-wrapper.md) to wrap them into a compatible token type.

The Vote Aggregator was built by Aragon then expanded and maintained by 1Hive. it is currently used in the default deployment of [Gardens](https://gardens.1hive.org/#/home) in the [Disputable Voting App](./disputableVoting.mdx).

## Installing the App

The syntax is as follows to install this app:

```
install vote-token-aggregator.open <tokenName> <tokenSymbol> <tokenDecimals>
```

You'll need the following parameters to install a new Vote Aggregator to your DAO:

- `tokenName`
    - The name of the token you wish to create.
- `tokenSymbol`
    - The symbol you wish to set for the token.
- `tokenDecimals`
    - The number of decimal precision you wish to set for the token. The default decimal precision is 18.

### Common Usage Example

An example for how to install this app is as follows:

```
load aragonos as ar

ar:connect exampleDAO token-manager voting (
  install vote-token-aggregator.open:new "VA Test Token" "VATT" 18
  grant voting vote-token-aggregator.open:new ADD_POWER_SOURCE_ROLE voting
)
```

This command would install a new Vote Aggregator app into your Aragon DAO, named "VA Test Token" with the token symbol VATT and decimal precision of 18. In the next line we grant the Voting Aggregator app the permission to add new power sources (tokens) to be aggregated by the app. Refer to the [Power Sources](#power-sources) section, to learn more about adding power sources.

:::caution
*There is a known bug inside of the Vote Aggregator App that will prevent you from granting and using the `MANAGE_POWER_SOURCE_ROLE`. Fortunately there is a work around, you'll have to add the permission manually into the ACL(App Permission Manager). In order to do this, add this line to your installation script:
```
  exec acl createPermission voting vote-token-aggregator.open @id(MANAGE_POWER_SOURCE_ROLE) voting
```

This will allow the voting app to utilize the aforementioned role, which is necessary for enabling and disabling power sources. Once you add this in to your app, this permission can be managed normally through the `grant` and `revoke` commands.
:::

import InstallVersioning from '../partials/_installVersioning.mdx'

<InstallVersioning />

## Granting Permissions

:::warning
This command can potentially burn a permission manager if it is set to the wrong address, making the permission unable to be changed in the future. It is because of this, that we usually want to set the main voting app as the permission manager of all permissions.
:::

To grant permissions, you'll use the following syntax:

```
grant <entity> <app> <roleName> [defaultPermissionManager]
```

In practice, it could look something like this:

```
grant ANY_ENTITY vote-token-aggregator.open ADD_POWER_SOURCE_ROLE voting
```

It would permit any entity to add a power source to the Vote Aggregator, and the voting app manages the permission.

Before installing an app, you should consider any permissions needed to fit your purposes. Here is an exhaustive list of roles for the Vote Aggregator app:

- `ADD_POWER_SOURCE_ROLE`
    - Which entity can add a power source.
- `MANAGE_POWER_SOURCE_ROLE`*
    - Which entity can enable or disable added power sources.
- `MANAGE_WEIGHTS_ROLE`
    - Which entity can modify the weights of added power sources.


import TypesOfEntities from '../partials/_typesOfEntities.mdx';

<TypesOfEntities />

import OracleGrant from '../partials/_oracleGrant.mdx';

<OracleGrant />


## Revoking Permissions


To remove permission from an entity, follow this syntax:

```
revoke <entity> <app> <roleName> [removePermissionManager]
```

In practice, this could look like this:

```
revoke ANY_ENTITY vote-token-aggregator.open ADD_POWER_SOURCE_ROLE false
```

It would remove the ability for anyone to add a power source to the Vote Aggregator while keeping the Permission Manager in place should this permission need to be modified in the future.

## Power Sources

"Power sources" are checkpointed ERC20 tokens that are added to the Vote Aggregator as sources of voting power to aggregate. Power sources come with a weight property, which is their relative voting weight compared to other power sources. You can have a maximum of 20 power soucres connected to a single Vote Aggregator app.

:::info
The total supply of a token that can be aggregated from a single source is limited to a maximum amount of 2^192 (6,277,101,735,386,680,763,835,789,423,207,666,416,102,355,444,464,034,512,896), not including decimals. If a total token supply is past this number, it will only be aggregated up until the maximum aforementioned amount, which could cause voting anomalies. 
:::

Power sources are given a relative weight in whole numbers, starting from `1` with nearly no maximum limit (uint256). You can learn more about how to add a power source further below in [Internal Actions](#internal-actions).

### Example Vote Aggregation Calculation

In this scenario we have one hypothetical voter and 3 tokens added as power sources to the vote aggregator: Token A, Token B, Token C. The distribution is as follows:

> - _Token A has a weight of 1_ 
>     - It has a total supply of 100 and the voter holds 20 tokens
>     - With the weight of 1 applied the relative amounts remain the same
> - _Token B has a weight of 3_
>     - It has a total supply of 400 and the voter holds 50 tokens
>     - With the weight of 3 applied the relative amounts become 1200 and 150, respectively 
> - _Token C has a weight of 4_
>     - It has a total supply of 1200 and the voter holds 100 tokens
>     - With the weight of 4 applied the relative amounts become 4800 and 400, respectively 
> 
> Given these amounts and their weight, the **final voting token supply becomes 6100**, where the **voter holds 570 tokens**, having a **relative voting power of 9.34%** of the total.

## Internal Actions

Using the `exec` command, we can create internal actions that will modify the settings of our app.

Below is an exhaustive list of all possible internal actions you can perform with the Vote Aggregator app. In addition, we will identify the function in the contract and outline any parameters and permissions you need and the expected syntax to run them.


<details><summary>addPowerSource</summary>
This function will add an existing checkpointed ERC20 (or MiniMe) token that will be aggregated into a single, weighted token, which is represented by the Vote Aggregator app itself.

#### Parameters
- `sourceAddress` - The address of the token you wish to add to the Vote Aggregator. (address) 
- `sourceType` - The interface type of the power source. You can bring either a checkpointed ERC20 or an ERC900 interface. There are three options however:
    - 0 = Invalid (don't pick this)
    - 1 = Checkpointed ERC20
    - 2 = ERC900
- `weight` - The relative voting weight of the power source to be added. [Learn more](#power-sources). (uint256)

#### Permissions

The entity creating the action will need the `ADD_POWER_SOURCE` role.

#### Syntax

```
exec vote-token-aggregator.open addPowerSource <sourceAddress> <sourceType> <weight>
```

#### Usage Example

The following script would add a currently installed token-manager token to the Vote Aggregator, with a weight of 1:

```
exec vote-token-aggregator.open addPowerSource token-manager::token() 1 1
```
</details>

<details><summary>changeSourceWeight</summary>
This function will change the voting weight of an already added power source.

#### Parameters 

- `sourceAddress` - The token address of the already added power source.
- `weight` - the desired voting weight you wish to updated the power source with.

#### Permissions

The entity creating the action will need the `MANAGE_WEIGHTS_ROLE` role.

#### Syntax

```
exec vote-token-aggregator.open changeSourceWeight <sourceAddress> <weight>
```

#### Usage Example

The following script would change the voting weight of the added power source (token-manager token) to 3.

```
exec vote-token-aggregator.open changeSourceWeight token-manager::token() 3
```

</details>

<details><summary>disableSource</summary>

This function will disable an already added power source, removing its voting power from the Vote Aggregator. It can be re-enabled with the `enableSource` function.

#### Parameters 

- `sourceAddress` - The token address of the already added power source.

#### Permissions

The entity creating the action will need the `MANAGE_WEIGHTS_ROLE` role.

#### Syntax

```
exec vote-token-aggregator.open disableSource <sourceAddress>
```

#### Usage Example

The following script would disable the power source of the token-manager token.

```
exec vote-token-aggregator.open disableSource token-manager::token()
```

</details>

<details><summary>enableSource</summary>
This function will enable an already added power source, that has been disabled. This will re-add voting power from the power source to the Vote Aggregator.

#### Parameters 

- `sourceAddress` - The token address of the already added power source.

#### Permissions

The entity creating the action will need the `MANAGE_WEIGHTS_ROLE` role.

#### Syntax

```
exec vote-token-aggregator.open enableSource <sourceAddress>
```

#### Usage Example

The following script would re-enable the power source of the token-manager token.

```
exec vote-token-aggregator.open enableSource token-manager::token()
```

</details>

<details><summary>balanceOf</summary>
This is a read-only function that will return the aggregated voting power for a given address.

#### Parameters 

- `ownerAddress` - The address you wish to look up the voting power of.

#### Syntax

```
print vote-token-aggregator.open::balanceOf(<ownerAddress>)

OR

$set votingBalance vote-token-aggregator::balanceOf(<ownerAddress>)
```

#### Usage Example

There's a few different ways to use this function.

To print a UI notification for the voting power for the connected address:
```
print vote-token-aggregator.open::balanceOf(@me)
```

To save the result as a variable to used later in your script:
```
$set votingBalance vote-token-aggregator::balanceOf(@me)
```

</details>

<details><summary>balanceOfAt</summary>
This is a read-only function that will return the aggregated voting power for a given address at a given block number.

#### Parameters 

- `ownerAddress` - The address you wish to look up the voting power of.
- `blockNumber` - The historical block number you wish to check from. 

#### Syntax

```
print vote-token-aggregator.open::balanceOfAt(<ownerAddress>, <blockNumber>)

OR

$set votingBalance vote-token-aggregator::balanceOf(<ownerAddress>)
```

#### Usage Example

There's a few different ways to use this function.

To print a UI notification for the voting power for the connected address:
```
print vote-token-aggregator.open::balanceOf(@me)
```

To save the result as a variable to be used later in your script:
```
$set votingBalance vote-token-aggregator::balanceOf(@me)
```

</details>

<details><summary>totalSupply</summary>
This is a read-only function that will return the total supply of all voting power aggregated by the voting aggregator.

#### Syntax

```
print vote-token-aggregator.open::totalSupply()

OR

$set votingBalance vote-token-aggregator::totalSupply()
```

#### Usage Example

There's a few different ways to use this function.

To print a UI notification for the total supply of the Vote Aggregator:
```
print vote-token-aggregator.open::totalSupply()
```

To save the result as a variable to be used later in your script:
```
$set votingBalance vote-token-aggregator.open::totalSupply()
```

</details>

<details><summary>totalSupplyAt</summary>
This is a read-only function that will return the total supply of all voting power aggregated by the voting aggregator at a given block number.

#### Parameters

- `blockNumber` - The historical block number you wish to check from. 

#### Syntax

```
print vote-token-aggregator.open::totalSupplyAt(<blockNumber>)

OR

$set votingBalance vote-token-aggregator::totalSupplyAt(<blockNumber>)
```

#### Usage Example

There's a few different ways to use this function.

To print a UI notification for the total supply of the Vote Aggregator at block number `25913773` on gnosis chain:
```
switch gnosis
print vote-token-aggregator.open::totalSupplyAt(25913773)
```

To save the result as a variable to be used later in your script:
```
switch gnosis
$set votingBalance vote-token-aggregator.open::totalSupplyAt(25913773)
```
</details>
