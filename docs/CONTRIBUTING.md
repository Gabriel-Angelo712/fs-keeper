# Contributing to fs-keeper

Thanks for wanting to contribute! This document explains how to do so.

## Code of Conduct
Be respectful. Toxic behavior is not tolerated.

## How to report bugs
Open an issue including:
    1. Steps to reproduce.
    2. Expected vs. actual behavior.
    3. Node version: `node -v`.
    4. Operating System.

## How to suggest features
Open an issue with the `enhancement` tag, explaining the problem and the proposed solution.

## Commit convention
The project uses a commit convention to keep the history clean:
    - `feat:` new feature
    - `fix:` bug fix
    - `docs:` documentation change
    - `refactor:` refactoring (without changing any feature's behavior)

Ex: `feat: add --recursive flag`

Running the project locally
```bash
    git clone https://github.com/Gabriel-Angelo712/fs-keeper.git
    cd fs-keeper
    npm link
    fs-keeper ./<Directory_Name>
