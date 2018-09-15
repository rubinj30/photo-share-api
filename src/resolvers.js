const { generate } = require('short-id')
const { authorizeWithGithub } = require('./lib')

const photos = require('../data/photos')

module.exports = {

    Query: {
        totalPhotos: () => photos.length,
        allPhotos: () => photos,
        Photo: (parent, { id }) => photos.find(p => p.id === id),
        totalUsers: (parent, args, { users }) => users.countDocuments(),
        allUsers: (parent, args, { users }) => users.find().toArray(),
        User: (parent, { githubLogin }, { users }) => users.findOne({ githubLogin })
    },

    Mutation: {
        postPhoto: (parent, { input }, { currentUser }) => {

            if (!currentUser) {
                throw new Error(`Only authorized users can post photos`)
            }

            const id = generate()
            const newPhoto = { 
                id, 
                ...input,
                userID: currentUser.id 
            }
            photos.push(newPhoto)
            return newPhoto
        },
        githubAuth: async (parent, { code }, { users }) => {

            const payload = await authorizeWithGithub({
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code
            })

            if (payload.message) {
                throw new Error(payload.message)
            }

            const githubUserInfo = {
                githubLogin: payload.login,
                name: payload.name,
                avatar: payload.avatar_url,
                githubToken: payload.access_token
            }

            const { ops:[user] } = await users.replaceOne(
                { githubLogin: payload.login }, 
                githubUserInfo, 
                { upsert: true }
            )

            return { user, token: user.githubToken }
            
        }
    },

    Photo: {
        url: parent => `/img/photos/${parent.id}.jpg`,
        postedBy: parent => users.find(u => u.id === parent.userID)
    },

    User: {
        postedPhotos: parent => photos.filter(p => p.userID === parent.id)
    }

}