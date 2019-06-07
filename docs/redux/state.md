# Shape of the state

```JavaScript
{
  auth: {
    isFetching: false,
    isAuthenticated: true,
    provider: "orcid",
    token: "randomJWT",
    user: {}
  },
  downloads: {
    [taxonID]: {
      data: [
        {
          type: "downloads",
          id: "1",
          attributes: {
            title: "Nuclear Genome Sequences"
            items: [
              {
                title: "Chromosomal",
                url: "storageurl"
              },
              ...
            ]
          }
        },
        ...
      ]
    },
    isFetching: false,
    data: [
      {
        type: "organisms",
        id: "44689",
        attributes: {
          taxon_id: "44689",
          scientific_name: "Dictyostelium discoideum",
          citation: {
            authors: "list of authors",
            title: "title",
            journal: "journal name",
            link: "link to pubmed"
          }
        }
      },
      ...
    ],
    currentTab: "44689"
  },
  editablePages: {
    isFetching: false,
    content: ""
  },
  footer: {
    isFetching: false,
    links: []
  },
  navbar: {
    isFetching: false,
    links: []
  },
  router: {
    location: {},
    action: "PUSH"
  }
}
```
