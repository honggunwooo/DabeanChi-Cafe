"use client"

import { useState } from "react"
import axios from "axios"
import styles from "./register-bean.module.css"

export default function RegisterBean() {
  const [imagePreview, setImagePreview] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    region: "",
    roast_level: "",
    price_krw: "",
    weight_grams: "",
    pro_method: "",
    roastery: "",
    variety: "",
    altitude_meters: "",
    description: "",
  })

  const safeParse = (value, fallback) => {
    try {
      if (value === null || value === undefined) return fallback
      return JSON.parse(value)
    } catch {
      return fallback
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const handleInputChange = (e) => {
    const { name, id, value } = e.target
    const fieldName = name || id
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }))
  }

  const apiBase =
    (process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000").replace(
      /\/$/,
      ""
    )
  const createBeanUrl = `${apiBase}/api/coffee`

  const handleSubmit = async (e) => {
    e.preventDefault()

    const currentUser = safeParse(localStorage.getItem("currentUser"), null)

    const token = localStorage.getItem("token")
    if (!token) {
      alert("로그인이 필요합니다.")
      window.location.href = "/login"
      return
    }

    // 필수 숫자 필드 검증
    const price = parseInt(formData.price_krw, 10)
    const weight = parseInt(formData.weight_grams, 10)
    if (Number.isNaN(price) || Number.isNaN(weight)) {
      alert("가격과 중량을 숫자로 입력해주세요.")
      return
    }

    const fd = new FormData()
    fd.append("name", formData.name)
    fd.append("country", formData.country)
    fd.append("region", formData.region)
    fd.append("roast_level", formData.roast_level)
    fd.append("price_krw", price)
    fd.append("weight_grams", weight)
    fd.append("pro_method", formData.pro_method)

    if (formData.acid !== "") fd.append("acid", parseFloat(formData.acid))
    if (formData.sweet !== "") fd.append("sweet", parseFloat(formData.sweet))
    if (formData.body !== "") fd.append("body", parseFloat(formData.body))
    if (formData.roastery) fd.append("roastery", formData.roastery)
    if (formData.variety) fd.append("variety", formData.variety)
    if (formData.altitude_meters !== "") {
      const alt = parseInt(formData.altitude_meters, 10)
      if (!Number.isNaN(alt)) fd.append("altitude_meters", alt)
    }
    if (formData.description) fd.append("description", formData.description)
    if (imageFile) fd.append("image", imageFile)

    try {
      const { data } = await axios.post(createBeanUrl, fd, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })

      // 로컬 캐시에 내가 등록한 원두 저장 (내 원두 화면 fallback용)
      const created = data || {
        id: Date.now(),
        ...formData,
        price_krw: price,
        weight_grams: weight,
      }
      const normalized = {
        id: created.id,
        beanName: created.name || formData.name,
        origin: created.country,
        region: created.region,
        roastLevel: created.roast_level,
        weight: created.weight_grams ? `${created.weight_grams}g` : "",
        price: created.price_krw?.toString() ?? "",
        description: created.description,
        image: created.image_url || created.image || imagePreview,
        createdBy: created.user_id || created.owner_id || currentUser?.id,
        createdByEmail: created.user_email || created.email || currentUser?.email,
        createdByNickname: created.user_nickname || created.nickname || currentUser?.nickname,
      }
      const existingBeans = safeParse(localStorage.getItem("beans"), [])
      localStorage.setItem("beans", JSON.stringify([normalized, ...existingBeans]))
      const existingMyBeans = safeParse(localStorage.getItem("myBeans"), [])
      localStorage.setItem("myBeans", JSON.stringify([normalized, ...existingMyBeans]))

      alert("원두가 성공적으로 등록되었습니다!")
      window.location.href = "/"
    } catch (error) {
      const message =
        error?.response?.data?.message || "원두 등록에 실패했습니다."
      alert(message)
    }
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
              <label htmlFor="name" className={styles.label}>
                원두 이름 *
              </label>
              <input
                type="text"
                id="name"
                className={styles.input}
                placeholder="예: 에티오피아 예가체프"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="country" className={styles.label}>
                원산지(country) *
              </label>
              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className={styles.select}
                required
              >
                <option value="">선택하세요</option>
                <option value="Ethiopia">에티오피아</option>
                <option value="Panama">파나마</option>
                <option value="USA">미국</option>
                <option value="Brazil">브라질</option>
                <option value="Colombia">콜롬비아</option>
                <option value="Kenya">케냐</option>
                <option value="Other">기타</option>
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="region" className={styles.label}>
                재배 지역(region) *
              </label>
              <select
                name="region"
                value={formData.region}
                onChange={handleInputChange}
                className={styles.select}
                required
              >
                <option value="">선택하세요</option>
                <option value="Africa">아프리카</option>
                <option value="Asia">아시아</option>
                <option value="Caribbean">카리브 제도</option>
                <option value="Central America">중앙 아메리카</option>
                <option value="South America">남아메리카</option>
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="roast_level" className={styles.label}>
                로스팅 단계(roast_level) *
              </label>
              <select
                id="roast_level"
                className={styles.select}
                value={formData.roast_level}
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
              <label htmlFor="pro_method" className={styles.label}>
                가공 방식(pro_method) *
              </label>
              <select
                id="pro_method"
                className={styles.select}
                value={formData.pro_method}
                onChange={handleInputChange}
                required
              >
                <option value="">선택하세요</option>
                <option value="washed">워시드</option>
                <option value="natural">내추럴</option>
                <option value="honey">허니</option>
                <option value="anaerobic">아나에어로빅</option>
                <option value="other">기타</option>
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="altitude_meters" className={styles.label}>
                고도(미터)
              </label>
              <input
                type="number"
                id="altitude_meters"
                className={styles.input}
                placeholder="예: 1200"
                value={formData.altitude_meters}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="weight_grams" className={styles.label}>
                중량(그램) *
              </label>
              <input
                type="number"
                id="weight_grams"
                className={styles.input}
                placeholder="예: 200"
                value={formData.weight_grams}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="price_krw" className={styles.label}>
                가격(원) *
              </label>
              <input
                type="number"
                id="price_krw"
                className={styles.input}
                placeholder="예: 15000"
                value={formData.price_krw}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="description" className={styles.label}>
              상세 설명
            </label>
            <textarea
              id="description"
              className={styles.textarea}
              placeholder="원두의 특징, 맛, 향 등을 자세히 설명해주세요"
              rows="4"
              value={formData.description}
              onChange={handleInputChange}
            ></textarea>
          </div>

          <div className={styles.formGrid}>
            <div className={styles.inputGroup}>
              <label htmlFor="roastery" className={styles.label}>
                로스터리(roastery)
              </label>
              <input
                type="text"
                id="roastery"
                className={styles.input}
                placeholder="예: 홍길동 로스터리"
                value={formData.roastery}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="variety" className={styles.label}>
                품종(variety)
              </label>
              <input
                type="text"
                id="variety"
                className={styles.input}
                placeholder="예: 게이샤"
                value={formData.variety}
                onChange={handleInputChange}
              />
            </div>
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
