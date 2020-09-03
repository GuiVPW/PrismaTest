import { ApolloServer } from "apollo-server"
import { PrismaClient } from "@prisma/client"
import typeDefs from "./GraphQL/typeDefs"
import resolvers from "./GraphQL/resolvers"

export const prisma = new PrismaClient()

const server = new ApolloServer({
	typeDefs,
	resolvers,
	cors: {
		origin: "*",
		credentials: true,
		optionsSuccessStatus: 200,
		methods: ["POST"]
	}
})

server.listen().then(({ url }) => {
	console.log(`Servidor rodando na porta ${url}`)
})
