'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var submissionCtrlStub = {
  index: 'submissionCtrl.index',
  show: 'submissionCtrl.show',
  create: 'submissionCtrl.create',
  update: 'submissionCtrl.update',
  destroy: 'submissionCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var submissionIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './submission.controller': submissionCtrlStub
});

describe('Submission API Router:', function() {

  it('should return an express router instance', function() {
    expect(submissionIndex).to.equal(routerStub);
  });

  describe('GET /api/submissions', function() {

    it('should route to submission.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'submissionCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/submissions/:id', function() {

    it('should route to submission.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'submissionCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/submissions', function() {

    it('should route to submission.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'submissionCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/submissions/:id', function() {

    it('should route to submission.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'submissionCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/submissions/:id', function() {

    it('should route to submission.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'submissionCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/submissions/:id', function() {

    it('should route to submission.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'submissionCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
