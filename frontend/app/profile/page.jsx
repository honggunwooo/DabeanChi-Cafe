"use client"

import { useState, useEffect } from "react"
import styles from "./profile.module.css"

export default function Profile() {
  const [activeTab, setActiveTab] = useState("myBeans")
  const [myBeans, setMyBeans] = useState([])
  const [favorites, setFavorites] = useState([])
  const [favoriteBeans, setFavoriteBeans] = useState([])
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "null")
    if (!user) {
      alert("로그인이 필요합니다.")
      window.location.href = "/login"
      return
    }
    setCurrentUser(user)

    const beans = JSON.parse(localStorage.getItem("beans") || "[]")
    setMyBeans(beans)

    const favoriteIds = JSON.parse(localStorage.getItem("favorites") || "[]")
    setFavorites(favoriteIds)

    const favBeans = beans.filter((bean) => favoriteIds.includes(bean.id))
    setFavoriteBeans(favBeans)
  }, [])

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
