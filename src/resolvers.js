const { generate } = require('short-id')

const photos = require('../data/photos')
const users = require('../data/users')

module.exports = {

    Query: {
        totalPhotos: () => photos.length,
        allPhotos: () => photos,
        Photo: (parent, { id }) => photos.find(p => p.id === id),
        totalUsers: () => users.length,
        allUsers: () => users,
        User: (parent, { id }) => users.find(p => p.id === id)
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
        githubAuth: async (parent, { code }, { users, pubsub }) => {

            let payload

            if (code === 'TEST') {
                const { results:[fakeUser] } = await generateFakeUsers(1)
                payload = {
                    login: fakeUser.login.username,
                    name: `${fakeUser.name.first} ${fakeUser.name.last}`,
                    avatar_url: fakeUser.picture.thumbnail,
                    access_token: fakeUser.login.sha1 
                }
            } else {
                payload = await authorizeWithGithub({
                    client_id: process.env.GITHUB_CLIENT_ID,
                    client_secret: process.env.GITHUB_CLIENT_SECRET,
                    code
                })
            }
            
            if (payload.message) {
                throw new Error(payload.message)
            }

            const githubUserInfo = {
                githubLogin: payload.login,
                name: payload.name,
                avatar: payload.avatar_url,
                githubToken: payload.access_token
            }

            const { ops:[user], upsertedCount } = await users.replaceOne(
                { githubLogin: payload.login }, 
                githubUserInfo, 
                { upsert: true }
            )

            if (upsertedCount) {
                pubsub.publish('user-added', { newUser: user })
            }

            return { user, token: user.githubToken }
            
        }
    },

    Subscription: {
        newPhoto: {
            subscribe: (root, data, { pubsub }) => pubsub.asyncIterator('photo-added')
        },
        newUser: {
            subscribe: (root, data, { pubsub }) => pubsub.asyncIterator('user-added')
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