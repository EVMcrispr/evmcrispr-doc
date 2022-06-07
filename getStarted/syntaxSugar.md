---
id: syntaxSugar
title: Syntatic Sugar
---

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

## Variables

We also have a variety of variables that can be considered as helpers which will let you reference information faster and also assign information to variables that you can set inside of your script.

### @me

The `@me` command will reference the Ethereum Address that is currently connected to the EVMcrispr terminal.

A usage example could look like this:

```
connect exampleDAO token-manager voting:0
exec token-manager mint @me 1337e18
```
Which would ask the token-manager to mint the currently connected address 1337 of the associated token-manager's tokens.


### token

The `token` helper has many different commands that can be used which will help you easily alias common token addresses within your script, check token balances and incorporate them into any other command functionality.

By default EVMcrispr has the [token list from Uniswap](https://tokens.uniswap.org/) (Mainnet) loaded into the terminal, you can use this list to call any token by referencing it's token symbol.  

For example:
- `@token(UNI)` would reference the token address of Uniswap: `0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984`.
- `@token(USDC)` would reference the token address of USDC: `0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48`.

**_*As always, be aware of each token's decimal precision._**

#### Changing the token list
You can use a different token list to reference tokens, including on different chains, using the `set` command. To use a different token list you can follow this syntax:
`set $token.tokenlist <tokenListURL>`
For example:
- `set $token.tokenlist https://token-list.sushi.com/` - Use the token list provided by Sushiswap
- `set $token.tokenlist https://tokens.honeyswap.org/` - Use the token list provided by Honeyswap

:::note
The `set` command is used to define variables in EVMcrispr. The `$` symbol identifies a string as a variable name.
:::

#### Querying token balances
Using the token list and `@token` you can query the balance of a given token held in a specified entity, this command is `@token.balance` and accepts two parameters `tokenSymbol` and `entity`. The full syntax looks like:
`@token.balance(<tokenSymbol>,<entity>)`

For example:
- `@token.balance(DAI,vault:0)` - Which would return as the current balance of DAI held by the first vault.

#### Bringing it all together

A common usage example to showcase these `token` helpers could look like:
```
connect exampleDAO token-manager voting
set $token.tokenlist https://token-list.sushi.com/
exec finance newImmediatePayment @token(SUSHI) @me @token.balance(SUSHI,agent) "eat all sushi"
```
This would set the token list to Sushiswap's list and then create an immediate payment on the finance app to send the full balance of the agent's  SUSHI holdings to the address currently connected to the terminal.


## Aliasing Multiple Apps in Aragon DAOs

Inside of Aragon DAOs there are a multitude of apps you can install which perform certain functions. If you have multiple instances of the same app installed you can specify which app you want to interact with by a simple numbering nomenclature. The first app installed on your DAO can always be referenced by `<appName>:0`, as in `agent:0`, `finance:0` or `token-manager:0`. Any additional apps installed will have the next number appended to their name. For example if you have 1 agent installed and you install another, the second agent can be referenced by `agent:1`, the third by `agent:2` and so on.
