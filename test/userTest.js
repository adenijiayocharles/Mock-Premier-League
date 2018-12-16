const faker = require("faker");
const expect = require('chai').expect;
const app = require('../app');
const request = require('supertest');


let email = (faker.internet.email()).toLowerCase();
let password = (faker.internet.password()).toLowerCase();



describe('POST /users/signup', function () {
    let data = {
        "name": faker.name.firstName(),
        "email": email,
        "password": password
    }
    
    it('respond with 200 created', function (done) {
        request(app)
        .post('/users/signup')
        .send(data)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err) => {
            if (err) return done(err);
        done();
        });
    });
});


describe('POST /users/login', function () {
    let data = {
        "email": email,
        "password": password
    }
    it('respond with 200 created', function (done) {
        request(app)
        .post('/users/login')
        .send({
            "email": email,
            "password": password
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err) => {
            if (err) return done(err);
        done();
        });
    });
});

describe('GET /users/teams', function () {
    var token = '';
    before(function(done) {
        request(app)
        .post('/users/login')
        .send({
            "email": email,
            "password": password
        })
        .set('Accept', 'application/json')
          .end(function(err, res) {
            var result = JSON.parse(res.text);
            token = result.token;
            done();
          });
      });    
      it('should not be able to consume the route /test since no token was sent', function(done) {
        request(app)
          .get('/users/teams')
          .expect(401, done);
      });
    
    
      it('should be able to consume the route /test since token valid was sent and return all teams', function(done) {
        request(app)
          .get('/users/teams')
          .set('Authorization', 'Bearer ' + token)
          .expect(200, done);
      });
});

describe('GET /users/fixtures', function () {
    var token = '';
    before(function(done) {
        request(app)
        .post('/users/login')
        .send({
            "email": email,
            "password": password
        })
        .set('Accept', 'application/json')
          .end(function(err, res) {
            var result = JSON.parse(res.text);
            token = result.token;
            done();
          });
      });    
      it('should not be able to consume the route /test since no token was sent', function(done) {
        request(app)
          .get('/users/fixtures')
          .expect(401, done);
      });
    
    
      it('should be able to consume the route /test since token valid was sent and return all teams', function(done) {
        request(app)
          .get('/users/fixtures')
          .set('Authorization', 'Bearer ' + token)
          .expect(200, done);
      });
});

describe('GET /users/fixtures/complete', function () {
    var token = '';
    before(function(done) {
        request(app)
        .post('/users/login')
        .send({
            "email": email,
            "password": password
        })
        .set('Accept', 'application/json')
          .end(function(err, res) {
            var result = JSON.parse(res.text);
            token = result.token;
            done();
          });
      });    
      it('should not be able to consume the route /test since no token was sent', function(done) {
        request(app)
          .get('/users/fixtures/complete')
          .expect(401, done);
      });
    
    
      it('should be able to consume the route /test since token valid was sent and return all teams', function(done) {
        request(app)
          .get('/users/fixtures/complete')
          .set('Authorization', 'Bearer ' + token)
          .expect(200, done);
      });
});

describe('GET /users/fixtures/pending', function () {
    var token = '';
    before(function(done) {
        request(app)
        .post('/users/login')
        .send({
            "email": email,
            "password": password
        })
        .set('Accept', 'application/json')
          .end(function(err, res) {
            var result = JSON.parse(res.text);
            token = result.token;
            done();
          });
      });    
      it('should not be able to consume the route /test since no token was sent', function(done) {
        request(app)
          .get('/users/fixtures/pending')
          .expect(401, done);
      });
    
    
      it('should be able to consume the route /test since token valid was sent and return all teams', function(done) {
        request(app)
          .get('/users/fixtures/pending')
          .set('Authorization', 'Bearer ' + token)
          .expect(200, done);
      });
});
