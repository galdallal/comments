const {getConnection} = require('./db-connection');

const insertComment = comment => getConnection().collection('comments').insertOne(comment);
const getComments = () => getConnection().collection('comments').find().toArray();

module.exports = {insertComment, getComments};
