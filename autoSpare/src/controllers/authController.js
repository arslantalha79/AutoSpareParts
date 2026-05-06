const authService = require('../services/authService');

class AuthController{
    
    //kayıt olma isteğine karşılık gelen endpoint
    register = async (req, res) => {
        try {
            // Frontend'den (JSON body) gelen verileri alıyoruz
            const { fullName, email, password } = req.body;

            //ui'dan gelen verileri business katmanına yönlendiriyoruz
            const newUser = await authService.register(fullName, email, password);

            // 201 HTTP Created
            res.status(201).json({
                message: 'Kullanıcı başarıyla oluşturuldu.',
                user: newUser
            });
        } catch (error) {
            //iş kuralı hatası olursa mesaj burada döner
            res.status(400).json({ error: error.message });
        }
    };

    login = async (req, res) => {
        try {
            const { email, password } = req.body;

            const { user, token } = await authService.login(email,password);

            res.status(200).json({
                message : 'Giriş başarılı!',
                token : token,
                user : user
            });
        } catch (error) {
            res.status(400).json({error : error.message});
        }
    };
}


module.exports = new AuthController();