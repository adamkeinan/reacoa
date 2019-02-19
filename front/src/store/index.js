import Router from './router';

class StoreRoot {
  setRouting(routing) {
    this.router = new Router(routing);
  }
}
const storeRoot = new StoreRoot();
export default storeRoot;
