# Restaurant Management

## ReactJS + NodeJS/ExpressJS + PostgreSQL

You can fork the app or you can `git clone` the app into your local machine. Once done that, please install all the
dependencies by doing the followings:

- Install Nodejs: https://nodejs.org/en/
- Install PostgreSQL: https://www.postgresql.org/
- Go to PostgreSQL\15\bin, open in CMD and run:

  ```
  $ psql -h localhost -d restaurant -p 5432 -U postgres -f filePath
  ```

- Example:

  ```
  $ psql -h localhost -d restaurant -p 5432 -U postgres -f ".\msd-project\restaurant.sql"

  ```

- Go to https://cloudinary.com and register, get the cloud detail.
- Install dependencies for both client and server:

  ```
  $ cd client
  $ npm install
  $ cd ../server
  $ npm install
  ```

- **Note!** Set your environments variables in `server/.env`.
- Start client:

  ```
  $ cd client
  $ npm start
  ```

- Do the same for server:

  ```
  $ cd server
  $ npm install
  ```
