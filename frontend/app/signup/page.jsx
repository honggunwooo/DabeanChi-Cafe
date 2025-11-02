"use client";

import { useState } from "react";
import styles from "./signup.module.css";
import axios from "axios";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreed: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (!formData.agreed) {
      alert("이용약관에 동의해주세요.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "https://e90481819453.ngrok-free.app/api/auth/register",
        {
          email: formData.email,
          password: formData.password,
          nickname: formData.name,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const newUser = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        password: formData.password,
        createdAt: new Date().toISOString(),
      };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      alert("회원가입이 완료되었습니다!");
      window.location.href = "/login";
    } catch (err) {
      console.error("[v0] Signup error:", err);
      const errorMessage =
        err.response?.data?.detail ||
        err.message ||
        "회원가입 중 오류가 발생했습니다.";
      setError(errorMessage);
      alert(`회원가입 실패: ${errorMessage}`);
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
          <h1 className={styles.title}>회원가입</h1>
          <p className={styles.subtitle}>DabeanChi와 함께 시작하세요</p>

          {error && (
            <div
              style={{
                color: "#d32f2f",
                marginBottom: "15px",
                textAlign: "center",
              }}
            >
              {error}
            </div>
          )}

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

            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading}
            >
              {loading ? "가입중..." : "가입하기"}
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
  );
}
