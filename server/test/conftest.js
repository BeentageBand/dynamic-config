const chai = require('chai');
const chaiHttp = require('chai-http');
const { response } = require('express');
const server = require('../src/index');

chai.use(chaiHttp);
chai.should();

describe('Configuration API', () => {
  /**
   * Test the POST /conf
   */
  describe('POST /conf', () => {
    it('It should return unauthorized if not authenticated', (done) => {
      chai.request(server)
        .post('/conf')
        .send({limit: 4098})
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });

    it('It should return unauthorized if wrong pass/user', (done) => {
      chai.request(server)
        .post('/conf')
        .auth('user', 'pass')
        .send({limit: 4098})
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });

    it('It should return 400 when body is empty', (done) => {
      chai.request(server)
        .post('/conf')
        .auth('admin', 'simplepass')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('guid').eq(1);
          done();
        });
    });

    it('It should insert new conf and return guid', (done) => {
      chai.request(server)
        .post('/conf')
        .auth('admin', 'simplepass')
        .send({limit: 4098})
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('guid').eq(1);
          done();
        });
    });
  });

  /**
  * Test GET /conf/:guid
  */
  describe('GET /conf/:guid', () => {
    it('It should return unauthorized if not authenticated', (done) => {
      const guid = 1;
      chai.request(server)
        .get(`/conf/${guid}`)
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });

    it('It should return unauthorized if wrong pass/user', (done) => {
      const guid = 1;
      chai.request(server)
        .get(`/conf/${guid}`)
        .auth('user', 'pass')
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });

    it('It should return 404 when guid does not exist', (done) => {
      const guid = 900;
      chai.request(server)
        .get(`/conf/${guid}`)
        .auth('admin', 'simplepass')
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });

    it('It should respond with full body of guid', (done) => {
      const guid = 1;
      chai.request(server)
        .get(`/conf/${guid}`)
        .auth('admin', 'simplepass')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('limits');
          done();
        });
    });
  });

  /**
   * Test the GET /conf/:guid/:keypath
   */
  describe('GET /conf/:guid/:keypath', () => {
    it('It should return unauthorized if not authenticated', (done) => {
      const guid = 1;
      const keypath = 'limit';
      chai.request(server)
        .get(`/conf/${guid}/${keypath}`)
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });

    it('It should return unauthorized if wrong pass/user', (done) => {
      const guid = 1;
      const keypath = 'limit';
      chai.request(server)
        .get(`/conf/${guid}/${keypath}`)
        .auth('user', 'pass')
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });

    it('It should return 404 when keypath is not found in guid', (done) => {
      const guid = 1;
      const keypath = 'limit';
      chai.request(server)
        .get(`/conf/${guid}/${keypath}`)
        .auth('admin', 'simplepass')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('memory').eq(4098);
          done();
        });
    });

    it('It should return 404 when guid is not found', (done) => {
      const guid = 1;
      const keypath = 'limit';
      chai.request(server)
        .get(`/conf/${guid}/${keypath}`)
        .auth('admin', 'simplepass')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('memory').eq(4098);
          done();
        });
    });

    it('It should respond with value on keypath', (done) => {
      const guid = 1;
      const keypath = 'limit';
      chai.request(server)
        .get(`/conf/${guid}/${keypath}`)
        .auth('admin', 'simplepass')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('memory').eq(4098);
          done();
        });
    });
  });
});