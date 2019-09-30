# dicty-frontpage

[![License](https://img.shields.io/badge/License-BSD%202--Clause-blue.svg)](LICENSE)  
[![Dependency Status](https://david-dm.org/dictybase/dicty-frontpage/develop.svg?style=flat-square)](https://david-dm.org/dictybase/dicty-frontpage/develop)
[![devDependency Status](https://david-dm.org/dictybase/dicty-frontpage/develop/dev-status.svg?style=flat-square)](https://david-dm.org/dictybase/dicty-frontpage/develop?type=dev)
![GitHub tag](https://img.shields.io/github/v/tag/dictyBase/dicty-frontpage)  
![Commits](https://badgen.net/github/commits/dictyBase/dicty-frontpage/develop)
![Last commit](https://badgen.net/github/last-commit/dictyBase/dicty-frontpage/develop)
![Branches](https://badgen.net/github/branches/dictyBase/dicty-frontpage)
![Tags](https://badgen.net/github/tags/dictyBase/dicty-frontpage)
![GitHub repo size](https://img.shields.io/github/repo-size/dictyBase/dicty-frontpage?style=plastic)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/dictyBase/dicty-frontpage?style=plastic)
[![Lines of Code](https://badgen.net/codeclimate/loc/dictyBase/dicty-frontpage)](https://codeclimate.com/github/dictyBase/dicty-frontpage/code)  
![Issues](https://badgen.net/github/issues/dictyBase/dicty-frontpage)
![Open Issues](https://badgen.net/github/open-issues/dictyBase/dicty-frontpage)
![Closed Issues](https://badgen.net/github/closed-issues/dictyBase/dicty-frontpage)
![Total PRS](https://badgen.net/github/prs/dictyBase/dicty-frontpage)
![Open PRS](https://badgen.net/github/open-prs/dictyBase/dicty-frontpage)
![Closed PRS](https://badgen.net/github/closed-prs/dictyBase/dicty-frontpage)
![Merged PRS](https://badgen.net/github/merged-prs/dictyBase/dicty-frontpage)  
[![Technical debt](https://badgen.net/codeclimate/tech-debt/dictyBase/dicty-frontpage)](https://codeclimate.com/github/dictyBase/dicty-frontpage/trends/technical_debt)
[![Issues](https://badgen.net/codeclimate/issues/dictyBase/dicty-frontpage)](https://codeclimate.com/github/dictyBase/dicty-frontpage/issues)
[![Maintainability percentage](https://badgen.net/codeclimate/maintainability-percentage/dictyBase/dicty-frontpage)](https://codeclimate.com/github/dictyBase/dicty-frontpage)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=dictyBase/dicty-frontpage)](https://dependabot.com)  
[![Funding](https://badgen.net/badge/NIGMS/Rex%20L%20Chisholm,dictyBase/yellow?list=|)](https://projectreporter.nih.gov/project_info_description.cfm?aid=9476993)
[![Funding](https://badgen.net/badge/NIGMS/Rex%20L%20Chisholm,DSC/yellow?list=|)](https://projectreporter.nih.gov/project_info_description.cfm?aid=9438930)

This is the repository for the new [dictyBase frontpage](https://testdb.dictybase.org).

# Cloud Native Development

All dictyBase development is now done with cloud native development in mind. It is expected
that you have your own [Kubernetes](https://kubernetes.io/) cluster running. Documentation
for the cloud deployment process can be found [here](https://github.com/dictyBase/Migration/tree/master/deployment).

The general idea is that after every git commit a new Docker image is built based on that commit,
pushed to Docker Hub, then the corresponding Helm chart is upgraded with that image tag
inside your cluster.

# Local Development

In order for this application to work locally, you will need to configure the list of
login providers.

- Copy the provided sample [clientConfig.sample.js](src/utils/clientConfig.sample.js) file
  to **clientConfig.js** in the same folder.
- Add any provider names and their corresponding client IDs.
- All providers should have a matching counterpart in the
  [oauthConfig.js](src/utils/oauthConfig.js) file. Fill up all of the
  configuration parameters for every new provider in that file.

After setting up the login providers, you can run `npm install` and `npm start` as usual.
There are also [husky](https://github.com/typicode/husky) scripts set up to run unit tests
on `pre-commit` and run [Skaffold](https://github.com/GoogleContainerTools/skaffold) on `post-commit`.

# Backend Requirements

This app requires the following services to be running:

- [modware-content](https://github.com/dictyBase/modware-content) (`REACT_APP_API_SERVER`)
- [authserver](https://github.com/dictyBase/authserver) (`REACT_APP_AUTH_SERVER`)

It also relies on the navbar, footer and download tabs JSON files found in the
[migration-data](https://github.com/dictyBase/migration-data) repository. An example
of the necessary environmental variables can be found [here](.env.development).

## Semantic Versioning

This app has been set up to use [semantic-release](https://github.com/semantic-release/semantic-release) and [commitizen](https://github.com/commitizen/cz-cli). After adding a new commit (`git add .`), use `npm run cz` and follow the prompts to categorize and provide more details about your commit. Once complete, push your changes to whatever branch you are working on.

When you are ready to push to prod, you can use `semantic-release` to automate the release process:

- Merge your changes into `master`
- Run `npx semantic-release`

**Important:** you MUST have an env variable stored for `GH_TOKEN` or `GITHUB_TOKEN` that contains a GitHub [personal access token](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/). You can either pass this in manually when you run the script (i.e. `GH_TOKEN=XXX npx semantic-release`) or you can [store your env variable locally](https://www.schrodinger.com/kb/1842).

This will look at your most recent commits since the last `git tag` and automatically determine the appropriate version number for your release. It also updates the [CHANGELOG](./CHANGELOD.md) documentation.

# Active Developers

<a href="https://sourcerer.io/cybersiddhu"><img src="https://sourcerer.io/assets/avatar/cybersiddhu" height="80px" alt="Sourcerer"></a>
<a href="https://sourcerer.io/wildlifehexagon"><img src="https://sourcerer.io/assets/avatar/wildlifehexagon" height="80px" alt="Sourcerer"></a>
