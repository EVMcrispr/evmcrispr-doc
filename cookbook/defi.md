---
id: defiRecipes
title: DeFi
---
## Harvesting and Cashing Out!
This is actually two scripts that can be ran one after the other. This will harvest pending rewards from a series of SushiSwap farms then in the second transaction swap the $SUSHI and $GNO rewards to XDAI.

You'll need to paste the first script, run it, and then replace it with the second script then run it.

```bash
# Script 1
switch 100
# switch to gnosis chain and harvest from farms on sushiSwap
set $sushiFarm 0xdDCbf776dF3dE60163066A5ddDF2277cB445E0F3
# the price of SUSHI to xDAI - current is $1.20 in this example
set $sushiXDaiPrice (1.20e18 * 95 / 100)
# the price of GNO to xDAI - current is $92.68 in this example
set $gnosisXDaiPrice (92.68e18 * 95 / 100)
# farms on sushi that we are staked in
exec $sushiFarm harvest(uint256,address) 0 @me # USDC / WXDAI
exec $sushiFarm harvest(uint256,address) 1 @me # WETH / WBTC
exec $sushiFarm harvest(uint256,address) 5 @me # USDT / WXDAI

# Script 2
switch 100
set $sushiswap 0x1b02da8cb0d097eb8d57a175b88c7d8b47997506
set $sushiPath [0x2995D1317DcD4f0aB89f4AE60F3f020A4F17C7CE, 0x9C58BAcC331c9aa871AFD802DB6379a98e80CEdb, 0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d]
set $gnoPath [0x9C58BAcC331c9aa871AFD802DB6379a98e80CEdb, 0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d]
set $token.tokenlist https://token-list.sushi.com

#approve tokens to be swapped
exec @token(SUSHI) approve(address,uint256) $sushiswap @token.balance(SUSHI,@me) 
exec @token(GNO) approve(address,uint256) $sushiswap @token.balance(GNO,@me) 

# swap harvested tokens for xDAI
exec $sushiswap swapExactTokensForETH(uint256,uint256,address[],address,uint256) @token.balance(SUSHI,@me) (@token.balance(SUSHI,@me) * ($sushiXDaiPrice) / 1e18) $sushiPath @me @date(now,+10m)
exec $sushiswap swapExactTokensForETH(uint256,uint256,address[],address,uint256) @token.balance(GNO,@me) (@token.balance(GNO,@me) * ($gnosisXDaiPrice) / 1e18) $gnoPath @me @date(now,+10m)
```

## Claim CRV, Lock and Vote! 
This script will harvest your pending CRV rewards, lock them for 12 weeks (and minting veCRV in the process) and then using them to vote on the gauge for the 3pool LP, thus increasing its rewards allocation. 
```bash
# switch to mainnet
switch 1

# set variables for curve contracts
set $curveMinter 0xd061D61a4d941c39E5453435B6345Dc261C2fcE0
set $curveVoterEscrow 0x5f3b5DfEb7B28CDbD7FAba78963EE202a494e2A2
set $3poolGauge 0x762648808EF8B25C6D92270b1C84Ec97dF3bED6B
set $gaugeController 0x2F50D538606Fa9EDD2B11E2446BEb18C9D5846bB
set $veCRV 0x5f3b5DfEb7B28CDbD7FAba78963EE202a494e2A2

# harvest, mint, lock and vote!
exec $curveMinter mint(address) $3poolGauge 
exec @token(CRV) approve(address,uint256) $curveVoterEscrow @token.balance(CRV,@me) 
exec $curveVoterEscrow create_lock(uint256,uint256) @token.balance(CRV,@me) @date(now,+12w) 
exec $gaugeController vote_for_gauge_weights(address,uint256) $3poolGauge 10000 
```

## Create a leveraged position on AAVE v3
This script will deposit and consecutively borrow an asset on AAVE, then repeat the process again with the available borrowed assets. The purpose of this script is to create a leveraged borrowing position, maximizing the lend and borrow APYs to earn more yield. The amounts calculated in the `leverage` variables are made to keep your borrowing level under the liquidation threshold.

:::note
Not financial advice.
:::
```bash
switch 137
set $token.tokenlist https://tokens.honeyswap.org
# define lending pool contract on polygon
set $aaveLendingPoolV3 0x794a61358d6845594f94dc1db02a252b5b4814ad
# get initial token balance
set $myWMATIC @token.balance(WMATIC,@me)
# set borrow amount to adjust for WMATIC's max borrow threshold
set $leverageOne ($myWMATIC * 65 / 100)
# adjust next leverages amount for health factor
set $leverageTwo ($leverageOne * 65 / 101)
set $leverageThree ($leverageTwo * 65 / 101)
# total sum of WMATIC deposited for approval
set $approveAmount ($myWMATIC + $leverageOne + $leverageTwo + $leverageThree)

 exec @token(WMATIC) approve(address,uint256) $aaveLendingPoolV3 $approveAmount
 exec $aaveLendingPoolV3 supply(address,uint256,address,uint16) @token(WMATIC) @token.balance(WMATIC,@me) @me 0
 exec $aaveLendingPoolV3 borrow(address,uint256,uint256,uint16,address) @token(WMATIC) $leverageOne 2 0 @me
 exec $aaveLendingPoolV3 supply(address,uint256,address,uint16) @token(WMATIC) $leverageOne @me 0
 exec $aaveLendingPoolV3 borrow(address,uint256,uint256,uint16,address) @token(WMATIC) $leverageTwo 2 0 @me
 exec $aaveLendingPoolV3 supply(address,uint256,address,uint16) @token(WMATIC) $leverageTwo @me 0
 exec $aaveLendingPoolV3 borrow(address,uint256,uint256,uint16,address) @token(WMATIC) $leverageThree 2 0 @me
 exec $aaveLendingPoolV3 supply(address,uint256,address,uint16) @token(WMATIC) $leverageThree @me 0
```