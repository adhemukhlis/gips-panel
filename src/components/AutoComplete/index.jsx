/**
 * AutoComplete
 * @param {string} url next/api endpoint to get options data
 * @param {string} paramName param name of request
 * @param {string} responsePath response data location contain array options
 * @param {string} valuePropName property name of the response used to adjust options item value
 * @param {string} labelPropName property name of the response used to adjust options item label
 * example : <MainAutoComplete url= '/api/property/get-all-property' paramName='property_name' valuePropName='name' labelPropName='name'/>
 */
import { AutoComplete, Input, Spin } from 'antd'
import axios from 'axios'
import { debounce, get } from 'lodash'
import React, { useCallback, useState } from 'react'
const MainAutoComplete = ({
	url = '',
	responsePath = 'data.data',
	valuePropName = 'id',
	labelPropName = 'name',
	paramName = 'name',
	placeholder,
	onChange,
	...other
}) => {
	const [options, setOptions] = useState([])
	const [fetching, setFetching] = useState(false)
	const [inputValue, setInputValue] = useState('')
	const [selected, setSelected] = useState('')
	const debounceSearch = useCallback(
		debounce(async (value) => {
			fetchData(value)
		}, 2000),
		[]
	)

	const onSearch = (value) => {
		setInputValue(value)
		debounceSearch(value)
	}
	const onFocus = () => {
		if (!inputValue && options.length < 1) {
			fetchData()
		}
	}
	const fetchData = (value) => {
		setOptions([])
		setFetching(true)
		axios
			.request({
				method: 'get',
				url: url,
				params: {
					[paramName]: value
				}
			})
			.then((res) => {
				const response = get(res, responsePath, []) || []
				setOptions(
					response.map((item, index) => ({ key: 'ac-' + index, label: item[labelPropName], value: item[valuePropName] }))
				)
			})
			.finally(() => {
				setFetching(false)
			})
	}
	return (
		<>
			<AutoComplete
				{...other}
				options={options}
				onSearch={onSearch}
				onFocus={onFocus}
				onChange={(val) => {
					setSelected(val)
					onChange(val)
				}}
				value={options.find((item) => item.value === selected)?.label}
				allowClear
				notFoundContent={fetching ? <Spin size="small" /> : null}>
				<Input placeholder={placeholder} />
			</AutoComplete>
		</>
	)
}
export default MainAutoComplete
