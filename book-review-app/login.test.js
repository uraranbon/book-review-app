import React from 'react';
import { render, screen } from '@testing-library/react';
import { Login } from './src/pages/Login';
import '@testing-library/jest-dom'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // 実際のモジュールを使用する
  Link: 'a', // Linkコンポーネントをa要素に置き換える
}));

describe('ログイン画面のコンポーネント', () => {
  test('入力フォームが存在すること', () => {
    render(<Login />);
    const signupLink = screen.getByText('サインアップはこちら'); //Link対策で追加
    expect(signupLink).toBeInTheDocument(); //Link対策で追加

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