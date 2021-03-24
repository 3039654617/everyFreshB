const roleRouter = {
  coustomer: [{
    name: 'Product',
  }, {
    name: 'ProductList',
  }, {
    name: 'ProductAdd',
  }, {
    name: 'ProductEdit',
  }],
  admin: [{
    name: 'Product',
  }, {
    name: 'ProductList',
  }, {
    name: 'ProductAdd',
  }, {
    name: 'Category',
  }, {
    name: 'ProductEdit',
  }],
};

export default function getRoleRouter(role, allRouter) {
  const allowRouterName = roleRouter[role].map((item) => item.name);
  const resultRouter = allRouter.filter((item) => {
    const obj = item;
    if (allowRouterName.indexOf(obj.name) !== -1) {
      const { children } = obj;
      obj.children = children.filter((data) => {
        if (allowRouterName.indexOf(data.name) !== -1) {
          return true;
        }
        return false;
      });
      return true;
    }
    return false;
  });
  return resultRouter;
}
