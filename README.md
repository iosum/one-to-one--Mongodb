
- bin : server code actually get compilled
- node_modules : all dependcies
- routes : controllers
- `module.exports = xxx` : make xxx file public and let the routes and
views talk to each other

##  MongoDB
- compass GUI

## Mongoose
- an object document wrapper
- is a bridge that allows database and web applications talk to each other

> npm audit fix : 
 update the dependencies

### config
- store the db connection
- it's not part of the actual code, it's seperate
- any global variables / functions can be put in there
- create a config folder to store the configurations