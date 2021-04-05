import faunadb from "faunadb"

const faunaClient = (secret: string) => {
  const client = new faunadb.Client({ secret })
  const q = faunadb.query
  return { q, client }
}

export default faunaClient
