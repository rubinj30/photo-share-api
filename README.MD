PhotoShare API
===============
PhotoShare is the main back-end exercise for [GraphQL Workshop](https://www.graphqlworkshop.com). In this exercise, students build a GraphQL API for a small photo sharing application.

Challenge
---------------
Within the data folder you will find sample json data for __Photos__ and __Users__. We need to initialize the app with the sample data found in this file. Once added, we need to add the necessary types, queries, and resolvers to make the user data accessible with out GraphQL Service.

### Goals

* [ ] Resolve the current queries using the sample data
* [ ] Ability to Query the __totalUsers__ count
* [ ] Ability to Query __allUsers__ records
* [ ] Ability to Query an individual __User__
* [ ] Customize the sample data, add your own records to use

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
2. [ ] Connecting Users to Photos
3. [ ] Connecting Photos to Users

### d. Context

1. [x] Add environment and refactor
2. [x] Configuring a Database
3. [x] Configure an express server
4. [x] Configure Github OAuth
5. [x] Add `githubLogin` mutation
6. [x] Add fake users to `githubLogin` mutation
7. [ ] Identify the `currentUser`
8. [ ] Post new Photos to the Database

### e. Subscriptions and Custom Scalars

1. [ ] Adding Subscription Support 
2. [ ] Uploading File with postPhoto 
3. [ ] Adding custom scalar for `DateTime`