---
id: voting
title: Voting 
---
import useBaseUrl from '@docusaurus/useBaseUrl'
import styles from '../src/css/articles.css'

The Voting App will allow your DAO members to create votes that will usually execute internal DAO actions or external interactions with other Ethereum Addresses, including smart contracts. 

## App Roles

Before installing an app you should consider any permissions it will need to fit your purposes. Here is an exhaustive list of roles for the voting app:

- `CREATE_VOTES_ROLE`
    - Which entity can create a vote
- `MODIFY_SUPPORT_ROLE`
    - Which entity can change the Support Required Percent
- `MODIFY_QUORUM_ROLE`
    - Which entity can change the Minimum Approval Percent

### Types of Entities

There are three eligible entities you can choose from, Anyone, Token Holders, Specified Eth Address.

- Anyone is expressed as `ANY_ENTITY` and can be any user visiting your DAO with a web wallet.
- Token Holders is expressed as token-manager and is affiliated with your token-managers token. Anyone holding the token-manager's token is inside of this entity
- Specified Eth Address is expressed as the ETH address starting with `0x`, only this address will be the specified entity.

## Granting Permissions

To grant permissions you'll use the following syntax:

`grant {entity} {app} {role} {defaultPermissionManager}`

which in practice could look something like:

`grant ANY_ENTITY voting CREATE_VOTES_ROLE voting`

This would grant any entity the permission to create votes on the voting app, and the permission itself is managed by the voting app.


## Installing the App

You'll need the following parameters to install a new Voting App to your DAO:

- Voting Token Address
    - This is the token your DAO recognizes to give voting power to your members, you should by default have already a Minime Token associated with your DAO from setup in the `Tokens` App. To learn how to configure a new token for your app, check out the `Tokens` section (ADD LINK)
- Support Required Percent
    - This is the percent of YES votes vs. NO votes needed to pass a proposal. This parameter is expressed in WEI. i.e. for a Support Required of 51% this is 0.51 which in WEI equals *51e16* (51000000000000000000)
- Minimum Approval Percent
    - This is the amount of YES votes needed from the total token supply. This parameter is expressed in WEI similar to the example above in Support Required
- Vote Duration 
    - This is the amount of time each vote remains open for, be aware that currently this parameter cannot be changed once it is set, so choose wisely. This parameter is normally expressed in seconds*.

::: info
    *We can leverage a bit of syntax-sugar to make calculating time easier with EVMcrispr. Time can also be expressed by appending s, m, h, d, w, and y at the end of the number for defining them as seconds, minutes, hours, days, weeks, and years respectively. For example 2d would get converted to 172,800 seconds, which is usually the format solidity smart contracts expect time periods to be passed in as.
:::

to install this app the syntax is as follows:

```
connect {yourDAOsAddress} {forwardingPath}
install voting:new {votingTokenAddress} {supportRequiredPercent} {miniumApproval} {voteDuration} 
// add any permissions you want to grant here.
```
You should also consider what permissions you'll need to integrate your new voting app. You can append these directly to your installation scripts. Learn more in the grants command documentaion.(ADD LINK)


## Revoking Permissions

:::warning
 This command can potentially remove a permission that is needed for the DAO to work. Be careful to not remove the permissions to create votes in voting, create permissions in ACL, or manage apps in the Kernel.
:::

To remove a permission from an entity follow this syntax:

`revoke {entity} {app} {role} {removePermissionManager?}`

in practice this could look like:

`revoke ANY_ENTITY voting CREATE_VOTES_ROLE false`

This would remove the ability for anyone to create votes in the voting app, while keeping the Permission Manager in place should this perission need to be modified in the future.


## Modifying the App

Using the `exec` command we can create internal actions that will modify the settings of our DAO.

An exhaustive list of actions that can be performed on the voting app can be found on the [base implementation contract](https://blockscout.com/xdai/mainnet/address/0xD4856Cd82Cb507B2691Bcc3F02d8939671a800C0/write-contract)

However we'll use the two most common modifications `changeMinAcceptQuorumPct` and `changeSupportRequiredPct` to showcase the `exec` command. We use the following base syntax:

`exec {app} {methodName} {parameters}`

i.e.
`exec voting changeMinAcceptQuorumPct 18e16`
- This would change the Minimum Approval to 18%

`exec voting changeSupportRequiredPct 50e16`
- This would change the Support Required to 50%
