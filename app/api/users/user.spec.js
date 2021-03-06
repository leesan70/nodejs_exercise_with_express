const should = require('should');
const request = require('supertest');

let app = null;

beforeEach(function() {
  // Clears the cache so a new server instance is used for each test.
  delete require.cache[require.resolve('../../../bin/www')];
  app = require('../../../bin/www');
});

afterEach(function() {
  app.close();
});

// const app = require('../../bin/www');

// after(function() {
//   app.close();
// });

describe('GET /users', function() {
  it('should return 200 status code', function(done) {
    request(app)
      .get('/users')
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        done();
      });
  });

  it('should return an array', function(done) {
    request(app)
      .get('/users')
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.be.an.instanceof(Array).and.have.length(3);
        res.body.map((user) => {
          user.should.have.properties('id', 'name');
          user.id.should.be.a.Number();
          user.name.should.be.a.String();
        });
        done();
      });
  });
});

describe('GET /users/:id', function() {
  context('with invalid format of id parameter', function() {    
    it('should return 400 status code', function(done) {
      request(app)
        .get('/users/no')
        .expect(400)
        .end((err, res) => {
          if (err) throw err;
          res.body.should.have.property('error');
          res.body.error.should.eql('Incorrect id');
          done();
        });
    });
  });

  context('with non-existing id', function() {    
    it('should return 404 status code', function(done) {
      request(app)
        .get('/users/100')
        .expect(404)
        .end((err, res) => {
          if (err) throw err;
          res.body.should.have.property('error');
          res.body.error.should.eql('Unknown user');
          done();
        });
    });
  });

  context('with proper id parameter', function() {
    const users = [
      {
        id: 1,
        name: 'alice'
      },
      {
        id: 2,
        name: 'bek'
      },
      {
        id: 3,
        name: 'chris'
      }
    ];
  
    it('should return an User with id identical to the provided id parameter', function(done) {
      [...Array(3).keys()].map((index) => {
        request(app)
          .get(`/users/${index + 1}`)
          .expect(200)
          .end((err, res) => {
            if (err) throw err;
            const user = res.body;
            user.should.have.properties('id', 'name');
            user.id.should.be.a.Number();
            user.id.should.equal(users[index].id);
            user.name.should.be.a.String();
            user.name.should.equal(users[index].name);
          });
      });
      done();
    });
  });
});

describe('DELETE /users/:id', function() {
  context('with proper id parameter', function() {  
    it('should return 204 status code', function(done) {
      request(app)
        .delete('/users/3')
        .expect(204)
        .end((err, res) => {
          if (err) throw err;
          done();
        });
    });
  });

  context('with invalid format of id parameter', function() {    
    it('should return 400 status code', function(done) {
      request(app)
        .delete('/users/no')
        .expect(400)
        .end((err, res) => {
          if (err) throw err;
          res.body.should.have.property('error');
          res.body.error.should.eql('Incorrect id');
          done();
        });
    });
  });

  context('with non-existing id', function() {    
    it('should return 404 status code', function(done) {
      request(app)
        .delete('/users/100')
        .expect(404)
        .end((err, res) => {
          if (err) throw err;
          res.body.should.have.property('error');
          res.body.error.should.eql('Unknown user');
          done();
        });
    });
  });
});

describe('POST /users', function() {
  context('with proper body containing key "name"', function() {
    it('should return 201 status code', function(done) {
      const user = {
        'name': 'Mike'
      };
      request(app)
        .post('/users')
        .send(user)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(201)
        .end((err, res) => {
          if (err) throw err;
          res.body.should.have.properties('id', 'name');
          res.body.id.should.eql(4);
          res.body.name.should.eql(user.name);
          done();
        });
    });
  });

  context('without key "name" in the body', function() {
    it('should return 400 status code', function(done) {
      request(app)
        .post('/users')
        .send({
          dummy: 1
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(400)
        .end((err, res) => {
          if (err) throw err;
          res.body.should.have.property('error');
          res.body.error.should.eql('Incorrect name');
          done();
        })
    });
  });
});

describe('PUT /users/:id', function() {
  context('with proper id parameter', function() {
    context('with proper body containing key "name"', function() {
      before(function() {
        const modifiedUser = {
          id: 1,
          name: 'Mike'
        }
      });

      it('shuold return 204 status code', function(done) {
        request(app)
          .put('/users/1')
          .send({
            name: 'Mike'
          })
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json')
          .expect(204)
          .end((err, res) => {
            if (err) throw err;
            done();
          });
      });
    });
    
    context('without key "name" in the body', function() {
      it('should return 400 status code', function(done) {
        request(app)
          .put('/users/1')
          .send({
            dummy: 1
          })
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json')
          .expect(400)
          .end((err, res) => {
            if (err) throw err;
            res.body.should.have.property('error');
            res.body.error.should.eql('Incorrect name');
            done();
          });
      });
    });
  });

  context('with invalid format of id parameter', function() {    
    it('should return 400 status code', function(done) {
      request(app)
        .put('/users/no')
        .expect(400)
        .end((err, res) => {
          if (err) throw err;
          res.body.should.have.property('error');
          res.body.error.should.eql('Incorrect id');
          done();
        });
    });
  });

  context('with non-existing id', function() {   
    it('should return 404 status code', function(done) {
      request(app)
        .delete('/users/100')
        .expect(404)
        .end((err, res) => {
          if (err) throw err;
          res.body.should.have.property('error');
          res.body.error.should.eql('Unknown user');
          done();
        });
    });
  });
});