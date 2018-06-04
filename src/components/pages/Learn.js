// @flow
import React from "react"
import { Flex, Box } from "rebass"
import logoLearn from "images/learn/logoLearn.png"
import learndicty from "data/learndicty"
import communityimg from "images/learn/rpL11-gfpBS.jpg"
import focusimg from "images/learn/gerisch4.png"
import techniqueimg1 from "images/learn/pst0fingersS.jpg"
import techniqueimg2 from "images/learn/HTP_princeton.png"
import techniqueimg3 from "images/learn/nullatt.png"

import { ListBox, ListItems, Link } from "styles"

import {
  Banner,
  Header,
  Container,
  LearnList,
  SectionBox,
  TopLink,
  SectionImgLeft,
  SectionImgRight,
  LastUpdated,
  ContentLink,
} from "styles/learn_teach/learn_teach_styles"

/** This component handles the "Learn About Dicty" subpage */

const Learn = () => {
  const list = learndicty.map((section, index) => (
    <ContentLink key={index} href={section.href}>
      <ListItems key={index}>
        <LearnList>{section.title}</LearnList>
      </ListItems>
    </ContentLink>
  ))

  return (
    <Flex wrap>
      <Banner>
        <Header>Learn about Dicty</Header>
        <img src={logoLearn} alt="logo" />
        <p>
          <em>Dictyostelium discoideum:</em> Model System in Motion
        </p>
      </Banner>
      <Container>
        <Flex justify="center">
          <Box width={[2 / 3, 1 / 3]}>
            <ListBox>{list}</ListBox>
          </Box>
        </Flex>
        <SectionBox id="About">
          <h3>About Dictyosteliums</h3>
          <p>
            The ameboid protozoan <em>Dictyostelium discoideum</em> is a
            powerful system for genetic and functional analysis of gene
            function. The 34 Mb genome contains many genes that are homologous
            to those in higher eukaryotes and are missing in{" "}
            <em>Saccharomyces cerevisiae</em>. The organism is uniquely suited
            for studing cytokinesis, cell motility, phagocytosis, chemotaxis,
            signal transduction, and cell differentiation during development.
            Many of these processes, which play important roles in health and
            disease, are either absent or are less accessible in other model
            organisms.
          </p>
          <p>
            <em>Dictyostelium</em> amoebae grow as separate, independent cells
            but interact to form multicellular structures when challenged by
            adverse conditions such as starvation. Up to 100,000 cells signal
            each other by releasing the chemoattractant cAMP and aggregate
            together by chemotaxis to form a mound that is surrounded by an
            extracellular matrix. This mechanism for generating a multicellular
            organism differs radically from the early steps of metazoan
            embryogenesis. However, subsequent processes depend on cell-cell
            communication in both <em>Dictyostelium</em> and metazoans. Many of
            the underlying molecular and cellular processes appear to have
            arisen in primitive precursor cells and to have remained
            fundamentally unchanged throughout evolution. Basic processes of
            development such as differential cell sorting, pattern formation,
            stimulus-induced gene expression, and cell-type regulation are
            common to <em>Dictyostelium</em> and metazoans.{" "}
            <Link href="">This figure</Link> shows the vegetative,
            developmental, and sexual life cycles of <em>D. discoideum</em>.
          </p>
          <Link href="#">
            <TopLink>Top</TopLink>
          </Link>
        </SectionBox>
        <SectionBox id="Community">
          <h3>The Research Community</h3>
          <p>
            <SectionImgLeft src={communityimg} />
            <em>D. discoideum</em> is one of the model organisms chosen by the
            National Institutes of Health as part of its{" "}
            <Link href="">Model Organism Initiative</Link>. dictyBase's
            Colleague database contains over 1100 researchers and our weekly
            newsletter goes to nearly 600 researchers around the world. This
            active community has had an annual scientific meeting every year
            since 1983, typically attended by over 150 investigators. Around 200
            publications involving <em>Dictyostelium</em> appear each year in
            peer reviewed journals and as of 2010 the NIH RePORTER Database
            lists 87 funded research grants using <em>Dictyostelium</em>.
          </p>
          <Link href="#">
            <TopLink>Top</TopLink>
          </Link>
        </SectionBox>
        <SectionBox id="Focus">
          <h3>Research Focus</h3>
          <p>
            <SectionImgRight src={focusimg} />
            Many phases of health and disease depend on the behaviors of
            individual cells so beautifully displayed in <em>D. discoideum</em>.
            For example, cytokinesis is critical in cell proliferation and is
            therefore an integral part of immune response, tissue maintenance,
            and cancer. Cell motility is an essential early event in metastasis
            of tumor cells and in angiogenesis by endothelial cells. Chemotaxis
            and signal transduction by chemoattractant receptors play a key role
            in inflammation, arthritis, asthma, lymphocyte trafficking, and also
            in axon guidance. Phagocytosis is a critical process involved in
            immune surveillance and antigen presentation. Cell-type
            determination, cell sorting, and pattern formation are basic
            features of embryogenesis and alteration of these events can lead to
            neoplasms. Recent studies have taken advantage of the organism's
            genetics to study myosin mutations that cause cardiac myopathies,
            resistance to the anti-metabolite cis-platin, and the mechanism of
            action of lithium. In addition, infectious diseases such as amoebic
            dysentery, amoebic keratitis, granulomatous amoebic encephalitis
            (GAE), and primary amoebic meningoencephalitis are caused directly
            by amoebae.
          </p>
          <Link href="#">
            <TopLink>Top</TopLink>
          </Link>
        </SectionBox>
        <SectionBox id="Education">
          <h3>Dictyostelium as an educational tool</h3>
          <p>
            Dictyostelium is popular in educational settings because of its
            interesting and visually striking life cycle, which can be readily
            observed with simple equipment. Because of the ability to grow
            Dictyostelium at room temperature, using relatively inexpensive
            media, a large number of laboratory exercises have been developed
            using Dictyostelium, several of which are available on dictyBase's{" "}
            <Link href="/explore/teach">
              Teaching Tools Using <em>Dictyostelium discoideum</em>
            </Link>{" "}
            page.
          </p>
          <Link href="#">
            <TopLink>Top</TopLink>
          </Link>
        </SectionBox>
        <SectionBox id="Techniques">
          <h3>Available techniques</h3>
          <p>
            <em>Dictyostelium</em> is a powerful model system to study important
            biomedical problems. Numerous molecular genetics techniques,
            including gene knock-out, gene knock-in, restriction enzyme-mediated
            mutagenesis, RNAi, and inducible gene expression, allow a wide range
            of biological questions to be tested. The dictybase{" "}
            <Link href="">Techniques</Link> pages contain protocols for many
            widey used methods.
          </p>

          <h4>Phenotypic studies</h4>
          <p>
            The simplicity of the life cycle facilitates mutant selection. The
            growth and developmental stages are completely independent, and
            switching between the two states is achieved by removing nutrients.
            Many mutations can be screened by clonally plating cells on
            bacterial lawns. As the amoebae grow, they ingest the bacteria and
            form a plaque. The cells within the plaque starve and enter the
            developmental program. Aberrant phenotypes can be scored by visual
            inspection of the plaques.
            <SectionImgLeft src={techniqueimg1} />
            Since the early stages of development are readily reversible,
            mutants can be selected and then propagated by returning them to
            nutrients. Strains are preserved in liquid nitrogen and can be
            recovered by scraping some frozen cells directly onto a lawn of
            bacteria or into axenic medium. Spores remain viable on silica gel
            at -20° C for 5-10 years and for longer when lyophilized. The{" "}
            <Link href="">Nomenclature Guidelines</Link> describe how to name
            strains and alleles.
          </p>
          <p>
            Developmental and cell-type gene expression and differentiation have
            been extensively characterized. The timing and conditions that
            control the expression of numerous genes are known. Specific
            regimens of application of extracellular cAMP and differentiation
            inducing factor (DIF) regulate gene expression in predictable ways.
            Gene expression has been characterized in a large collection of gene
            deletion strains under a variety of conditions. This rich repertoire
            of conditions and extracellular stimuli that control gene induction
            can now be rationally applied to DNA arrays to gain a comprehensive
            correlation of gene expression patterns to cellular phenotype.
          </p>

          <h4>Homologous recombination</h4>
          <p>
            Non-essential genes are easily disrupted by homologous
            recombination. So far, over 400 genes involved in cell motility,
            signal transduction, and cell differentiation have been targeted.
            Strains with multiple gene deletions are constructed by consecutive
            transformations using different selectable markers.{" "}
            <Link href="">Parasexual genetics</Link> and the cre-lox system (<Link href="">
              Faix et al., 2004
            </Link>) can also be used to construct double and triple-knockout
            strains. Many of those mutants are available at the{" "}
            <Link href="">
              <strong>Dicty Stock Center</strong>
            </Link>.
            <SectionImgRight src={techniqueimg2} />
            Because the organism displays most of its interesting behavior as
            either a haploid or a diploid, recessive phenotypes are immediately
            apparent and are often detectable by clonal morphology. Since the
            cells are free living, gene deletions that might be lethal in other
            organisms can often be productively studied in D. discoideum.
          </p>
          <p>
            Restriction Enzyme-Mediated Integration <Link href="">REMI</Link> is
            used to create libraries of strains containing random genomic
            insertions. Cells are <Link href="">electroporated</Link> with a
            mixture of a linearized plasmid and a restriction enzyme that
            catalyzes insertion of the plasmid into the genome at corresponding
            restriction sites. Generally, the transformed cells contain a single
            copy of the plasmid and the sequences flanking the insertion site
            can be obtained by rescue in E coli. To verify that the recovered
            DNA sequence is responsible for the phenotype, the rescued plasmid
            is used to recreate the genotype by homologous recombination. The
            frequency of insertion is high enough to also allow suppressor
            genetics. A large number of new gene products involved in
            cytokinesis, motility, aggregation, and later development have been
            isolated. Many REMI mutants in a wild-type background and
            corresponding genes are available from the{" "}
            <Link href="">Developmental Gene Project at UCSD</Link> and the
            Baylor College of Medicine (you can view available mutants{" "}
            <Link href="">here</Link>).
          </p>

          <h4>Biochemistry</h4>
          <p>
            The amoebae are easy to grow, lyse, and process for a multitude of
            biochemical assays or subcellular fractionations, as decribed in the{" "}
            <Link href="">General Dictyostelium Techniques</Link> page. The
            amoebae grow on bacterial lawns or in liquid cultures of defined
            media with doubling times of 4 and 12 hours, respectively. Over 1011
            clonal D. discoideum amoebae can be grown and harvested in a few
            days without sophisticated equipment. A small-scale industrial
            facility could increase this number to 5 x 1012 identical cells (5
            kilograms) per week. The cells can be harvested from growth or any
            of the developmental stages. In the early stages of development, the
            genetically identical cells differentiate synchronously and the
            population remains homogeneous. This allows for biochemical analyses
            to be performed using a variety of physiologically relevant
            conditions. The high levels of exogenous protein expression obtained
            in transformed cells makes this system suitable for protein
            purification.
          </p>

          <h4>Imaging</h4>
          <p>
            One of the incredible strengths of this model system is the capacity
            to track the{" "}
            <Link href="">dynamic behaviors of individual cells</Link>. For
            example, the normal cytokinesis displayed by wild-type cells and the
            aborted cytokinesis displayed by mutant cells can be filmed in
            suspension. There is a considerable collection of mutants displaying
            similar defects in cytokinesis in suspension. The optical clarity
            displayed by the cells facilitates digitized three-dimensional
            imaging. Studies of the chemotactic movements of wild-type cells
            have revealed features of normal motility such as the tendency of
            pseudopods to be initially extended above the substratum and the
            limited contact that a moving cell maintains with the substrate.
            Digitized imaging has been used to compare the movements of a
            wild-type and mutant cells. In the example presented here, it is
            clear that the mutant moves poorly because it cannot suppress
            pseudopod formation in the rear end of the cell.
          </p>
          <p>
            <SectionImgLeft src={techniqueimg3} />
            The capacity for tracking living cells and phenotypic
            complementation of null mutants with GFP fusion proteins is
            providing extremely useful tools for cell biology. One of the
            significant conclusions of these studies has been the demonstration
            that <Link href="">cytokinesis</Link>, <Link href="">motility</Link>,
            and <Link href="">phagocytosis</Link> share features and molecular
            components. Phenotypic rescue provides assurance that the GFP fusion
            protein is functional and the behavior of the protein can be
            followed in living cells under a variety of conditions. Some of the
            most interesting observations made in these experiments have been
            the rapid assembly of cytoskeletal proteins in the tips of newly
            extended pseudopods. For example, coronin, actin, talin, and a
            variety of other cytoskeletal proteins concentrate in the cortex of
            nascent pseudopods. Many of these proteins have also been tracked
            during cytokinesis and phagocytosis and found to translocate to the
            rims of phagocytic cups and to the distal edges of dividing cells.
          </p>
          <p>
            Signal transduction proteins have also been tracked to discover how{" "}
            <Link href="">cells sense spatial gradients</Link>. While actin and
            actin binding proteins accumulate in the cortex of new pseudopods at
            the cell's leading edge, surface receptors and G-protein subunits
            remain uniformly distributed around the cell perimeter. Thus, the
            key decisions for directional sensing must occur at intermediary
            steps. One of these steps appears to be a rapid and transient
            appearance of binding sites for PH domains on the inner face of the
            membrane elicited by increases in receptor occupancy. In gradients
            of chemoattractant these sites are persistently present on the side
            of the cell facing the higher concentration. The local formation of
            these sites is independent of the actin cytoskeleton and may be an
            early event in directional sensing.
          </p>
          <p>
            Elegant studies of dynamics of groups of cells are being produced in
            D. discoideum. Although the multicellular stages are unusual,
            studies have provided interesting information about the interactions
            of large groups of cells. The spontaneous aggregation of hundreds of
            thousands of cells occurs in a highly coordinated manner. The
            chemotactic movements of the cells are organized by periodic waves
            of cAMP that propagate through the cell monolayer. The waves are the
            result of a regulated production and secretion of extracellular cAMP
            and a spontaneous biological oscillator that initiates the waves at
            centers of territories. The periodic stimuli are critical for proper
            timing of developmental gene expression and they control the{" "}
            <Link href="">morphogenetic movements</Link> in three-dimensional
            structures of the multicellular stages. The differentiated cells
            provide a fantastic system for studies of chemotactic cell sorting.
            Mixed cells will form chimeric organisms and individual
            fluorescently labeled cells can be tracked. Prestalk cells sort to
            the anterior region of the structure while prespore cells sort to
            the posterior and various mutants sort to specific locations.
          </p>
          <LastUpdated>
            <em>Last updated March 4, 2010</em>
          </LastUpdated>
          <Link href="#">
            <TopLink>Top</TopLink>
          </Link>
        </SectionBox>
      </Container>
    </Flex>
  )
}

export default Learn
