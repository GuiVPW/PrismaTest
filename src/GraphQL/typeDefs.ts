import { gql } from "apollo-server"

const typeDefs = gql`
	type User {
		id: Int!
		name: String
		email: String
		recipes: [Recipe]
		image: File
	}

	type Recipe {
		id: Int!
		title: String!
		description: String
		authorId: Int
		author: User
		image: File
	}

	type File {
		filename: String!
		mimetype: String!
		encoding: String!
	}

	type Query {
		user(id: Int): User
		users: [User]
		uniqueRecipe(id: Int!): Recipe
		userRecipes(authorId: Int!): [Recipe]
	}

	type Mutation {
		createUser(name: String!, email: String!): User
		createRecipe(
			authorId: Int
			title: String!
			description: String
			image: Upload
		): Recipe
		addUserImage(id: Int, image: Upload): File!
	}
`

export default typeDefs
