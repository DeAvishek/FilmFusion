import dbConnect from "@/app/lib/db";
import MovieModel from "@/app/Model/movie";
import { ApolloServer } from "@apollo/server";
import {gql} from "graphql-tag"
import { NextApiRequest} from "next";
import { startServerAndCreateNextHandler } from '@as-integrations/next'
const typeDefs =gql`
  type Movie {
    _id: String!
    title: String
    language: String!
  }

  type Query {
    movies: [Movie]
  }`;

const resolvers = {
  Query: {
    movies: async () => {
      try {
        // Connect to the database
        await dbConnect();

        // Fetch all movies from the database
        const movies = await MovieModel.find();
        return movies
      } catch (error) {
        console.error('Error fetching movies:', error);
        throw new Error('Failed to fetch movies');
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  
});

const handler = startServerAndCreateNextHandler<NextApiRequest>(server, {
  context: async (req) => ({ req }),
});

// Export named handlers for GET and POST
export const GET = handler;
export const POST = handler;