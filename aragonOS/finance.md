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

## Contract Functions 

Below is an exhaustive list of all possible actions you can perform with the finance app. we'll identify the function in the contract and outline any parameters and permissions you need and the expected syntax to run them.

### `deposit`

This will deposit approved ERC20 or ETH tokens into the vault managed by the finance app.

#### Parameters

- `token` - The address of the token that you wish to deposit. (address)
- `amount` - The amount of tokens you wish to deposit. **Take note of the token's decimal precision**. (uint256)
- `reference` - The reason for the deposit. (string)

#### Permissions

No additional permissions are needed to perform this function.

#### Syntax

`exec finance deposit <token> <amount> <reference>`

### `newImmediatePayment`

This will create a new payment submission, requesting tokens held in the finance app's specified vault.

#### Parameters 

- `token` - The address of the token you are requesting payment of. (address)
- `receiver` - The address of the entity that will receive the tokens. (address)
- `amount` - The amount of tokens being requested. **Take note of the token's decimal precision**. (uint256)
- `reference` - The reason for the deposit. (string)

#### Permissions 

The entity creating the action will need the `CREATE_PAYMENTS_ROLE` role.

#### Syntax 

`exec finance newImmediatePayment <token> <receiver> <amount> <reference>`

### `newScheduledPayment`

Sets up a recurring payment scheduled for a specified amount of time, at set intervals with a specified token. 

#### Parameters

- `token` - The address of the token you are requesting payment of. (address)
- `receiver` - The address of the entity that will receive the tokens. (address)
- `amount` - The amount of tokens being requested. **Take note of the token's decimal precision**. (uint256)
- `initialPaymentTime` - The timestamp of when the first payment is created. (unint64)
- `interval` - The amount of time that passes between one payment to the next. (uint64)
- `maxExecutions` - The maximum instances a payment can be executed. (uint64)
- `reference` - The reason for the deposit. (string)

#### Permissions 

The entity creating the action will need the `CREATE_PAYMENTS_ROLE` role.

#### Syntax 

`exec finance newImmediatePayment <token> <receiver> <amount> <initialPaymentTime> <interval> <maxExecutions> <reference>`

### `setPeriodDuration`

Changes the accounting period duration, used for establishing periodic budgets. 

#### Parameters

- `periodDuration` - The amount of time you want to change the budget duration to. (uint64)

### Permissions

The entity creating the action will need the `CHANGE_PERIOD_ROLE` role.

#### Syntax 

`exec finance setPeriodDuration <periodDuration>`

### `setBudget`

This will establish a budget, setting a cap on the amount of a specified token that can be paid out in each period.

#### Parameters 

- `token` - The address of the token you wish to set a budget for. 
- `amount` - The maximum amount of specified tokens that can be paid out within the budget. 

### Permissions

The entity creating the action will need the `CHANGE_BUDGETS_ROLE` role.

### Syntax 

`exec finance setBudget <token> <amount>`

### `removeBudget`

Removes any set budget for the specified token.

#### Parameters 

- `token` - The address of the token you wish to remove a budget for. 

### Permissions

The entity creating the action will need the `CHANGE_BUDGETS_ROLE` role.

### Syntax 

`exec finance removeBudget <token> <amount>`

### `executePayment`

Execute a pending payment.

#### Parameters

- `paymentId` - The numerical identifier of the pending payment. (uint256)

#### Permissions

The entity that will execute the payment needs the `EXECUTE_PAYMENTS_ROLE` role.

#### Syntax

`exec finance executePayment <paymentId>`

### `receiverExecutePayment`

This allows the receipient of the payment to execute it without needing the `EXECUTE_PAYMENTS_ROLE`.

#### Parameters 

- `paymentId` - The numerical identifier of the pending payment. (uint256)

#### Permissions 

There are no permissions needed to execute this function, except that the caller must be the payment recipient address.

#### Syntax

`exec finance receiverExecutePayment <paymentId>`

### `setPaymentStatus`

Can activate or disable an established payment. 

#### Parameters

- `paymentId` - The numerical identifier of the payment you wish to change the status of. (uint256)
- `active` - Whether to change the payment status to active (true) or disabled (false). (boolean)

#### Permissions 

The entity that wishes to change the status of a payment will need the `MANAGE_PAYMENTS_ROLE` role.

#### Syntax

`exec finance setPaymentStatus <paymentId> <active>`

#### `recoverToVault`

Sends the full holdings of a specified token that is held by this contract the vault/agent. This is in case tokens are mistakenly sent to this contract.

#### Parameters 

- `token` - The address of the token you wish to recover to the vault. 

#### Permissions 

No permissions are needed to perform this function.

#### Syntax 

`exec finance recoverToVault <token>`



