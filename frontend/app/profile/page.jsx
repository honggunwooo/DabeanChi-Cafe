"use client"

import { useState, useEffect } from "react"
import styles from "./profile.module.css"
import axios from "axios"

export default function Profile() {
  const [activeTab, setActiveTab] = useState("myBeans")
  const [myBeans, setMyBeans] = useState([])
  const [favorites, setFavorites] = useState([])
  const [favoriteBeans, setFavoriteBeans] = useState([])
  const [currentUser, setCurrentUser] = useState(null)

  const apiBase =
    (process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000").replace(
      /\/$/,
      ""
    )

  const safeParse = (value, fallback) => {
    try {
      if (value === null || value === undefined) return fallback
      return JSON.parse(value)
    } catch {
      return fallback
    }
  }

  const mapCoffeeToBean = (item) => ({
    id: item.id,
    beanName: item.name,
    origin: item.country,
    region: item.region,
    roastLevel: item.roast_level,
    weight: item.weight_grams ? `${item.weight_grams}g` : "",
    price: item.price_krw?.toString() ?? "",
    description: item.description,
    image: item.image_url || item.image,
    createdBy: item.user_id || item.owner_id || item.created_by || item.author_id || item.creator_id,
    createdByEmail: item.user_email || item.email || item.creator_email,
    createdByNickname: item.user_nickname || item.nickname || item.creator_nickname,
  })

  const isMine = (bean, user) => {
    if (!bean || !user) return false
    const userIds = [user.id, user.user_id].filter(Boolean)
    const emails = [user.email, user.user_email].filter(Boolean)
    const nicknames = [user.nickname, user.user_nickname].filter(Boolean)

    const beanIds = [bean.createdBy].filter(Boolean)
    const beanEmails = [bean.createdByEmail].filter(Boolean)
    const beanNicknames = [bean.createdByNickname].filter(Boolean)

    if (userIds.length && beanIds.length && beanIds.some((id) => userIds.includes(id))) return true
    if (emails.length && beanEmails.length && beanEmails.some((em) => emails.includes(em))) return true
    if (nicknames.length && beanNicknames.length && beanNicknames.some((nk) => nicknames.includes(nk))) return true
    return false
  }

  const dedupById = (list) => {
    const seen = new Set()
    const result = []
    for (const item of list) {
      if (!item || seen.has(item.id)) continue
      seen.add(item.id)
      result.push(item)
    }
    return result
  }

  useEffect(() => {
    const init = async () => {
      const user = safeParse(localStorage.getItem("currentUser"), null)
      if (!user) {
        alert("로그인이 필요합니다.")
        window.location.href = "/login"
        return
      }
      setCurrentUser(user)

      const favoriteIds = safeParse(localStorage.getItem("favorites"), [])
      setFavorites(favoriteIds)

      const localBeans = safeParse(localStorage.getItem("beans"), [])
      const localMyBeans = safeParse(localStorage.getItem("myBeans"), [])

      try {
        const token = localStorage.getItem("token")
        const headers = token ? { Authorization: `Bearer ${token}` } : {}
        const { data } = await axios.get(`${apiBase}/api/coffee/`, { headers })
        const mapped = Array.isArray(data) ? data.map(mapCoffeeToBean) : []

        const combined = dedupById([...mapped, ...localBeans, ...localMyBeans])
        const mine = combined.filter(
          (bean) => isMine(bean, user) || localMyBeans.find((b) => b.id === bean.id)
        )

        setMyBeans(mine)
        setFavoriteBeans(combined.filter((b) => favoriteIds.includes(b.id)))
      } catch {
        const combined = dedupById([...localBeans, ...localMyBeans])
        const mine = combined.filter(
          (bean) => isMine(bean, user) || localMyBeans.find((b) => b.id === bean.id)
        )
        setMyBeans(mine)
        setFavoriteBeans(combined.filter((bean) => favoriteIds.includes(bean.id)))
      }
    }

    init()
  }, [apiBase])

  const deleteBean = (beanId) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      const beans = JSON.parse(localStorage.getItem("beans") || "[]")
      const updatedBeans = beans.filter((bean) => bean.id !== beanId)
      localStorage.setItem("beans", JSON.stringify(updatedBeans))
      setMyBeans(updatedBeans)
    }
  }

  const removeFavorite = (beanId) => {
    const updatedFavorites = favorites.filter((id) => id !== beanId)
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites))
    setFavorites(updatedFavorites)
    setFavoriteBeans(favoriteBeans.filter((bean) => bean.id !== beanId))
  }

  if (!currentUser) {
    return null
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <a href="/" className={styles.logo}>
          DabeanChi
        </a>
        <a href="/" className={styles.backButton}>
          ← 홈으로
        </a>
      </header>

      <div className={styles.profileWrapper}>
        <div className={styles.profileHeader}>
          <div className={styles.avatar}>👤</div>
          <h1 className={styles.userName}>{currentUser.name}</h1>
          <p className={styles.userEmail}>{currentUser.email}</p>
        </div>

        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === "myBeans" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("myBeans")}
          >
            내 원두 ({myBeans.length})
          </button>
          <button
            className={`${styles.tab} ${activeTab === "favorites" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("favorites")}
          >
            찜한 원두 ({favoriteBeans.length})
          </button>
        </div>

        <div className={styles.content}>
          {activeTab === "myBeans" && (
            <div className={styles.beansGrid}>
              {myBeans.length === 0 ? (
                <div className={styles.emptyState}>
                  <p className={styles.emptyText}>등록한 원두가 없습니다</p>
                  <a href="/register-bean" className={styles.registerButton}>
                    원두 등록하기
                  </a>
                </div>
              ) : (
                myBeans.map((bean) => (
                  <div key={bean.id} className={styles.beanCard}>
                    <a href={`/bean/${bean.id}`} className={styles.beanLink}>
                      {bean.image && (
                        <div className={styles.beanImageWrapper}>
                          <img
                            src={bean.image || "/placeholder.svg"}
                            alt={bean.beanName}
                            className={styles.beanImage}
                          />
                        </div>
                      )}
                      <div className={styles.beanInfo}>
                        <h3 className={styles.beanName}>{bean.beanName}</h3>
                        <p className={styles.beanOrigin}>{bean.origin}</p>
                        <p className={styles.beanPrice}>{Number.parseInt(bean.price).toLocaleString()}원</p>
                      </div>
                    </a>
                    <button className={styles.deleteButton} onClick={() => deleteBean(bean.id)}>
                      삭제
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === "favorites" && (
            <div className={styles.beansGrid}>
              {favoriteBeans.length === 0 ? (
                <div className={styles.emptyState}>
                  <p className={styles.emptyText}>찜한 원두가 없습니다</p>
                  <a href="/" className={styles.registerButton}>
                    원두 둘러보기
                  </a>
                </div>
              ) : (
                favoriteBeans.map((bean) => (
                  <div key={bean.id} className={styles.beanCard}>
                    <a href={`/bean/${bean.id}`} className={styles.beanLink}>
                      {bean.image && (
                        <div className={styles.beanImageWrapper}>
                          <img
                            src={bean.image || "/placeholder.svg"}
                            alt={bean.beanName}
                            className={styles.beanImage}
                          />
                        </div>
                      )}
                      <div className={styles.beanInfo}>
                        <h3 className={styles.beanName}>{bean.beanName}</h3>
                        <p className={styles.beanOrigin}>{bean.origin}</p>
                        <p className={styles.beanPrice}>{Number.parseInt(bean.price).toLocaleString()}원</p>
                      </div>
                    </a>
                    <button className={styles.deleteButton} onClick={() => removeFavorite(bean.id)}>
                      찜 해제
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
