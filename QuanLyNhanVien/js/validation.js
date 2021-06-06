function Validation() {
  this.kiemTraRong = function (input, divId, mess) {
    if (input.trim() === "") {
      getEle(divId).innerHTML = mess;
      getEle(divId).className = "alert alert-danger";
      return false;
    } else {
      getEle(divId).innerHTML = "";
      getEle(divId).className = "";
      return true;
    }
  };

  this.kiemTraDoDaiKyTu = function (input, divId, mess, min, max) {
    if (input.length >= min && input.length <= max) {
      getEle(divId).innerHTML = "";
      getEle(divId).className = "";
      return true;
    } else {
      getEle(divId).innerHTML = mess;
      getEle(divId).className = "alert alert-danger";
      return false;
    }
  };

  this.kiemTraKyTuChuoi = function (input, divId, mess) {
    var letter =
      "^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹsW|_]+$";
    if (input.match(letter)) {
      getEle(divId).innerHTML = "";
      getEle(divId).className = "";
      return true;
    } else {
      getEle(divId).innerHTML = mess;
      getEle(divId).className = "alert alert-danger";
      return false;
    }
  };
  this.kiemTraEmail = function (input, divId, mess) {
    var letter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (input.match(letter)) {
      getEle(divId).innerHTML = "";
      getEle(divId).className = "";
      return true;
    } else {
      getEle(divId).innerHTML = mess;
      getEle(divId).className = "alert alert-danger";
      return false;
    }
  };
  this.kiemTraMatKhau = function (input, divId, mess, min, max) {
    var letter =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;
    if (input.match(letter) && input.length >= min && input.length <= max) {
      getEle(divId).innerHTML = "";
      getEle(divId).className = "";
      return true;
    } else {
      getEle(divId).innerHTML = mess;
      getEle(divId).className = "alert alert-danger";
      return false;
    }
  };
  this.kiemTraLuong = function (input, divId, mess) {
    if (input >= 1000000 && input <= 20000000) {
      getEle(divId).innerHTML = "";
      getEle(divId).className = "";
      return true;
    } else {
      getEle(divId).innerHTML = mess;
      getEle(divId).className = "alert alert-danger";
      return false;
    }
  };
  this.kiemTraChucVu = function (idSelect, divId, mess) {
    if (getEle(idSelect).selectedIndex != 0) {
      getEle(divId).innerHTML = "";
      getEle(divId).className = "";
      return true;
    } else {
      getEle(divId).innerHTML = mess;
      getEle(divId).className = "alert alert-danger";
      return false;
    }
  };
  this.kiemTraGioLam = function (input, divId, mess) {
    if (input >= 80 && input <= 200) {
      getEle(divId).innerHTML = "";
      getEle(divId).className = "";
      return true;
    } else {
      getEle(divId).innerHTML = mess;
      getEle(divId).className = "alert alert-danger";
      return false;
    }
  };
  this.kiemTraTaiKhoanTrung = function (input, divId, mess, arr) {
    var status = true;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].taiKhoan === input) {
        status = false;
        break;
      }
    }
    if (status) {
      getEle(divId).innerHTML = "";
      getEle(divId).className = "";
      return true;
    }
    getEle(divId).innerHTML = mess;
    getEle(divId).className = "alert alert-danger";
    return false;
  };
}
