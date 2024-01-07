/** @type {import('next').NextConfig} */
const nextConfig = {
	publicRuntimeConfig: {
		// Will be available on both server and client
		AppName: 'GIPS Panel'
	},
	env: {
		BACKEND_API_HOST: process.env.NEXT_BACKEND_API_HOST,
		SESSION_KEY: process.env.SESSION_KEY
	},
	eslint: {
		dirs: ['.']
	},
	poweredByHeader: false,
	trailingSlash: false,
	transpilePackages: [
		'antd',
		'rc-util',
		'@babel/runtime',
		'@ant-design/icons',
		'@ant-design/icons-svg',
		'rc-pagination',
		'rc-picker',
		'rc-tree',
		'rc-table'
	],
	reactStrictMode: false
}

module.exports = nextConfig
