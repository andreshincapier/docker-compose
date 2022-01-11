db.createUser({
  user: "root",
  pwd: "andreshincapier",
  roles: [
    {
      role: "readWrite",
      db: "test-db",
    },
  ],
});
