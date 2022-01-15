# CodersCrew Monorepo Starter

## Getting started

1. Ensure you have any version of Node.js installed.

2. Invoke `npm run startup` script and follow CLI instructions.

## Running on windows with wsl

Prerequisites:

- docker desktop

Installation:

- run `wsl --install -d ubuntu` to install wsl with ubuntu image
- Install [extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack) in your vs code.
- Inside your container:
  - run `sudo apt-get update`
  - run `sudo apt-get install wget ca-certificates`
  - install nvm and node
  - Install project prerequisites (pnpm etc.)
  - Run `code .`
- In new vscode window install missing extensions

![Zrzut ekranu 2022-01-15 064907](https://user-images.githubusercontent.com/32983854/149611111-c4116f69-70b1-4e68-a3f5-d973c009f271.jpg)


If you are having problems with permissions, to start repo try restarting your container by closing it with `wsl --shutdown`.

Useful links:

- [wsl with vscode](https://docs.microsoft.com/en-us/windows/wsl/tutorials/wsl-vscode)
- [solving permission issues](https://devblogs.microsoft.com/commandline/chmod-chown-wsl-improvements/)
