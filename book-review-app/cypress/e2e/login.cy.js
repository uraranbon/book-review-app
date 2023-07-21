describe('ログイン画面のブラウザテスト', () => {
  it('入力フォームへの入力値に不備がある場合はエラーメッセージが表示される', () => {
    cy.visit('http://localhost:3000/login')
    cy.get('.email-input').type('invalid_email') // 不正な入力値を入力
    cy.get('.password-input').type('password123') // パスワードを入力
    cy.get('.button').click() // ログインボタンをクリック
    cy.get('.error-message').should('be.visible') // エラーメッセージが表示されることを確認
  })

  it('入力フォームへの入力値に不備がなければエラーメッセージを表示しない', () => {
    cy.visit('http://localhost:3000/login')
    cy.get('.email-input').type('valid_email@example.com') // 有効な入力値を入力
    cy.get('.password-input').type('password123') // パスワードを入力
    cy.get('.button').click() // ログインボタンをクリック
    cy.get('.error-message').should('not.be.visible') // エラーメッセージが表示されないことを確認
  })
})