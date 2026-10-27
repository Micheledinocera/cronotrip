# Obiettivo — vscode-pr-base

Il plugin di VS Code per le PR (GitHub Pull Requests) propone `master` come base, perché è il ramo di default del repo su GitHub. Modificarlo in maniera che le PR vadano su `develop` le prossime volte.

Impostazioni di workspace in `.vscode/settings.json`: `githubPullRequests.overrideDefaultBranch: "develop"` e `githubPullRequests.createDefaultBaseBranch: "createdFromBranch"` (le feature git-flow partono da `develop`).
