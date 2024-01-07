import { Card, Col, Row, Switch, message } from 'antd'
import axios from 'axios'
import { useEffect, useState } from 'react'
import asyncLocalStorage from '@/utils/async-local-storage'
const space_between = { display: 'flex', justifyContent: 'space-between' }
const Index = () => {
	const [messageApi, messageContext] = message.useMessage()
	const [activeToggles, setActiveToggles] = useState([])
	const [loading, setLoading] = useState([])
	const [config, setConfig] = useState({ base_url: '', uid: '', code: '' })
	useEffect(() => {
		asyncLocalStorage.getItem('config').then((res) => {
			const _config = JSON.parse(res)
			setConfig((prev) => _config ?? prev)
		})
	}, [])
	const handleCommand = async ({ command, name }) => {
		setLoading((prev) => [...prev, name])
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
					cmd: command
				}
			})
			.then((res) => {
				if (res.status === 200) {
					messageApi.success(`[${name}] "${command}" success!`)
				}
			})
			.catch(() => {
				messageApi.error('command failed!')
			})
			.finally(() => {
				setLoading((prev) => prev.filter((item) => item != name))
			})
	}
	const handleToggle = (name, value) => {
		if (value) {
			setActiveToggles((prev) => [...prev, name])
		} else {
			setActiveToggles((prev) => prev.filter((item) => item !== name))
		}
	}
	const handleStaminaToggle = async (checked) => {
		handleCommand({ command: `stamina infinite ${checked ? 'on' : 'off'}`, name: 'stamina' }).then(() => {
			handleToggle('stamina', checked)
		})
	}
	const handleEnergyToggle = (checked) => {
		handleCommand({ command: `energy infinite ${checked ? 'on' : 'off'}`, name: 'energy' }).then(() => {
			handleToggle('energy', checked)
		})
	}
	return (
		<>
			<Row gutter={[24, 24]}>
				<Col span={6}>
					<Card title="In Game">
						<Row gutter={[24, 24]}>
							<Col span={24} style={space_between}>
								Stamina
								<Switch
									checked={activeToggles.includes('stamina')}
									loading={loading.includes('stamina')}
									onChange={handleStaminaToggle}
									checkedChildren="on"
									unCheckedChildren="off"
								/>
							</Col>
							<Col span={24} style={space_between}>
								Energy
								<Switch
									checked={activeToggles.includes('energy')}
									loading={loading.includes('energy')}
									onChange={handleEnergyToggle}
									checkedChildren="on"
									unCheckedChildren="off"
								/>
							</Col>
						</Row>
					</Card>
				</Col>
			</Row>
			{messageContext}
		</>
	)
}
export default Index
export const getServerSideProps = async () => {
	return {
		props: {}
	}
}
