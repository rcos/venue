'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var courseCtrlStub = {
  index: 'courseCtrl.index',
  show: 'courseCtrl.show',
  create: 'courseCtrl.create',
  update: 'courseCtrl.update',
  destroy: 'courseCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var courseIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './course.controller': courseCtrlStub
});

describe('Course API Router:', function() {

  it('should return an express router instance', function() {
    expect(courseIndex).to.equal(routerStub);
  });

  describe('GET /api/courses', function() {

    it('should route to course.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'courseCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/courses/:id', function() {

    it('should route to course.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'courseCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/courses', function() {

    it('should route to course.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'courseCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/courses/:id', function() {

    it('should route to course.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'courseCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/courses/:id', function() {

    it('should route to course.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'courseCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/courses/:id', function() {

    it('should route to course.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'courseCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
