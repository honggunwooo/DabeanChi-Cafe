"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import axios from "axios"
import styles from "./bean-detail.module.css"

export default function BeanDetail() {
  const params = useParams()
  const [bean, setBean] = useState(null)
  const [reviews, setReviews] = useState([])
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" })
  const [isFavorite, setIsFavorite] = useState(false)

  const apiBase =
    (process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000").replace(
      /\/$/,
      ""
    )

  const normalizeBean = (data) =>
    data && {
      ...data,
      beanName: data.beanName || data.name,
      origin: data.origin || data.country,
      roastLevel: data.roastLevel || data.roast_level,
      weight: data.weight || (data.weight_grams ? `${data.weight_grams}g` : data.weight),
      price: data.price || data.price_krw?.toString() || data.price_krw,
      image:
        data.image && (data.image.startsWith("http://") || data.image.startsWith("https://"))
          ? data.image
          : data.image_url && (data.image_url.startsWith("http://") || data.image_url.startsWith("https://"))
            ? data.image_url
            : data.image || data.image_url
              ? `${apiBase}${(data.image || data.image_url).startsWith("/") ? "" : "/"}${data.image || data.image_url}`
              : undefined,
    }

  useEffect(() => {
    const fetchData = async () => {
      const idNum = Number.parseInt(params.id)

      // 즐겨찾기 로컬 상태
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]")
      setIsFavorite(favorites.includes(idNum))

      // Bean 조회 (백엔드 우선, 실패 시 로컬)
      try {
        const { data } = await axios.get(`${apiBase}/api/coffee/${params.id}`)
        setBean(normalizeBean(data))
      } catch {
        const beans = JSON.parse(localStorage.getItem("beans") || "[]")
        const foundBean = beans.find((b) => b.id === idNum)
        setBean(normalizeBean(foundBean) || null)
      }

      // 리뷰 조회 (백엔드 우선, 실패 시 로컬)
      try {
        const { data } = await axios.get(
          `${apiBase}/api/coffee/${params.id}/reviews`
        )
        setReviews(Array.isArray(data) ? data : [])
      } catch {
        const storedReviews = JSON.parse(
          localStorage.getItem(`reviews_${params.id}`) || "[]"
        )
        setReviews(storedReviews)
      }
    }

    fetchData()
  }, [params.id, apiBase])

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]")
    const newFavorites = isFavorite
      ? favorites.filter((id) => id !== Number.parseInt(params.id))
      : [...favorites, Number.parseInt(params.id)]

    localStorage.setItem("favorites", JSON.stringify(newFavorites))
    setIsFavorite(!isFavorite)
  }

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]")
    cart.push(bean)
    localStorage.setItem("cart", JSON.stringify(cart))
    alert("장바구니에 추가되었습니다!")
  }

  const submitReview = async (e) => {
    e.preventDefault()
    const reviewPayload = {
      rating: newReview.rating,
      comment: newReview.comment,
    }

    try {
      const token = localStorage.getItem("token")
      const headers = token ? { Authorization: `Bearer ${token}` } : {}
      const { data } = await axios.post(
        `${apiBase}/api/coffee/${params.id}/reviews`,
        reviewPayload,
        { headers }
      )
      // 백엔드 응답이 리뷰 객체를 돌려준다고 가정
      const created = data || {
        id: Date.now(),
        ...reviewPayload,
        date: new Date().toISOString(),
        author: "사용자",
      }
      const updatedReviews = [created, ...reviews]
      setReviews(updatedReviews)
      localStorage.setItem(`reviews_${params.id}`, JSON.stringify(updatedReviews))
      setNewReview({ rating: 5, comment: "" })
    } catch {
      // 실패 시 로컬에만 저장
      const fallback = {
        id: Date.now(),
        ...reviewPayload,
        date: new Date().toISOString(),
        author: "사용자",
      }
      const updatedReviews = [fallback, ...reviews]
      setReviews(updatedReviews)
      localStorage.setItem(`reviews_${params.id}`, JSON.stringify(updatedReviews))
      setNewReview({ rating: 5, comment: "" })
    }
  }

  if (!bean) {
    return (
      <div className={styles.container}>
        <div className={styles.notFound}>원두를 찾을 수 없습니다.</div>
      </div>
    )
  }

  const averageRating =
    reviews.length > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : 0

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <a href="/" className={styles.logo}>
          DabeanChi
        </a>
        <a href="/" className={styles.backButton}>
          ← 목록으로
        </a>
      </header>

      <div className={styles.detailWrapper}>
        <div className={styles.imageSection}>
          {bean.image && (
            <img src={bean.image || "/placeholder.svg"} alt={bean.beanName} className={styles.mainImage} />
          )}
        </div>

        <div className={styles.infoSection}>
          <div className={styles.titleRow}>
            <h1 className={styles.beanName}>{bean.beanName}</h1>
            <button className={styles.favoriteButton} onClick={toggleFavorite}>
              {isFavorite ? "❤️" : "🤍"}
            </button>
          </div>

          <div className={styles.ratingRow}>
            <span className={styles.stars}>⭐ {averageRating}</span>
            <span className={styles.reviewCount}>({reviews.length}개 리뷰)</span>
          </div>

          <p className={styles.price}>{Number.parseInt(bean.price).toLocaleString()}원</p>

          <div className={styles.detailsGrid}>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>원산지</span>
              <span className={styles.detailValue}>{bean.origin}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>로스팅</span>
              <span className={styles.detailValue}>
                {bean.roastLevel === "light"
                  ? "라이트 로스트"
                  : bean.roastLevel === "medium"
                    ? "미디엄 로스트"
                    : "다크 로스트"}
              </span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>중량</span>
              <span className={styles.detailValue}>{bean.weight}</span>
            </div>
            {bean.region && (
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>재배 지역</span>
                <span className={styles.detailValue}>{bean.region}</span>
              </div>
            )}
            {bean.breed && (
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>품종</span>
                <span className={styles.detailValue}>
                  {bean.breed === 'Typica' ? '티피카' : 
                   bean.breed === 'Bourbon' ? '버번' :
                   bean.breed === 'Geisha' ? '게이샤' :
                   bean.breed === 'Pacamara' ? '파카마라' :
                   bean.breed === 'Catuai' ? '카투아이' : bean.breed}
                </span>
              </div>
            )}
            {bean.location && (
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>거래 지역</span>
                <span className={styles.detailValue}>📍 {bean.location}</span>
              </div>
            )}
          </div>

          <div className={styles.description}>
            <h3 className={styles.descriptionTitle}>상세 설명</h3>
            <p className={styles.descriptionText}>{bean.description}</p>
          </div>

          <div className={styles.buttonGroup}>
            <button className={styles.cartButton} onClick={addToCart}>
              장바구니 담기
            </button>
            <button className={styles.buyButton}>바로 구매</button>
          </div>
        </div>
      </div>

      <div className={styles.reviewSection}>
        <h2 className={styles.reviewTitle}>리뷰 ({reviews.length})</h2>

        <form className={styles.reviewForm} onSubmit={submitReview}>
          <h3 className={styles.formTitle}>리뷰 작성하기</h3>
          <div className={styles.ratingInput}>
            <label>평점:</label>
            <select
              value={newReview.rating}
              onChange={(e) => setNewReview({ ...newReview, rating: Number.parseInt(e.target.value) })}
              className={styles.ratingSelect}
            >
              <option value="5">⭐⭐⭐⭐⭐ (5점)</option>
              <option value="4">⭐⭐⭐⭐ (4점)</option>
              <option value="3">⭐⭐⭐ (3점)</option>
              <option value="2">⭐⭐ (2점)</option>
              <option value="1">⭐ (1점)</option>
            </select>
          </div>
          <textarea
            className={styles.reviewTextarea}
            placeholder="이 원두에 대한 솔직한 리뷰를 남겨주세요..."
            value={newReview.comment}
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            required
          />
          <button type="submit" className={styles.submitReview}>
            리뷰 등록
          </button>
        </form>

        <div className={styles.reviewList}>
          {reviews.map((review) => (
            <div key={review.id} className={styles.reviewItem}>
              <div className={styles.reviewHeader}>
                <span className={styles.reviewAuthor}>{review.author}</span>
                <span className={styles.reviewRating}>{"⭐".repeat(review.rating)}</span>
              </div>
              <p className={styles.reviewComment}>{review.comment}</p>
              <span className={styles.reviewDate}>{new Date(review.date).toLocaleDateString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
