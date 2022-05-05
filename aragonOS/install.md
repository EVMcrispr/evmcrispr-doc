---
id: install
title: install
---
import useBaseUrl from '@docusaurus/useBaseUrl'
import styles from '../src/css/articles.css'

The `install` command will install a native or custom aragon app to your DAO. In this article we will breakdown the parameters and how to install native Aragon OS apps. These include

- Finance
- Voting
- Agent 
- Tokens


We'll explore custom AragonOS apps in the Custom section

## Voting App

You'll need the following parameters to install the Voting App to your DAO:

- Voting Token Address
    - This is the token your DAO recognizes to give voting power to your members, you should by default have already a Minime Token associated with your DAO from setup in the `Tokens` App. To learn how to configure a new token for your app, check out the `Tokens` section (ADD LINK)
- Support Required Percent
    - This is the percent of YES votes vs. NO votes needed to pass a proposal. This parameter is expressed in WEI. i.e. for a Support Required of 51% this is 0.51 which in WEI equals *51e16* (51000000000000000000)
- Minimum Approval Percent
    - This is the amount of YES votes needed from the total token supply. This parameter is expressed in WEI similar to the example above in Support Required
- Vote Duration 
    - This is the amount of time each vote remains open for, be aware that currently this parameter cannot be changed once it is set, so choose wisely. This parameter is normally expressed in seconds*.

::: info
    *We can leverage a bit of syntax-sugar to make calculating time easier with EVMcrispr. Time can also be expressed by appending s, m, h, d, w, and y at the end of the number for defining them as seconds, minutes, hours, days, weeks, and years respectively. For example 2d would get converted to 172,800 seconds, which is usually the format solidity smart contracts expect time periods to be passed in as.
:::

to install this app the syntax is as follows:

```
connect {yourDAOsAddress} {forwardingPath}
install voting:new {votingTokenAddress} {supportRequiredPercent} {miniumApproval} {voteDuration} 
// add any permissions you want to grant here.
```
You should also consider what permissions you'll need to integrate your new voting app. You can append these directly to your installation scripts. Learn more in the grants command documentaion.(ADD LINK)


## Agent App

The agent will allow you to make external interactions with other ethereum addresses, including smart contracts. The Agent usually as well will hold DAO funds - which is managed by the finance app. Only one finance app can manage one agent's funds. Having multiple agents can be useful to manage different pools of funds, which corresponds to having multiple finance apps to manage them. Also if you want your DAO to administer or have extraordinary privileges on certain smart contracts it can be useful in certain situations to have different agents, with unique permissions to have those extra powers. 

Installing an agent does not require any parameters, however you should configure your permissions directly with installing a new agent otherwise it will not be able to interact with any of your apps. Learn more in the grants command documentaion.(ADD LINK)

to install this app the syntax is as follows:

```
connect {yourDAOsAddress} {forwardingPath}
install agent:new
// add any permissions you want to grant here.
```

## Finance App

