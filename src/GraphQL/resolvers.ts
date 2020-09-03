import { user, users, uniqueRecipe, userRecipes } from "../resolvers/queries"
import { createUser, createRecipe, addUserImage } from "../resolvers/mutations"

const resolvers = {
	Query: {
		user,
		users,
		uniqueRecipe,
		userRecipes
	},
	Mutation: {
		createUser,
		createRecipe,
		addUserImage
	}
}

export default resolvers
