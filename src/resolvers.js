const { generate } = require('short-id')

const photos = require('../data/photos')
const users = require('../data/users')

console.log('client id: ', process.env.GITHUB_CLIENT_ID)
console.log('client secret: ', process.env.GITHUB_CLIENT_SECRET)

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