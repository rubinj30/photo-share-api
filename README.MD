PhotoShare API
===============
PhotoShare is the main back-end exercise for [GraphQL Workshop](https://www.graphqlworkshop.com). In this exercise, students build a GraphQL API for a small photo sharing application.

Changes
---------------

### Add a file type to the Post Photo Input

```graphql
scalar DateTime

type Photo {
    id: ID!
    name: String!
    url: String!
    description: String
    category: PhotoCategory!
    postedBy: User!
    created: DateTime!
}
```


### Modify the Resolver to Accept the file

__resolvers.js__
```javascript
const { GraphQLScalarType } = require('graphql')

__resolvers.js__
...
module.exports = {
    
    ...
    
    DateTime: new GraphQLScalarType({
        name: 'DateTime',
        description: 'A valid date time value.',
        parseValue: value => new Date(value),
        serialize: value => new Date(value).toISOString(),
        parseLiteral: ast => ast.value
    })

}
```


### Test the Upload (no playground)

* [ ] Drop the photos collection
* [ ] Delete the photos from the assets folder
* [ ] navigate to [http://localhost:4000/img/photos](http://localhost:4000/img/photos)

```graphql
query {
  allPhotos {
    id
    url
    created
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
7. [x] Identify the `currentUser`
8. [x] Post new Photos to the Database

### e. Subscriptions and Files

1. [x] Adding Subscription Support 
2. [x] Uploading File with postPhoto 
3. [x] Adding custom scalar for `DateTime`
