---
id: generalRecipes
title: General
---

### Deploying a multisig to many chains
When you spin up a Gnosis Safe Multisig on particular chain it has it's unique contract address, however if you want to create the same multisig on another chain it will be given a different address, however there is a way to deploy a multisig to many chains with the same contract address. EVMcrispr makes it easy!

<details><summary>Steps to get your deploymentData</summary>
1. Deploy a gnosis-safe on any chain, or find the gnosis-safe contract you wish to duplicate onto other chains. 
<br />
2. Find the transaction that created the gnosis safe using the Gnosis Safe Factory.
<br />
3. Copy the raw transaction data and paste in place of the `deploymentData` variable in the script example below. 
</details>

```
# This is the Gnosis Safe Factory contract, it is the same on every chain where gnosis safes exist
set $gnosisFactory 0xa6B71E26C5e0845f74c812102Ca7114b6a896AB2
# This is the unique deployment data for a specific gnosis safe - you'll need to replace this data
set $deploymentData 0x1688f0b90000000000000000000000003e5c63644e683549055b9be8653de26e0b4cd36e0000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000001843dc407500000000000000000000000000000000000000000000000000000000000000164b63e800d0000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000140000000000000000000000000f48f2b2d2a534e402487b3ee7c18c33aec0fe5e40000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000662048b0a591d8f651e956519f6c5e3112626873000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000

switch 100
raw $gnosisFactory $deploymentData

switch 137
raw $gnosisFactory $deploymentData

switch 10
raw $gnosisFactory $deploymentData
```

### Creating a stream with Superfluid 
This script will create a Superfluid flow for a given token. There are two examples one for creating a flow for a native token and the second for a typical ERC20 token. You can [learn more about Superfluid here](https://www.superfluid.finance/).
```
switch 100
# wrapped superfluid xdai flow
set $SETHProxy 0x59988e47a3503aafaa0368b9def095c818fdca01
# contract used for managing flows
set $CFAv1Forwarder 0xcfa132e353cb4e398080b9700609bb008eceb125
# the super token of xDAI
set $xDAIx 0x59988e47a3503aafaa0368b9def095c818fdca01
# recipient
set $destination 0x8790B75CF2bd36A2502a3e48A24338D8288f2F15
# upgrade 1 unit of the native token into a super (streamable) token
exec $SETHProxy upgradeByETH() --value 1e18
exec $CFAv1Forwarder createFlow(address,address,address,int96,bytes) $xDAIx @me $destination (1e18/1mo) 0x
exec $CFAv1Forwarder deleteFlow(address,address,address,bytes) $xDAIx @me $destination 0x
```

```
switch 100
set $token.tokenlist https://tokens.honeyswap.org
# gnosis chain contract used for managing flows
set $CFAv1Forwarder 0xcfa132e353cb4e398080b9700609bb008eceb125
# super honey 
set $HNYx 0xc0712524b39323eb2437e69226b261d928629dc8
# recipient
set $destination 0x8790B75CF2bd36A2502a3e48A24338D8288f2F15

exec @token(HNY) approve(address,uint256) $HNYx 1e18
exec $HNYx upgrade(uint256) 1e18
exec $CFAv1Forwarder createFlow(address,address,address,int96,bytes) $HNYx @me $destination (1e18/1mo) 0x
exec $CFAv1Forwarder deleteFlow(address,address,address,bytes) $HNYx @me $destination 0x
```