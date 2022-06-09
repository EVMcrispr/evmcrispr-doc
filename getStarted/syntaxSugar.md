---
id: syntaxSugar
title: Syntatic Sugar
---
import useBaseUrl from '@docusaurus/useBaseUrl'
import styles from '../src/css/articles.css'


One of the real gems of EVMcrispr is the shorthand notations you can leverage to make code easier to understand and to write. We'll cover most of the basic syntax sugar you leverage while writing scripts with EVMcrispr

## Exponents

Ethereum Tokens do not use decimals and instead identify their precision through exponentially large numbers, this is referenced as the *decimal precision* and typically is set to 18. This means that for example 1 token with a decimal precision of 18 is expressed in solidity as `1000000000000000000`. With EVMcrispr we can simply write this as `1e18` which equals 1 to the power of 18.

 A few more examples:
21.21 tokens would become `2121e16`

0.56 tokens would become `56e16`

:::info
Some tokens use different decimal precision so it's good practice to check the token contract to verify the decimal precision. USDC for example uses 6.

i.e `1e6` would be 1 USDC, `1e18` would be 1,000,000,000,000 USDC - See the difference?
:::

## Time

Typically smart contracts express time in seconds. However with EVMcrispr time can also be expressed by appending s, m, h, d, w, and y at the end of the number for defining them as seconds, minutes, hours, days, weeks, and years respectively. For example 2d would get converted to 172,800 seconds.

## Environment Variables

Environment variables let you reference information faster and also assign information to names that you can use inside of your scripts commands. You need two pieces of information to set a variable, the name you want to give the variable and the data you want to it to be equal to. You can use this syntax:

`set $<variableName> <variableData>`

The `set` command is used to define variables in EVMcrispr. The `$` symbol identifies a string as a variable name.

Here's an example to show you a typical use case of setting and implementing variables in your script:

```
connect exampleDAO token-manager voting

set $aavePool 0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9
set $dai 0x6b175474e89094c44da98b954eedeac495271d0f
set $value 1000e18

act agent $dai approve(address,unint256) $aavePool $value
act agent $aavePool deposit(address,uint256,address,uint16) $dai $value agent 0
```

In the above we define three variables: 
- `aavePool` - The address of the pool on Aave we would like to interact with.
- `dai` - The token address of DAI.
- `value` - A numerical value we want to use repeatedly, in this case it is 1000^18.

Then we tell the agent to approve itself to spend 1000 DAI for the Aave Pool we specified and subsequently we request to make the transaction to deposit 1000 DAI into the Aave Pool.

## Helpers

### @me

The `@me` helper will reference the Ethereum Address that is currently connected to the EVMcrispr terminal.

A usage example could look like this:

```
connect exampleDAO token-manager voting:0
exec token-manager mint @me 1337e18
```
Which would ask the token-manager to mint the currently connected address 1337 of the associated token-manager's tokens.


### @token

The `@token` helper fetches the address of the token contract using the token symbol defined in a token list.

#### Parameters
- `tokenSymbol`: The symbol of the token you wish to reference. You can find the symbol in the token list that was set.

#### Environment Variables
- `$token.tokenlist`: The token list you would like to use for referencing token symbols with their respective contract addresses.

<details><summary>Setting the Token List</summary>
By default EVMcrispr has the <a href='https://tokens.uniswap.org/' target='_blank' rel='noreferrer noopener'>token list from Uniswap</a> (Mainnet) loaded into the terminal, you can use this list to call any token by referencing it's token symbol.  

For example:
- `@token(UNI)` would reference the token address of Uniswap: `0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984`.
- `@token(USDC)` would reference the token address of USDC: `0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48`.


You can use a different token list to reference tokens, including on different chains, using the `set` command. To use a different token list you can follow this syntax:

`set $token.tokenlist <tokenListURL>`

For example:
- `set $token.tokenlist https://token-list.sushi.com/` - Use the token list provided by Sushiswap
- `set $token.tokenlist https://tokens.honeyswap.org/` - Use the token list provided by Honeyswap

</details>

#### Syntax

`@token(<tokenSymbol>)`


An example of using `@token` in your script could look like

`exec vault:0 transfer @token(DAI) vault:1 100e18`

Which would request to transfer 100 DAI from the 1st vault to the 2nd vault.

**_*As always, be aware of each token's decimal precision._**

### @token.balance

Using the token list and `@token` you can query the balance of a given token held in a specified entity, this command is `@token.balance`.

#### Parameters
You'll need two parameters to use this helper:

- `tokenSymbol`: The symbol of the token you wish to reference. You can find the symbol in the token list that was set.
- `entity`: The entity that you wish to check the balance of.

<details>
<summary>Types of Entities</summary>

There are four eligible entities you can choose from: **App**, **Anyone**, **Token Holders**, **Specified Eth Address**.
- Anyone is expressed as `ANY_ENTITY` and can be any user visiting your DAO with a web wallet.
- Token Holders is expressed as token-manager and is affiliated with your token-managers token. Anyone holding the token-manager's token is inside of this entity.
- Specified Eth Address is expressed as the ETH address starting with `0x`, only this address will be the specified entity.
- App is the internal name of the internal Aragon App installed on your DAO, such as `voting`, `token-manager`, or `agent`.

</details>

#### Environment variables
- `$token.tokenlist`: The token list you would like to use for referencing token symbols with their respective contract addresses.

#### Syntax

`@token.balance(<tokenSymbol>,<entity>)`

An example of using `@token.balance` could look like:

`exec vault:0 transfer @token(DAI) agent:0 @token.balance(DAI,vault:0)` 

Which would request to transfer the entire balance of DAI held by the 1st vault to the 1st agent. 

### Common Usage Example

A common usage example to showcase the `@token` and `@me` helpers and the $token.tokenlist variable and could look like:
```
connect exampleDAO token-manager voting
set $token.tokenlist https://token-list.sushi.com/
exec finance newImmediatePayment @token(SUSHI) @me @token.balance(SUSHI,agent) "eat all sushi"
```
This would set the token list to Sushiswap's list and then create an immediate payment on the finance app to send the full balance of the agent's  SUSHI holdings to the address currently connected to the terminal.
