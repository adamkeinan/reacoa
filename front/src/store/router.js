import { autorun } from 'mobx';

class Router {
  /**
   * routing
   * @type {MobxReactRouter.RouterStore}
   */
  routing;

  histories = [];

  constructor(routing) {
    this.routing = routing;
    autorun(() => {
      const { location: { hash, key, pathname, search, state } } = routing;
      const history = {
        hash,
        key,
        pathname,
        search,
        state,
        time: new Date(),
      };
      if (this.histories.length >= 100) {
        this.histories.pop();
      }
      this.histories.unshift(history);
    });
  }
}
export default Router;
