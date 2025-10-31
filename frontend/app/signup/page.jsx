"use client"

import { useState } from "react"
import styles from "./signup.module.css"

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreed: false,
  })

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.")
      return
    }

    if (!formData.agreed) {
      alert("이용약관에 동의해주세요.")
      return
    }

    // localStorage에 사용자 정보 저장
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const newUser = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      password: formData.password,
      createdAt: new Date().toISOString(),
    }
    users.push(newUser)
    localStorage.setItem("users", JSON.stringify(users))

    alert("회원가입이 완료되었습니다!")
    window.location.href = "/login"
  }

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        {/* 홈으로 돌아가기 버튼 추가 */}
        <a href="/" className={styles.backButton}>
          ← 홈으로 돌아가기
        </a>

        <div className={styles.logoSection}>
          <a href="/" className={styles.logo}>
            DabeanChi
          </a>
          <p className={styles.logoSubtext}>원두 거래 플랫폼</p>
        </div>

        <div className={styles.formContainer}>
          <h1 className={styles.title}>회원가입</h1>
          <p className={styles.subtitle}>DabeanChi와 함께 시작하세요</p>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label htmlFor="name" className={styles.label}>
                이름
              </label>
              <input
                type="text"
                id="name"
                className={styles.input}
                placeholder="홍길동"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>
                이메일
              </label>
              <input
                type="email"
                id="email"
                className={styles.input}
                placeholder="example@email.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.label}>
                비밀번호
              </label>
              <input
                type="password"
                id="password"
                className={styles.input}
                placeholder="8자 이상 입력하세요"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="confirmPassword" className={styles.label}>
                비밀번호 확인
              </label>
              <input
                type="password"
                id="confirmPassword"
                className={styles.input}
                placeholder="비밀번호를 다시 입력하세요"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className={styles.checkboxGroup}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  id="agreed"
                  className={styles.checkbox}
                  checked={formData.agreed}
                  onChange={handleInputChange}
                  required
                />
                <span>이용약관 및 개인정보처리방침에 동의합니다</span>
              </label>
            </div>

            <button type="submit" className={styles.submitButton}>
              가입하기
            </button>
          </form>

          <div className={styles.divider}>
            <span className={styles.dividerText}>또는</span>
          </div>

          <div className={styles.loginSection}>
            <p className={styles.loginText}>이미 계정이 있으신가요?</p>
            <a href="/login" className={styles.loginButton}>
              로그인
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
