---
id: syntaxSugar
title: Syntactic Sugar
---
import useBaseUrl from '@docusaurus/useBaseUrl'
import styles from '../src/css/articles.css'


One of the real gems of EVMcrispr is the shorthand notations you can leverage to make code easier to understand and write. We'll cover most of the primary syntax sugar you leverage while writing scripts with EVMcrispr.

# Exponents

Ethereum Tokens do not use decimals and instead identify their precision through exponentially large numbers. This is referenced as the *decimal precision* and typically is set to 18. This means that, for example, one token with a decimal precision of 18 is expressed in solidity as `1000000000000000000`. With EVMcrispr, we can write this as `1e18`, which equals 1 to the power of 18.

We can also use it to define percentages in specific contracts. For instance, 21% would become `0.21e18` or just `21e16`, and 0.56% would become `0.56e16` or `56e14`.

:::info
Some tokens use different decimal precision, so checking the token contract is good practice to verify the decimal precision. USDC, for example, uses 6.

i.e., `1e6` would be 1 USDC, `1e18` would be 1,000,000,000,000 USDC - See the difference?
:::

# Time

Typically smart contracts express time in seconds. However, with EVMcrispr, time can also be represented by appending s, m, h, d, w, mo, and y at the end of the number to define them as seconds, minutes, hours, days, weeks, months, and years respectively. So, for example, 2d would get converted to 172,800 seconds.

# Sending Network Native Tokens

With any `exec` command that calls a payable function on a smart contract you can use the `--value` option to send Ether or any network native token to the target contract. 

#### Syntax 
```
exec <targetContract> <payableFunction> --value <amountOfTokensToSend>
```

For example:

```
switch gnosis

exec @token(WXDAI) deposit() --value 60e18
```
This script would send 60 xDAI to the wxDAI token contract, wrapping them 1:1 into wxDAI and sending them to the caller. 

# Environment Variables

Environment variables let you reference information faster and assign information to names you can use inside your script commands. You need two pieces of information to set a variable, the name you want to give the variable and the data you want to be equal. You can use this syntax:

`set $<variableName> <variableData>`

You can use the `set` command to define variables in EVMcrispr. The `$` symbol identifies a string as a variable name.

Here's an example to show you a typical use case of setting and implementing variables in your script:

```
load aragonos as ar

ar:connect exampleDAO token-manager voting (

  set $aavePool 0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9
  set $dai 0x6b175474e89094c44da98b954eedeac495271d0f
  set $value 1000e18

  act agent $dai approve(address,unint256) $aavePool $value
  act agent $aavePool deposit(address,uint256,address,uint16) $dai $value agent 0
)
```

In the above, we define three variables: 
- `$aavePool` - The address of the [Aave Lending Pool](https://docs.aave.com/developers/v/2.0/deployed-contracts/deployed-contracts) on mainnet.
- `$dai` - The token address of DAI.
- `$value` - A numerical value we want to use repeatedly. In this case, it is 1000*10^18.

Then we tell the agent to approve itself to spend 1000 DAI for the Aave Lending Pool and subsequently request to make the transaction to deposit 1000 DAI into the Aave Lending Pool.

### Default Variables

There are a few default variables inside EVMcrispr that you may need to set to use certain Helpers.

#### `$token.tokenlist`

This sets the token list to be able to fetch data from tokens using the `@token` helper. By default, it is set to https://tokens.uniswap.org/.

#### `$std:ipfs.jwt`

This is the JWT passphrase needed to create IPFS documents using the `@ipfs` helper. You can get a JWT passphrase by creating an account on the IPFS service provider [Pinata](https://www.pinata.cloud/).

#### `$etherscanAPI`

This enables you to fetch contract functions and use them in `exec` or `act` (aragonOS) commands without providing the complete function signature in your script. Check out this comparison:

Without `$etherscanAPI`:

```
set $exampleVault 0x123456789abcdefghijkl12341234

exec @token(WETH) transfer(address,uint256) $exampleVault 40e18
```

With `$etherscanAPI`:
```
set $etherscanAPI ABCDEFGEXAMPLEAPIKEY0123
set $exampleVault 0x123456789abcdefghijkl12341234

exec @token(WETH) transfer $exampleVault 40
```

:::note
Currently, this helper is only available for Etherscan; it may add functionality for other block explorers.
:::

## Calculations
You can make calculations in your scripts without needing to prefix them with any command or helper. Here are a few examples:

```
set $myAge (2022 - 1985)
```

Perhaps a more interesting example:

```
set $fundingStrategy (@token(DAI)::balanceOf(agent:1) / 2 * 3 + @token(DAI)::balanceOf(vault:0) - 3(2**3))
exec agent:1 transfer (@token(DAI)::balanceOf(agent:1) - $fundingStrategy) vault:0
```


## raw

The `raw` command allows sending a transaction to an address using only the raw transaction data.

#### Parameters

- `contract`: The name or address of the contract you wish to interact with.
- `transactionData`: The raw transaction data containing the action you wish to execute.

#### Syntax

```
raw <contract> <transactionData>
```

For example: 

```
switch 100

raw 0xa6B71E26C5e0845f74c812102Ca7114b6a896AB2  0x1688f0b9000000000000000000000000d9db270c1b5e3bd161e8c8503c55ceabee709552000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000180afab6d6f00000000000000000000000000000000000000000000000000000000000001e4b63e800d00000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001c0000000000000000000000000f48f2b2d2a534e402487b3ee7c18c33aec0fe5e40000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005000000000000000000000000839395e20bbb182fa440d08f850e6c7a8f6f0780000000000000000000000000c46c67bb7e84490d7ebdd0b8ecdaca68cf3823f400000000000000000000000005a1ff0a32bc24265bcb39499d0c5d9a6cb2011c000000000000000000000000826976d7c600d45fb8287ca1d7c76fc8eb732030000000000000000000000000ff75e131c711e4310c045317779d39b3b4f718c4000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
```

This particular use case could allow users to deploy Gnosis Safe multisigs on any EVM chain while keeping the same address. This example deploys a safe on Gnosis Chain (ID 100). The transaction data calls the `createProxyWithNonce` function to the Gnosis Safe Factory with the identical data from an existing Gnosis Safe and creates it on a new chain with the same address. Usually, this is a multi-step process, but EVMcrispr can do it with just two lines of code.

# Helpers

## @me

The `@me` helper will reference the Ethereum Address that is currently connected to the EVMcrispr terminal.

A usage example could look like this:

```
load aragonos as ar 
ar:connect exampleDAO token-manager voting:0 (
  exec token-manager mint @me 1337e18
)
```
It would ask the token manager to mint to the currently connected address 1337 of the associated token manager's tokens.


## @token

The `@token` helper fetches the address of the token contract using the token symbol defined in a token list.

#### Parameters
- `tokenSymbol`: The symbol of the token you wish to reference. You can find the symbol in the previously set token list.

#### Environment Variables
- `$token.tokenlist`: The token list you would like to use for referencing token symbols with their respective contract addresses.

<details><summary>Setting the Token List</summary>
By default, EVMcrispr has the <a href='https://tokens.uniswap.org/' target='_blank' rel='noreferrer noopener'>token list from Uniswap</a> (Mainnet, Rinkeby, and Polygon) loaded into the terminal, you can use this list to call any token by referencing its token symbol.  

For example:
- `@token(UNI)` would reference the token address of Uniswap: `0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984`.
- `@token(USDC)` would reference the token address of USDC: `0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48`.


Using the `set` command, you can use a different token list to reference tokens, including on different chains. To use a different token list, you can follow this syntax:

```
set $token.tokenlist <tokenListURL>
```

For example:
- `set $token.tokenlist https://token-list.sushi.com/` - Use the token list provided by Sushiswap.
- `set $token.tokenlist https://tokens.honeyswap.org/` - Use the token list provided by Honeyswap.

</details>

#### Syntax

```
@token(<tokenSymbol>)
```

An example of using `@token` in your script could look like this:

```
exec vault:0 transfer @token(DAI) vault:1 100e18
```

It would request to transfer 100 DAI from the 1st to the 2nd vault.

**_*As always, be aware of each token's decimal precision._**

## @token.balance

Using the token list and `@token.balance`, you can query the balance of a given token held in a specified entity.

#### Parameters
You'll need two parameters to use this helper:

- `tokenSymbol`: The symbol of the token you wish to reference. You can find the symbol in the previously set token list.
- `entity`: The entity you wish to check the balance. You can introduce it by writing the address directly, using a previously defined environment variable, or using the name of a binding defined by a module, such as an installed app in an Aragon DAO, such as `token-manager`, `voting`, or `agent`.

#### Environment variables
- `$token.tokenlist`: The token list you would like to use for referencing token symbols with their respective contract addresses.

#### Syntax

```
@token.balance(<tokenSymbol>,<entity>)
```

An example of using `@token.balance` could look like this:

```
exec vault:0 transfer @token(DAI) agent:0 @token.balance(DAI,vault:0)
``` 

It would request to transfer the entire balance of DAI held by the 1st vault to the 1st agent. 

### Common Usage Example

A common usage example to showcase the `@token` and `@me` helpers and the $token.tokenlist variable and could look like this:

```
load aragonos as ar
ar:connect exampleDAO token-manager voting (
  set $token.tokenlist https://token-list.sushi.com/
  exec finance newImmediatePayment @token(WETH) @me @token.balance(WETH,agent) "Send all WETH"
  exec finance newImmediatePayment @token(ANT) @me @token.balance(ANT,agent) "Send all ANT"
  exec finance newImmediatePayment @token(SUSHI) @me @token.balance(SUSHI,agent) "Send all SUSHI"
)
```

This script would set the token list to Sushiswap's list and then create three immediate payments on the finance app to send the entire balance of the agent's WETH, ANT, and SUSHI holdings to the address currently connected to the terminal.

## @ipfs
The @ipfs command can be used to create and publish an IPFS document directly inside a script.

#### Environment Variables

- `$std:ipfs.jwt`: This is the JWT passphrase needed to create IPFS documents using the `@ipfs` helper. You can get a JWT passphrase by creating an account on an IPFS service provider such as [Pinata](https://www.pinata.cloud/).

#### Parameters

- `content`: The entire string containing the information you want to publish to IPFS.

#### Syntax 

```
@ipfs(<content>)
```

For example:

```
set $std:ipfs.jwt MYIPFSJWTPASSPHRASE.thisisjustanexampleofapassphrase.132soarunq24f8n4qjfnoiloljkrofl
set $myMessage @ipfs("Hello World") 
```

## @id
The `@id` helper can hash a string using the keccak256 function. It takes only one parameter and does not require any environment variables.

#### Parameters
- `content`: The string or variable you want to hash.

#### Syntax
```
@id(<content>)
```

The `@id` helper is handy when working with contracts using [OpenZeppelin standards for Access Control](https://docs.openzeppelin.com/contracts/4.x/access-control#using-access-control). You could use the following syntax as an example:

```
act agent <contract> grantRole(bytes32,address) @id(MINTER_ROLE) @me
```

Assuming your agent has the right roles for the target contract, this would grant the minter role to the address currently connected to the terminal, with `@id` getting the MINTER_ROLE hash and using it in the contract.



## @date
This is a highly versatile helper we can use to reference dates and times in various ways. There are three basic functionalities to cover: now, calendar dates, and time increments/decrements.

### now

`@date(now)` can be used to reference the current date and time when the script is being run. It requires no arguments or variables and returns the current UNIX timestamp.

### Calendar Dates

You can reference a specific calendar day using ISO 8601 format. By default, this uses Coordinated Universal Time (UTC).

#### Syntax
For a calendar date, use this format:
```
@date(<year>-<month>-<day>Z)
``` 

For a calendar date with a specific time, use this syntax:
```
@date(<year>-<month>-<day>T<hour>-<minute>-<second>Z)
``` 

For example:

 ```
 @date(2015-07-30Z)
 ``` 
 
It would return as July 30th, 2015 (The Ethereum genesis block date :smile:).

 OR 

 ```
 @date(2021-01-12T15:30:45)
 ```

 It would return the date of 3:30:45 pm, January 12th, 2021.

 ### Time increments/decrements

We can use the time helpers inside of `@date` to specify a time in the future or past a given date. This takes two arguments: the reference date and the time increment or decrement from this reference date. You can use the `now` variable or calendar date (in the syntax defined above) as the first argument.


#### Syntax
```
@date(<calendarDateOrNow>,[-/+]<timeToAddOrSubtract>)
```
To make this clearer let's look at a few examples:

```
@date(now,-2y-1m)
```
It would return as two years and one month in the past from now.

```
@date(now,+2y+1m)
```
It would return as two years and one month in the future from now.

```
@date(2000-01-01Z,+12y+6m+30d+5h+12m+21s)
```

It would return as 12 years, six months, 30 days, 5 hours, 12 minutes, and 21 seconds in the future from January 1st, 2000.

A typical example of using the `@date` helper would be to create a vesting schedule using [Aragon's Token Manager App](/aragonOS/token-manager#internal-actions)

```
exec token-manager assignVested @me 1000e18 @date(now) @date(now,+10d) @date(now,+30d) false
```

This requests to create a vesting schedule to vest 1,000 tokens to the connected address, starting when the scripts execute, with the cliff ending ten days from then, and all of the tokens vested to `@me` after a total of 30 days from execution. Also, we define the vesting schedule is also non-revocable.

:::warning
A known issue in the Aragon Client will cause the UI to hang and crash when calling this function to the DAO, rendering the Aragon interface unusable. At this point, we do not advise using this function. You can track the issue here:
https://github.com/aragon/client/issues/1543
:::

## switch

The `switch` command pops the wallet to switch to other EVM chains within a script.

#### Parameters

- `id`: The ID of the EVM chain you would like to switch to

#### Syntax

```
switch <id> 
```

For example:

```
switch 1
```

It would request to change the chain you are connected with on your web wallet to Ethereum Mainnet.

You can find a near-comprehensive list of EVM chains and their IDs at https://chainlist.org/.

## Getting contract info with `::` 

The `::` operator is used to get information from read-only functions in a smart contract. The function responses can be used directly in scripts or saved in a variable to be utilized later.

#### Parameters

- `contractAddress`: This is the contract address with the read-only function you wish to call
- `functionName`: The name of the read-only function you wish to call
- `functionInputs`: Any required inputs for the function to return information.

#### Syntax

```
<contractAddress>::<functionName>(<functionInputs>)
```

Here there are a few examples:

```
set $WETHdecimals @token(WETH)::decimals()
```

It would check the `decimals` read-only function in the WETH contract. It requires no inputs and would return 18, saving it to the `$WETHdecimals` variable.

If the function you want to call requires information to return information, then these become your inputs into these helpers. So, for example, in the [WETH token contract](https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2#readContract), the function balanceOf requires an address to return a response, this could look like:

```
set $myBalance @token(WETH)::balanceOf(@me)
```
It would save my WETH balance to the `$myBalance` variable. So here, @me (the caller's address) becomes the parameter needed to call `::balanceOf(<address>)` from the WETH token contract.

We may want information from a smart contract, and the function requires multiple inputs. For example, it could look like this:
```
set $myAaveBalance 0x464C71f6c2F760DdA6093dCB91C24c39e5d6e18c::balanceOf(18,@me)
```

You can also use arrays if needed:
```
set $someFunction 0x123456789abcdefghijkl123412341337::someFunction([value0,value1,value2],parameter,otherParameter)
```

If you wanted to write it directly into an `exec` command without saving it to a variable, the syntax remains mostly the same:

```
set $myMultisig 0x123456789abcdefghijkl123412341337

exec @token(WETH) transfer @token(WETH)::balanceOf(@me) $myMultisig
```

:::tip
If you want to get fancy, you can also concatenate multiple `::` helpers. Here's an example:

```
load aragonos as ar

ar:connect myDao token-manager voting (
  set $myTokenSymbol token-manager:1::token()::symbol()
)
```

It would call the read-only function `token` in the second Token Manager, get that address and call the `symbol` read-only function of that address. The variable `$myTokenSymbol` would then be the symbol of the token associated with the specified Token Manager in an Aragon DAO.
:::

## print

The `print` command will show the result of a variable or referenced information.

#### Syntax

```
print <informationToPrint>
```

For example:

Print the decimal precision of the DAI token.
```
print @token(DAI)::decimals()
```
Print the UNIX timestamp of 2 weeks from now.
```
print @date(now, +2w)
```
Print my current DAI balance plus 50, divided by 3.
```
print ((@token.balance(DAI,@me) + 50) / 3 )
```
