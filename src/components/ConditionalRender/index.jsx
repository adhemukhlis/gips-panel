import React from 'react'
const ConditionalRender = ({ children, condition, elseCondition = <></> }) => {
	return <>{condition ? children : elseCondition}</>
}
export default ConditionalRender
