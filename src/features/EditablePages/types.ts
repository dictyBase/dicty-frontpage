import { User, Role, Permission, Maybe } from "dicty-graphql-schema"

type UpdatedByUser = Pick<User, "id" | "email" | "first_name" | "last_name"> & {
  roles?: Maybe<
    Array<
      { __typename?: "Role" } & Pick<Role, "role"> & {
          permissions?: Maybe<
            Array<
              { __typename?: "Permission" } & Pick<
                Permission,
                "permission" | "resource"
              >
            >
          >
        }
    >
  >
}

export default UpdatedByUser
