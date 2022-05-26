---
id: token-manager
title: Token Manager
---

The Token Manager app, as the name implies, is for managing tokens. Usually this app is complemented by a unique token minted for each instance of the Token Manager app, however any token can be added given the token contract has given the right privileges to the Token Manager contract.

## Installing the app

You usually want to create a new token along with the installation of the new token mananger.

```
new token <tokenName> <tokenSymbol> <tokenController> [tokenDecimals=18] [transferable=true]
install <tokenManagerIdentifier> <tokenAddress> <transferable> <maxPerAccount>
```

You'll need a couple parameters for the `new token` command:

- `tokenName`
    - The name of the token you wish to create.
- `tokenSymbol`
    - The symbol you wish to set for the token. 
- `tokenController`
    - The associated token-manager app which will have mint and burn priveleges for the token.
- `tokenDecimals`
    - The number of decimal precision you wish to set for the token. The default decimal precision is 18.
- `transferable`
    - Whether or not the token should be transferable. Defaults to true.

And these are the parameters for the `install` command:
- `tokenManagerIdentifier`
    - Usually The application we are willing to install, in this case a `token-manager`, labelled as `token-manager:new`.
- `tokenAddress`
    - The address of the token you wish to associate with the new token manager. You can 
- `transferable`
    - It overrides the transferablility property of the token.
- `maxPerAccount`
    - The maximum account of tokens a single address can hold. Setting this parameter to 0 means this amount is unlimited. This number is also related to the decimal precision. For example if the token decimal precision is 18 and you want the `maxPerAccount` to be 1 then this parameter input would be `1e18`.

### Common use example

The following script creates a transferable Test Token (TEST) within the Test DAO, grants minting and burning permsisions to voting, and mints 100 tokens to the creator of the vote.

```
connect test-dao token-manager voting 
new token "Test Token" TEST token-manager:new
install token-manager:new token:TEST true 0
grant voting token-manager:new MINT_ROLE voting
grant voting token-manager:new BURN_ROLE voting
exec token-manager:new mint @me 100e18
```

## Granting Permissions

:::warning
This command can potentially burn a permission manager if it is set to the wrong address, making the permission unable to be changed in the future. We usually want to set the main voting app as the permission manager of all permissions.
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

These are the available roles:
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

<details>
<summary>Types of Entities</summary>

There are four eligible entities you can choose from: **App**, **Anyone**, **Token Holders**, **Specified Eth Address**.
- Anyone is expressed as `ANY_ENTITY` and can be any user visiting your DAO with a web wallet.
- Token Holders is expressed as token-manager and is affiliated with your token-managers token. Anyone holding the token-manager's token is inside of this entity.
- Specified Eth Address is expressed as the ETH address starting with `0x`, only this address will be the specified entity.
- App is the internal name of the internal Aragon App installed on your DAO, such as `voting`, `token-manager`, or `agent`.

</details>


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

Below is an exhaustive list of all possible actions you can perform with the token-manager app. We'll identify the function in the contract and outline any parameters and permissions you need and the expected syntax to run them.

<details>
<summary>mint</summary>

This function will mint more of the tokens that are associated with the token-manager app.

#### Parameters 

- `receiver` - The address of the entity that will receive the minted tokens. (address)
- `amount` - The amount of tokens you wish to mint. **Take note of the token's decimal precision**. (uint256)

#### Permissions 

The entity that wishes to mint more tokens will need the `MINT_ROLE` role.

#### Syntax

`exec token-manager mint <receiver> <amount>`
</details>

<details>
<summary>issue</summary>

This will mint a specified amount of tokens that will be held by the token-manager app.

#### Parameters 

- `amount` - The amount of tokens you wish to mint. **Take note of the token's decimal precision**. (uint256)

#### Permissions 

The entity that wishes to mint more tokens to the token-manager app will need the `ISSUE_ROLE` role.

#### Syntax 

`exec token-manager issue <amount>`
</details>
<details>
<summary>assign</summary> 

Sends a specified amount of the assoiacted token-manager tokens that are currently held by the token-manager to a specified address.

#### Parameters
- `receiver` - The address of the entity that will receive the assigned tokens. (address)
- `amount` - The amount of tokens you wish to assign. **Take note of the token's decimal precision**. (uint256)

#### Permissions

The entity that wishes to assign tokens to a specified address will require the `ASSIGN_ROLE` role.

#### Syntax
`exec token-manager assign <receiver> <amount>`
</details>

<details>
<summary>burn</summary>

This function will burn a specified amount of the associated token-manager tokens from a specified address.

#### Parameters

- `holder` - The address of the current token holder of which you would like to burn tokens from.
- `amount` - The amount of tokens you wish to burn. **Take note of the token's decimal precision**. (uint256)

#### Permissions

The entity that wishes to burn tokens must have the `BURN_ROLE` role.

#### Syntax

`exec token-manager burn <holder> <amount>`
</details>

<details>
<summary>assignVested</summary> 

Creates a revokable vesting schedule. Assigning tokens held by the token-manager to a specified address according to a specified vesting schedule. (NEEDS MORE INFO)

#### Parameters

- `receiver` - The address of the entity that will receive the vested tokens. (address)
- `amount` - The amount of tokens you wish to vest. **Take note of the token's decimal precision**. (uint256)
- `start` - (UNCLEAR FORMAT DATE IS COMPOSED HOW?)
- `cliff` - 
- `vested` - 
- `revokable` - Whether the vesting can be revoked by the token-manager. (boolean)

```
/**
    * @notice Assign `@tokenAmount(self.token(): address, _amount, false)` tokens to `_receiver` from the Token Manager's holdings with a `_revokable : 'revokable' : ''` vesting starting at `@formatDate(_start)`, cliff at `@formatDate(_cliff)` (first portion of tokens transferable), and completed vesting at `@formatDate(_vested)` (all tokens transferable)
    * @param _receiver The address receiving the tokens, cannot be Token Manager itself
    * @param _amount Number of tokens vested
    * @param _start Date the vesting calculations start
    * @param _cliff Date when the initial portion of tokens are transferable
    * @param _vested Date when all tokens are transferable
    * @param _revokable Whether the vesting can be revoked by the Token Manager
    */
    function assignVested(
        address _receiver,
        uint256 _amount,
        uint64 _start,
        uint64 _cliff,
        uint64 _vested,
        bool _revokable
    )
```

#### Permissions 

The entity wishing to assign a vesting schedule will need the `ASSIGN_ROLE` role.

#### Syntax 

`exec token-manager assignVested <receiver> <amount> <start> <cliff> <vested> <revokable>`
</details>
<details>
<summary>revokeVesting</summary>

Revoke the specified vesting from a specified token holder.

#### Parameters 

- `holder` - The address of the recipient of the vested tokens. (address)
- `vestingId` - The numerical identifier of the vesting schedule. (uint256)

#### Permissions 

The entity that wishes to revoke a vesting schedule will need the `REVOKE_VESTINGS_ROLE` role. 

#### Syntax 

`exec token-manager revokeVesting <holder> <vestingId>`

</details>

