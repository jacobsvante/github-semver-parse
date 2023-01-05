<!-- action-docs-description -->

## Description

Parse a semantic version

<!-- action-docs-description -->

<!-- action-docs-inputs -->

## Inputs

| parameter | description     | required | default |
| --------- | --------------- | -------- | ------- |
| version   | A semver string | `true`   |         |

<!-- action-docs-inputs -->

<!-- action-docs-outputs -->

## Outputs

| parameter  | description                                              |
| ---------- | -------------------------------------------------------- |
| major      | The major version component.                             |
| minor      | The minor version component.                             |
| patch      | The patch version component.                             |
| prerelease | The merged prerelease component of the version.          |
| build      | The merged build component of the version.               |
| version    | The parsed, validated semver string. Empty if not valid. |

<!-- action-docs-outputs -->

<!-- action-docs-runs -->

## Runs

This action is a `node16` action.

<!-- action-docs-runs -->

## Example

```yml
name: Tag creation

on:
  push:
    tags:
      - v*

jobs:
  release:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2

      - name: Get the version
        id: version
        run: echo VERSION=${GITHUB_REF/refs\/tags\//} >> $GITHUB_OUTPUT
        shell: bash

      - uses: apexskier/github-semver-parse@v1
        id: semver
        with:
          version: ${{ steps.version.outputs.VERSION }}

      - name: Release
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.RELEASE_GH_TOKEN }}
        with:
          tag_name: ${{ steps.version.outputs.VERSION }}
          release_name: ${{ steps.version.outputs.VERSION }}
          prerelease: ${{ !!steps.semver.outputs.prerelease }}
```
