---
id: vault
title: Vault
---

The Vault is a simple app intended to store funds. It doesn't have a user interface so it is typically installed in tandem with the `finance` app to manage the funds inside of it. 

## Granting Permissions

:::warning
This command can potentially remove a permission manager if it is set to the wrong address, making the permission unable to be changed in the future. We usually want to set the main voting app as the permission manager of all permissions.

The most critical permissions are argumentably the ones on the Kernel (DAO main contract) and the ACL (permission management contract), so be careful who we grant them to.
:::

The vault only has one role it can give to other entities and that is `TRANSFER_ROLE` which would allow a given entity to transfer the funds held in the vault.

To grant permissions you'll use the following syntax:

`grant <entity> <app> <roleName> [defaultPermissionManager]`

### Types of Entities

There are four eligible entities you can choose from: **App**, **Anyone**, **Token Holders**, **Specified Eth Address**.

- Anyone is expressed as `ANY_ENTITY` and can be any user visiting your DAO with a web wallet.
- Token Holders is expressed as token-manager and is affiliated with your token-managers token. Anyone holding the token-manager's token is inside of this entity
- Specified Eth Address is expressed as the ETH address starting with `0x`, only this address will be the specified entity.
- App is the internal name of the internal Aragon App installed on your DAO, such as `voting`, `token-manager`, or `agent`

## Installing the App

There are no parameters needed to install a new vault to your DAO, review the `grant` section before proceeding. You can use this syntax to install the agent:

```
install vault:new
// add any permissions you want to grant here.
```

## Revoking Permissions

:::warning
 This command can potentially remove a permission that is needed for the DAO to work. Be careful to not remove the permissions to create votes in voting, create permissions in ACL, or manage apps in the Kernel.
:::

To remove a permission from an entity follow this syntax:

`revoke <entity> <app> <roleName> [removePermissionManager?]`

in practice this could look like:

`revoke finance vault TRANSFER_ROLE false`

This would remove the ability for the finance app to transfer funds held by the vault, while keeping the Permission Manager in place should this permission need to be modified in the future.

## Internal Transactions

If we wanted to create an interaction between the vault inside of our DAO we can use the following syntax: 

`exec <app> <methodName> [parameters]`

i.e 
`exec vault transfer 0xa117000000f279d81a1d3cc75430faa017fa5a2e  vault:1 10e18`

This would send 10 ANT tokens from the 1st vault to the second vault, assuming two vaults are installed

