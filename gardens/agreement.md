---
id: agreement
title: Agreement
---

The agreement app is used to define and manage an agreement or set of rules that participants of your DAO should adhere to. This contract also manages settling or escalating potential infractions of the aforementioned DAO agreement. It has no UI and is usually interacted with by an instance of [Gardens](https://gardens.1hive.org/#/home) which is developed by [1Hive](https://1hive.org/). 

## App Roles

Before installing the agreement app you should understand a few important pieces of the pie, including app roles defined within the contract, they are:

- CHALLENGE_ROLE
    - Allows the specified entity to challenge a proposal
- CHANGE_AGREEMENT_ROLE
    - Allows the specified entity to change the DAO's agreement
- MANAGE_DISPUTABLE_ROLE
    - Allows the specified entity to change the related settings of a conviction-voting or disputable-voting app, such as Challenge Duration, Action Amount, Challenge Amount and the token used as collateral for a dispute in the respective app.

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

`grant disputable-voting.open agreement.open MANAGE_DISPUTABLE_ROLE disputable-voting.open`

Which would grant the installed disputable-voting app the permission to change the dispute settings of any eligible app inside the DAO. This permission itself would also be managed by the disputable-voting app.

## Installing the App

To install the agreement app, you'll need to figure out a few parameters:

- arbitrator
    - This is the Ethereum address decentralized court where escalated disputes are sent to be arbitrated.
- setAppFeesCashier
    - Whether to integrate with the Arbitrator's fee cashier (true or false)
- title
    - The title of your agreement document (string)
- content 
    - An IPFS link to your agreement document that has been converted to hex format and prepended with `0x`. You can use [**this tool**](https://dencode.com/string/hex) to convert the text for the IPFS link to hex format.

When you have the parameters for the agreement app you can install it with the following syntax:

```
install agreement.open:new <arbitratorAddress> <setAppFeesCashier?> <titleString> <IPFSlinkToContentInHex>
// add any permissions you want to grant here.
```

In practice this could look like:

`install agreement.open:new 0x44e4fcfed14e1285c9e0f6eae77d5fdd0f196f85 false "NASCAR DAO Community Covenant" 0x516d6657707071433535586337505534387665693258765641754837367a32724e4646374a4d55686a564d357856`