---
id: generalRecipes
title: General
---

## Deploying a multisig to many chains with Gnosis Safe
When you spin up a Gnosis Safe Multisig on a particular chain, it has its unique contract address. However, if you want to create the same multisig on another chain, it will be given a different address. However, there is a way to deploy a multisig to many chains with the same contract address. EVMcrispr makes it easy!

<details><summary>Steps to get your deploymentData</summary>
<ol>
<li>Deploy a Gnosis Safe on any chain, or find the Gnosis Safe contract you wish to duplicate onto other chains.</li>
<li>Find the transaction that created the Gnosis Safe using the Gnosis Safe Factory.</li>
<li>Copy the raw transaction data and paste it in place of the `deploymentData` variable in the script example below.</li>
</ol>
</details>

```
# This is the Gnosis Safe Factory contract. It is the same on every chain where Gnosis Safe is deployed.
set $gnosisFactory 0xa6B71E26C5e0845f74c812102Ca7114b6a896AB2

# This is the unique deployment data for a specific Gnosis Safe - you will need to replace this data.
set $deploymentData 0x1688f0b90000000000000000000000003e5c63644e683549055b9be8653de26e0b4cd36e0000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000001843dc407500000000000000000000000000000000000000000000000000000000000000164b63e800d0000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000140000000000000000000000000f48f2b2d2a534e402487b3ee7c18c33aec0fe5e40000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000662048b0a591d8f651e956519f6c5e3112626873000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000

# switch to Gnosis Chain
switch 100
raw $gnosisFactory $deploymentData

# switch to Polygon
switch 137
raw $gnosisFactory $deploymentData

# switch to Optimism
switch 10
raw $gnosisFactory $deploymentData
```

## Creating a stream with Superfluid 
This script will create a Superfluid flow for a given token. There are two examples one for creating a flow for a native token and the second for a typical ERC20 token. You can [learn more about Superfluid here](https://www.superfluid.finance/).
```
switch 100

# Contract to wrapped xDAI into a supertoken
set $SETHProxy 0x59988e47a3503aafaa0368b9def095c818fdca01

# Contract used for managing flows
set $CFAv1Forwarder 0xcfa132e353cb4e398080b9700609bb008eceb125

# Super token of xDAI
set $xDAIx 0x59988e47a3503aafaa0368b9def095c818fdca01

# Recipient
set $destination 0x8790B75CF2bd36A2502a3e48A24338D8288f2F15

# Upgrade 1 unit of the native token into a super (streamable) token
exec $SETHProxy upgradeByETH() --value 1e18

# Atart a flow of 1 native token per month to destination address
exec $CFAv1Forwarder createFlow(address,address,address,int96,bytes) $xDAIx @me $destination (1e18/1mo) 0x

# Stop the flow
exec $CFAv1Forwarder deleteFlow(address,address,address,bytes) $xDAIx @me $destination 0x
```

```
switch 100
set $token.tokenlist https://tokens.honeyswap.org

# Gnosis Chain contract used for managing flows
set $CFAv1Forwarder 0xcfa132e353cb4e398080b9700609bb008eceb125

# SuperHoney token 
set $HNYx 0xc0712524b39323eb2437e69226b261d928629dc8

# Recipient
set $destination 0x8790B75CF2bd36A2502a3e48A24338D8288f2F15

# Upgrade 1 HNY into super token
exec @token(HNY) approve(address,uint256) $HNYx 1e18
exec $HNYx upgrade(uint256) 1e18

# Start a flow of 1 HNY/month to destination address
exec $CFAv1Forwarder createFlow(address,address,address,int96,bytes) $HNYx @me $destination (1e18/1mo) 0x

# Stop the flow
exec $CFAv1Forwarder deleteFlow(address,address,address,bytes) $HNYx @me $destination 0x
```

## Managing Roles and Access Control

Access Control allows for scoping permissions within smart contracts by assigning roles to specific external addresses or contracts. Most often contract admin's can assign these roles allowing only certain entities to call certain functions. We can make this magic happen using EVMcrispr and the `@id` helper.

```
switch 100

load aragonos as ar
# define our contracts
set $distributorContract 0x18a46865AAbAf416a970eaA8625CFC430D2364A1
set $myDAOAgent 0x8ca46B4b9Bf0fa6Ba4bC528606B4cb101B3401A4

# grant distributor role and assign tokens to distribute
exec $distributorContract grantRole(bytes32,address) @id(DISTRIBUTOR_ROLE) $myDAOAgent
exec $distributorContract assign(address,uint256) $myDAOAgent 10000e18

# create a DAO vote to distribute tokens to specific addresses in specific amounts
ar:connect evmcrisprexampledao token-manager voting (
    act $myDAOAgent $distributorContract allocateMany(address[],uint256[]) [0x865c2f85c9fea1c6ac7f53de07554d68cb92ed88,0x5d28fe1e9f895464aab52287d85ebff32b351674,0xed8db37778804a913670d9367aaf4f043aad938b] [1000e18, 2100e18, 900e18]
)
```


This example shows an implementation of a token distributor contract. The contract admin can assign a role for a given entity to distribute tokens held by the contract. We can use the `@id` helper to find the hashed bytes of any access control role in a given contract. In this case, we get the hash of the `DISTRIBUTOR_ROLE` and give it to a DAO agent. We assign the agent tokens to distribute and then connect to the DAO and create a vote to distribute tokens using `allocateMany`. You can find [more information for Access Control in the OpenZeppelin documentation](https://docs.openzeppelin.com/contracts/4.x/api/access#AccessControl).

Conversely we can revoke a role using `revokeRole`, for example:

```
exec $distributorContract revokeRole(bytes32,address) @id(DISTRIBUTOR_ROLE) $myDAOAgent
```

## Upgrading Proxies

We can also benefit from the Upgradable Proxy Pattern introduced by Open Zeppelin to upgrade our proxy smart contracts to new implementations using the basic functionality of EVMcrispr. We can even tie in upgrading proxies into more complex actions. Depending on the type of proxy used this can be done with the function named `upgradeTo` or `upgradeProxy`