import { Card, Button } from "antd";

export default function ProductCard({ product }) {
  return (
    <Card
      hoverable
      cover={
        product.image ? (
          <img
            alt={product.title}
            src={product.image}
            style={{ height: 200, objectFit: "cover" }}
          />
        ) : (
          <div
            style={{
              height: 200,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#f5f5f5",
              color: "#999",
              fontSize: 14,
            }}
          >
            No Image
          </div>
        )
      }
    >
      <Card.Meta
        title={product.title}
        description={
          <>
            <div style={{ fontWeight: "bold", marginBottom: 8 }}>
              {product.price
                ? `${product.price.toLocaleString()} đ`
                : "Liên hệ"}
            </div>
            <div style={{ color: "#888" }}>
              {product.category || "Chưa phân loại"}
            </div>
          </>
        }
      />
      <div style={{ marginTop: 12, textAlign: "center" }}>
        <Button type="primary" block>
          Mua ngay
        </Button>
      </div>
    </Card>
  );
}
