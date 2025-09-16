import { Row, Col, Empty } from "antd";
import ProductCard from "../components/productCart";

export default function ProductList({ products }) {
  if (!products || products.length === 0) {
    return <Empty description="Chưa có sản phẩm" />;
  }

  return (
    <Row gutter={[16, 16]}>
      {products.map((p) => (
        <Col key={p._id} xs={24} sm={12} md={8} lg={6}>
          <ProductCard product={p} />
        </Col>
      ))}
    </Row>
  );
}
