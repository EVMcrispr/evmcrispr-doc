---
id: modularity
title: Modularity
---


EVMcrispr has been designed as a tool that can support various platforms and protocols. Specialized commands and helpers have been broken down into modules that users can load separately. This allows EVMcrispr to scale and become modular.

## Loading Modules

Modules can be loaded using the following syntax: 

```
load <moduleName> as <alias>
```

The `moduleName` is the name of the module. We can find an exhaustive list of modules further down in this article. The `alias` is any string you want to set to quickly call this module at the beginning of each action you create.

For example: 
```
load aragonos as ar

ar:connect exampleDAO token-manager voting (
  exec token-manager mint @me 100e18 
)
```

## List of Modules

 Here is a breakdown of current modules, how to load them, and their associated commands and helpers: 

import StdModule from '../partials/_stdModule.mdx'

<StdModule />

## Aragon OS
import AragonModule from '../partials/_aragonModule.mdx'

<AragonModule />

Learn more about [using Aragon OS with EVMcrispr](/aragonOS/).