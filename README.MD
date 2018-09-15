PhotoShare API
===============
PhotoShare is the main back-end exercise for [GraphQL Workshop](https://www.graphqlworkshop.com). In this exercise, students build a GraphQL API for a small photo sharing application.

Changes
---------------

### Import Object ID

* [ ] Remove `const photos = require('../data/photos')`

```javascript
const { ObjectID } = require('mongodb')
```

### Modify postPhoto Mutation

```javascript
postPhoto: async (parent, { input }, { photos, currentUser }) => {

    if (!currentUser) {
        throw new Error('only an authorized user can post a photo')
    }

    const newPhoto = {
        ...input,
        userID: currentUser.githubLogin
    }

    const { insertedId } = await photos.insertOne(newPhoto)
    newPhoto.id = insertedId.toString()

    return newPhoto

}
```

### Modify Query Resolvers

```javascript
Query: {        
    totalPhotos: (parent, args, { photos }) => photos.countDocuments(),
    allPhotos: (parent, args, { photos }) => photos.find().toArray(),
    Photo: (parent, { id }, { photos }) => photos.findOne({ _id: ObjectID(id) }),
    ...
},
```

### Modify Type Resolvers

```javascript
Photo: {
    ...
    postedBy: (parent, args, { users }) => users.findOne({ githubLogin: parent.userID })
},

User: {
    postedPhotos: (parent, args, { photos}) => photos.find({ userID: parent.githubLogin }).toArray()
}
```

Iterations
---------------

### a. Start

1. [x] Initial Project Folder
2. [x] Apollo Server 2.0

### b. The Photo Type

1. [x] Counting the Photos 
2. [x] Posting a Photo 
3. [x] Handling Photo Categories 
4. [x] Using an Input Type 
5. [x] Listing All Photos 
6. [x] Querying a Single Photo 

### c. The User Type

1. [x] Challenge: Adding the User Type
2. [x] Connecting Photos to Users
3. [x] Connecting Users to Photos
4. [x] Adding currentUser to context

### d. Context

1. [x] Add environment and refactor
2. [x] Configuring a Database
3. [x] Configure an express server
4. [x] Configure Github OAuth
5. [x] Add `githubLogin` mutation
6. [x] Add fake users to `githubLogin` mutation
7. [x] Identify the `currentUser`
8. [x] Post new Photos to the Database

### e. Subscriptions and Custom Scalars

1. [ ] Adding Subscription Support 
2. [ ] Uploading File with postPhoto 
3. [ ] Adding custom scalar for `DateTime`