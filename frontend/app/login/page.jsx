"use client"

import { useState } from "react"
import styles from "./login.module.css"

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleInputChange = (e) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const user = users.find((u) => u.email === formData.email && u.password === formData.password)

    if (user) {
      // 로그인 성공 - currentUser에 저장
      localStorage.setItem("currentUser", JSON.stringify({ id: user.id, name: user.name, email: user.email }))
      alert("로그인 성공!")
      window.location.href = "/"
    } else {
      alert("이메일 또는 비밀번호가 일치하지 않습니다.")
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
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
          <h1 className={styles.title}>로그인</h1>
          <p className={styles.subtitle}>원두 거래를 시작하세요</p>

          <form className={styles.form} onSubmit={handleSubmit}>
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
                placeholder="비밀번호를 입력하세요"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* <div className={styles.options}>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" className={styles.checkbox} />
                <span>로그인 상태 유지</span>
              </label>
              <a href="#" className={styles.forgotPassword}>
                비밀번호 찾기
              </a>
            </div> */}

            <button type="submit" className={styles.submitButton}>
              로그인
            </button>
          </form>

          <div className={styles.divider}>
            <span className={styles.dividerText}>또는</span>
          </div>

          <div className={styles.signupSection}>
            <p className={styles.signupText}>아직 계정이 없으신가요?</p>
            <a href="/signup" className={styles.signupButton}>
              회원가입
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
