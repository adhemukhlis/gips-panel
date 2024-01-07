import { SettingOutlined, CoffeeOutlined } from '@ant-design/icons'

/**
 * key === path page without trailing slash, check window.location.pathname
 */

const menus = [
	{
		key: '/',
		label: 'Dashboard',
		icon: <CoffeeOutlined />
	},
	{
		key: '/config',
		label: 'Config',
		icon: <SettingOutlined />
	}
]

export default menus
