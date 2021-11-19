// Type definitions for Dicty Frontpage
// Project: Dicty Frontpage
// Definitions by: Sean Kim


interface Author {
    last_name: string[]
    initials: string[]
 }

interface Publication {
        id: string,
        doi: string,
        title: string,
        abstract: string,
        journal: string,
        pub_date: Date,
        pages: string,
        issue: string,
        volume: string,
        authors: Author[],
        __typename: string
      }

 declare namespace dictyFrontPage {
 
 }