"use client"

import { useState } from "react"
import styles from "./register-bean.module.css"

export default function RegisterBean() {
  const [imagePreview, setImagePreview] = useState(null)
  const [formData, setFormData] = useState({
    beanName: "",
    origin: "",
    roastLevel: "",
    weight: "",
    price: "",
    description: "",
    location: "",
  })

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleInputChange = (e) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newBean = {
      id: Date.now(),
      ...formData,
      image: imagePreview,
      createdAt: new Date().toISOString(),
    }

    // localStorage에서 기존 원두 목록 가져오기
    const existingBeans = JSON.parse(localStorage.getItem("beans") || "[]")
    existingBeans.unshift(newBean)
    localStorage.setItem("beans", JSON.stringify(existingBeans))

    alert("원두가 성공적으로 등록되었습니다!")
    window.location.href = "/"
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <a href="/" className={styles.logo}>
          DabeanChi
        </a>
        <a href="/" className={styles.backButton}>
          ← 돌아가기
        </a>
      </header>

      <div className={styles.formWrapper}>
        <h1 className={styles.title}>원두 등록하기</h1>
        <p className={styles.subtitle}>판매할 원두 정보를 입력해주세요</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.imageUpload}>
            <div className={styles.uploadBox} onClick={() => document.getElementById("fileInput").click()}>
              {imagePreview ? (
                <img src={imagePreview || "/placeholder.svg"} alt="미리보기" className={styles.previewImage} />
              ) : (
                <>
                  <div className={styles.uploadIcon}>📷</div>
                  <p className={styles.uploadText}>원두 사진 추가</p>
                  <p className={styles.uploadSubtext}>클릭하여 사진 선택</p>
                </>
              )}
              <input
                type="file"
                id="fileInput"
                className={styles.fileInput}
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          </div>

          <div className={styles.formGrid}>
            <div className={styles.inputGroup}>
              <label htmlFor="beanName" className={styles.label}>
                원두 이름 *
              </label>
              <input
                type="text"
                id="beanName"
                className={styles.input}
                placeholder="예: 에티오피아 예가체프"
                value={formData.beanName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="origin" className={styles.label}>
                원산지 *
              </label>
              <input
                type="text"
                id="origin"
                className={styles.input}
                placeholder="예: 에티오피아"
                value={formData.origin}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="roastLevel" className={styles.label}>
                로스팅 단계 *
              </label>
              <select
                id="roastLevel"
                className={styles.select}
                value={formData.roastLevel}
                onChange={handleInputChange}
                required
              >
                <option value="">선택하세요</option>
                <option value="light">라이트</option>
                <option value="light-medium">라이트미디움</option>
                <option value="medium">미디엄</option>
                <option value="dark">다크</option>
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="weight" className={styles.label}>
                중량 *
              </label>
              <input
                type="text"
                id="weight"
                className={styles.input}
                placeholder="예: 200g"
                value={formData.weight}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="price" className={styles.label}>
                가격 *
              </label>
              <input
                type="text"
                id="price"
                className={styles.input}
                placeholder="예: 15000"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="location" className={styles.label}>
                거래 지역
              </label>
              <input
                type="text"
                id="location"
                className={styles.input}
                placeholder="예: 서울 강남구"
                value={formData.location}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="description" className={styles.label}>
              상세 설명 *
            </label>
            <textarea
              id="description"
              className={styles.textarea}
              placeholder="원두의 특징, 맛, 향 등을 자세히 설명해주세요"
              rows="4"
              value={formData.description}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>

          <div className={styles.buttonGroup}>
            <a href="/" className={styles.cancelButton}>
              취소
            </a>
            <button type="submit" className={styles.submitButton}>
              등록하기
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
