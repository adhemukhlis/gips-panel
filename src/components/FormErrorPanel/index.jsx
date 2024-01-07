import { Alert, Button, Modal } from 'antd'

const FormErrorPanel = ({ errorData = [] }) => {
	const [modal, contextHolder] = Modal.useModal()
	const handleShowDetail = (errors) => {
		modal.error({
			title: 'Error Detail',
			closable: true,
			maskClosable: true,
			okButtonProps: { style: { display: 'none' } },
			content: (
				<ul>
					{(errors || []).map((item, index) => (
						<li key={index}>{item}</li>
					))}
				</ul>
			)
		})
	}
	return (
		<>
			{errorData.length > 0 ? (
				errorData.map((error, index) => {
					return (
						<Alert
							key={index}
							message={error.message}
							type="error"
							showIcon
							{...((error.errors || []).length > 0
								? {
										action: (
											<Button size="small" type="text" onClick={() => handleShowDetail(error.errors)}>
												Detail
											</Button>
										)
									}
								: {})}
						/>
					)
				})
			) : (
				<></>
			)}
			{contextHolder}
		</>
	)
}
export default FormErrorPanel
