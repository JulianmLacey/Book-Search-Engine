const { User, Book } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
	Query: {
		me: async (parent, args) => {
			return await User.findById(args.id);
		},
	},
	Mutation: {
		loginUser: async (parent, { email, password }) => {
			const user = await User.findOne({ email }).populate("savedBooks");
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
		saveBook: async (parent, { authors, description, title, bookId, image, link }, context) => {
			const user = await User.findByIdAndUpdate({ _id: context.user._id }, { $push: { savedBooks: { authors, description, title, bookId, image, link } } }, { new: true });

			return user;
		},
		removeBook: async (parent, { bookId }, context) => {
			return User.findByIdAndUpdate({ _id: context.user._id }, { $pull: { savedBooks: { bookId } } }, { new: true });
		},
	},
};
module.exports = resolvers;
