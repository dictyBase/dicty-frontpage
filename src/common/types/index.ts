type DownloadItem = {
  title: string
  url: string
}

type Download = {
  title: string
  items: Array<DownloadItem>
}

type Citation = {
  title: string
  authors: string
  pubmed_id: string
  journal: string
}

type Organism = {
  taxon_id: string
  scientific_name: string
  citations: Array<Citation>
  downloads: Array<Download>
}

type User = {
  id: number
  first_name: string
  last_name: string
  email: string
  roles: Array<{
    id: number
    role: string
    permissions?: Array<{
      id: number
      permission: string
      resource: string
    }>
  }>
}

export type { Organism, Citation, Download, DownloadItem, User }
