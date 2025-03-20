import dbConnect from "@/app/lib/db";
import MovieModel from "@/app/Model/movie";
import { ApolloServer } from "@apollo/server";
import { gql } from "graphql-tag";
import { NextApiRequest } from "next";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import UserModel from "@/app/Model/user";
import ShowtimeModel from "@/app/Model/showtime";
interface InteractionofUser {
  movieId: string;
  rating: number;
}
// GraphQL Schema
const typeDefs = gql`
  type Movie {
    _id: String!
    title: String
    language: String!
  }

  type Interactionofuser {
    movieId: String!
    rating: Int!
  }
  input ShowtimeSearch{
    _id:ID!
  }
  type User {
    _id: ID!
    username: String!
    email: String
    interactions: [Interactionofuser]
  }
  type Theater{
    _id:ID!
    name:String
    location:String
  }
  type Showtime{
   _id:ID!
   screen:Int!
   theaters:[Theater]
  }
  type Query {
    movies: [Movie]
    users: [User]
    interactionsofuser: [Interactionofuser]
    showtime(search: ShowtimeSearch): Showtime!
    showtimes: [Showtime!]!
  }
`;

// Resolvers
const resolvers = {
  Query: {
    movies: async () => {
      try {
        await dbConnect();
        return await MovieModel.find();
      } catch (error) {
        console.error("Error fetching movies:", error);
        throw new Error("Failed to fetch movies");
      }
    },
    users: async () => {
      try {
        await dbConnect();
        return await UserModel.find();
      } catch (error) {
        console.error("Error fetching users:", error);
        throw new Error("Failed to fetch users");
      }
    },
    showtime: async (_: any, { search }: { search: { _id: string } }) => {
      try {
        await dbConnect();
        const showtime = await ShowtimeModel.findById(search._id);
        return showtime
      } catch (error) {
        console.error("Error fetching showtimes:", error);
        throw new Error("Failed to fetch showtimes");
      }
    },
    interactionsofuser: async () => {
      try {
        await dbConnect();
        const users = await UserModel.find();
        let interactions: InteractionofUser[]= [];

        users.forEach((user) => {
          if (user.interactions && user.interactions.length > 0) {
            interactions = interactions.concat(user.interactions);
          }
        });

        return interactions;
      } catch (error) {
        console.error("Error fetching interactions:", error);
        throw new Error("Failed to fetch interactions");
      }
    },
    
  },
};

// Create Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// API Handler
const handler = startServerAndCreateNextHandler<NextApiRequest>(server, {
  context: async (req) => ({ req }),
});

// Export named handlers for GET and POST
export const GET = handler;
export const POST = handler;
