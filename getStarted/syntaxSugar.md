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

## Aliasing Multiple Apps in Aragon DAOs

Inside of Aragon DAOs there are a multitude of apps you can install which perform certain functions. If you have multiple instances of the same app installed you can specify which app you want to interact with by a simple numbering nomenclature. The first app installed on your DAO can always be referenced by `<appName>:0`, as in `agent:0`, `finance:0` or `token-manager:0`. Any additional apps installed will have the next number appended to their name. For example if you have 1 agent installed and you install another, the second agent can be referenced by `agent:1`, the third by `agent:2` and so on.
