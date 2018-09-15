PhotoShare API
===============
PhotoShare is the main back-end exercise for [GraphQL Workshop](https://www.graphqlworkshop.com). In this exercise, students build a GraphQL API for a small photo sharing application.

Changes
---------------

### Modify the githubAuth Resolver

```javascript
const { authorizeWithGithub, generateFakeUsers } = require('./lib')
```

```javascript
githubAuth: async (parent, { code }, { users }) => {

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
    
   ...
    
}
```

### Add Some Test Users

```graphql
query users {
  totalUsers
  allUsers {
    ...person
  }
}

mutation addTestUser {
  githubAuth(code:"TEST") {
    token 
    user {
      ...person
    }
  }
}

fragment person on User {
  name
  githubLogin
  avatar
  postedPhotos {
    name
  }
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
7. [ ] Post new Photos to the Database

### e. Subscriptions and Files

1. [ ] Adding Subscription Support 
2. [ ] Publishing Events 
3. [ ] Modifying the Schema to Support File Uploads 
4. [ ] Uploading File with postPhoto 
