const spawn = require('child_process').spawn;
const ls = spawn('ls', ['-lh', '/usr']);

ls.stdout.on('data', (data) => {
	console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
	console.log(`stderr: ${data}`);
});

ls.on('close', (code) => {
	console.log(`child process exited with code ${code}`);
});

// child_process.exec
const exec = require('child_process').exec;
exec('cat *.js | wc -l', (error, stdout, stderr) => {
	if (error) {
		console.error(`exec error: ${error}`);
		return;
	}
	console.log(`stdout: ${stdout}`);
	console.log(`stderr: ${stderr}`);
});

// child_process.execFile
const execFile = require('child_process').execFile;
const child = execFile('node', ['--version'], (error, stdout, stderr) => {
if (error) throw error;
console.log(stdout);
});

// child_process.spawn


// classs: ChildProcess
//const spawn = require('child_process').spawn;
const grep = spawn('grep', ['ss']);

console.log(typeof grep);

grep.on('close', (code, signal) => {
	console.log(`child process terminated dur to receipt of signal ${signal}`);
});

grep.kill('SIGHUP');

