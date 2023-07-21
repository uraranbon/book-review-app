import React from 'react';
import { render, screen } from '@testing-library/react';
import { Login } from './src/pages/Login';
import '@testing-library/jest-dom'

describe('ログイン画面のコンポーネント', () => {
  test('入力フォームが存在すること', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText('メールアドレス');
    const passwordInput = screen.getByLabelText('パスワード');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  test('ラベルが存在すること', () => {
    render(<Login />);
    const emailLabel = screen.getByText('メールアドレス');
    const passwordLabel = screen.getByText('パスワード');

    expect(emailLabel).toBeInTheDocument();
    expect(passwordLabel).toBeInTheDocument();
  });

  test('ボタンが存在すること', () => {
    render(<Login />);
    const loginButton = screen.getByRole('button', { name: 'ログイン' });

    expect(loginButton).toBeInTheDocument();
  });
});