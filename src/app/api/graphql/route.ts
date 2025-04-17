import dbConnect from "@/app/lib/db";
import MovieModel from "@/app/Model/movie";
import { ApolloServer } from "@apollo/server";
import { gql } from "graphql-tag";
import { NextApiRequest } from "next";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import UserModel from "@/app/Model/user";
import ShowtimeModel from "@/app/Model/showtime";
import TheaterModel from "@/app/Model/theater";
interface InteractionofUser {
  movieId: string;
  rating: number;
}
// GraphQL Schema
const typeDefs = gql`
  input ShowtimeSearch{
    _id:ID!
  }

  input TheaterSearch{
    _id:ID!
  }
  input UserIdSearch{
    _id:ID!
  }

  type Movie {
    _id: String!
    title: String
    language: String!
  }

  type Interactionofuser {
    movieId: String!
    rating: Int!
  }
  
  type User {
    _id: ID!
    username: String!
    email: String
    interactions: [Interactionofuser]
  }
  type Seat{
    _id:ID!
    seatnumber:String
    status:String
  }
  type Theater{
    _id:ID!
    name:String
    location:String
    totalseats:[Seat]
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
    theater(search:TheaterSearch):Theater!
    interaction_Of_One_User(search:UserIdSearch):[Interactionofuser]
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
    showtime: async (_: unknown, { search }: { search: { _id: string } }) => {
      try {
        await dbConnect();
        const showtime = await ShowtimeModel.findById(search._id).populate('theaters');
        return showtime
      } catch (error) {
        console.error("Error fetching showtimes:", error);
        throw new Error("Failed to fetch showtimes");
      }
    },
    theater:async(_: unknown, { search }: { search: { _id: string } })=>{
      try {
        await dbConnect()
        const theater = await TheaterModel.findById(search._id)
        return theater
      } catch (error) {
        console.error("Error fetching Theater:", error);
        throw new Error("Failed to fetch Theaters");
      }
    },
    interactionsofuser: async () => {
      try {
        await dbConnect();
        const users = await UserModel.find();
        let interactions: InteractionofUser[] = [];

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
    interaction_Of_One_User:async(_: unknown, { search }: { search: { _id: string } })=>{
      try {
        await dbConnect()
        const user=await UserModel.findById(search._id)
        return user?.interactions
      } catch (error) {
        console.error("Error fetching interactions Of current user:", error);
        throw new Error("Failed to fetch interactions of current user");
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
