import React, { useEffect, useState } from 'react'
import { Steps } from 'antd';
const { Step } = Steps;

const StatusBar = ({ status }) => {

    const [active, setActive] = useState('')

    useEffect(() => {
        window.scrollTo(0, 0)
        setActive(document.getElementById(status))
    }, [status])


    if ((status && status) && (active && active)) {
        active.classList.add("active-step")
        if (status === 'Packed') {
            document.getElementById('Pending').classList.add("active-step")
        }
        if (status === 'Shipped') {
            document.getElementById('Packed').classList.add("active-step")
        }
        if (status === 'Delivered') {
            document.getElementById('Shipped').classList.add("active-step")
        }
    }

    return (
        <>
            <Steps type="navigation" responsive={true} size="small">
                <Step title="Pending" id="Pending" icon={<i class="fas fa-tasks"></i>} />
                <Step title="Packed" id="Packed" icon={<i class="fas fa-box"></i>} />
                <Step title="Shipped" id="Shipped" icon={<i class="fas fa-shipping-fast"></i>} />
                <Step title="Delivered" id="Delivered" icon={<i class="fas fa-truck-loading"></i>} />
            </Steps>
        </>
    )
}

export default StatusBar
