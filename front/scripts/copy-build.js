const fs = require('fs-extra');
const path = require('path');

(async () => {
  const from = path.resolve(__dirname, '../build');
  const to = path.resolve(__dirname, '../../server/front');
  const mark = path.resolve(__dirname, '../../reacoa.lock.md');
  try {
    await fs.ensureDir(from);
    if (fs.existsSync(mark)) {
      await fs.emptyDir(to);
      await fs.copy(from, to);
    }
  } catch (e) {
    console.error(e);
    console.warn('An error occurred copying files to "server/front".' +
      ' You could do this manually. ');
  }
})();
