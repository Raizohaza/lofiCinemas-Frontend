## Demo
https://www.youtube.com/watch?v=6wAY9auoT4g
## Install
### Cài đặt NodeJS + npm
	truy cập trang chủ của nodejs (https://nodejs.org/en/) tải về và cài đặt
	Lệnh node -v để kiếm tra phiên bản của NodeJS
	Lệnh npm -v để kiểm tra phiên bản của npm
### Git clone
	https://github.com/Raizohaza/ProjectWeb2-Frontend
	https://github.com/Raizohaza/ProjectWeb2-Backend
### Cài đặt các packages:
	Frontend:yarn
	Backend:npm install
### Tạo một database để lưu dữ liệu cho app
	vào file: models\db.js
	thay connectionString ở dòng   14(vd:'postgres://postgres:1@localhost:5432/Cineplex')
### Thêm biến môi trường
	tại __dirname tạo 1 file mới tên .env với nội dung:
		APP_URL = "http://localhost:3000"
		APP_BACK_URL = "http://localhost:5000"

### Chạy seeders
	bật terminal và nhập node seeders/
### Chạy app
	Frontend:yarn start
	Backend:npm run dev
