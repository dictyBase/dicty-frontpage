# dicty-frontpage
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

[![License](https://img.shields.io/badge/License-BSD%202--Clause-blue.svg)](LICENSE)  
![GitHub tag](https://img.shields.io/github/v/tag/dictyBase/dicty-frontpage)  
![GitHub action](https://github.com/dictyBase/dicty-frontpage/workflows/Node%20CI/badge.svg)
[![codecov](https://codecov.io/gh/dictyBase/dicty-frontpage/branch/develop/graph/badge.svg)](https://codecov.io/gh/dictyBase/dicty-frontpage)  
[![Dependency Status](https://david-dm.org/dictyBase/dicty-frontpage/develop.svg?style=flat-square)](https://david-dm.org/dictyBase/dicty-frontpage/develop)
[![devDependency Status](https://david-dm.org/dictyBase/dicty-frontpage/develop/dev-status.svg?style=flat-square)](https://david-dm.org/dictyBase/dicty-frontpage/develop?type=dev)  
[![Technical debt](https://badgen.net/codeclimate/tech-debt/dictyBase/dicty-frontpage)](https://codeclimate.com/github/dictyBase/dicty-frontpage/trends/technical_debt)
[![Issues](https://badgen.net/codeclimate/issues/dictyBase/dicty-frontpage)](https://codeclimate.com/github/dictyBase/dicty-frontpage/issues)
[![Maintainability percentage](https://badgen.net/codeclimate/maintainability-percentage/dictyBase/dicty-frontpage)](https://codeclimate.com/github/dictyBase/dicty-frontpage)  
![Issues](https://badgen.net/github/issues/dictyBase/dicty-frontpage)
![Open Issues](https://badgen.net/github/open-issues/dictyBase/dicty-frontpage)
![Closed Issues](https://badgen.net/github/closed-issues/dictyBase/dicty-frontpage)
![Total PRS](https://badgen.net/github/prs/dictyBase/dicty-frontpage)
![Open PRS](https://badgen.net/github/open-prs/dictyBase/dicty-frontpage)
![Closed PRS](https://badgen.net/github/closed-prs/dictyBase/dicty-frontpage)
![Merged PRS](https://badgen.net/github/merged-prs/dictyBase/dicty-frontpage)  
![Commits](https://badgen.net/github/commits/dictyBase/dicty-frontpage/develop)
![Last commit](https://badgen.net/github/last-commit/dictyBase/dicty-frontpage/develop)
![Branches](https://badgen.net/github/branches/dictyBase/dicty-frontpage)
![Tags](https://badgen.net/github/tags/dictyBase/dicty-frontpage)
![GitHub repo size](https://img.shields.io/github/repo-size/dictyBase/dicty-frontpage?style=plastic)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/dictyBase/dicty-frontpage?style=plastic)
[![Lines of Code](https://badgen.net/codeclimate/loc/dictyBase/dicty-frontpage)](https://codeclimate.com/github/dictyBase/dicty-frontpage/code)  
[![Funding](https://badgen.net/badge/NIGMS/Rex%20L%20Chisholm,dictyBase/yellow?list=|)](https://projectreporter.nih.gov/project_info_description.cfm?aid=9476993)
[![Funding](https://badgen.net/badge/NIGMS/Rex%20L%20Chisholm,DSC/yellow?list=|)](https://projectreporter.nih.gov/project_info_description.cfm?aid=9438930)

This is the repository for the new [dictyBase frontpage](https://testdb.dictybase.org).

## Cloud Native Development

All dictyBase development is now done with cloud native development in mind. It is expected
that you have your own [Kubernetes](https://kubernetes.io/) cluster running. Documentation
for the cloud deployment process can be found [here](https://github.com/dictyBase/Migration/tree/master/deployment).

The general idea is that after every git commit a new Docker image is built based on that commit,
pushed to Docker Hub, then the corresponding Helm chart is upgraded with that image tag
inside your cluster.

## Local Development

In order for this application to work locally, you will need to configure the list of
login providers.

- Copy the provided sample [clientConfig.sample.ts](src/utils/clientConfig.sample.ts) file
  to **clientConfig.js** in the same folder.
- Add any provider names and their corresponding client IDs.
- All providers should have a matching counterpart in the
  [oauthConfig.ts](src/utils/oauthConfig.ts) file. Fill up all of the
  configuration parameters for every new provider in that file.

After setting up the login providers, you can run `yarn install` and `yarn start` as usual.

## Backend Requirements

This app requires the following services to be running:

- [graphql-server](https://github.com/dictyBase/graphql-server)
- [graphql-authserver](https://github.com/dictyBase/graphql-authserver)

## Active Developers

<a href="https://sourcerer.io/cybersiddhu"><img src="https://sourcerer.io/assets/avatar/cybersiddhu" height="80px" alt="Sourcerer"></a>
<a href="https://sourcerer.io/wildlifehexagon"><img src="https://sourcerer.io/assets/avatar/wildlifehexagon" height="80px" alt="Sourcerer"></a>

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://www.erichartline.net/"><img src="https://avatars3.githubusercontent.com/u/13489381?v=4" width="100px;" alt=""/><br /><sub><b>Eric Hartline</b></sub></a><br /><a href="https://github.com/dictyBase/dicty-frontpage/issues?q=author%3Awildlifehexagon" title="Bug reports">🐛</a> <a href="https://github.com/dictyBase/dicty-frontpage/commits?author=wildlifehexagon" title="Code">💻</a> <a href="https://github.com/dictyBase/dicty-frontpage/commits?author=wildlifehexagon" title="Documentation">📖</a> <a href="#maintenance-wildlifehexagon" title="Maintenance">🚧</a> <a href="https://github.com/dictyBase/dicty-frontpage/commits?author=wildlifehexagon" title="Tests">⚠️</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!