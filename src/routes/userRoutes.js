import express, { json } from 'express';
import { insertUser, userLogin, verifyToken } from '../controllers/userController.js';

const router = express();

router.use(express.json());

// cadastro
router.post("/signup", async (req, res) => {
    try {
        const newUser = await insertUser(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({error: "erro ao criar user"});
    }
});

// login
router.post("/login", async (req, res) => {
    try {
        const authenticatedUser = await userLogin(req.body);

        if (authenticatedUser.status === 401) {
            return res.status(401).json({ message: authenticatedUser.message });
        }

        res.status(200).json({ auth: true, token: authenticatedUser.token, name: authenticatedUser.name });
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor' });
    }
});



router.post('/verify_token', verifyToken, (req, res) => {
    // Se o token for válido, o código desta rota será executado
    res.json({ message: 'Acesso permitido à rota de categorias', user: req.user });
});

export default router;