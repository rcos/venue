'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var eventinfoCtrlStub = {
  index: 'eventinfoCtrl.index',
  show: 'eventinfoCtrl.show',
  create: 'eventinfoCtrl.create',
  update: 'eventinfoCtrl.update',
  destroy: 'eventinfoCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var eventinfoIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './eventinfo.controller': eventinfoCtrlStub
});

describe('Eventinfo API Router:', function() {

  it('should return an express router instance', function() {
    expect(eventinfoIndex).to.equal(routerStub);
  });

  describe('GET /api/eventinfos', function() {

    it('should route to eventinfo.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'eventinfoCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/eventinfos/:id', function() {

    it('should route to eventinfo.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'eventinfoCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/eventinfos', function() {

    it('should route to eventinfo.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'eventinfoCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/eventinfos/:id', function() {

    it('should route to eventinfo.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'eventinfoCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/eventinfos/:id', function() {

    it('should route to eventinfo.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'eventinfoCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/eventinfos/:id', function() {

    it('should route to eventinfo.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'eventinfoCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
