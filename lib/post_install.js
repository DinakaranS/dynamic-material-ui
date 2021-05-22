// adapted based on rackt/history (MIT)
// Node 0.10+
let execSync = require('child_process').execSync;
const stat = require('fs').stat;

// Node 0.10 check
if (!execSync) {
  // eslint-disable-next-line global-require
  execSync = require('sync-exec');
}

function exec(command) {
  execSync(command, {
    stdio: [0, 1, 2]
  });
}

// eslint-disable-next-line no-shadow
stat('dist-modules', function (error, stat) {
  // Skip building on Travis
  if (process.env.TRAVIS) {
    return;
  }

  if (error || !stat.isDirectory()) {
    exec('npm i @babel/cli @babel/core @babel/preset-env @babel/preset-react');
    exec('npm run dist:modules');
  }
});
