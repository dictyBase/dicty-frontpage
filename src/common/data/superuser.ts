const MockSuperuser = {
  id: "999",
  /* eslint-disable-next-line camelcase */
  first_name: "Art",
  /* eslint-disable-next-line camelcase */
  last_name: "Vandelay",
  email: "george@vandelayindustries.com",
  /* eslint-disable-next-line camelcase */
  is_active: true,
  /* eslint-disable-next-line camelcase */
  created_at: 123_456,
  /* eslint-disable-next-line camelcase */
  updated_at: 678_900,
  roles: [
    {
      id: "1",
      role: "superuser",
      description: "total power!",
      /* eslint-disable-next-line camelcase */
      created_at: 123_456,
      /* eslint-disable-next-line camelcase */
      updated_at: 678_900,
      permissions: [
        {
          id: "1",
          permission: "test",
          description: "a test permission",
          resource: "testresource",
          /* eslint-disable-next-line camelcase */
          created_at: 123_456,
          /* eslint-disable-next-line camelcase */
          updated_at: 678_900,
        },
      ],
    },
  ],
}

export default MockSuperuser
