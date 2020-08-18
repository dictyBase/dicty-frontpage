type Organism = {
  taxon_id: string
  scientific_name: string
  citations: Array<Citation>
  downloads: Array<Download>
}

type Citation = {
  title: string
  authors: string
  pubmed_id: string
  journal: string
}

type Download = {
  title: string
  items: Array<DownloadItem>
}

type DownloadItem = {
  title: string
  url: string
}

export type { Organism, Citation, Download, DownloadItem }
