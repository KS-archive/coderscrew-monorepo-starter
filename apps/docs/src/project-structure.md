---
title: Project structure
description: How is the project structured, and what are our motivations behind this choice?
sidebar_position: 2
---

## Why monorepo?

Before we move to a description of particular files and directories, it's worth mentioning why we even decided to choose monorepo as a structure for the entire project. By doing so, we want to:

- **Ship only complete features** - with a monorepo, it's a breeze to ensure that we're reviewing and releasing only fully implemented, tested, and documented features. In most cases, the functionalities we need to implement affects many parts of the application. Let's use a simple login feature as an example. To implement it, we should: write a new API endpoint (server workspace), create a sign-in page with a form (client workspace), and document our authentication flow (docs workspace). If we decided to divide those project parts into separate repositories, it would be more troublesome to ship them simultaneously.

- **Maintain cross-package documentation** - monorepo gives us the perfect opportunity to maintain complete project documentation in one place. This way, we're ensuring that all code changes requiring docs updates wouldn't be shipped without them.

- **Reuse configuration files** - we can create a configuration for CI, linting tools, and integrations only once. That makes it effortless to maintain consistent standards across the entire project and keep our config in accordance with the DRY rule.

- **Have a single source of truth** - we have one place where we can see which features are already in the implementation phase, which of them are waiting for review, what are current issues, and how many feature requests wait to be discussed/implemented.

- **Apply atomic changes** - we can make a single change and reflect it in all the packages. There is no need to move between many repositories each time we change some TypeScript type, utility function, or a part of the config.

- **Provide better API contracts** - we're creating TypeScript models for data exchanged through API and then reusing it both for the client and the server. As a result, we achieve end-to-end type safety.

## Workspaces

#### What are workspaces?

Workspaces are directories containing code for different parts of the project.

#### Where workspaces are placed?

Workspaces are placed in three directories depending on their purpose in the overall structure of the project.

**apps** - applications and websites that are deployed separately. They can depend on other workspaces but cannot be used as a dependency.

**tools** - internal tools used by developers and CI/CD to enhance the project development. They can both depend on other workspaces and be used as a dependency.

**packages** - code shared across many workspaces. They can both depend on other workspaces and be used as a dependency.

#### What is the purpose of each workspace?

##### Apps

**client** - SPA application built with React.

**docs** - documentation of the project built with Docusaurus.

**server** - API server build with Node.js.

##### Packages

**utils** - utility functions that can be used in all environments.

##### Tools

**cli** - command line interface created to simplify our work with the project.

**eslint-plugin** - plugin used as a way to add our custom rules to ESLint.

#### What are the common conventions across workspaces?

Each workspace contains a `package.json` file. It should always has:

- `name` property set to a value written as `@ccms/X`, where X is the name of the workspace's folder.
- `private` property set to `true` as we don't plan to publish those packages.
- `version` property set to `"0.0.0"` as we track project version in the root `package.json` file.



