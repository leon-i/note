import React from 'react';
import { Row, Col, Card } from 'antd';

const LoadingPost : React.FC = () => (
    <Row>
        <Col span={16}>
            <Card className="post-item" loading={true}>
                '...'
            </Card>
        </Col>
    </Row>
);

export default LoadingPost;