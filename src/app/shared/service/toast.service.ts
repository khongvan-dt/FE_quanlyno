import Swal, { SweetAlertIcon } from 'sweetalert2';

export class Toast {
  constructor(typeIcon: SweetAlertIcon, timerProgressBar: boolean = false) {
      Swal.fire({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          icon: typeIcon,
          timerProgressBar,
          timer: 10000,
          title: typeIcon === 'success' ? 'Thêm dữ liệu thành công' : 'Error occurred',
      });
  }
}


