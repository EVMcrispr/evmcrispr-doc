---
id: convictionVoting
title: Conviction Voting
---
import useBaseUrl from '@docusaurus/useBaseUrl'
import styles from '../src/css/articles.css'
import TypesOfEntities from '../partials/_typesOfEntities.mdx'

Conviction Voting is an app developed by [1Hive](https://1hive.org/). It has no UI and should be accessed by a deployed instance of [Gardens](https://gardens.1hive.org/#/home). Gardens is a tool for DAOs that utilizes Aragon OS with a custom UI on top. Learn more about [Conviction Voting in the Gardens Documentation](https://1hive.gitbook.io/gardens/on-chain-governance/garden-framework/conviction-voting).

## Installing the App

To install the Conviction Voting app, follow this syntax:

```
install disputable-conviction-voting.open:new <stakeToken> <requestToken> <stableToken> <stableTokenOracle> <fundsManager> <decay> <maxRatio> <weight> <minThresholdStakePercentage>
```

You'll need the following parameters:

- `stakeToken` 
    - The address of the token used to stake on proposals.
- `requestToken`
    - The address of the token being requested by the proposal.
- `stableToken`
    - The token that is used to compare against the request token to find its relative price.
- `stableTokenOracle`
    - The [TWAP oracle](https://docs.uniswap.org/contracts/v2/guides/smart-contract-integration/building-an-oracle) that is used to get the price of the `stableToken`.
- `fundsManager`
    - An external app used to manage the funds in the Garden's Treasury**
- `decay`
    - Can be derived using the calculations outlined in the [section below](#calculating-conviction-voting-settings).
- `maxRatio`
    - Can be derived using the calculations outlined in the [section below](#calculating-conviction-voting-settings).
- `weight`
    - Can be derived using the calculations outlined in the [section below](#calculating-conviction-voting-settings).
- `minThresholdStakePercentage`
    - Can be derived using the calculations outlined in the [section below](#calculating-conviction-voting-settings).

    
:::tip

If you want to use a new token for your Conviction Voting app, you will need a new Oracle - You can find more information here: https://docs.uniswap.org/contracts/v2/guides/smart-contract-integration/building-an-oracle.

You can find the GitHub repository for installing a new Fund Manager [here](https://github.com/1Hive/funds-manager-app).

Suppose you want to use the same Token Oracle and Fund Manager app. In that case, you can get them from the already installed Conviction Voting app using the [getter helper](../getStarted/syntaxSugar#getting-contract-info-with-) in EVMcrispr. Use this syntax:

```
set $stableTokenOracle disputable-conviction-voting.open::stableTokenOracle()
set $fundsManager disputable-conviction-voting.open::fundsManager()
```

This should be used within your `connect` command and will set those variables to be used in your `install` command.

:::

## Common Usage Example

After installing a new Conviction Voting app, one of the essential permissions to set up is the `CREATE_PROPOSALS_ROLE`.

```
load aragonos as ar
set $token.tokenlist https://tokens.honeyswap.org/

connect evmcrisprgardens disputable-voting.open (
    set $stableTokenOracle disputable-conviction-voting.open::stableTokenOracle()
    set $fundsManager disputable-conviction-voting.open::fundsManager()
    set $stakeToken wrappable-hooked-token-manager.open::token()
    install disputable-conviction-voting.open:new $stakeToken @token(GIV) @token(wxDAI) $stableTokenOracle $fundsManager 9999799 1000000 3000 2e16
    grant disputable-voting.open disputable-conviction-voting.open:new UPDATE_SETTINGS_ROLE disputable-voting.open
    grant ANY_ENTITY disputable-conviction-voting.open:new CREATE_PROPOSALS_ROLE disputable-voting.open
    grant ANY_ENTITY disputable-conviction-voting.open:new CHALLENGE_ROLE disputable-voting.open
    exec agreement.open activate disputable-conviction-voting.open:new @token(HNY) 10e18 10e18 3d
)
```

This would initialize the voting app using:
* The staking token as 0xfFBAbEb49be77E5254333d5fdfF72920B989425f (gGIV),
* The request token as $GIV,
* The stable token as wxDAI,
* And the same stable token oracle and funds manager as the currently installed Conviction Voting app.

Using the conviction calculation settings, our conviction growth, spending limit, minimum conviction, and minimum effective supply are two days, 10%, 3%, and 2%, respectively. 

We grant disputable voting control of all the most significant permissions and assign any entity to make or challenge proposals, given they meet the Agreement app's requirements. Lastly, we also set the Agreement app to control the disputes within the Conviction Voting app.

## Calculating Conviction Voting Settings

You should know a few fundamental formulas to calculate your Conviction Voting settings correctly. We will outline the user-friendly parameters and how to translate those into function parameters that you'll use to install or update your app.

- **`convictionGrowth`** - Also known as the half-life, this determines the time at which conviction accumulates or reduces voting power by 50%.
- **`spendingLimit`** - The maximum percent of funds in the Common Pool we can request in a single proposal.
- **`minConviction`** - The minimum percentage of total active voting tokens that must be staked on a proposal to generate enough conviction to pass.
- **`minEffectiveSupply`** - In case of a low effective supply, this is a virtual percentage of the total token supply applied to your Conviction Voting app. It prevents proposals from passing quickly when the effective supply is low.

```
decay = 10,000,000 * (1 / 2) ^ (BlockTime / convictionGrowthInSeconds)
maxRatio = 10 ^ 7 * spendingLimit
weight = 10 ^ 7 * spendingLimit ^ 2 * minConviction
minThresholdStakePct = 10 ^ 18 * minEffectiveSupply
```

As an example: 
> We want a `convictionGrowth` of 2 days, meaning it will take two days for conviction to accumulate from 0% to 50%, this is 172800 seconds, and we assume we are using Gnosis Chain, which has a block time of 5 seconds. So our formula would be: `100000000 * (1 / 2) ^ (5 / 172800)`, which would result in a `decay` of `9999799`.
>
> Our `spendingLimit` is 10%. So our formula would be: `100000000 * 0.1`, which would result in a `maxRatio` of `1000000`.
>
> Our `minConviction` is 3%, and our spending limit is 10%. So our formula would be `10000000 * 0.1 ^ 2 * 0.03`, resulting in a `weight` of `3000`.
>
> The `minimumEffectiveSupply` is set to 2%. So our formula would be `10000000000000000000 * 0.02`, which would give a `minThresholdStakePct` of `20000000000000000`.

## Granting Permissions

:::warning
This command can potentially remove a permission manager if it is set to the wrong address, making the permission unable to be changed in the future. This is because we usually want to set the main Disputable Voting app as the permission manager of all permissions.

The most critical permissions are on the Kernel (DAO main contract) and the ACL (permission management contract), so be careful to who we grant them to.
:::

To grant permissions, you will use the following syntax:

```
grant <entity> <app> <roleName> [defaultPermissionManager]
```

In practice, this would look like this:

```
grant disputable-voting.open disputable-conviction-voting.open UPDATE_SETTINGS_ROLE disputable-voting.open
```

This would grant the Disputable Voting app the permission to change the settings of the Conviction Voting app.

Before installing an app, you should consider any permissions needed to fit your purposes. Here is an exhaustive list of roles for the Conviction Voting app:

- `PAUSE_CONTRACT_ROLE`
    - Allows the given entity to pause or unpause the contract, effectively preventing or allowing interaction with the app (adding, staking on, canceling, or executing proposals).
- `UPDATE_SETTINGS_ROLE`
    - Allows the given entity to change the settings of the app. This includes changing the TWAP oracle address, the Funds Manager, and the `decay`, `maxRatio`, `weight`, and `minThresholdStakePercentage` settings. 
- `CREATE_PROPOSALS_ROLE`
    - Allows the given entity to create a proposal on the app.
- `CANCEL_PROPOSALS_ROLE`
    - Allows the given entity to cancel a proposal on the app.
- `SET_AGREEMENT_ROLE`
    - Allows the given entity to change the Agreement app used for the app.
- `CHALLENGE_ROLE`
    - Allows the given entity to challenge active proposals on the app.

<TypesOfEntities />

## Revoking Permissions

To remove permission from an entity, follow this syntax:

```
revoke <entity> <app> <roleName> [removePermissionManager=false]
```

In practice, this could look like this:

```
revoke 0x123456789abcdef123456789abcdef0123456789 disputable-conviction-voting.open PAUSE_CONTRACT_ROLE false
```

It would remove the ability of the specified address (perhaps a multisig) to pause the Conviction Voting contract.


## Internal Actions

Using the `exec` command, we can modify the Conviction Voting app's settings and perform interactions with the app. This is the base syntax:

```
exec <app> <methodName> [parameters]
```

For example: 

```
exec disputable-conviction-voting.open setConvictionCalculationSettings 9999919 1000000 3000 20000000000000000
```

Which would update our Conviction Voting settings with these values:

- Conviction Growth: 5 days
- Minimum Conviction: 3%
- Spending Limit: 10%
- Minimum Effective Supply: 2%

Here is an exhaustive list of internal actions you can perform with the Conviction Voting app:

<details><summary>addSignalingProposal</summary>

This function will add a signaling proposal to be voted on in your Conviction Voting app. The entity executing this function must have the `CREATE_PROPOSALS_ROLE` role.

#### Parameters

- `title` - The title of your proposal. (string)
- `link` - The IPFS or HTTP link to the description of your proposal (you can write it as a string, and it is converted to hex). (bytes)

#### Syntax

```
exec disputable-conviction-voting.open addProposal <title> <link> 
```
</details>
<details><summary>addProposal</summary>

This function will add a proposal to be voted on in your Conviction Voting app. The entity executing this function must have the `CREATE_PROPOSALS_ROLE` role.

#### Parameters

- `title` - The title of your proposal. (string)
- `link` - The IPFS or HTTP link to the description of your proposal (you can write it as a string, and it is converted to hex). (bytes)
- `requestedAmount` - The number of tokens you are requesting. (uint256)
- `stableRequestAmount?` - Whether or not to convert the requested amount into a stable token amount or request token amount, this is converted to the amount in request tokens using the price of the stable token vs. the price of the request token. (boolean) 

#### Syntax

```
exec disputable-conviction-voting.open addProposal <title> <link> <requestedAmount> <stableRequestAmount?>
```
</details>
<details><summary>stakeToProposal</summary>

This function will stake a specific amount of your available staking tokens on a given proposal.

#### Parameters

- `proposalId` - The id number of the active proposal. (uint256)
- `amount` - The number of tokens you wish to stake to an active proposal. (uint256)

#### Syntax

```
exec disputable-conviction-voting.open stakeToProposal <proposalId> <amount>
```
</details>
<details><summary>stakeAllToProposal</summary>

This function will stake all your available staking tokens on a given proposal.

#### Parameters

- `proposalId` - The id number of the active proposal. (uint256)

#### Syntax

```
exec disputable-conviction-voting.open stakeAllToProposal <proposalId> 
```
</details>
<details><summary>withdrawFromProposal</summary>

This function will withdraw a specific amount of your currently staked tokens on a given proposal.

#### Parameters

- `proposalId` - The id number of the active proposal. (uint256)
- `amount` - The number of tokens you wish to withdraw from an active proposal. (uint256)

#### Syntax

```
exec disputable-conviction-voting.open withdrawFromProposal <proposalId> <amount>
```
</details>
<details><summary>withdrawAllFromProposal</summary>

This function will withdraw all your currently staked tokens on a given proposal.

#### Parameters

- `proposalId` - The id number of the active proposal. (uint256)

#### Syntax

```
exec disputable-conviction-voting.open withdrawAllFromProposal <proposalId> 
```
</details>
<details><summary>executeProposal</summary>

This function will execute a proposal that has passed and is pending execution.  

#### Parameters

`proposalId` - The id number of the pending proposal. (uint256)

#### Syntax

```
exec disputable-conviction-voting.open executeProposal <proposalId> 
```
</details>
<details><summary>cancelProposal</summary>

This function will cancel an active proposal. The entity executing this function must have the `CANCEL_PROPOSALS_ROLE` role.

#### Parameters

- `proposalId` - The id number of the active proposal. (uint256)

#### Syntax

```
exec disputable-conviction-voting.open cancelProposal <proposalId> 
```
</details>
<details><summary>setAgreement</summary>

This function will set the agreement app used for your app. The entity executing this function must have the `SET_AGREEMENT_ROLE` role.

#### Parameters

- `agreement` - The address of the agreement app contract. (address)

#### Syntax

```
exec disputable-conviction-voting.open setAgreement <agreement> 
```
</details>
<details><summary>setStableTokenOracleSettings</summary>

This function will set the agreement app used for your app. The entity executing this function must have the `UPDATE_SETTINGS_ROLE` role.

#### Parameters

- `stableToken` - The address of the stable token used to compare your request token price. (address)
- `stableTokenOracle` - The address of the oracle you use to fetch the price of your stable token. (address)

#### Syntax

```
exec disputable-conviction-voting.open setStableTokenOracleSettings <stableToken> <stableTokenOracle>
```
</details>
<details><summary>setFundsManager</summary>

This function will change the Funds Manager app currently used for your Conviction Voting app. Therefore, the entity executing this function must have the `UPDATE_SETTINGS_ROLE` role.

#### Parameters

- `fundsManager` - The contract address of the Funds Manager app you wish to use. (address)

#### Syntax

```
exec disputable-conviction-voting.open setFundsManager <fundsManager>
```
</details>
<details><summary>setConvictionCalculationSettings</summary>

This function will change the Conviction Voting settings used on your app. The entity executing this function must have the `UPDATE_SETTINGS_ROLE` role.

#### Parameters

- `decay`
    - Can be derived using the calculations outlined in the [section above](#calculating-conviction-voting-settings).
- `maxRatio`
    - Can be derived using the calculations outlined in the [section above](#calculating-conviction-voting-settings).
- `weight`
    - Can be derived using the calculations outlined in the [section above](#calculating-conviction-voting-settings).
- `minThresholdStakePercentage`
    - Can be derived using the calculations outlined in the [section above](#calculating-conviction-voting-settings).


#### Syntax

```
exec disputable-conviction-voting.open setConvictionCalculationSettings <decay> <maxRatio> <weight> <minThresholdStakePercentage>
```
</details>
<details><summary>pauseContract</summary>

This function will pause the Conviction Voting contract, preventing anyone from calling functions on it. The entity executing this function must have the `PAUSE_CONTRACT_ROLE` role.

#### Parameters

- `pauseEnabled?` - Whether or not to pause the contract. (boolean)

#### Syntax

```
exec disputable-conviction-voting.open pauseContract <pauseEnabled?> 
```
</details>
