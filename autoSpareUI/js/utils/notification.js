// Hata veya başarılı işlemlerde mesajı dönerken tasarlayacağımız modal

const Notification = {
    // Hata Modalı
    error: (message, title = 'Hata!') => {
        return window.Swal.fire({
            icon: 'error',
            title: title,
            text: message,
            timer: 2500,
            confirmButtonText: 'Tamam',
            confirmButtonColor: '#f97316',
            backdrop: `rgba(0,0,0,0.8)` 
        });
    },

    // Başarı Modalı
    success: (message, title = 'Başarılı!') => {
        return window.Swal.fire({
            icon: 'success',
            title: title,
            text: message,
            showConfirmButton: false,
            timer: 2500, // 2.5 saniye bekleme
            timerProgressBar: true,
            backdrop: `rgba(0,0,0,0.8)`
        });
    },

    // Uyarı Modalı
    warning: (message, title = 'Dikkat!') => {
        return window.Swal.fire({
            icon: 'warning',
            title: title,
            text: message,
            confirmButtonText: 'Anladım',
            confirmButtonColor: '#f97316',
            backdrop: `rgba(0,0,0,0.8)`
        });
    }
};

export default Notification;