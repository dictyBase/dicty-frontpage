type Content = {
  id: string
  content: string
  slug: string
  name: string
  updated_at: string
  created_by?: User
  updated_by: User
}

type User = {
  id: string
  first_name: string
  last_name: string
  roles: Array<{
    role: string
  }>
}

export type { Content, User }
