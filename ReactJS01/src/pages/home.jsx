import { CrownOutlined } from "@ant-design/icons";
import { Result } from "antd";

const HomePage = () => {
    return (
        <div style={{ padding: 20 }}>
            <Result
                icon={<CrownOutlined />}
                title="Welcome to ReactJS - NodeJS Fullstack"
                subTitle="This is the home page"
            />
        </div>
    );
}

export default HomePage;