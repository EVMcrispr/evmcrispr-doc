---
id: token-manager
title: Token Manager
---

The Token Manager app, as the name implies, is for managing tokens. Usually this app is complemented by a unique token minted for each instance of the Token Manager app, however any token can be added given the token contract has given the right privileges to the Token Manager contract.

## App Roles 

- `MINT_ROLE`
    - Allows the given entity to mint tokens to a specified address.
- `ISSUE_ROLE`
    - Allows the given entity to mint tokens that are held by the Token Manager.
- `ASSIGN_ROLE`
    - Allows the given entity to assign an amount of issued tokens held by the Token Manager to a specified address. This role is also required to create a vesting stream for a specified address.
- `REVOKE_VESTINGS_ROLE`
    - Allows the given entity to revoke vested tokens of a specified address.
- `BURN_ROLE`
    - Allows the given entity to burn tokens of a specified address.

### Types of Entities

There are four eligible entities you can choose from: **App**, **Anyone**, **Token Holders**, **Specified Eth Address**.

- Anyone is expressed as `ANY_ENTITY` and can be any user visiting your DAO with a web wallet.
- Token Holders is expressed as token-manager and is affiliated with your token-managers token. Anyone holding the token-manager's token is inside of this entity
- Specified Eth Address is expressed as the ETH address starting with `0x`, only this address will be the specified entity.
- App is the internal name of the internal Aragon App installed on your DAO, such as `voting`, `token-manager`, or `agent`

## Granting Permissions

:::warning
This command can potentially remove a permission manager if it is set to the wrong address, making the permission unable to be changed in the future. We usually want to set the main voting app as the permission manager of all permissions.
:::

To grant permissions you'll use the following syntax:

```
grant <entity> <app> <roleName> [defaultPermissionManager]
```

In practice this would look like:

```
grant voting token-manager MINT_ROLE voting
```

This would allow the voting app to mint more tokens to a specified address from the token manager and that this permission is controlled by the voting app.

## Installing the app

You usually want to create a new token along with the installation of the new token mananger.

```
new token:<token-symbol> <token-name> <token-manager> [token-decimals]
install token-manager:<id> <token> <transferable> <max-per-account>
```

## Revoking Permissions

To remove a permission from an entity follow this syntax:

```
revoke <entity> <app> <roleName> [removePermissionManager]
```

in practice this could look like:

```
revoke 0x62Bb362d63f14449398B79EBC46574F859A6045D token-manager BURN_ROLE false
```

This would revoke the address `0x62Bb362d63f14449398B79EBC46574F859A6045D` ability to burn tokens, while keeping the Permission Manager in place should this permission need to be modified in the future.

## Internal Actions

To create an interaction between different apps within your DAO we use this syntax:

```
exec <app> <methodName> [parameters]
```

For example: 

```
exec token-manager mint agent 100e18
```

This would mint 100 DAO tokens from the token manager to the agent, given the tokens decimal precision is set to 18.

An exhaustive list of functions that can be performed by the token-manager can be found in the [contract's code on Github](https://github.com/aragon/aragon-apps/blob/master/apps/token-manager/contracts/TokenManager.sol)