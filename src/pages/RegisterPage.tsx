import React, { useState } from 'react';
import '../index.css';
import { Link } from 'react-router-dom';
import { api } from '../api/api';

interface FormData {
    login: string;
    name: string;
    birthday: string;
    phone: string;
    telegram: string;
    email: string;
    password: string;
}

const RegisterPage: React.FC = () => {
    const [form, setForm] = useState<FormData>({
        login: '',
        name: '',
        birthday: '',
        phone: '',
        telegram: '',
        email: '',
        password: '',
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // 🔹 основной вызов API
            const result = await api.register(form);

            // 🔹 проверка: если сервер ответил 2xx
            alert('Пользователь успешно зарегистрирован!');
            setForm({
                login: '',
                name: '',
                birthday: '',
                phone: '',
                telegram: '',
                email: '',
                password: '',
            });
        } catch (err: any) {
            // 🔹 показываем текст ошибки, как прислал сервер
            alert(
                err.response?.data
                    ? JSON.stringify(err.response.data, null, 2)
                    : err.message || 'Ошибка при регистрации'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container">
            <h2>Регистрация</h2>
            <form onSubmit={handleSubmit}>
                {Object.entries(form).map(([key, value]) => (
                    <div key={key}>
                        <label>
                            {key.charAt(0).toUpperCase() + key.slice(1)}:
                            <input
                                type={
                                    key === 'birthday'
                                        ? 'date'
                                        : key === 'password'
                                            ? 'password'
                                            : 'text'
                                }
                                name={key}
                                value={value}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                ))}
                <button type="submit" disabled={loading}>
                    {loading ? 'Отправка...' : 'Зарегистрироваться'}
                </button>
            </form>
            <p style={{ marginTop: '1rem' }}>
                Есть аккаунт? <Link to="/">Войти</Link>
            </p>
        </div>
    );
};

export default RegisterPage;
