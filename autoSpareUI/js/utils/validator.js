const Validator = {
    // regex e-posta formatı doğrulama
    isValidEmail: (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },
    
    // Şifre en az 8 karakter mi?
    isValidPassword: (password) => {
        return password.length >= 8;
    },
    
    // Alan boş bırakılmış mı?
    isEmpty: (value) => {
        return value.trim() === '';
    }
};

export default Validator;