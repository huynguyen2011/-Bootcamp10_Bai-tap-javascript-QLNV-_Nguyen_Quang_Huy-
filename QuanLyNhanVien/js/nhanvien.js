// Tạo lớp đối tượng nhân viên
function NhanVien(
  _taiKhoan,
  _tenNV,
  _email,
  _matKhau,
  _ngayLam,
  _luongCB,
  _chucVu,
  _gioLam
) {
  // Hàm khởi tạo thuộc tính & phương thức
  this.taiKhoan = _taiKhoan;
  this.tenNV = _tenNV;
  this.email = _email;
  this.matKhau = _matKhau;
  this.ngayLam = _ngayLam;
  this.luongCB = _luongCB;
  this.chucVu = _chucVu;
  this.gioLam = _gioLam;
  this.tongLuong = 0;
  this.xepLoai = 0;

  this.luong = function () {
    if (this.chucVu == "Sếp") {
      this.tongLuong = parseFloat(this.luongCB) * 3;
    }
    if (this.chucVu == "Trưởng phòng") {
      this.tongLuong = parseFloat(this.luongCB) * 2;
    }
    if (this.chucVu == "Nhân viên") {
      this.tongLuong = parseFloat(this.luongCB);
    }
    console.log(this.tongLuong);
    return this.tongLuong;
  };

  this.xepLoaiNhanVien = function () {
    if (this.gioLam >= 192) {
      this.xepLoai = "Nhân Viên Xuất Sắc";
    } else if (this.gioLam >= 176) {
      this.xepLoai = "Nhân Viên Giỏi";
    } else if (this.gioLam >= 160) {
      this.xepLoai = "Nhân Viên Khá";
    } else if (this.gioLam < 160) {
      this.xepLoai = "Nhân Viên Trung Bình";
    }
    return this.xepLoai;
  };
}
