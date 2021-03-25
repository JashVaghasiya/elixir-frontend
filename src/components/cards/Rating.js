import React from 'react'
import { Card, Avatar } from 'antd';

const { Meta } = Card;

const Rating = () => {
    return (
        <div>
            <Card
                style={{ width: 300 }}
            >
                <Meta
                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title="Card title"
                    description="This is the description"

                />
                <hr />
                <p>this is very good product to buy and i am satisfy by buying this.</p>
            </Card>
        </div>
    )
}

export default Rating
