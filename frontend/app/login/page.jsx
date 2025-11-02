"use client";

import { useState } from "react";
import axios from "axios";
import styles from "./login.module.css";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "https://e90481819453.ngrok-free.app/api/auth/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      console.log("login response:", response.data);

      const access_token = response.data?.access_token ?? null;
      const user = response.data?.user ?? null;

      if (access_token) {
        localStorage.setItem("token", access_token);
      }

      // user가 없으면 currentUser를 저장하지 않고 제거(또는 null 대신 remove)
      if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
      } else {
        localStorage.removeItem("currentUser");
      }

      // 같은 탭 즉시 반영
      window.dispatchEvent(new CustomEvent("authChange", { detail: user }));

      alert("로그인 성공!");
      window.location.href = "/";
    } catch (error) {
      console.error("로그인 실패:", error);
      alert(
        error.response?.data?.detail ||
          "이메일 또는 비밀번호가 일치하지 않습니다."
      );
    } finally {
      setLoading(false);
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
                disabled={loading}
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
                disabled={loading}
              />
            </div>

            <div className={styles.options}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  disabled={loading}
                />
                <span>로그인 상태 유지</span>
              </label>
              <a href="#" className={styles.forgotPassword}>
                비밀번호 찾기
              </a>
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading}
            >
              {loading ? "로그인 중..." : "로그인"}
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
