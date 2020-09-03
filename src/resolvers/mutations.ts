import { prisma } from "../index"
import fs, { createWriteStream } from "fs"
import path from "path"

export const createUser = async (_, { name, email }) => {
	const isCreated = await prisma.user.findOne({ where: { email } })
	if (isCreated) throw new Error("Esse usuário já existe")

	const newUser = await prisma.user.create({ data: { name, email } })

	if (newUser) return newUser
	else throw new Error("Não foi possível criar o usuário")
}

export const createRecipe = async (_, { authorId, title, description }) => {
	const isRecipeCreated = await prisma.recipe.findOne({ where: { title } })
	if (isRecipeCreated) throw new Error("Essa receita já existe!")

	try {
		const newRecipe = await prisma.recipe.create({
			data: { title, description, author: { connect: { id: authorId } } }
		})
		console.log(newRecipe)
		return newRecipe
	} catch (e) {
		throw new Error(e)
	}
}

export const addUserImage = async (_, { id, image }) => {
	const { createReadStream, filename, mimetype, encoding } = await image

	const writeImage = await new Promise(res =>
		createReadStream()
			.pipe(
				createWriteStream(
					path.join(__dirname, "../../uploads/images", filename.trim())
				)
			)
			.on("close", res)
	)

	if (!writeImage) throw new Error("Erro ao salvar imagem no diretório!")

	const saveImage = await prisma.user.update({
		data: { avatar: { update: { encoding, filename, mimetype } } },
		where: { id }
	})

	if (!saveImage) throw new Error("Erro ao salvar imagem no banco de dados!")

	return writeImage
}
