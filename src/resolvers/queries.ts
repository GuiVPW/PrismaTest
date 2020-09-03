import { prisma } from "../index"

export const user = async (_, { id }) => {
	const user = await prisma.user.findOne({ where: { id } })
	return user
}

export const users = async () => {
	const users = await prisma.user.findMany({ orderBy: { id: "asc" } })
	return users
}

export const uniqueRecipe = async (_, { id }) => {
	const recipe = await prisma.recipe.findOne({ where: { id } })
	if (!recipe) throw new Error("Essa receita não existe!")
	return recipe
}

export const userRecipes = async (_, { authorId }) => {
	const recipes = await prisma.recipe.findMany({ where: { authorId } })
	if (!recipes) throw new Error("Esse usuário não existe!")
	return recipes
}
