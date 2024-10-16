const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID,
  GraphQLSchema,
  GraphQLNonNull
} = require('graphql')
const Ticket = require('../models/Ticket')

const TicketType = new GraphQLObjectType({
  name: 'Ticket',
  fields: () => ({
    id: { type: GraphQLID },
    content: { type: GraphQLString },
    column: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updated: { type: GraphQLString }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    tickets: {
      type: new GraphQLList(TicketType),
      resolve(parent, args) {
        return Ticket.find()
      }
    },
    ticket: {
      type: TicketType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Ticket.findById(args.id)
      }
    }
  }
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addTicket: {
      type: TicketType,
      args: {
        content: { type: new GraphQLNonNull(GraphQLString) },
        column: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        const ticket = new Ticket({
          content: args.content,
          column: args.column
        })
        return ticket.save()
      }
    },
    deleteTicket: {
      type: TicketType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        return Ticket.findByIdAndDelete(args.id)
      }
    },
    editTicket: {
      type: TicketType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        content: { type: GraphQLString },
        column: { type: GraphQLString }
      },
      resolve(parent, args) {
        return Ticket.findByIdAndUpdate(
          args.id,
          { content: args.content, column: args.column, updated: Date.now() },
          { new: true }
        )
      }
    },
    moveTicket: {
      type: TicketType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        column: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        return Ticket.findByIdAndUpdate(
          args.id,
          { column: args.column, updated: Date.now() },
          { new: true }
        )
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})
