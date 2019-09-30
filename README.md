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

- [Development](#development)
  - [Configuration](#configuration)
    - [Providers](#providers)
    - [Auth server](#auth-server)
    - [API server](#api-server)
    - [Navbar and footer](#navbar-and-footer)
  - [Semantic Versioning](#semantic-versioning)
  - [Running the application (dev version)](#running-the-application-dev-version)
  - [Application Structure](#application-structure)
- [Deployment](#deployment)
- [Developers](#developers)

# Development

- First clone this repository.
- Next configure the application as described below.

## Configuration

### Providers

- This is the most important part and it is absolutely needed to run the application.
- Copy the provided sample [clientConfig.sample.js](src/utils/clientConfig.sample.js) file
  to **clientConfig.js** in the same folder.
- Then add providers name and their corresponding client ids.
- All the providers should have a matching counterpart in the
  [oauthConfig.js](src/utils/oauthConfig.js) file. Fill up all the
  configuration parameters for every new provider in that file.
- For each of the provider name a corresponding login button will be shown up
  in the login route. The list of supported buttons are given
  [here](http://fontawesome.io/icons/#brand)

### Auth server

- By default, the application expects it to run on `http://localhost:9999`
- The URL of the auth server can be configured by **REACT_APP_AUTH_SERVER** environmental variable.
- The binaries for the auth server can be downloaded from its release
  [page](https://github.com/dictyBase/authserver/releases). Download the one that is
  suitable for your OS and make sure you always use the latest one.
- The **REACT_APP_AUTH_SERVER** env variable can also be customized by modifying the
  global variable in the [env](.env.development) file.

### API server

- By default, the application expects it to run on `http://localhost:8080`
- The URL of the auth server can be configured by **REACT_APP_API_SERVER** environmental variable.
- An API server to **test** the strain/plasmid catalog inside the application can be found [here](https://github.com/dictyBase/fake-dsc-server)
- The API server to manage data from the rich text editor frontend is available [here](https://github.com/dictyBase/modware-content).
- The **REACT_APP_API_SERVER** env variable can also be customize by modifying the
  global variable in the [env](.env.development) file.

### Navbar and Footer

- The application has env variables for `REACT_APP_NAVBAR_JSON` and `REACT_APP_FOOTER_JSON` that are set to
  the corresponding URLs where the JSON data is stored on GitHub.

## Semantic Versioning

This app has been set up to use [semantic-release](https://github.com/semantic-release/semantic-release) and [commitizen](https://github.com/commitizen/cz-cli). After adding a new commit (`git add .`), use `npm run cz` and follow the prompts to categorize and provide more details about your commit. Once complete, push your changes to whatever branch you are working on.

When you are ready to push to prod, you can use `semantic-release` to automate the release process:

- Merge your changes into `master`
- Run `npx semantic-release`

**Important:** you MUST have an env variable stored for `GH_TOKEN` or `GITHUB_TOKEN` that contains a GitHub [personal access token](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/). You can either pass this in manually when you run the script (i.e. `GH_TOKEN=XXX npx semantic-release`) or you can [store your env variable locally](https://www.schrodinger.com/kb/1842).

This will look at your most recent commits since the last `git tag` and automatically determine the appropriate version number for your release. It also updates the [CHANGELOG](./CHANGELOD.md) documentation.

## Running the application (dev version)

- `npm install`
- `npm start`

## Application Structure

This was built using [create-react-app](https://github.com/facebook/create-react-app). Please read their [User Guide](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md) for more detailed information.

Component wireframes, Redux shape of state and information on developing for the [Slate.js](https://github.com/ianstormtaylor/slate) page editor can be found in the [docs](./docs) folder.

# Deployment

The application is deployed by [building a Docker
image](https://docs.docker.com/engine/reference/commandline/build/) and running
it through [Kubernetes](https://k8s.io).

# Active Developers

<a href="https://sourcerer.io/cybersiddhu"><img src="https://sourcerer.io/assets/avatar/cybersiddhu" height="80px" alt="Sourcerer"></a>
<a href="https://sourcerer.io/wildlifehexagon"><img src="https://sourcerer.io/assets/avatar/wildlifehexagon" height="80px" alt="Sourcerer"></a>
