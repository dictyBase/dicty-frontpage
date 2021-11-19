// Type definitions for Dicty Frontpage
// Project: Dicty Frontpage
// Definitions by: Sean Kim


 type Author = {
    last_name: string
    first_name: string
    initials: string
    rank: string
 }

 type Papers = {
        id: string,
        doi: string,
        title: string,
        abstract: string,
        journal: string,
        pub_date: Date,
        pages: string,
        issue: string,
        volume: string,
        authors: Author[]
      }

 declare namespace dictyFrontPage {
 
 }