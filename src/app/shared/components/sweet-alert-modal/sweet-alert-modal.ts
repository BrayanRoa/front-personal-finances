import Swal from "sweetalert2";

interface modal {
    title: string;
    text: string;
    icon: 'warning' | 'success' | 'error' | 'info' | 'question';
    confirmButtonText: string;

}

export function showModal(option: modal) {
    return Swal.fire({
        title: option.title,
        text: option.text,
        icon: option.icon,
        showCancelButton: false,
        confirmButtonText: option.confirmButtonText,
        allowOutsideClick: false // Evita cerrar el modal al hacer clic fuera
    });
}


export function confirmDelete(): Promise<boolean> {
    return Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!"
    }).then((result) => {
        return result.isConfirmed; // Devuelve true si el usuario confirma, false si cancela
    });
}

