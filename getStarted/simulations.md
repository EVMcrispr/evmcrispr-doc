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

```
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

This will generate a pop-up containing the link of your forked simulation on tenderly, past the link in your browser to see the magic happening!

<img alt='evm simulation in tednerly' src={useBaseUrl('img/evmSimulation.png')} />

## Simulating from another Address

If you would like to simulate a transaction using a different address than the connected one as the sender this can be done with the `--from` option. This can be added next to `sim:fork` or appended onto each line of the script executing an action. As an example the syntax could look like this:

```
switch 1
load tenderly as sim
load aragonos as ar
set $tenderly mitch/best-project/123456LOL1337rofl911irl

sim:fork (
    set $anotherAddress 0x388C818CA8B9251b393131C08a736A67ccB19297
    set $someAddress 0x3acf13df5af4de0fe2c69e1690e475186eee053e
    ar:connect evmcrisprexampledao token-manager voting (
    exec token-manager mint @me 100e18 --from $anotherAddress
    raw finance 0xa9059cbb000000000000000000000000377b4882a370fba6bde4289e424e59d4a051e473000000000000000000000000000000000000000000000006c75518bd4459dc00 --from $someAddress

    ) 
)
```

OR 

```
switch 1
load tenderly as sim
load aragonos as ar
set $tenderly mitch/best-project/123456LOL1337rofl911irl

sim:fork --from 0x388C818CA8B9251b393131C08a736A67ccB19297 (  
    ar:connect evmcrisprexampledao token-manager voting (
    exec token-manager mint @me 100e18 
    raw finance 0xa9059cbb000000000000000000000000377b4882a370fba6bde4289e424e59d4a051e473000000000000000000000000000000000000000000000006c75518bd4459dc00 
    ) 
)
```

## Simulating from a specific Block Number

You can simulate a transaction specifying a certain past block number to make the simulation from. The syntax can be implemented as such:

```
switch <chainIdNumber>

sim:fork --blocknumber <blockNumber>  (  
    # insert the body of your script here

)
```
### Using `wait`

Within the same concept as specifying the block number in a simulation we can also tell the simulation to simulate a certain amount of time passing before the next action defined in the script. This can be done with the `wait` command. Here is an example syntax:


```
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
exec finance receiverExecutePayment --from $mohammadAddress
)
```