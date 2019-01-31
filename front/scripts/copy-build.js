const fs = require('fs-extra');
const path = require('path');

(async () => {
  const from = path.resolve(__dirname, '../build');
  const to = path.resolve(__dirname, '../../server/front');
  try {
    await fs.ensureDir(from);
    await fs.emptyDir(to);
    await fs.copy(from, to);
  } catch (e) {
    console.error(e);
    console.warn('An error occurred copying files to "server/front". You could do this manually. ');
  }
})();