---
id: disputableVoting
title: Disputable voting
---

Disputable Voting (Also referred to as Tao Voting or Decision Voting) is an app developed by [1Hive](https://1hive.org/), it has no UI and should be accessed by a deployed instance of [Gardens](https://gardens.1hive.org/#/home). Gardens is a tool for DAOs that utlisizes Aragon OS with a custom UI on top. Learn more about [Disputable Voting in the Gardens Documentation](https://1hive.gitbook.io/gardens/on-chain-governance/garden-framework/decision-voting).

## App Roles

Before installing an app you should consider any permissions it will need to fit your purposes. Here is an exhaustive list of roles for the disputable voting app:

 - `CREATE_VOTES_ROLE` 
    - Allows a given entity to create votes in the disputable voting app
 - `CHANGE_VOTE_TIME_ROLE`
    - Allows a given entity to change the voting time in the disputable voting app
 - `CHANGE_SUPPORT_ROLE`
    - Allows a given entity to change the suppport required in the disputable voting app 
 - `CHANGE_QUORUM_ROLE`
    - Allows a given entity to change the minimum approval in the disputable voting app
 - `CHANGE_DELEGATED_VOTING_PERIOD_ROLE` 
    - Allows a given entity to change the delegated voting period in the disputable voting app
 - `CHANGE_EXECUTION_DELAY_ROLE` 
    - Allows a given entity to change the execution delay in the disputable voting app
 - `CHANGE_QUIET_ENDING_ROLE`
    - Allows a given entity to change the quiet ending period in the disputable voting app 

### Types of Entities

There are four eligible entities you can choose from: App, Anyone, Token Holders, Specified Eth Address.

- Anyone is expressed as `ANY_ENTITY` and can be any user visiting your DAO with a web wallet.
- Token Holders is expressed as token-manager and is affiliated with your token-managers token. Anyone holding the token-manager's token is inside of this entity
- Specified Eth Address is expressed as the ETH address starting with `0x`, only this address will be the specified entity.
- App is the internal name of the internal Aragon App installed on your DAO, such as `voting`, `token-manager`, or `agent`

## Granting Permissions

:::warning
This command can potentially remove a permission manager if it is set to the wrong address, making the permission unable to be changed in the future. We usually want to set the main voting app as the permission manager of all permissions.

The most critical permissions are argumentably the ones on the Kernel (DAO main contract) and the ACL (permission management contract), so be careful who we grant them to.
:::

To grant permissions you'll use the following syntax:

`grant <entity> <app> <roleName> [defaultPermissionManager]`

In practice this would look like:

`grant token-manager disputable-voting CREATE_VOTES_ROLE disputable-voting`

This would allow token holders of the associated token-manager to create votes on the disputable voting app.

## Installing the App

In order to install the Disputable voting app you'll need to define some parameters:

- token
    - This is the associated token address used to vote in disputable voting
- voteTime 
    - The amount of time votes should be open and eligible to be voted on, this is usually expressed in seconds but can use EVM-crispr's syntatic sugar for [expressing time](/getStarted/syntaxSugar#time).
- supportRequiredPct 
    - The percentage of YES votes vs. NO votes needed to pass a proposal. This is expressed as a decimal percent to the power of 18. i.e 75% = `75e16` (7500000000000000)
- minAcceptQuorumPct
    - The percentage of YES votes vs. the total token supply needed to pass a proposal. This is expressed as a decimal percent to the power of 18. i.e 25% = `25e16` (2500000000000000)
- delegatedVotingPeriod
    - The amount of time votes are eligible to be voted on by delegates, this is usually expressed in seconds but can use EVM-crispr's syntatic sugar for [expressing time](/getStarted/syntaxSugar#time).
- quietEndingPeriod
    - The amount of time where disputable voting will watch for a change of outcome, this is usually expressed in seconds but can use EVM-crispr's syntatic sugar for [expressing time](/getStarted/syntaxSugar#time).
- quietEndingExtension
    - The amount of time where disputable voting will extend the vote duration in case of a change of outcome during the quietEndingPeriod. This parameter is usually expressed in seconds but can use EVM-crispr's syntatic sugar for [expressing time](/getStarted/syntaxSugar#time).
- executionDelay
    - The amount of time from when a vote ends until the proposed execution will be executed, this is usually expressed in seconds but can use EVM-crispr's syntatic sugar for [expressing time](/getStarted/syntaxSugar#time).

To install the app follow this syntax:

```
install disputable-voting.open:new <tokenAddress> <voteTime> <supportRequiredPct> <minAcceptQuorumPct> <delegatedVotingPeriod> <quietEndingPeriod> <quietEndingExtension> <executionDelay>
// add any permissions you want to grant here.
```

## Revoking Permissions

:::warning
 This command can potentially remove a permission that is needed for the DAO to work. Be careful to not remove the permissions to create votes in voting, create permissions in ACL, or manage apps in the Kernel.
:::

To remove a permission from an entity follow this syntax:

`revoke <entity> <app> <roleName> [removePermissionManager?]`

in practice this could look like:

`revoke disputable-voting.open:0 disputable-voting.open:1 CHANGE_VOTE_TIME_ROLE false`

This would remove the ability of the first disputable voting app to change the voting time of the second disputable voting app

## Modifying the App 

We can modify the settings of the disputable voting app using the `exec` command. This is the base syntax:

`exec <app> <methodName> [parameters]`

For example: 
`exec disputable-voting.open changeQuietEndingConfiguration 1d 3d`

which would change the quiet ending period and quiet ending extension to 1 day and 3 days respectively.

You can find an exhaustive list of all functions applicable to disputable voting on the [contract's code on Github](https://github.com/1Hive/disputable-voting-app/blob/master/contracts/DisputableVoting.sol)