const mongoose = require("mongoose");
const Product = require("../ExpressJS01/src/models/product"); // đường dẫn đến file bạn vừa định nghĩa Product

// 🔹 Kết nối MongoDB
mongoose.connect("mongodb+srv://mytamhuynhhmt_db_user:UJkiLS6MYJRRP6ls@cluster0.0diem0y.mongodb.net/BT3_FullStackNodeJS01?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const sampleProducts = [
  {
    title: "Thức ăn cho chó Pedigree",
    price: 200000,
    category: "Thức ăn",
    image: "https://cunyeushop.vn/cdn/images/202211/goods_img/pate-pedigree-cho-cho-du-vi-goi-80g-G5559-1667983142447.png",
  },
  {
    title: "Sữa tắm cho mèo Me-o",
    price: 150000,
    category: "Chăm sóc",
    image: "https://cunyeushop.vn/cdn/images/202211/goods_img/pate-pedigree-cho-cho-du-vi-goi-80g-G5559-1667983142447.png",
  },
  {
    title: "Đồ chơi xương cao su cho chó",
    price: 50000,
    category: "Đồ chơi",
    image: "https://cunyeushop.vn/cdn/images/202211/goods_img/pate-pedigree-cho-cho-du-vi-goi-80g-G5559-1667983142447.png",
  },
  {
    title: "Cát vệ sinh cho mèo CatSand",
    price: 120000,
    category: "Phụ kiện",
    image: "https://cunyeushop.vn/cdn/images/202211/goods_img/pate-pedigree-cho-cho-du-vi-goi-80g-G5559-1667983142447.png",
  },
  {
    title: "Chuồng nuôi hamster mini",
    price: 300000,
    category: "Chuồng trại",
    image: "https://cunyeushop.vn/cdn/images/202211/goods_img/pate-pedigree-cho-cho-du-vi-goi-80g-G5559-1667983142447.png",
  },
  {
    title: "Vòng cổ da cho chó mèo",
    price: 80000,
    category: "Phụ kiện",
    image: "https://cunyeushop.vn/cdn/images/202211/goods_img/pate-pedigree-cho-cho-du-vi-goi-80g-G5559-1667983142447.png",
  },
  {
    title: "Thức ăn cho mèo Whiskas",
    price: 220000,
    category: "Thức ăn",
    image: "https://cunyeushop.vn/cdn/images/202211/goods_img/pate-pedigree-cho-cho-du-vi-goi-80g-G5559-1667983142447.png",
  },
  {
    title: "Thuốc nhỏ gáy diệt ve rận cho chó mèo",
    price: 180000,
    category: "Chăm sóc",
    image: "https://cunyeushop.vn/cdn/images/202211/goods_img/pate-pedigree-cho-cho-du-vi-goi-80g-G5559-1667983142447.png",
  },
];

async function seedDB() {
  try {
    await Product.deleteMany(); // xóa hết dữ liệu cũ
    await Product.insertMany(sampleProducts);
    console.log("✅ Dữ liệu mẫu đã được thêm thành công!");
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Lỗi khi seed data:", err);
  }
}

seedDB();
