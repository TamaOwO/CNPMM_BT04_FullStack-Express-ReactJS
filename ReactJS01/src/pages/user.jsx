import { notification, Table } from "antd";
import { useEffect, useState } from "react";
import { getUserApi } from "../utils/api";
import { use } from "react";
import { title } from "process";
const UserPage = () => {
    const [dataSource, setDataSource] = useState([]);
    useEffect(() => {
        const fetchUser = async () => {
            const res = await getUserApi();
            if (!res?.message) {
                setDataSource(res);
            } else {
                notification.error({
                    message: "Có lỗi xảy ra",
                    description: res.message,
                });
            }
        }
        fetchUser();
    }, []);
    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Role',
            dataIndex: 'role',
        }
    ];
    return <div style={{ padding: 20 }}>
        <h1>Danh sách người dùng</h1>
        <Table 
            bordered
            dataSource={dataSource} columns={columns} rowKey={"_id"} />
    </div>
}
export default UserPage;