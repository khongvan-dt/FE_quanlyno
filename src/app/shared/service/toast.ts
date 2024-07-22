import Swal, { SweetAlertIcon } from 'sweetalert2';

export class Toast {
  private typeIcon: SweetAlertIcon;
  private timerProgressBar: boolean;

  constructor(typeIcon: SweetAlertIcon, timerProgressBar: boolean = false) {
    this.typeIcon = typeIcon;
    this.timerProgressBar = timerProgressBar;

    Swal.fire({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      icon: typeIcon,
      timerProgressBar: timerProgressBar,
      timer: 5000,
      title: typeIcon === 'success' ? 'Thêm dữ liệu thành công' : 'Thêm dữ liệu thất bại',
    });
  }

  successDeleted(isSuccess: boolean) {
    Swal.fire({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      icon: isSuccess ? 'success' : 'error',
      timerProgressBar: this.timerProgressBar,
      timer: 5000,
      title: isSuccess ? 'Xóa dữ liệu thành công!' : 'Xóa dữ liệu thất bại!',
    });
  }

  // Hàm xác nhận xóa
  static confirmDelete(): Promise<boolean> {
    return Swal.fire({
      title: 'Bạn có chắc chắn không?',
      text: 'Dữ liệu sẽ bị xóa vĩnh viễn!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Có, xóa!',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      return result.isConfirmed;
    });
  }
}
