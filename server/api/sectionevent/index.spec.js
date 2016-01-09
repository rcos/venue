'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var sectioneventCtrlStub = {
  index: 'sectioneventCtrl.index',
  show: 'sectioneventCtrl.show',
  create: 'sectioneventCtrl.create',
  update: 'sectioneventCtrl.update',
  destroy: 'sectioneventCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var sectioneventIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './sectionevent.controller': sectioneventCtrlStub
});

describe('Sectionevent API Router:', function() {

  it('should return an express router instance', function() {
    expect(sectioneventIndex).to.equal(routerStub);
  });

  describe('GET /api/sectionevents', function() {

    it('should route to sectionevent.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'sectioneventCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/sectionevents/:id', function() {

    it('should route to sectionevent.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'sectioneventCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/sectionevents', function() {

    it('should route to sectionevent.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'sectioneventCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/sectionevents/:id', function() {

    it('should route to sectionevent.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'sectioneventCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/sectionevents/:id', function() {

    it('should route to sectionevent.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'sectioneventCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/sectionevents/:id', function() {

    it('should route to sectionevent.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'sectioneventCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
