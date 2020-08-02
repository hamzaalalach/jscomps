module.exports = (function() {
	const path = require('path');
	const fs = require('fs');

	return function(importFile) {
		return new Promise((resolve, reject) => {
			if (!fs.existsSync(importFile)) {
				reject('Not a valid file!');
			} else {
				const data = fs.readFileSync(importFile);
				let imports = [];

				for (const line of data.toString().trim().split('\n')) {
					if (!/^import\s["']([a-zA-Z_][a-zA-Z0-9_-]+)["'];?/.test(line)) {
						reject('Imports format error!');
					} else {
						imports.push(RegExp.$1);
					}
				}
				let result = '';
				for (const elem of imports) {
					result += fs.readFileSync(path.resolve(path.dirname(importFile) + '/' + elem) + '.js') + '\n';
				}
				resolve(result);
			}
		});
	};
})();
