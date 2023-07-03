// @ts-check

/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('node:fs');
const path = require('node:path');

const srcDir = path.join(__dirname, 'src');
const packagesDir = __dirname;
const gitignorePath = path.join(__dirname, '.gitignore');
const packageJsonPath = path.join(__dirname, 'package.json');

// Read the source directory
fs.readdir(srcDir, { withFileTypes: true }, (err, files) => {
	if (err) {
		console.error('Error reading source directory:', err);
		return;
	}

	// Filter out non-directory files
	const directories = files.filter((file) => file.isDirectory());

	// Create a new folder and package.json for each subdirectory in the source directory
	directories.forEach((dir) => {
		const dirName = dir.name;
		const packageDir = path.join(packagesDir, dirName);

		// Create the new folder
		fs.mkdir(packageDir, { recursive: true }, (err) => {
			if (err) {
				console.error(`Error creating directory '${packageDir}':`, err);
				return;
			}

			// Create the package.json file inside the new folder
			const packageJsonContent = JSON.stringify(
				{
					main: `../dist/${dirName}/index.js`,
					module: `../dist/${dirName}/index.esm.js`,
					types: `../dist/${dirName}/index.d.ts`,
				},
				null,
				2
			);

			const packageJsonPath = path.join(packageDir, 'package.json');
			fs.writeFile(packageJsonPath, packageJsonContent, (err) => {
				if (err) {
					console.error(
						`Error creating package.json file in '${packageDir}':`,
						err
					);
					return;
				}
				console.log(`Created '${packageJsonPath}'`);

				// Update .gitignore only if the entry doesn't exist already
				fs.readFile(gitignorePath, 'utf8', (err, data) => {
					if (err) {
						console.error(`Error reading .gitignore file:`, err);
						return;
					}

					// Trim the data to remove leading/trailing whitespace
					const trimmedData = data.trim();

					if (trimmedData === '') {
						fs.appendFile(gitignorePath, `${dirName}/\n`, (err) => {
							if (err) {
								console.error(`Error updating .gitignore file:`, err);
								return;
							}
							console.log(`Updated '.gitignore'`);
						});
					} else if (!trimmedData.includes(`${dirName}/`)) {
						fs.appendFile(gitignorePath, `\n${dirName}/\n`, (err) => {
							if (err) {
								console.error(`Error updating .gitignore file:`, err);
								return;
							}
							console.log(`Updated '.gitignore'`);
						});
					}
				});
			});
		});
	});

	// Update package.json with the specified fields
	fs.readFile(packageJsonPath, 'utf8', (err, data) => {
		if (err) {
			console.error(`Error reading package.json file:`, err);
			return;
		}

		const packageJson = JSON.parse(data);

		// Add the specified fields to package.json
		packageJson.exports = {
			'.': {
				types: './dist/index.d.ts',
				module: './dist/index.esm.js',
				default: './dist/index.js',
			},
			...directories.reduce((acc, dir) => {
				const dirName = dir.name;
				return {
					...acc,
					[`./${dirName}`]: {
						types: `./dist/${dirName}/index.d.ts`,
						module: `./dist/${dirName}/index.esm.js`,
						default: `./dist/${dirName}/index.js`,
					},
				};
			}, {}),
			'./package.json': './package.json',
		};

		packageJson.files = ['dist', ...directories.map((dir) => dir.name)];

		const packageJsonContent = JSON.stringify(packageJson, null, 2) + '\n'; // Add trailing new line

		fs.writeFile(packageJsonPath, packageJsonContent, (err) => {
			if (err) {
				console.error(`Error updating package.json file:`, err);
				return;
			}
			console.log(`Updated 'package.json'`);
		});
	});
});
