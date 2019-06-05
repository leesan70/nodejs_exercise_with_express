const environments = {
  development: {
    mysql: {
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: 'nodejs_exercise_dev'
    }
  },

  test: {
    mysql: {
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: 'nodejs_exercise_test'
    }
  },

  production: {

  }
}

const nodeEnv = process.env.NODE_ENV || 'development';

module.exports = environments[nodeEnv];