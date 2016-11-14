'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var settingCtrlStub = {
  index: 'settingCtrl.index',
  getCurrent: 'settingCtrl.getCurrent',
  show: 'settingCtrl.show',
  create: 'settingCtrl.create',
  changeLoginTypes: 'settingCtrl.changeLoginTypes',
  changeSemesterName: 'settingCtrl.changeSemesterName',
  changeCurrentSemester: 'settingCtrl.changeCurrentSemester',
  destroy: 'settingCtrl.destroy'
};

var authServiceStub = {
  isAuthenticated() {
    return 'authService.isAuthenticated';
  },
  hasRole(role) {
    return `authService.hasRole.${role}`;
  }
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
  './setting.controller': settingCtrlStub,
  '../../auth/auth.service': authServiceStub
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

  describe('GET /api/settings/current', function() {
    it('should route to setting.controller.getCurrent', function() {
      expect(routerStub.get
        .withArgs('/current', 'settingCtrl.getCurrent')
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
    it('should verify admin role and route to setting.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'authService.hasRole.admin', 'settingCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/settings/login', function() {
    it('should verify admin role and route to setting.controller.changeLoginTypes', function() {
      expect(routerStub.put
        .withArgs('/login', 'authService.hasRole.admin', 'settingCtrl.changeLoginTypes')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/settings/semester', function() {
    it('should verify admin role and route to setting.controller.changeSemesterName', function() {
      expect(routerStub.put
        .withArgs('/semester', 'authService.hasRole.admin', 'settingCtrl.changeSemesterName')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/settings/current', function() {
    it('should verify admin role and route to setting.controller.changeCurrentSemester', function() {
      expect(routerStub.put
        .withArgs('/current', 'authService.hasRole.admin', 'settingCtrl.changeCurrentSemester')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/settings/:id', function() {
    it('should verify admin role and route to setting.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'authService.hasRole.admin', 'settingCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
