import { Button, Form, Input, Select, Space, Typography, message } from 'antd'
import axios from 'axios'
import { useState, useEffect } from 'react'
import asyncLocalStorage from '@/utils/async-local-storage'

const { Title } = Typography

const ConfigPage = () => {
	const [form] = Form.useForm()
	const [isLoading, setIsLoading] = useState(false)
	const [testLoading, setTestLoading] = useState(false)
	const [messageApi, messageContext] = message.useMessage()
	const [config, setConfig] = useState({ base_url: '', uid: '', code: '' })
	const handleTestConnection = async () => {
		setTestLoading(true)
		return await axios
			.request({
				baseURL: config.base_url,
				method: 'POST',
				url: `/command`,
				params: {
					uid: config.uid,
					code: config.code
				},
				data: {
					cmd: 'scoin 1'
				}
			})
			.then((res) => {
				if (res.status === 200) {
					messageApi.success('config url valid!')
				}
			})
			.catch(() => {
				messageApi.error('config url invalid!')
			})
			.finally(() => {
				setTestLoading(false)
			})
	}
	const handleSubmit = async (values) => {
		setIsLoading(true)
		const { base_url, uid, code } = values
		asyncLocalStorage.setItem('config', JSON.stringify({ base_url, uid: Number(uid), code: Number(code) })).then(() => {
			messageApi.success('config saved!')
			setConfig({ base_url, uid, code })
			setIsLoading(false)
		})
	}
	useEffect(() => {
		asyncLocalStorage.getItem('config').then((res) => {
			const _config = JSON.parse(res)
			form.setFieldsValue(_config ?? config)
			setConfig((prev) => _config ?? prev)
		})
	}, [])
	const BASE_URLs = [
		{
			label: 'Active',
			options: [
				{
					label: 'SG1',
					value: 'https://ps.yuuki.me/api/v2/server/sg1sg1-giomain'
				}
			]
		},
		{
			label: 'Inactive',
			options: []
		}
	]
	return (
		<>
			<Title level={3}>Users</Title>
			<Form
				size="large"
				form={form}
				onFinish={handleSubmit}
				autoComplete="off"
				layout="vertical"
				colon={false}
				style={{
					width: '100%'
				}}>
				<Form.Item
					name="base_url"
					label="Base URL"
					rules={[
						{
							required: true,
							type: 'url'
						}
					]}>
					<Select options={BASE_URLs} />
				</Form.Item>
				<Form.Item
					name="uid"
					label="UID"
					rules={[
						{
							required: true
						}
					]}>
					<Input />
				</Form.Item>
				<Form.Item
					name="code"
					label="Code"
					rules={[
						{
							required: true
						}
					]}>
					<Input.Password />
				</Form.Item>
				<Form.Item>
					<Space>
						<Button type="primary" htmlType="submit" loading={isLoading}>
							Save
						</Button>
						<Button
							onClick={handleTestConnection}
							loading={testLoading}
							disabled={!config?.base_url || !config?.uid || !config?.code}>
							Test Connection
						</Button>
					</Space>
				</Form.Item>
			</Form>
			{messageContext}
		</>
	)
}

export default ConfigPage

// export const getServerSideProps = withSession(async ({ req, query }) => {
// 	const accessToken = req.session?.auth?.accessToken
// 	const isLoggedIn = !!accessToken
// 	const validator = [isLoggedIn]
// 	let listUser = []
// 	const queryMerge = { ...query }
// 	const errors = []
// 	if (![isLoggedIn].includes(false)) {
// 		await axios
// 			.request({
// 				method: 'GET',
// 				baseURL: 'http://' + req.headers.host,
// 				url: '/api/users',
// 				headers: req?.headers?.cookie ? { cookie: req.headers.cookie } : undefined,
// 				Authorization: `Bearer ${accessToken}`
// 			})
// 			.then((res) => {
// 				listUser = res.data
// 			})
// 	}
// 	return routeGuard(validator, '/', {
// 		props: { query: queryMerge, errors, listUser }
// 	})
// })
