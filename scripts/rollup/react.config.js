import { getPackageJSON, resolvePkgPath, getBaseRollupPlugins } from './utils';
import generatePackageJSON from 'rollup-plugin-generate-package-json';

const { name, module } = getPackageJSON('react');
// 包路径
const pkgPath = resolvePkgPath(name);
// 产物路径
const pkgDistPath = resolvePkgPath(name, true);

export default [
	// react
	{
		input: `${pkgPath}/${module}`,
		output: {
			file: `${pkgDistPath}/index.js`,
			name: 'React',
			format: 'umd'
		},
		plugins: [
			...getBaseRollupPlugins(),
			generatePackageJSON({
				inputFolder: pkgPath,
				outputFolder: pkgDistPath,
				baseContents: ({ name, description, version }) => ({
					name,
					description,
					version,
					main: 'index.js'
				})
			})
		]
	},
	// jsx
	{
		input: `${pkgPath}/src/jsx.ts`,
		output: [
			/*jsx-runtime*/
			{
				file: `${pkgDistPath}/jsx-runtime.js`,
				name: 'jsx-runtime',
				format: 'umd'
			},
			/*jsx-dev-runtime*/
			{
				file: `${pkgDistPath}/jsx-dev-runtime.js`,
				name: 'jsx-dev-runtime',
				format: 'umd'
			}
		],
		plugins: getBaseRollupPlugins()
	}
];
