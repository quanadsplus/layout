import Swal from "sweetalert2";
const alert = {
    getAlert: (title,icon,showConfirmButton = true) => {
        Swal.fire({
            title: title,
            icon: icon,
            showConfirmButton: showConfirmButton,
            timer: 1500
        });
    }
}

export default alert