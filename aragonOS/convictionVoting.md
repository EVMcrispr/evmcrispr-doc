---
id: convictionVoting
title: Conviction Voting
---
import useBaseUrl from '@docusaurus/useBaseUrl'
import styles from '../src/css/articles.css'
import TypesOfEntities from '../partials/_typesOfEntities.mdx'

Conviction Voting is an app developed by [1Hive](https://1hive.org/), it has no UI and should be accessed by a deployed instance of [Gardens](https://gardens.1hive.org/#/home). Gardens is a tool for DAOs that utilizes Aragon OS with a custom UI on top. Learn more about [Conviction Voting in the Gardens Documentation](https://1hive.gitbook.io/gardens/on-chain-governance/garden-framework/conviction-voting).

## Installing the App

To install the conviction voting app you'll need the following parameters:

- `stakeToken` 
    - The address of the token used to stake on proposals.
- `requestToken`
    - The address of the token being requested by the proposal.
- `stableToken`
    - The token that is used to compare against the request token to find its relative price.
- `stableTokenOracle`
    - The oracle used to get the price of the `stableToken`*
- `fundsManager`
    - An external app used to manage the funds in the Garden's Treasury**
- `decay`
    - Can be derived using the calculations outlined in the [section below](/gardens/convictionVoting#calculating-conviction-voting-settings).
- `maxRatio`
    - Can be derived using the calculations outlined in the [section below](/gardens/convictionVoting#calculating-conviction-voting-settings).
- `weight`
    - Can be derived using the calculations outlined in the [section below](/gardens/convictionVoting#calculating-conviction-voting-settings).
- `minThresholdStakePercentage`
    - Can be derived using the calculations outlined in the [section below](/gardens/convictionVoting#calculating-conviction-voting-settings).

    
    
    :::tip
    If you want to use a new token for your conivction voting app you'll need a new Oracle - You can find more information here: https://docs.uniswap.org/contracts/v2/guides/smart-contract-integration/building-an-oracle. You can find the github repository for installing a new fund-manager here: https://github.com/1Hive/funds-manager-app

    If you would like to use the same token oracle and same fund-manager apps you can get them from the already installed conviction voting app using the [getter helper](../getStarted/syntaxSugar#getting-contract-info-with-) in EVMcrispr. Use this syntax:
    ```
    set $StableTokenOracle conviction-voting.open::stableTokenOracle();
    set $FundsManager conviction-voting.open::fundsManager();
    ```
    This should be used within your `connect` command and will set those variables to be used in your `install` command
    :::


Once you have your parameters you can follow this syntax:

```
install conviction-voting.open <stakeToken> <requestToken> <stableToken> <stableTokenOracle> <fundsManager> <decay> <maxRatio> <weight> <minThresholdStakePercentage>
# add any permissions you want to grant here.
```

For example this could be a recommended installation, including giving the necessary permissions to allow the app to function normally:

```
load aragonos as ar
set $token.tokenlist https://tokens.honeyswap.org/

connect evmcrisprgardens disputable-voting.open (
    set $StableTokenOracle conviction-voting.open::stableTokenOracle();
    set $FundsManager conviction-voting.open::fundsManager();
    install conviction-voting.open:new 0xfFBAbEb49be77E5254333d5fdfF72920B989425f  @token(GIV) @token(wxDAI) $StableTokenOracle $FundsManager 9999799 1000000 3000 20000000000000000
    grant disputable-voting.open conviction-voting.open:new UPDATE_SETTINGS_ROLE disputable-voting.open
    grant disputable-voting.open conviction-voting.open:new CANCEL_PROPOSALS_ROLE disputable-voting.open
    grant ANY_ENTITY conviction-voting.open:new CREATE_PROPOSALS_ROLE disputable-voting.open
    grant ANY_ENTITY conviction-voting.open:new CHALLENGE_ROLE disputable-voting.open
    grant disputable-voting.open conviction-voting.open:new PAUSE_CONTRACT_ROLE disputable-voting.open
    grant agreement.open conviction-voting.open:new SET_AGREEMENT_ROLE disputable-voting.open
)
```

This would initialize the voting app using the staking token as 0xfFBAbEb49be77E5254333d5fdfF72920B989425f (gGIV) the request token as $GIV, the stable token as wxDAI and the same stable token oracle and funds manager as the currently installed conviction voting app. Using the conviction calculation settings our conviction growth, spending limit, minimum conviction and minimun effective supply are 2 days, 10%, 3%  and 2% respectively. 

We grant disputable voting control of all the major permissions, and assign any entity to make or challenge proposals, given they meet the agreement apps requirements, lastly we also set the agreement app to control changing the agreement app.

## Calculating Conviction Voting Settings

There's a few key algorithms you should know in order to properly calculate your conviction voting settings. We'll outline the UI parameters and how to translate those into function parameters that you'll use to install or update your app.

- **`spendingLimit`** - The maximum percent of funds in the Common Pool that can be requested in a single proposal.
- **`minConviction`** - The minimum percentage of total active voting tokens that must be staked on a proposal in order for it to generate enough conviction to pass.
- **`minEffectiveSupply`** - In case of a low effective supply this is a virtual percentage of the total token supply applied to your conviction voting app. It prevents proposals from passing quickly when the effective supply is low.
- **`convictionGrowthInSeconds`** - Also known as half-life or conviction growth. This determines the rate at which conviction accumulates or reduces voting power by 50%.

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

## Granting Permissions

:::warning
This command can potentially remove a permission manager if it is set to the wrong address, making the permission unable to be changed in the future. We usually want to set the main voting app as the permission manager of all permissions.

The most critical permissions are argumentably the ones on the Kernel (DAO main contract) and the ACL (permission management contract), so be careful who we grant them to.
:::

To grant permissions you'll use the following syntax:

```
grant <entity> <app> <roleName> [defaultPermissionManager]
```

In practice this would look like:

```
grant disputable-voting.open conviction-voting.open UPDATE_SETTINGS_ROLE disputable-voting.open
```

This would grant the disputable voting app the permission to change the settings of the conviction voting app.

Before installing an app you should consider any permissions it will need to fit your purposes. Here is an exhaustive list of roles for the conviction voting app:

- `PAUSE_CONTRACT_ROLE`
    - Allows the given entity to pause or unpause the contract, effectively preventing or allowing interaction with the app .
- `UPDATE_SETTINGS_ROLE`
    - Allows the given entity to change the settings of the app. This includes the `setStableTokenOracleSettings`, `setFundsManager`, `decay`, `maxRatio`, `weight` and `minThresholdStakePercentage` settings. 
- `CREATE_PROPOSALS_ROLE`
    - Allows the given entity to create a proposal on the app.
- `CANCEL_PROPOSALS_ROLE`
    - Allows the given entity to cancel a proposal on the app.
- `SET_AGREEMENT_ROLE`
    - Allows the given entityt to change the agreement app used for the app.
- `CHALLENGE_ROLE`
    - Allows the given entity to challenge active proposals on the app.

<TypesOfEntities />

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

Here is an exhaustive list of internal actions you can perform with the conviction voting app:

<details><summary>executeProposal</summary>

This function will execute a proposal that has passed and is pending execution.  

#### Parameters

`proposalId` - The id number of the pending proposal. (uint256)

#### Syntax

```
exec conviction-voting.open executeProposal <proposalId> 
```
</details>
<details><summary>stakeAllToProposal</summary>

This function will stake all your available staking tokens on a given proposal.

#### Parameters

- `proposalId` - The id number of the active proposal. (uint256)

#### Syntax

```
exec conviction-voting.open stakeAllToProposal <proposalId> 
```
</details>
<details><summary>setAgreement</summary>

This function will set the agreement app used for your app. The entity executing this function must have the `SET_AGREEMENT_ROLE` role.

#### Parameters

- `agreement` - The address of the agreement app contract. (address)

#### Syntax

```
exec conviction-voting.open setAgreement <agreement> 
```
</details>
<details><summary>setStableTokenOracleSettings</summary>

This function will set the agreement app used for your app. The entity executing this function must have the `UPDATE_SETTINGS_ROLE` role.

#### Parameters

- `stableToken` - The address of the stable token used to compare your request token price. (address)
- `stableTokenOracle` - The address of the oracle you use to fetch the price of your stable token. (address)

#### Syntax

```
exec conviction-voting.open setStableTokenOracleSettings <stableToken> <stableTokenOracle>
```
</details>
<details><summary>addProposal</summary>

This function will add a proposal to be voted on in your conviction voting app. The entity executing this function must have the `CREATE_PROPOSALS_ROLE` role.

#### Parameters

- `title` - The title of your proposal. (string)
- `link` - The IPFS or HTTP link to the description of your proposal converted to hex. (bytes)
- `requestedAmount` - The amount of tokens you are requesting. (uint256)
- `stableRequestAmount?` - Whether or not to convert the requested amount in stable token amount or request token amount, this is converted to the amount in request tokens using the price of the stable token vs. the price of the request token. (boolean) 

#### Syntax

```
exec conviction-voting.open addProposal <title> <link> <requestedAmount> <stableRequestAmount?>
```
</details>
<details><summary>withdrawAllFromProposal</summary>

This function will withdraw all your currently staked tokens on a given proposal.

#### Parameters

- `proposalId` - The id number of the active proposal. (uint256)

#### Syntax

```
exec conviction-voting.open withdrawAllFromProposal <proposalId> 
```
</details>
<details><summary>withdrawFromProposal</summary>

This function will withdraw a specific amount of your currently staked tokens on a given proposal.

#### Parameters

- `proposalId` - The id number of the active proposal. (uint256)
- `amount` - The amount of tokens you wish to withdraw from an active proposal. (uint256)

#### Syntax

```
exec conviction-voting.open withdrawFromProposal <proposalId> <amount>
```
</details>
<details><summary>setFundsManager</summary>

This function will change the funds manager app currently used for your conviction voting app. The entity executing this function must have the `UPDATE_SETTINGS_ROLE` role.

#### Parameters

- `fundsManager` - The contract address of the funds manager app you wish to use. (address)

#### Syntax

```
exec conviction-voting.open setFundsManager <fundsManager>
```
</details>
<details><summary>setConvictionCalculationSettings</summary>

This function will change the conviction voting settings used on your app. The entity executing this function must have the `UPDATE_SETTINGS_ROLE` role.

#### Parameters

- `decay`
    - Can be derived using the calculations outlined in the [section above](/gardens/convictionVoting#calculating-conviction-voting-settings).
- `maxRatio`
    - Can be derived using the calculations outlined in the [section above](/gardens/convictionVoting#calculating-conviction-voting-settings).
- `weight`
    - Can be derived using the calculations outlined in the [section above](/gardens/convictionVoting#calculating-conviction-voting-settings).
- `minThresholdStakePercentage`
    - Can be derived using the calculations outlined in the [section above](/gardens/convictionVoting#calculating-conviction-voting-settings).


#### Syntax

```
exec conviction-voting.open setConvictionCalculationSettings <decay> <maxRatio> <weight> <minThresholdStakePercentage>
```
</details>
<details><summary>addSignalingProposal</summary>

This function will add a signalling proposal to be voted on in your conviction voting app. The entity executing this function must have the `CREATE_PROPOSALS_ROLE` role.

#### Parameters

- `title` - The title of your proposal. (string)
- `link` - The IPFS or HTTP link to the description of your proposal converted to hex. (bytes)

#### Syntax

```
exec conviction-voting.open addProposal <title> <link> 
```
</details>
<details><summary>cancelProposal</summary>

This function will cancel an active proposal. The entity executing this function must have the `CANCEL_PROPOSALS_ROLE` role.

#### Parameters

- `proposalId` - The id number of the active proposal. (uint256)

#### Syntax

```
exec conviction-voting.open cancelProposal <proposalId> 
```
</details>
<details><summary>pauseContract</summary>

This function will pause the conviction voting contract, preventing anyone from calling functions on it. The entity executing this function must have the `PAUSE_CONTRACT_ROLE` role.

#### Parameters

- `pauseEnabled?` - Whether or not to pause the contract. (boolean)

#### Syntax

```
exec conviction-voting.open pauseContract <pauseEnabled?> 
```
</details>
<details><summary>stakeToProposal</summary>

This function will stake a specific amount of your available staking tokens on a given proposal.

#### Parameters

- `proposalId` - The id number of the active proposal. (uint256)
- `amount` - The amount of tokens you wish to stake to an active proposal. (uint256)

#### Syntax

```
exec conviction-voting.open stakeToProposal <proposalId> <amount>
```
</details>
