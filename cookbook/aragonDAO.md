---
id: aragonRecipes
title: Aragon DAO
---

### Creating a reputation token voting system
This script will allow you to spin up a new token-weighted voting system inside your Aragon DAO and set up all the permissions you need to start.
```
load aragonos as ar

ar:connect evmcrisprexampledao token-manager voting (
    new-token "my token name" myTokenSymbol token-manager:new 18 false
    install token-manager:new token:myTokenSymbol false 0
    install voting:new token:myTokenSymbol 51e16 10e16 3d
    grant ANY_ENTITY voting:new CREATE_VOTES_ROLE voting
    grant voting:new token-manager:new MINT_ROLE voting
    grant voting:new token-manager:new BURN_ROLE voting
    grant voting:0 token-manager:new MINT_ROLE voting
    exec token-manager:new mint @me 1e18
    revoke voting:0 token-manager:new MINT_ROLE false 
)
```
This script will:
* Create a new non-transferrable reputation token and a Token Manager to manage it.
* Create a new Voting app with support required of 51%, a quorum of 10%, and a vote duration of 3 days.
* Connect these tokens and Token Manager to the new Voting app.
* Allow any address to create votes in the new Voting app.
* Mint the sender one token, which they can use to pass votes and mint or burn more tokens for members in the new voting app.

### Depositing tokens into a vault and setting a payment schedule
We can use the unknown features built inside the Aragon Finance app to create a payment schedule for internal or external contributors. Unfortunately, these payment schedule functions are unavailable through the AragonOS UI and only through direct function calls.

```
# switch to Gnosis Chain
switch 100
load aragonos as ar

# define variables, including recipients
set $token.tokenlist https://tokens.honeyswap.org/
set $markoAddress 0xdafea492d9c6733ae3d56b7ed1adb60692c98bc5
set $mohammadAddress 0xdac17f958d2ee523a2206206994597c13d831ec7
set $sarahAddress 0x86d3e894b5cdb6a80afffd35ed348868fb98dd3f

# tx 1 - approve and deposit tokens
ar:connect evmcrisprexampledao (
    exec @token(WXDAI) approve(address,uint256) finance 3000e18
    exec finance deposit @token(WXDAI) 6000e18 "documentation contract payments"
)
# tx 2 - create a payment schedule for recipients
ar:connect evmcrisprexampledao token-manager voting (
    exec finance newScheduledPayment @token(WXDAI) $markoAddress 500e18 @date(now) 1mo 4 "payments for copywriting work"
    exec finance newScheduledPayment @token(WXDAI) $sarahAddress 750e18 @date(now) 1mo 4 "payments for design work"
    exec finance newScheduledPayment @token(WXDAI) $mohammadAddress 250e18 @date(now) 1mo 4 "payments for translation work"
)
```
In this transaction, we deposit a sum of money into our Aragon DAO for an agreed-upon amount for some contracted work. We then create a vote to set up scheduled payments for each contributor working on the contracted work.
