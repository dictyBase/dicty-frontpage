const pageTitles: Record<string, string> = {
  // pages from navbar
  art: "dictyArt",
  citation: "Citing dictyBase and the Dictyostelium Genome Project",
  codon: "Codon Bias Table",
  conference: "Annual International Dictyostelium Conference",
  gallery: "Dictyostelium Multimedia",
  history: "History",
  jobs: "Job Opportunities",
  labs: "Dicty Labs on the Web",
  learn: "Learn About Dictyostelium",
  links: "Useful Links",
  listserv: "dicty ListServ",
  nomenclature: "Nomenclature Guidelines",
  ontology: "Dictyostelium Anatomy Ontology",
  phenotype: "Phenotypes for Dictyostelium mutants",
  teach: "Teaching Tools Using Dictyostelium discoideum",
  techniques: "Dictyostelium Techniques",
  "privacy-policy": "Privacy Policy",
  // techniques subpages
  media: "dictyBase Media and Buffers",
  "fm-medium": "Recipe for FM Defined Medium",
  "low-flo-medium": "Low Fluorescence Axenic Medium",
  growth: "Protocols for growing Dictyostelium discoideum",
  development: "Protocols for Dictyostelium discoideum development",
  "dicty-storage":
    "Protocols for long-term storage of Dictyostelium discoideum",
  "soft-agar": "Plating Dictyostelium in soft agar",
  "parasexual-genetics": "Parasexual Genetics in Dictyostelium",
  "mating-types":
    "Method for determining mating types of Dictyostelium discoideum",
  "quick-genomic-dna-extraction":
    "Quick preparation of genomic DNA for PCR analysis",
  "genomic-dna-extraction": "Extraction of genomic DNA",
  "genomic-dna-extraction-csci": "Extraction of genomic DNA (CsCI)",
  "rt-pcr": "DRT-PCR for Knockout Screening and Expression Analysis",
  "transformation-protocols":
    "Transformation of Dictyostelium discoideum with plasmid DNA",
  "calcium-phosphate-precipitation":
    "Transformation of Dictyostelium by calcium phosphate precipitation",
  electroporation: "Transformation of Dicty by electroporation",
  "transformation-nc4":
    "Transformation of NC4 or D. mucoroides with vectors containing the V18-Tn5 cassette",
  "microinjection:": "",
  "transformation-by-particle-gun": "",
  "addition-of-heat-killed-bacteria": "",
  "transformant-selection-bacterial-lawns": "",
  "dapi-electroporation": "Electroporation of DAPI into Dictyostelium",
  "remi-mutagenesis":
    "REMI- Restriction-enzyme-mediated insertional mutagenesis",
  "rnai-procedure": "",
  "double-mutants": "",
  "chromatin-immuno-precipitation": "",
  "whole-mount-in-situ-hybridization": "",
  "agar-overlay": "",
  "indirect-immunofluoresence": "",
  "fixation-techniques": "",
  "visualizing-weak-fluoresence": "",
  "s-methionine-labelling": "",
  "phosphate-labelling": "",
  "cytoskeleton-isolation": "Cytoskeleton isolation",
  "centrosomes-isolation": "Isolation of Dictyostelium centrosomes",
  "preparation-of-microtubule-associated-motor-proteins": "",
  "purification-of-muscle-action": "",
  "one-day-myosin-prep": "",
  "three-day-myosin-prep": "",
  "cell-staining": "",
  "microtubule-gliding-assay": "",
  "atpase-assay-dynein": "",
  "ctpase-assay-dynein": "",
  "in-vitro-motility-assay": "",
  "atpase-assay-myosin": "",
  "estimation-active-myosin-heads": "",
  "myosin-f-actin-binding": "",
  "anti-y-tubulin-westerns": "",
}

/**
 * pageTitleLookup gets a page name from the content API
 * and attempts to convert it to a more useful page title.
 * This is helpful for SEO purposes.
 */

const pageTitleLookup = (title: string) =>
  title in pageTitles ? pageTitles[title] : "Information Page"

export { pageTitles, pageTitleLookup }
