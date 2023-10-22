# Daily Diet API

API for register meals and manage diet.

## RFs

- [x] Should be able to create an user
- [ ] Should be able to identify an user
- [x] Should be able to register a meal
- [x] Should be able to update a meal
- [x] Should be able to delete a meal
- [x] Should be able to list all user's meals
- [x] Should be able to list a single user's meal
- [ ] Should be able to get user's metrics

## RNs

- [x] Meals should have a name, description,date, time and a flag indicating if it's in diet or not.
- [ ] User's metrics should contain total meals, total meals in diet, total meals out diet, best streak in diet
- [ ] An user can only CRUD his own meals.

## RNFs

- [x] User's password should be encrypted
- [x] The data should be persisted in a SQLite DB
- [ ] The user should be authenticated with a JWT
- [x] List should be paginated with 10 items per page
