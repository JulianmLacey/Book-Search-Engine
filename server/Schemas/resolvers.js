const { User, Book } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
	Query: {
		me: async (parent, { username }) => {
			return User.findOne({ username });
		},
	},
	Mutation: {
		loginUser: async (parent, { email, password }) => {
			const user = await User.findOne({ email });
			if (!user) {
				throw AuthenticationError;
			}

			const correctPw = await user.isCorrectPassword(password);
			if (!correctPw) {
				throw AuthenticationError;
			}
			const token = signToken(user);
			return { token, user };
		},
		addUser: async (parent, { username, email, password }) => {
			const user = await User.create({ username, email, password });
			const token = signToken(user);
			return { token, user };
		},
		saveBook: async (parent, { authors, description, title, bookId, image, link, userId }) => {
			const book = await Book.create({ authors, description, title, bookId, image, link });

			const user = User.findOneAndUpdate({ _id: userId }, { $addToSet: { savedBooks: book } });

			return user;
		},
		removeBook: async (parent, { bookId }) => {
			return Book.findOneAndDelete({ _id: bookId });
		},
	},
};
module.exports = resolvers;
