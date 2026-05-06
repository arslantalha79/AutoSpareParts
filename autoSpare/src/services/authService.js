const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/userRepository');


class AuthService{
    //kayıt olma
    async register(fullName, email, password){
        //İş kuralı 1 : Aynı mail sistemde zaten kayıtlı mı?
        const existingUser = await userRepository.findByEmail(email);

        if(existingUser){
            throw new Error('Bu email adresi sistemde zaten kayıtlı');
        }

        //İş kuralı 2 : şifre karakter uzunluğu
        if(password.length < 8){
            throw new Error('Şifre en az 8 karakter içermelidir.');
        }

        // İş Kuralı 3: Şifreyi güvenli bir şekilde karma (hash) işleminden geçir
        // '10' değeri salt round'dur, güvenlik ve performans için en ideal standarttır.
        const hashedPassword = await bcrypt.hash(password,10)       
        
        //repository'e yönlendiriyoruz
        const newUser = await userRepository.createUser(fullName,email,hashedPassword);

        delete newUser.password_hash;

        return newUser;
    }


    async login(email,password){
        //İş kuralı 1 : Kullanıcı sistemde aktif olarak var mı?
        const user = await userRepository.findByEmail(email);
        if(!user){
            throw new Error('Geçersiz email veya şifre');
        }

        //İş kuralı 2 : Girilen şifre ile veritabanındaki hash eşleşiyor mu?
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if(!isMatch){
            throw new Error('Geçersiz mail veya şifre.');
        }

        const payload = {
            id : user.id,
            role : user.role,
            email : user.email
        };


        //token'ı projemize özgü jwt secret key ile imzalıyoruz ve 1 gün geçerlilik süresi tanımlıyoruz
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn : '1d'});

        delete user.password_hash;
        return { user, token };
    }
}


module.exports = new AuthService();