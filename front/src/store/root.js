import Example from './model/example';

class StoreRoot {
  constructor() {
    this.example = new Example();
  }
}
const storeRoot = new StoreRoot();
export default storeRoot;
