'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var settingCtrlStub = {
  index: 'settingCtrl.index',
  show: 'settingCtrl.show',
  create: 'settingCtrl.create',
  upsert: 'settingCtrl.upsert',
  patch: 'settingCtrl.patch',
  destroy: 'settingCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var settingIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './setting.controller': settingCtrlStub
});

describe('Setting API Router:', function() {
  it('should return an express router instance', function() {
    expect(settingIndex).to.equal(routerStub);
  });

  describe('GET /api/settings', function() {
    it('should route to setting.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'settingCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/settings/:id', function() {
    it('should route to setting.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'settingCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/settings', function() {
    it('should route to setting.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'settingCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/settings/:id', function() {
    it('should route to setting.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'settingCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/settings/:id', function() {
    it('should route to setting.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'settingCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/settings/:id', function() {
    it('should route to setting.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'settingCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
