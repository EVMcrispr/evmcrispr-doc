---
id: finance
title: Finance
---
import useBaseUrl from '@docusaurus/useBaseUrl'
import styles from '../src/css/articles.css'

The Finance App will allow you to keep track of your DAO's finances, each app can only interact with funds held in one Ethereum Address. Having multiple Finance Apps will allow you to manage multiple treasuries.

## App Roles

Before installing an app you should consider any permissions it will need to fit your purposes. Here is an exhaustive list of roles for the voting app:

- `CREATE_PAYMENTS_ROLE`
    - Allows an entity to create a payment request
- `CHANGE_PERIOD_ROLE`
    - Allows an entity the budget period
- `CHANGE_BUDGETS_ROLE`
    - Allows an entity to modify the budget for the set period
- `EXECUTE_PAYMENTS_ROLE`
    - Allows an entity to execute payments
- `MANAGE_PAYMENTS_ROLE`
    - Allows an entity to manage payments

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

`grant voting finance CREATE_PAYMENTS_ROLE voting`

Which would give the voting app permission to create payments on the finance app

:::info
Some Functionalities have been added to the contract that has not yet been added to the UI, including creating budgets and setting budget periods. You can create and manage these on the DAO but will have no practical way to interact with them on the UI, you can learn more in the [Aragon developer documentation](https://hack.aragon.org/docs/guides-custom-deploy#adding-a-vault-and-finance-instance)
:::

## Installing the App

To Install the Voting App you'll need to include two parameters:
 - Vault Address
    - This is the address of the installed Vault or Agent where the finance app will manage funds.
 - Period duration
    - This is the budgeting period duration. This parameter is required but only relevant if you plan to make use of the budgeting feature (currently not on the UI).

The syntax is as follows to install the app:

```
install finance:new <vaultAddress> <periodDuration> 
// add any permissions you want to grant here.
```

## Revoking Permissions

:::warning
 This command can potentially remove a permission that is needed for the DAO to work. Be careful to not remove the permissions to create votes in voting, create permissions in ACL, or manage apps in the Kernel.
:::

To remove a permission from an entity follow this syntax:

`revoke <entity> <app> <roleName> [removePermissionManager?]`

in practice this could look like:

`revoke voting finance EXECUTE_PAYMENTS_ROLE false`

This would remove the ability for the voting app to execute a payment, while keeping the Permission Manager in place should this permission need to be modified in the future.

## Internal Actions

Using the `exec` command we can create internal actions.

An exhaustive list of actions that can be performed with the finance app can be found on the [contract's code on Github](https://github.com/aragon/aragon-apps/blob/master/apps/finance/contracts/Finance.sol)

We'll use the `newImmediatePayment` function to show the syntax of the `exec` command. This is the base syntax:

`exec <app> <methodName> [parameters]`

i.e
`exec finance newImmediatePayment 0xa117000000f279d81a1d3cc75430faa017fa5a2e 0x62Bb362d63f14449398B79EBC46574F859A6045D 100e18 "payment for documentation work"`
This would request to send 100 ANT tokens to 0x62Bb362d63f14449398B79EBC46574F859A6045D with the context of "payment for documentation work", which would show up on a DAO vote.