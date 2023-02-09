import React from "react";
import { Button, Spin, notification, Modal, Input, Form } from "antd";
import "./Welcome.scss";

interface props {
    setUsername: React.Dispatch<React.SetStateAction<string>>;
}

const Welcome = ({ setUsername }: props): JSX.Element => {
    const setName = ({username}: {username:string}) => {
        setUsername(username)
    };

    return (
        <div className="welcome-container">
            <h1>Black Jack</h1>
            <Form className="form-container" onFinish={setName}>
                <div className="form-text">Please enter your name:</div>
                <Form.Item name="username">
                    <Input className="app-input" placeholder="Your name.." />
                </Form.Item>
                <Form.Item>
                    <Button className="app-btn" type="primary" size="large" htmlType="submit">
                        Let's Start!
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Welcome;
