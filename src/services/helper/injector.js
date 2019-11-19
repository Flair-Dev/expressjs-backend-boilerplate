const { createContainer } = require('awilix');

module.exports = makeInjector = function getInjector() {
  let injector = {};
  if (getInjector.injector) {
    injector = getInjector.injector;
  } else {
    injector = createContainer();
    getInjector.injector = injector;
  }

  return {
    inject: dependencies => {
      injector.register(dependencies);
    },

    createScope: () => injector.createScope(),
  };
};
