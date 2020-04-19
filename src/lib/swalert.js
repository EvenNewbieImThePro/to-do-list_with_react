import Swal from 'sweetalert2'
class SwAlert {
    constructor(_title, _text, _icon, _confirmButtonText, _showCancleButton, _cancelButtonText) {
      this.title = _title;
      this.text = _text;
      this.icon = _icon;
      this.confirmButtonText = _confirmButtonText;
      this.showCancelButton = _showCancleButton;
      this.cancelButtonText = _cancelButtonText;
    }
    Alert() {
      return (
        Swal.fire({
          title: this.title,
          text: this.text,
          icon: this.icon,
          confirmButtonText: this.confirmButtonText,
          showCancelButton: this.showCancelButton,
          confirmButtonColor: '#442f4d',
        })
      );
    }
    Toast() {
      const toast = Swal.mixin({
        toast: true,
        position:'top-end',
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
        confirmButtonColor: '442f4d',
        onOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      });
      return(
        toast.fire({
          icon: 'success',
          title: '수고많았어요',
          showConfirmButton: false,
        })
      );
    }
}

export default SwAlert;