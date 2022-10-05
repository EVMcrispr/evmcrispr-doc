---
id: transactions
title: Transactions
---
import useBaseUrl from '@docusaurus/useBaseUrl'
import styles from '../src/css/articles.css'

The transactions app is a custom aragon app built by [1hive](https://1hive.org/). It allows users to create a single DAO vote to transfer or mint tokens to multiple addresses.

## Installing the App

You can install the Transactions app with the following syntax:

```
install transactions:new
grant ANY_ENTITY transactions:new DUMMY_ROLE ANY_ENTITY
```

You must use this full script to properly install the Transactions app, do not change any variables such as the role and the entity permissions

There are no uniques functions or permissions that can be called or granted for the Transactions app, use the UI interface. 

:::info
Although in the installation script it says ANY_ENTITY, the app will only allow users with the right permissions/tokens according to the voting app you wish to create your vote through.
:::

### Et Voilà!

<img alt='transactions app installed' src={useBaseUrl('img/transactionsApp.png')} />
