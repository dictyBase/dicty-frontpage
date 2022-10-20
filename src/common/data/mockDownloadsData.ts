// eslint-disable-next-line camelcase
const taxon_id = "44689"

// eslint-disable-next-line camelcase
const scientific_name = "Dictyostelium discoideum"

const citations = [
  {
    authors: "Eichinger et. al, 2005",
    // eslint-disable-next-line camelcase
    pubmed_id: "12345",
    title: "The genome of the social amoeba Dictyostelium discoideum.",
    journal: "Nature 435(7038): 43-57.",
    link: "https://www.ncbi.nlm.nih.gov/pubmed/15875012",
  },
]

const downloads = [
  {
    title: "Gene Information",
    items: [
      {
        title:
          "dictyBase ID, gene names, synonyms, and gene products (Updated monthly)",
        url: "https://betastorage.dictybase.org/downloads/44689/gene-information/gene_information.txt",
      },
      {
        title: "DDB-DDB_G-UniProt mapping (Updated monthly)",
        url: "https://betastorage.dictybase.org/downloads/44689/gene-information/DDB-GeneID-UniProt.txt",
      },
      {
        title: "DDB_G curation status (Updated monthly)",
        url: "https://betastorage.dictybase.org/downloads/44689/gene-information/DDB_G-curation_status.txt",
      },
      {
        title: "Ortholog information (Aug 25, 2010)",
        url: "https://betastorage.dictybase.org/downloads/44689/gene-information/ortholog_information.txt",
      },
      {
        title: "Alternative transcripts (Updated monthly)",
        url: "https://betastorage.dictybase.org/downloads/44689/gene-information/alternative_transcripts.txt",
      },
    ],
  },
  {
    title: "Dictyostelium Sequences and Annotations",
    items: [
      {
        title: "Protein (FastA format, updated weekly)",
        url: "https://betastorage.dictybase.org/downloads/44689/all-seq-annotations/discoideum_polypeptide.fasta.zip",
      },
      {
        title: "Coding (FastA format, updated weekly)",
        url: "https://betastorage.dictybase.org/downloads/44689/all-seq-annotations/discoideum_cds.fasta.zip",
      },
      {
        title: "Non-coding (FastA format)",
        url: "https://betastorage.dictybase.org/downloads/44689/all-seq-annotations/discoideum_noncoding.fasta.zip",
      },
      {
        title: "Genomic (FastA format)",
        url: "https://betastorage.dictybase.org/downloads/44689/all-seq-annotations/discoideum_genomic.fasta.zip",
      },
      {
        title: "EST (FastA format)",
        url: "https://betastorage.dictybase.org/downloads/44689/all-seq-annotations/discoideum_est.fasta.zip",
      },
      {
        title: "Chromosomal (FastA format)",
        url: "https://betastorage.dictybase.org/downloads/44689/all-seq-annotations/discoideum_chromosomal.fasta.zip",
      },
      {
        title: "Coding sequences and annotations (GFF3 format)",
        url: "https://betastorage.dictybase.org/downloads/44689/all-seq-annotations/discoideum_coding.gff3.zip",
      },
      {
        title: "Non-coding sequences and annotations (GFF3 format)",
        url: "https://betastorage.dictybase.org/downloads/44689/all-seq-annotations/discoideum_noncoding.gff3.zip",
      },
    ],
  },
  {
    title: "Genes on AX3/AX4 Chromosome 2 Duplication (Updated April 7, 2010)",
    items: [
      {
        title:
          "In strains AX3 and AX4 (the sequenced strain represented in dictyBase), chromosome 2 contains a duplication of approximately 750 kb, in which the region from base 2263132 to 3015703 is repeated between bases 3016083 and 3768654. This duplication is not found in AX2.",
        url: "https://betastorage.dictybase.org/downloads/44689/genes-ax3-ax4/c2_duplication.tsv",
      },
    ],
  },
  {
    title: "Protein Information",
    items: [
      {
        title:
          "InterPro domains of Dictyostelium proteins (Updated once in three months)",
        url: "https://betastorage.dictybase.org/downloads/44689/protein-information/Dd_protein_domains.txt",
      },
      {
        title:
          "D. discoideum codon bias; 11,666 curated protein coding genes (November 2012)",
        url: "https://betastorage.dictybase.org/downloads/44689/protein-information/Dd_Codon_Bias.txt",
      },
      {
        title: "Molecular Weight (Da) all proteins (November 2012)",
        url: "https://betastorage.dictybase.org/downloads/44689/protein-information/dicty-mw.txt",
      },
      {
        title:
          "Ax2 Phosphoproteome (August 2013). Provided by Pascale Charest and Rick Firtel;",
        url: "https://betastorage.dictybase.org/downloads/44689/protein-information/AX2_phosphoproteome.xlsx",
      },
    ],
  },
  {
    title: "GO Association File",
    items: [
      {
        title: "Gene Ontology annotations (Updated monthly)",
        url: "ftp://ftp.ebi.ac.uk/pub/databases/GO/goa/DICTY/goa_dicty.gpa.gz",
      },
    ],
  },
  {
    title: "Dicty Stock Center Data",
    items: [
      {
        title: "All curated mutants with phenotypes",
        url: "https://betastorage.dictybase.org/downloads/44689/dsc-data/all-mutants.txt",
      },
      {
        title: "Null mutants",
        url: "https://betastorage.dictybase.org/downloads/44689/dsc-data/null-mutants.txt",
      },
      {
        title: "Overexpression mutants",
        url: "https://betastorage.dictybase.org/downloads/44689/dsc-data/overexpression-mutants.txt",
      },
      {
        title: "Multiple mutants",
        url: "https://betastorage.dictybase.org/downloads/44689/dsc-data/multiple-mutants.txt",
      },
      {
        title: "Mutants with developmental defects",
        url: "https://betastorage.dictybase.org/downloads/44689/dsc-data/developmental-mutants.txt",
      },
      {
        title: "Other mutants",
        url: "https://betastorage.dictybase.org/downloads/44689/dsc-data/other-mutants.txt",
      },
      {
        title: "Insertional Mutants at BCM",
        url: "https://betastorage.dictybase.org/downloads/44689/dsc-data/remi.txt",
      },
    ],
  },
  {
    title: "Dictyostelium Anatomy Ontology",
    items: [
      {
        title: "Terms used to describe Dictyostelium ",
        url: "https://betastorage.dictybase.org/downloads/44689/anatomy-ontology/dicty_anatomy.obo",
      },
    ],
  },
  {
    title: "Dictyostelium Phenotype Ontology",
    items: [
      {
        title: "Terms used to annotate Dictyostelium Phenotypes",
        url: "https://betastorage.dictybase.org/downloads/44689/phenotype-ontology/dicty_phenotypes.obo",
      },
    ],
  },
]

// eslint-disable-next-line camelcase
export default [{ taxon_id, scientific_name, citations, downloads }]
