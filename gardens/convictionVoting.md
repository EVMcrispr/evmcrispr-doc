---
id: convictionVoting
title: Conviction Voting
---

Conviction Voting is an app developed by [1Hive](https://1hive.org/), it has no UI and should be accessed by a deployed instance of [Gardens](https://gardens.1hive.org/#/home). Gardens is a tool for DAOs that utlisizes Aragon OS with a custom UI on top. Learn more about [Conviction Voting in the Gardens Documentation](https://1hive.gitbook.io/gardens/on-chain-governance/garden-framework/conviction-voting).

## App Roles

Before installing an app you should consider any permissions it will need to fit your purposes. Here is an exhaustive list of roles for the conviction voting app:

- `PAUSE_CONTRACT_ROLE`
    - Allows the given entity to pause or unpause the contract, effectively preventing or allowing interaction with the app .
- `UPDATE_SETTINGS_ROLE`
    - Allows the given entity to change the settings of the app. This includes the `setStableTokenOracleSettings`, `setFundsManager`, `decay`, `maxRatio`, `weight` and `minThresholdStakePercentage` settings. 
- `CREATE_PROPOSALS_ROLE`
    - Allows the given entity to create a proposal on the app.
- `CANCEL_PROPOSALS_ROLE`
    - Allows the given entity to cancel a proposal on the app.

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

`grant disputable-voting.open conviction-voting.open UPDATE_SETTINGS_ROLE disputable-voting.open`

This would grant the disputable voting app the permission to change the settings of the conviction voting app.

## Calculating Conviction Voting Settings

There's a few key algorithms you should know in order to properly calculate your conviction voting settings. We'll outline the UI parameters and how to translate those into function parameters that you'll use to install or update your app.

- **spendingLimit** - The maximum percent of funds in the Common Pool that can be requested in a single proposal.
- **minConviction** - The minimum percentage of total active voting tokens that must be staked on a proposal in order for it to generate enough conviction to pass.
- **minEffectiveSupply** - In case of a low effective supply this is a virtual percentage of the total token supply applied to your conviction voting app. It prevents proposals from passing quickly when the effective supply is low.
- **convictionGrowthInSeconds** - Also known as half-life or conviction growth. This determines the rate at which conviction accumulates or reduces voting power by 50%.

```
decay formula: 10,000,000*(1/2)^(BlockTime/convictionGrowthInSeconds)
maxRatio: 10^7 * spendingLimit
weight: 10^7 * spendingLimit^2 * minConviction
minThresholdStakePct: 10^18* minEffectiveSupply

current Gnosis Chain BlockTime: 5 seconds
```

As an example: 
> We want a Conviction Growth of 2 days, meaning it will take 2 days for Conviction to accumulate from 0% to 50%, this is 172800 seconds, and we assume we are using Gnosis Chain. Our > formula would be: `100000000 * (1/2)^(5/172800)` which would result in a decay of `9999799`.
>
> Our spending limit is 10%. Our formula would be: `100000000 * 0.1` which would result in a maxRatio of `1000000`.
>
> Our minConviction is 3% and our spending limit is 10%. Our formula would be `10000000 * 0.1^2 * 0.03` which would result in a weight of `3000`
>
>The minimumEffectiveSupply is set to 2%. Our formula would be `10000000000000000000 * 0.02` which would give a minThresholdStakePct of `20000000000000000`

## Installing the App

To install the conviction voting app you'll need the following parameters:

- `stakeToken` 
    - The address of the token used to stake on proposals.
- `requestToken`
    - The address of the token being requested by the proposal.
- `stabletoken`
- `stableTokenOracle`
- `fundsManager`
- `decay`
    - Can be derived using the calculations outlined in the [section above](/gardens/convictionVoting#calculating-conviction-voting-settings).
- `maxRatio`
    - Can be derived using the calculations outlined in the [section above](/gardens/convictionVoting#calculating-conviction-voting-settings).
- `weight`
    - Can be derived using the calculations outlined in the [section above](/gardens/convictionVoting#calculating-conviction-voting-settings).
- `minThresholdStakePercentage`
    - Can be derived using the calculations outlined in the [section above](/gardens/convictionVoting#calculating-conviction-voting-settings).

Once you have your parameters you can follow this syntax:

```
install conviction-voting.open <stakeToken> <requestToken> <stableToken> <stableTokenOracle> <fundsManager> <decay> <maxRatio> <weight> <minThresholdStakePercentage>
// add any permissions you want to grant here.
```

In practice this could look like:
`install conviction-voting.open`

## Revoking Permissions

:::warning
 This command can potentially remove a permission that is needed for the DAO to work. Be careful to not remove the permissions to create votes in voting, create permissions in ACL, or manage apps in the Kernel.
:::

To remove a permission from an entity follow this syntax:

`revoke <entity> <app> <roleName> [removePermissionManager?]`

In practice this could look like:

`revoke 0x123456789abcdef123456789abcdef0123456789 conviction-voting.open PAUSE_CONTRACT_ROLE false`

Which would remove the ability of the specified address (perhaps a multisig) to pause the conviction voting contract, while keeping the Permission Manager in place should this permission need to be modified in the future.


## Internal Interactions

We can modify the settings of the conviction voting app using the `exec` command, as well as perform interactions with the app. This is the base syntax:

`exec <app> <methodName> [parameters]`

For example: 

`exec conviction-voting.open setConvictionCalculationSettings 9999919 1000000 3000 20000000000000000`

Which would update our conviction voting settings with these values:

- Conviction Growth: 5 days
- Minimum Conviction: 3%
- Spending Limit: 10%
- Minimum Effective Supply: 2%