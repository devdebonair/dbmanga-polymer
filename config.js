module.exports = {
    
    env: {
        port: process.env.PORT || 3000
    },
    
    database: {
        connectionString: 'mongodb://catalyst:kiddollars@dbh84.mongolab.com:27847/debonair-manga',
        user: 'catalyst',
        password: 'kiddollars'
    },
    
    session: {
        secret: 'mySecret'
    }
};