---
id: voting
title: Voting 
---
import useBaseUrl from '@docusaurus/useBaseUrl'
import styles from '../src/css/articles.css'

The Voting App will allow your DAO members to create votes that will usually execute internal DAO actions or external interactions with other Ethereum Addresses, including smart contracts. 


## Installing the App


The syntax is as follows to install this app:

```
install voting:new <votingTokenAddress> <supportRequiredPercent> <miniumApproval> <voteDuration> 
```

You'll need the following parameters to install a new Voting App to your DAO:

- `votingTokenAddress`
    - This is the token your DAO recognizes to give voting power to your members. You should, by default, already have a MiniMe Token associated with your DAO from setup in the `Tokens` App. To learn how to configure a new token for your app, check out the [`Tokens` section](token-manager).
- `supportRequiredPercent`
    - This is the percent of YES votes vs. NO votes needed to pass a proposal. This parameter is expressed in WAD. i.e., for a Support Required of 51%, this is 0.51, which in WAD equals *51e16* (51000000000000000000).
- `miniumApproval`
    - This is the YES votes needed from the total token supply. This parameter is expressed in WAD, similar to the example above in Support Required.
- `voteDuration` 
    - This is the amount of time each vote remains open, be aware that currently, we cannot change this parameter once it is set, so choose wisely. This parameter is expressed in seconds, although you can append the letters "s", "m", "h", "w", "mo", and "y" at the end of the number.

### Common Usage Example

After installing a new voting app, one of the most important permissions to set up is the `CREATE_VOTES_ROLE`. Without it, the app is useless.

```
load aragonos as ar

ar:connect exampleDAO token-manager voting (
  install voting:new @token(HNY) 50e16 10e16 3d
  grant ANY_ADDRESS voting:new CREATE_VOTES_ROLE voting:new
)
```

import InstallVersioning from '../partials/_installVersioning.mdx'

<InstallVersioning />

## Granting Permissions

:::warning
This command can potentially burn a permission manager if it is set to the wrong address, making the permission unable to be changed in the future. It is because we usually want to set the main voting app as the permission manager of all permissions.
:::

To grant permissions, you'll use the following syntax:

```
grant <entity> <app> <roleName> [defaultPermissionManager]
```

In practice, it could look something like this:

```
grant ANY_ENTITY voting CREATE_VOTES_ROLE voting
```

It would permit any entity to create votes on the voting app, and the voting app manages the permission itself.

Before installing an app, you should consider any permissions needed to fit your purposes. Here is an exhaustive list of roles for the voting app:

- `CREATE_VOTES_ROLE`
    - Which entity can create a vote.
- `MODIFY_SUPPORT_ROLE`
    - Which entity can change the Support Required Percent.
- `MODIFY_QUORUM_ROLE`
    - Which entity can change the Minimum Approval Percent.


import TypesOfEntities from '../partials/_typesOfEntities.mdx';

<TypesOfEntities />

import OracleGrant from '../partials/_oracleGrant.mdx';

<OracleGrant />


## Revoking Permissions

:::warning
 This command can remove the permission needed for the DAO to work. Be careful if you remove the CREATE_VOTES_ROLE. It may break the DAO.
:::

To remove permission from an entity, follow this syntax:

```
revoke <entity> <app> <roleName> [removePermissionManager]
```

In practice, this could look like this:

```
revoke ANY_ENTITY voting CREATE_VOTES_ROLE false
```

It would remove the ability for anyone to create votes in the voting app while keeping the Permission Manager in place should this permission need to be modified in the future.


## Internal Actions

Using the `exec` command, we can create internal actions that will modify the settings of our Voting app.

To showcase the `exec` command, we'll use the two most common modifications, `changeMinAcceptQuorumPct` and `changeSupportRequiredPct`. We use the following base syntax:

```
exec <app> <methodName> [parameters]
```

For example:

```
load aragonos as ar

ar:connect exampleDAO token-manager voting (
  exec voting changeMinAcceptQuorumPct 18e16 # This would change the Minimum Approval to 18%
  exec voting changeSupportRequiredPct 50e16 # This would change the Support Required to 50%
)
```

Below is an exhaustive list of all possible actions you can perform with the Voting app. In addition we will identify the function in the contract and outline any parameters and permissions you need and the expected syntax to run them.

<details><summary>changeSupportRequiredPct</summary>

This function will change the Support Required Percentage needed to pass votes on the voting app.

#### Parameters

- `supportRequiredPct` - This is the percentage you wish to change your Support Required. It is expressed in WAD with a decimal precision of 18. (uint256) 

#### Permissions

The entity creating the action will need the `MODIFY_SUPPORT_ROLE` role.

#### Syntax

```
exec voting changeSupportRequiredPct <supportRequiredPct>
```

#### Usage Example

The following script would change the Support Required to 51%:

```
exec voting changeSupportRequiredPct 51e16
```

</details>

<details><summary>changeMinAcceptQuorumPct</summary>

This function will change the Minimum Approval percentage needed to pass votes on the voting app.

#### Parameters

- `minAcceptQuorumPct` - This is decimal value of the percentage you wish to change your Minimum Approval to. It is expressed in WAD with decimal precision of 18. (uint256)

#### Permissions

The entity creating the action will need the `MODIFY_QUORUM_ROLE` role.

#### Syntax

```
exec voting changeMinAcceptQuorumPct <minAcceptQuorumPct>
```

#### Usage Example

The following script would change the Minimum Quorum to 10%:

```
exec voting changeMinAcceptQuorumPct 10e16
```

</details>

<details><summary>newVote</summary>

This function will create a new vote on the voting app.

#### Parameters

- `executionScript` - This is the EVM script that will be executed on approval and execution of the vote. (bytes)
- `metadata` - The metadata of the vote. (string)
- `castVote` - Whether or not to cast your vote along with the vote creation. (boolean) 
- `executesIfDecided`- Whether to immediately execute a newly created vote if it passes with the casting vote. (boolean)

#### Permissions

The entity creating the action will need the `CREATE_VOTES_ROLE` role.

#### Syntax

```
exec voting newVote <exectuionScript> <metadata> <castVote> <executesIfDecided>
```

</details>

<details><summary>vote</summary>

This function will cast your vote if eligible on the specified vote on the voting app.

#### Parameters 

- `voteId` - The vote ID number on the voting app you wish to vote on. (uint256) 
- `supports` - Where the entity supports the vote or not. (boolean)
- `executesIfDecided` - If the action should execute the vote if the vote passes, resulting from the casting vote. (boolean)

#### Permissions

No additional permissions are needed to perform this function.

#### Syntax 

```
exec voting vote <voteId> <supports> <executesIfDecided>
```

</details>

<details><summary>executeVote</summary>

This function will execute, if possible, an existing vote that has already passed.

#### Parameters

- `voteId` - The vote ID number on the voting app you wish to vote on. (uint256) 

#### Permissions

No additional permissions are needed to perform this function.

#### Syntax

```
exec voting executeVote <voteId>
```

</details>