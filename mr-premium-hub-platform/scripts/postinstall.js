const { execSync } = require('child_process');
const os = require('os');
const path = require('path');

try {
  require('lightningcss');
  console.log('✓ lightningcss is already installed');
} catch (e) {
  console.log('⚠ lightningcss not found, installing platform-specific version...');
  
  const platform = os.platform();
  const arch = os.arch();
  
  let pkg = 'lightningcss';
  if (platform === 'linux') {
    pkg += '-linux-x64-gnu';
  } else if (platform === 'darwin') {
    pkg += arch === 'arm64' ? '-darwin-arm64' : '-darwin-x64';
  } else if (platform === 'win32') {
    pkg += arch === 'arm64' ? '-win32-arm64-msvc' : '-win32-x64-msvc';
  }
  
  try {
    execSync(`npm install ${pkg} --no-save --legacy-peer-deps`, {
      stdio: 'inherit',
      cwd: path.resolve(__dirname, '..')
    });
    console.log(`✓ Successfully installed ${pkg}`);
  } catch (installError) {
    console.error(`✗ Failed to install ${pkg}:`, installError.message);
    process.exit(1);
  }
}

