export default `
  type Moment {
    _id: ID!,
    start: String!,
    end: String!,
    analysis_type: String!,
    definition_id: String!
  }
  
  type Query {
    momentsByEvent: [Moment!]
  }
`