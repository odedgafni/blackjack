import React from "react";
import { Button, Spin, notification, Modal, Input, Form } from "antd";
import "./Welcome.scss";

interface props {
    init: (userName?: string) => Promise<void>;
}

const Welcome = ({ init }: props): JSX.Element => {
    const onSubmit = ({ username }: { username: string }) => {
        init(username);
    };

    return (
        <div className="welcome-container">
            <h1>Black <i className="red-color">Jack</i></h1>
            <Form className="form-container" onFinish={onSubmit}>
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
