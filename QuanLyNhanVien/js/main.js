// Tạo danh sách nhân viên
var dsnv = new DanhSachNhanVien();

var validation = new Validation();

function getEle(id) {
  return document.getElementById(id);
}

getLocalStorage();
/**
 *  Thêm nhân viên mới
 */

function layDuLieuDauVao(isAdd) {
  var _taiKhoan = getEle("tknv").value;
  var _tenNV = getEle("name").value;
  var _email = getEle("email").value;
  var _matKhau = getEle("password").value;
  var _ngayLam = getEle("datepicker").value;
  var _luongCB = getEle("luongCB").value;
  var _chucVu = getEle("chucvu").value;
  var _gioLam = getEle("gioLam").value;

  // isValid là true => cho phép thêm sinh viên
  var isValid = true;

  // kiểm tra validation cho input
  if (isAdd) {
    isValid &=
      validation.kiemTraRong(
        _taiKhoan,
        "tbTKNV",
        "(*) Tài Khoản Không Được Để Trống!!!"
      ) &&
      validation.kiemTraDoDaiKyTu(
        _taiKhoan,
        "tbTKNV",
        "(*) Độ Dài Ký Tự Từ 4-6!!!",
        4,
        6
      ) &&
      validation.kiemTraTaiKhoanTrung(
        _taiKhoan,
        "tbTKNV",
        "(*) Tài Khoản Nhân Viên Đã Tồn Tại!!!",
        dsnv.list
      );
  }

  isValid &=
    validation.kiemTraRong(
      _tenNV,
      "tbTen",
      "(*) Tên Nhân Viên Không Được Để Trống!!!"
    ) &&
    validation.kiemTraKyTuChuoi(
      _tenNV,
      "tbTen",
      "(*) Tên Nhân Viên Phải Là Chữ !!!"
    );

  isValid &=
    validation.kiemTraRong(
      _email,
      "tbEmail",
      "(*) Email Nhân Viên Không Được Để Trống!!!"
    ) &&
    validation.kiemTraEmail(
      _email,
      "tbEmail",
      "(*) Email Không Dúng Định Dạng!!!"
    );

  isValid &=
    validation.kiemTraRong(
      _matKhau,
      "tbMatKhau",
      "(*) Mật Khẩu Nhân Viên Không Được Để Trống!!!"
    ) &&
    validation.kiemTraMatKhau(
      _matKhau,
      "tbMatKhau",
      "(*) Mật Khẩu Không Đúng Định Dạng!!!",
      6,
      10
    );

  isValid &= validation.kiemTraRong(
    _ngayLam,
    "tbNgay",
    "(*) Ngày Làm Không Được Để Trống!!!"
  );

  isValid &=
    validation.kiemTraRong(
      _luongCB,
      "tbLuongCB",
      "(*) Lương Căn Bản Không Được Để Trống!!!"
    ) &&
    validation.kiemTraLuong(
      _luongCB,
      "tbLuongCB",
      "(*) Lương Căn Bản Không Đúng!!!"
    );

  isValid &= validation.kiemTraChucVu(
    "chucvu",
    "tbChucVu",
    "(*) Hãy Chọn Chức Vụ!!!"
  );

  isValid &=
    validation.kiemTraRong(
      _gioLam,
      "tbGiolam",
      "(*) Giờ Làm Không Được Để Trống!!!"
    ) &&
    validation.kiemTraGioLam(
      _gioLam,
      "tbGiolam",
      "(*) Giờ Làm Phải Từ 80h-200h!!!"
    );

  if (isValid) {
    var nhanVien = new NhanVien(
      _taiKhoan,
      _tenNV,
      _email,
      _matKhau,
      _ngayLam,
      _luongCB,
      _chucVu,
      _gioLam
    );
    return nhanVien;
  }
  return null;
}

getEle("btnThemNV").addEventListener("click", function (event) {
  // Chặn trang web load lại
  event.preventDefault();

  var nhanVien = layDuLieuDauVao(true);

  // kiểm tra thông tin hợp lệ
  if (nhanVien) {
    nhanVien.luong();
    nhanVien.xepLoaiNhanVien();
    dsnv.themNhanVien(nhanVien);
    taoBang(dsnv.list);
    setLocalStorage();
  }
});

function taoBang(arr) {
  //reset tbody
  getEle("tableDanhSach").innerHTML = "";

  for (var i = 0; i < arr.length; i++) {
    // Tạo dòng
    var tagTR = document.createElement("tr");

    // Tạo cột
    var tagTD_TaiKhoan = document.createElement("td");
    var tagTD_TenNV = document.createElement("td");
    var tagTD_Email = document.createElement("td");
    var tagTD_NgayLam = document.createElement("td");
    var tagTD_ChucVu = document.createElement("td");
    var tagTD_TongLuong = document.createElement("td");
    var tagTD_XepLoai = document.createElement("td");
    var tagTD_Button_Edit = document.createElement("td");
    var tagTD_Button_Delete = document.createElement("td");

    // Tạo nội dung cho cột
    tagTD_TaiKhoan.innerHTML = arr[i].taiKhoan;
    tagTD_TenNV.innerHTML = arr[i].tenNV;
    tagTD_Email.innerHTML = arr[i].email;
    tagTD_NgayLam.innerHTML = arr[i].ngayLam;
    tagTD_ChucVu.innerHTML = arr[i].chucVu;
    tagTD_TongLuong.innerHTML = arr[i].tongLuong;
    tagTD_XepLoai.innerHTML = arr[i].xepLoai;
    tagTD_Button_Edit.innerHTML =
      '<button class="btn btn-primary" data-toggle="modal" data-target="#myModal"onclick="suaNhanVien(\'' +
      arr[i].taiKhoan +
      "')\">Sửa</button>";
    tagTD_Button_Delete.innerHTML =
      '<button class="btn btn-danger" onclick="xoaNhanVien(\'' +
      arr[i].taiKhoan +
      "')\">Xóa</button>";
    // appenchild cột vào dòng
    tagTR.appendChild(tagTD_TaiKhoan);
    tagTR.appendChild(tagTD_TenNV);
    tagTR.appendChild(tagTD_Email);
    tagTR.appendChild(tagTD_NgayLam);
    tagTR.appendChild(tagTD_ChucVu);
    tagTR.appendChild(tagTD_TongLuong);
    tagTR.appendChild(tagTD_XepLoai);
    tagTR.appendChild(tagTD_Button_Edit);
    tagTR.appendChild(tagTD_Button_Delete);
    // appenchild dòng vào tbody
    getEle("tableDanhSach").appendChild(tagTR);
  }
}

/**
 *  Xóa nhân Viên
 */
function xoaNhanVien(taiKhoan) {
  dsnv._xoaNhanVien(taiKhoan);
  taoBang(dsnv.list);
  setLocalStorage();
}

/**
 *  Sửa nhân viên
 */
function suaNhanVien(taiKhoan) {
  var nhanVien = dsnv._layThongTinNhanVien(taiKhoan);

  // Mở lại btnCapNhap
  getEle("btnCapNhat").style.display = "inline-block";

  getEle("tknv").value = nhanVien.taiKhoan;
  getEle("tknv").disabled = true;
  getEle("name").value = nhanVien.tenNV;
  getEle("email").value = nhanVien.email;
  getEle("password").value = nhanVien.matKhau;
  getEle("datepicker").value = nhanVien.ngayLam;
  getEle("luongCB").value = nhanVien.luongCB;
  getEle("chucvu").value = nhanVien.chucVu;
  getEle("gioLam").value = nhanVien.gioLam;
}

/**
 *  Cập nhật nhân viên
 */
getEle("btnCapNhat").addEventListener("click", function () {
  var nhanVien = layDuLieuDauVao(false);
  nhanVien.luong();
  nhanVien.xepLoaiNhanVien();
  dsnv._capNhatSinhVien(nhanVien);
  taoBang(dsnv.list);
  setLocalStorage();
});

/**
 *  Reset
 */
getEle("btnReset").addEventListener("click", function () {
  getEle("formNV").reset();
  getEle("btnCapNhat").style.display = "none";
  getEle("tknv").disabled = false;

  // reset ERR
  getEle("tbTKNV").innerHTML = "";
  getEle("tbTKNV").className = "";
  getEle("tbTen").innerHTML = "";
  getEle("tbTen").className = "";
  getEle("tbEmail").innerHTML = "";
  getEle("tbEmail").className = "";
  getEle("tbMatKhau").innerHTML = "";
  getEle("tbMatKhau").className = "";
  getEle("tbNgay").innerHTML = "";
  getEle("tbNgay").className = "";
  getEle("tbLuongCB").innerHTML = "";
  getEle("tbLuongCB").className = "";
  getEle("tbChucVu").innerHTML = "";
  getEle("tbChucVu").className = "";
  getEle("tbGiolam").innerHTML = "";
  getEle("tbGiolam").className = "";
});

/**
 *  Tìm nhân viên
 */
getEle("searchName").addEventListener("keyup", function () {
  var keyWord = getEle("searchName").value;
  var mangTimKiem = dsnv._timKiemNhanVien(keyWord);
  taoBang(mangTimKiem);
});

function setLocalStorage() {
  var arrString = JSON.stringify(dsnv.list);
  localStorage.setItem("DSNV", arrString);
}

function getLocalStorage() {
  if (localStorage.getItem("DSNV")) {
    var data = localStorage.getItem("DSNV");
    dsnv.list = JSON.parse(data);
    taoBang(dsnv.list);
  }
}
