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
  
        })
      );
    }
    Toast() {
      const toast = Swal.mixin({
        toast: true,
        position:'bottom-end',
        showConfirmButton: true,
        timer: 2500,
        timerProgressBar: true,
        confirmButtonText: '되돌리기',
        onOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      });
      return(
        toast.fire({
          icon: 'success',
          title: '고생했어요'
        }).then(result => {
          if(result) {}
        })
      );
    }
}

export default SwAlert;