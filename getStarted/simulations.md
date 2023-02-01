---
id: simulations 
title: Simulating Scripts
---
import useBaseUrl from '@docusaurus/useBaseUrl'

With the power of [Tenderly](https://tenderly.co/) you can simulate your EVM scripts right inside the terminal. You'll need a Tenderly subscription and an Access Token to get started. You can find [how to get an Access Token in the Tenderly documentation](https://docs.tenderly.co/simulations-and-forks/simulation-api).

:::note
Tenderly subscriptions (and subsequently simulating transactions) are not a free service. However, Tenderly does offer free 14-day trials (at the time of writing).
:::


To create a transaction simulation, you use the following syntax:

```
# Define the chain you want to simulate the transaction on
switch <chainIdNumber>

# Load the module as "sim" - this can be any alias you choose
load tenderly as sim

# Set your Tenderly access token
set $tenderly <tenderlyUserName>/<myProjectName>/<accessToken>

sim:fork (
  # Here, you insert the body of your script
)
```

This script will generate a pop-up containing the link to your forked simulation on Tenderly; click on it to see the magic happening!

<img alt='EVMcrispr simulation in Tenderly' src={useBaseUrl('img/evmSimulation.png')} />


## Simulating from another address

If you would like to simulate a transaction using a different address than the connected one as the sender, We can do this with the `--from` option. We can add this next to `sim:fork` or append it onto the `exec` commands executing an action. As an example, the syntax could look like this:

```
switch 1
load tenderly as sim
load aragonos as ar
set $tenderly mitch/best-project/123456LOL1337rofl911irl

sim:fork (
  set $someAddress 0x3acf13df5af4de0fe2c69e1690e475186eee053e

  exec $sushiFarm harvest(uint256,address) 0 @me --from $someAddress
  exec $sushiFarm harvest(uint256,address) 1 @me --from $someAddress
  exec $sushiFarm harvest(uint256,address) 5 @me --from $someAddress
)
```

Or:

```
switch 1
load tenderly as sim
load aragonos as ar
set $tenderly mitch/best-project/123456LOL1337rofl911irl
set $someAddress 0x3acf13df5af4de0fe2c69e1690e475186eee053e


sim:fork --from $anotherAddress (  
  exec $sushiFarm harvest(uint256,address) 0 @me
  exec $sushiFarm harvest(uint256,address) 1 @me
  exec $sushiFarm harvest(uint256,address) 5 @me
)
```

## Creating tests with `expect`

You can use the `expect` command in your simulation code to specify an expected outcome or test case. This command works through basic logic operators such as >, <, ==, !=. The basic syntax for `expect` looks like this:

```
expect <ValueOrAction> <logicalOperator> <expectedValue>
```

This format loosely follows the logic of the [chai assertion library](https://www.chaijs.com/).

Here's some examples of how to implement `expect` in your simulations:

```
load tenderly as sim
set $tenderly mitch/best-project/123456LOL1337rofl911irl

set $myContract 0xdac17f958d2ee523a2206206994597c13d831ec7

sim:fork (
  exec @token(DAI) transfer(address,uint256) $myContract 100e18
  expect @token(DAI)::balanceOf($myContract) >= 100e18
)
```

Or perhaps something a bit more complex:

```
# Allow passing a proposal after enough time in a Garden DAO
load tenderly as sim
set $tenderly mitch/best-project/123456LOL1337rofl911irl
set $gardenVoters [0x6120f29ccb5b1DDaa5a747235F257Ef6cB47970F, 0xc89000E12C600b12D6e61a535cD3fedd4ac1eeC4, 0xa328500Eab25698b8b146D195F35f5b26C93AAEe]
sim:fork (
  set $proposalId $conviction::proposalCounter()
  exec $conviction addProposal(string,bytes,uint256,bool,address) "Test proposal" "0x" 50e18 false $somebodyElse --from $gardenHolder

  for $gardenVoter of $gardenVoters (
    exec $conviction stakeToProposal(uint,uint) $proposalId 400e18 --from $gardenVoter
  )

  wait 30d 5s

  exec $conviction executeProposal(uint) $proposalId
  expect $conviction::requestToken()::balanceOf($somebodyElse) >= 50e18
)
```
:::tip
`expect` can also be used outside a `sim:fork` block with `sim:expect`. When you run EXECUTE, EVMcrispr will print a notification telling you whether your `expect` command returned true or false.

For example:
```
set $numberOne 2
set $numberTwo 3

load tenderly as sim

sim:expect ($numberOne + $numberTwo) == 5
```
:::

## Simulating from a specific block number

You can simulate a transaction specifying a certain past block number to make the simulation from. We can implement the syntax as such:

```
switch <chainId>

sim:fork --block-number <blockNumber>  (  
  # Insert the body of your script here
)
```

For example:

```
# Switch to Gnosis Chain
switch 100
load tenderly as sim
set $token.tokenlist https://tokens.honeyswap.org
set $tenderly mitch/best-project/123456LOL1337rofl911irl
set $GIVstakingContract 0xD93d3bDBa18ebcB3317a57119ea44ed2Cf41C2F2
set $GIVtokenManager 0x24F2d06446AF8D6E89fEbC205e7936a602a87b60

# Start the simulation at block 24029921 on Gnosis Chain
sim:fork --block-number 24029921 (
  # Wrap GIV tokens into gGIV - begin earning yield on GIVfarm
  exec $GIVtokenManager wrap(uint256) @token.balance(GIV, @me)
  wait 3mo
  # Claim pending rewards after 3 months
  exec $GIVstakingContract getReward
)
```


### Using `wait`

Within the same concept as specifying the block number in a simulation, we can also tell the simulation to simulate a certain amount of time passing before the next action defined in the script. We can do this with the `wait` command. Here is an example of the syntax:


```
load tenderly as sim
load aragonos as ar
switch 100
set $tenderly semi/sim/1eN9a5Iy27L8WDhCb-B4zzXFXHdFWdob

set $tokenholder 0x62bb362d63f14449398b79ebc46574f859a6045d
set $mohammadAddress 0xdac17f958d2ee523a2206206994597c13d831ec7
set $token.tokenlist https://tokens.honeyswap.org

sim:fork --from $tokenholder (

  # We create a new vote to start a new scheduled payment

  ar:connect evmcrisprexampledao token-manager voting (
    set $voteId voting::votesLength()
    set $paymentId finance::paymentsNextIndex()
    exec finance newScheduledPayment @token(WXDAI) $mohammadAddress 250e18 @date(now) 1mo 4 "payments for translation work"
  )

  # We vote on it and wait 1 day to execute it.
  ar:connect evmcrisprexampledao (
    exec voting vote $voteId true
  )
  wait 1d
  ar:connect evmcrisprexampledao (
    exec voting executeVote $voteId
  )

  # We wait one month to receive the first payment
  wait (1mo + 1d)
  ar:connect evmcrisprexampledao (
    exec finance receiverExecutePayment $paymentId --from $mohammadAddress
  )
)
```
