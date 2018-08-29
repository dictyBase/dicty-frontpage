import React from "react"

const Citations = props => (
  <div>
    <h3>Please cite:</h3>
    <p>
      <strong>{props.data.attributes.citation_authors}</strong>
      {"  "}
      {props.data.attributes.citation_title}
      {"  "}
      <em>{props.data.attributes.citation_journal}</em>
      {"  "}
      <a
        href={props.data.attributes.citation_link}
        target="_blank"
        style={{ textDecoration: "none" }}>
        Link
      </a>
    </p>
  </div>
)

export default Citations
