import React, { useState } from 'react';
import '../index.css';
import { Link } from "react-router-dom";
import { api } from '../api/api';

const LoginPage: React.FC = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await api.login(login, password);
            console.log('Login result:', result);
            alert('Успешный вход');
        } catch (err: any) {
            console.error(err);
            // Показываем текст ошибки, который прислал сервер
            alert('Ошибка при входе: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container">
            <h2>Вход</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Логин:
                        <input
                            type="text"
                            value={login}
                            onChange={e => setLogin(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Пароль:
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </label>
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Отправка...' : 'Войти'}
                </button>
            </form>
            <p style={{ marginTop: "1rem" }}>
                Нет аккаунта? <Link to="/register">Создать пользователя</Link>
            </p>
        </div>
    );
};

export default LoginPage;
