PhotoShare API
===============
PhotoShare is the main back-end exercise for [GraphQL Workshop](https://www.graphqlworkshop.com). In this exercise, students build a GraphQL API for a small photo sharing application.

Changes
---------------

### Create a Github OAuth App

__.env__
```
DB_HOST=mongodb://localhost:27017/photo-share
GITHUB_CLIENT_ID=<YOUR_CLIENT_ID>
GITHUB_CLIENT_SECRET=<YOUR_CLIENT_SECRET>
```

### Log the env variables

__resolvers.js__
```javascript
const { generate } = require('short-id')

const photos = require('../data/photos')
const users = require('../data/users')

console.log('client id: ', process.env.GITHUB_CLIENT_ID)
console.log('client secret: ', process.env.GITHUB_CLIENT_SECRET)

...

```

### Modify the Index to Request a Github Code

```javascript
app.get('/', (req, res) => {
    let url = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=user`
    res.end(`
        <h1>Welcome to the Photo Share API</h1>
        <a href="${url}">Request a GitHub Code</a>
    `)
})
```

### Test by obtaining a github code
Click the link on `http://localhost:4000`. You should be redirected to `http://localhost:3000?code=XYZ` with the code passed back from github via a query string.

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
5. [ ] Add `githubLogin` mutation
6. [ ] Add fake users to `githubLogin` mutation
7. [ ] Identify the `currentUser`
8. [ ] Post new Photos to the Database

### e. Subscriptions and Custom Scalars

1. [ ] Adding Subscription Support 
2. [ ] Uploading File with postPhoto 
3. [ ] Adding custom scalar for `DateTime`
