type UpdatedBy = {
  id: string
  first_name: string
  last_name: string
  updated_at: string
  roles: Array<{
    role: string
  }>
}

type Content = {
  /** Content API data */
  data: {
    id: string
    content: string
    slug: string
    name: string
    created_by?: {
      id: string
      first_name: string
      last_name: string
      roles: Array<{
        role: string
      }>
    }
    /** User data for last person to update page */
    updated_by: UpdatedBy
  }
}

export type { UpdatedBy, Content }
