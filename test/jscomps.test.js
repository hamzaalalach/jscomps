const util = require('util');
const exec = util.promisify(require('child_process').exec);

test('Should output error if no watch folder provided.', () => {
	return runJSComps('node jscomps').then().catch((data) =>  {
		expect(data.stderr).not.toBe('');
	});
});

test('Should output error if watch folder doesn\'t exist.', () => {
	return runJSComps('node jscomps -f something').then((data) => {
		expect(data.stdout).toBe('Not a valid watch folder.\n');
	}).catch();
});

test('Should import files if watch folder is provided.', () => {
	return runJSComps('node jscomps -f example -w false').then((data) => {
		expect(data.stdout).toBe('Files imported.\n');
	}).catch();
});

const runJSComps = async (command) => {
	return await exec(command);
}