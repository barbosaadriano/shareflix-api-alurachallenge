## This is my version of API made up in #BackEndChallengeAlura.

This API was created at the Back-End-Challenge of Alura. The bottom line of this challege is made up an API to provide a basic CRUD (create, retrive, update and delete) application where the main concern is "movies". Through these API you can keep a list of your favorite movies.

Let's check it out these project.

## technologies

- [Nodejs] (https://nodejs.org/)
- [Express] (https://expressjs.com/)
- [Sequelize] (https://sequelize.org/)
- [mysql2] (https://www.npmjs.com/package/mysql2)
- [Mysql] (https://www.mysql.com/)
- [Swagger] (https://swagger.io/tools/swagger-ui/)

## Get Started

First of all, you need to clone this repository to your machine and install the dependencies (you need to make sure that you have NodeJs installed).

```
# git clone https://github.com/barbosaadriano/shareflix-api-alurachallenge.git
# cd shareflix-api-alurachallenge
# npm install
```
Also, you need to create a configurations file, see next topic to do it.

### Configuration file
 
You need to create a file /api/config/config.js and put bellow's configurations.

```
{
  "development": {
    "username": "xxx",
    "password": "xxx",
    "database": "xxx",
    "host": "xxx",
    "dialect": "mysql"
  },
  "test": {
   ...
  },
  "production": {
   ...
  }
}

```
### Making up the database

Created the configurations file as above, you can run npx sequelize-cli db:migrate to execute the migrations and to make up the tables.
Once created the database, you can populate it with sample data, running npx sequelize-cli db:seed:all

### Running 

Now, you must run the application with npm start and have fun!

## Api Documentation endpoint

After start de project with npm start, you can see the documentation about this API using that bellow endpoint
```
GET /api-docs
```
# front

[Front alura](https://github.com/alura-cursos/aluraflix-front.git)

# Troubleshooting

- If you have the first version of this API is possible that you get an error after run migration with npx sequelize-cli db:migrate. The problem is caused by the new migration that add some relationship required between Movies and Categories with the flag allowNull false. Then, if you get an error here, try to execute npx sequelize-cli db:seed:all and retry executing migration