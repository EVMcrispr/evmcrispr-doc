---
id: transactions
title: Transactions
---
import useBaseUrl from '@docusaurus/useBaseUrl'
import styles from '../src/css/articles.css'

The Transactions app is a custom Aragon app built by [1Hive](https://1hive.org/). It allows users to create a single DAO vote to transfer or mint tokens to multiple addresses.

## Installing the App

You can install the Transactions app with the following syntax:

```
install transactions:new
grant ANY_ENTITY transactions:new DUMMY_ROLE ANY_ENTITY
```

You must use this full script to install the Transactions app properly, do not change any variables, such as the role and the entity permissions.

No unique functions or permissions can be called or granted for the Transactions app. Use the UI interface. 

:::info
Although the installation script says ANY_ENTITY, the app will only allow users with the right permissions/tokens according to the voting app you wish to create your vote through.
:::

### Et Voilà!

![Transactions app installed](/img/transactionsApp.png)
