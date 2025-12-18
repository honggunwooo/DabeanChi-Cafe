"use client";

import { useState } from "react";
import styles from "./login.module.css";
import axios from "axios";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // ✅ input 값 변경 전용
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // ✅ 로그인 요청 전용 (Express API)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("http://127.0.0.1:8000/api/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      // 로그인 성공: 응답 형태가 달라도 안전하게 저장
      const token = data?.token || data?.access_token || data?.jwt;
      const userPayload =
        data?.user ||
        data?.data?.user ||
        (data?.email || data?.nickname
          ? { email: data.email, nickname: data.nickname }
          : { email: formData.email });

      if (token) {
        localStorage.setItem("token", token);
      }
      localStorage.setItem("currentUser", JSON.stringify(userPayload));

      alert("로그인 성공!");
      window.location.href = "/";
    } catch (err) {
      const msg = err.response?.data?.message || "로그인 실패";
      alert(msg);
    }
  };

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

          {/* ✅ form submit에서만 로그인 */}
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
  );
}
