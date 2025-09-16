import { Form, Input, Button, Select } from "antd";

const { Option } = Select;

function ProductSearch({ onSearch }) {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    onSearch(values);
  };

  return (
    <Form
      form={form}
      layout="inline"
      onFinish={handleFinish}
      style={{ marginBottom: 16 }}
    >
      {/* Từ khóa */}
      <Form.Item name="keyword">
        <Input placeholder="Tìm kiếm sản phẩm..." allowClear />
      </Form.Item>

      {/* Danh mục */}
      <Form.Item name="category">
        <Select placeholder="Chọn danh mục" allowClear style={{ width: 150 }}>
          <Option value="Phụ kiện">Phụ kiện</Option>
          <Option value="Thức ăn">Thức ăn</Option>
          <Option value="Đồ chơi">Đồ chơi</Option>
          <Option value="Chăm sóc">Chăm sóc</Option>
        </Select>
      </Form.Item>

      {/* Giá từ */}
      <Form.Item name="minPrice">
        <Input type="number" placeholder="Giá từ" />
      </Form.Item>

      {/* Giá đến */}
      <Form.Item name="maxPrice">
        <Input type="number" placeholder="Giá đến" />
      </Form.Item>

      {/* Nút tìm kiếm */}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Tìm kiếm
        </Button>
      </Form.Item>
    </Form>
  );
}

export default ProductSearch;
