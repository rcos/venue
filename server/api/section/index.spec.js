'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var sectionCtrlStub = {
  index: 'sectionCtrl.index',
  show: 'sectionCtrl.show',
  create: 'sectionCtrl.create',
  update: 'sectionCtrl.update',
  destroy: 'sectionCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var sectionIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './section.controller': sectionCtrlStub
});

describe('Section API Router:', function() {

  it('should return an express router instance', function() {
    expect(sectionIndex).to.equal(routerStub);
  });

  describe('GET /api/sections', function() {

    it('should route to section.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', sinon.match.any, 'sectionCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/sections/:id', function() {

    it('should route to section.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'sectionCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/sections', function() {

    it('should route to section.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'sectionCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/sections/:id', function() {

    it('should route to section.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'sectionCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/sections/:id', function() {

    it('should route to section.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'sectionCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/sections/:id', function() {

    it('should route to section.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'sectionCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
