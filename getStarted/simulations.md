---
id: simulations 
title: Simulating Scripts
---
import useBaseUrl from '@docusaurus/useBaseUrl'

With the power of [Tenderly](https://tenderly.co/) you can simulate your EVM scripts right inside of the terminal. To get started you'll need to get yourself a Tenderly subscription and an Access Token. You can find [how to get an Access Token in the Tenderly documentation](https://docs.tenderly.co/simulations-and-forks/simulation-api).

:::note
Tenderly subscriptions and subsequently simulating transactions is not a free service. However Tenderly does offer free 14 day trials (at time of writing).
:::


To create a transaction simulation you use the following syntax:

```bash
# define the chain you want to simulate the transaction on
switch <chainIdNumber>
# loading the module as "sim" - this can be any alias you choose
load tenderly as sim
# setting the path to your tenderly access token
set $tenderly <tenderlyUserName>/<myProjectName>/<accessToken>

sim:fork (
    # here you insert the body of your script
  
)
```

This will generate a pop-up containing the link of your forked simulation on tenderly, paste the link in your browser to see the magic happening!

<img alt='evm simulation in tednerly' src={useBaseUrl('img/evmSimulation.png')} />


## Simulating from another Address

If you would like to simulate a transaction using a different address than the connected one as the sender this can be done with the `--from` option. This can be added next to `sim:fork` or appended onto each line of the script executing an action. As an example the syntax could look like this:

```bash
switch 1
load tenderly as sim
load aragonos as ar
set $tenderly mitch/best-project/123456LOL1337rofl911irl

sim:fork (
    set $anotherAddress 0x388C818CA8B9251b393131C08a736A67ccB19297
    set $someAddress 0x3acf13df5af4de0fe2c69e1690e475186eee053e
    ar:connect evmcrisprexampledao token-manager voting (
    exec token-manager mint @me 100e18 --from $anotherAddress
    exec token-manager mint @me 100e18 --from $someAddress
    ) 
)
```

OR 

```bash
switch 1
load tenderly as sim
load aragonos as ar
set $tenderly mitch/best-project/123456LOL1337rofl911irl
set $anotherAddress 0x388C818CA8B9251b393131C08a736A67ccB19297
set $someAddress 0x3acf13df5af4de0fe2c69e1690e475186eee053e


sim:fork --from $anotherAddress (  
    ar:connect evmcrisprexampledao token-manager voting (
    exec token-manager mint $anotherAddress 100e18 
    exec token-manager mint $someAddress 50e18
    ) 
)
```

## Creating tests with `expect`

In your simulation code block you can use the `expect` command to specify an expected outcome or test case. This command works through basic logic operators such as >, <, ==, !=. The basic syntax for `expect` looks like this:

```
expect <ValueOrAction> <logicalOperator> <expectedValue>
```

This format loosely follows the logic of the [chai assertion library](https://www.chaijs.com/).

Here's some examples of how to implement `expect` in your simulations:

```bash
load tenderly as sim
set $tenderly mitch/best-project/123456LOL1337rofl911irl
set $myContract 0xdac17f958d2ee523a2206206994597c13d831ec7

sim:fork (
exec @token(DAI) transfer(address,uint256) $myContract 100e18
expect @token(DAI)::balanceOf($myContract) >= 100e18
)
```

OR perhaps something a bit more complex:

```bash
 # allow to pass a proposal after enough time in Gardens
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

    expect (
        exec $conviction executeProposal(uint) $proposalId
        ) 
    toEmit ProposalExecuted
  )
  ```

## Simulating from a specific Block Number

You can simulate a transaction specifying a certain past block number to make the simulation from. The syntax can be implemented as such:

```bash
switch <chainIdNumber>

sim:fork --blocknumber <blockNumber>  (  
    # insert the body of your script here

)
```

For example:

```bash
# switch to gnosis chain
switch 100
load tenderly as sim
set $token.tokenlist https://tokens.honeyswap.org
set $tenderly mitch/best-project/123456LOL1337rofl911irl
set $GIVstakingContract 0xD93d3bDBa18ebcB3317a57119ea44ed2Cf41C2F2
set $GIVtokenManager 0x24F2d06446AF8D6E89fEbC205e7936a602a87b60

# starting the simultation at block 24029921 on gnosis chain
sim:fork --blocknumber 24029921 (
    # wrap GIV tokens into gGIV - begin earning yield on GIVfarm
    exec $GIVtokenManager wrap(uint256) @token.balance(GIV, @me)
    wait 3mo
    # claim pending rewards after 3 months
    exec $GIVstakingContract getReward
)
```


### Using `wait`

Within the same concept as specifying the block number in a simulation we can also tell the simulation to simulate a certain amount of time passing before the next action defined in the script. This can be done with the `wait` command. Here is an example syntax:


```bash
switch 1
load tenderly as sim
load aragonos as ar
set $tenderly mitch/best-project/123456LOL1337rofl911irl
set $mohammadAddress 0xdac17f958d2ee523a2206206994597c13d831ec7

sim:fork (  

    ar:connect evmcrisprexampledao token-manager voting (
    exec finance newScheduledPayment @token(WXDAI) $mohammadAddress 250e18 @date(now) 1mo 4 "payments for translation work"
    )
wait 1mo30s
exec finance receiverExecutePayment 0 --from $mohammadAddress
)
```

