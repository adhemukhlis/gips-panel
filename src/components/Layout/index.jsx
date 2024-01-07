import { Layout, Menu, theme } from 'antd'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import menus from '@/configs/menu'
import asyncLocalStorage from '@/utils/async-local-storage'

const { Content, Sider } = Layout
const LayoutComponent = ({ children }) => {
	const [collapsed, setCollapsed] = useState(true)
	const router = useRouter()
	const {
		token: { colorBgContainer }
	} = theme.useToken()

	const currentPath = router.pathname

	const handleSelectMenu = (menu) => {
		if ('key' in menu && !!menu?.key) {
			router.push(menu.key)
		}
	}
	const collapsedHandler = (value) => {
		setCollapsed(value)
		asyncLocalStorage.setItem('_sc', value)
	}
	useEffect(() => {
		asyncLocalStorage.getItem('_sc').then((res) => {
			setCollapsed(JSON.parse(res ?? 'true'))
		})
	}, [])
	return (
		<>
			<Layout
				style={{
					minHeight: '100vh'
				}}
				hasSider>
				<Sider
					collapsible
					width={250}
					style={{
						backgroundColor: colorBgContainer
					}}
					collapsed={collapsed}
					onCollapse={collapsedHandler}>
					<div
						style={{
							height: collapsed ? 100 : 40,
							margin: 16,
							background: colorBgContainer,
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center'
						}}>
						<Image
							src="/_assets/images/logo.png"
							width={40}
							height={40}
							alt="logo"
							{...(collapsed
								? {
										style: {
											transform: 'rotate(-90deg)',
											transition: 'transform 0.2s ease'
										}
									}
								: {
										style: {
											transform: 'rotate(0deg)',
											transition: 'transform 0.2s ease'
										}
									})}
						/>
					</div>
					<Menu theme="light" defaultSelectedKeys={[currentPath]} mode="inline" items={menus} onSelect={handleSelectMenu} />
				</Sider>
				<Layout>
					<Content
						style={{
							margin: '1rem',
							minHeight: 'calc(100vh-2rem)' // minHeight = heigh of screen - (margin top + margin bottom)
						}}>
						<div
							style={{
								padding: 24,
								height: '100%',
								background: colorBgContainer
							}}>
							{children}
						</div>
					</Content>
				</Layout>
			</Layout>
		</>
	)
}
export default LayoutComponent
