const faker = require("faker");
const expect = require('chai').expect;
const app = require('../app');
const request = require('supertest');


let email = (faker.internet.email()).toLowerCase();
let password = (faker.internet.password()).toLowerCase();



describe('POST /admin/signup', function () {
    it('respond with 200 created', function (done) {
        request(app)
        .post('/admin/signup')
        .send({
            "name": faker.name.firstName(),
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

describe('POST /admin/login', function () {
    const authenticatedUser = request.agent(app)
    it('respond with 200 created', function (done) {
        request(app)
        authenticatedUser
        .post('/admin/login')
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

describe('GET /teams', function () {
    var token = '';
    before(function(done) {
        request(app)
        .post('/admin/login')
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
          .get('/teams')
          .expect(401, done);
      });
    
    
      it('should be able to consume the route /test since token valid was sent and return all teams', function(done) {
        request(app)
          .get('/teams')
          .set('Authorization', 'Bearer ' + token)
          .expect(200, done);
      });
});

describe('GET /fixtures', function () {
    var token = '';
    before(function(done) {
        request(app)
        .post('/admin/login')
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
          .get('/fixtures')
          .expect(401, done);
      });
    
    
      it('should be able to consume the route /test since token valid was sent and return all teams', function(done) {
        request(app)
          .get('/fixtures')
          .set('Authorization', 'Bearer ' + token)
          .expect(200, done);
      });
});
