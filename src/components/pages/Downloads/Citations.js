import React from "react"

const Citations = props => (
  <div>
    <h3>Please cite:</h3>
    <p>
      <strong>{props.data.attributes.citation.authors}</strong>
      {"  "}
      {props.data.attributes.citation.title}
      {"  "}
      <em>{props.data.attributes.citation.journal}</em>
      {"  "}
      <a
        href={props.data.attributes.citation.link}
        target="_blank"
        style={{ textDecoration: "none" }}>
        [Pubmed]
      </a>
    </p>
  </div>
)

export default Citations
