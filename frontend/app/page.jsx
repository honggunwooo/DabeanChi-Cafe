"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles/home.module.css";
import RecommendationButton from "@/Button/RecommendationButton";

export default function Home() {
  const safeParse = (value, fallback) => {
    try {
      if (value === null || value === undefined) return fallback;
      return JSON.parse(value);
    } catch {
      return fallback;
    }
  };

  const [beans, setBeans] = useState([]);
  const [filteredBeans, setFilteredBeans] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOrigin, setFilterOrigin] = useState("");
  const [filterRoast, setFilterRoast] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [favorites, setFavorites] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const apiBase =
    (process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000").replace(
      /\/$/,
      ""
    );

  const ensureAbsoluteUrl = (path) => {
    if (!path) return undefined;
    if (path.startsWith("http://") || path.startsWith("https://")) return path;
    return `${apiBase}${path.startsWith("/") ? "" : "/"}${path}`;
  };

  const mapCoffeeToBean = (item) => ({
    id: item.id,
    beanName: item.name,
    origin: item.country,
    region: item.region,
    roastLevel: item.roast_level,
    weight: item.weight_grams ? `${item.weight_grams}g` : "",
    price: item.price_krw?.toString() ?? "",
    description: item.description,
    image: ensureAbsoluteUrl(item.image_url || item.image),
    createdAt: item.created_at || item.createdAt || new Date().toISOString(),
  });

  useEffect(() => {
    const init = async () => {
      try {
        const { data } = await axios.get(`${apiBase}/api/coffee/`);
        const mapped = Array.isArray(data) ? data.map(mapCoffeeToBean) : [];
        setBeans(mapped);
        setFilteredBeans(mapped);
        localStorage.setItem("beans", JSON.stringify(mapped));
      } catch {
        const storedBeans = safeParse(localStorage.getItem("beans"), []);
        setBeans(storedBeans);
        setFilteredBeans(storedBeans);
      }

      const storedFavorites = safeParse(localStorage.getItem("favorites"), []);
      setFavorites(storedFavorites);

      const cart = safeParse(localStorage.getItem("cart"), []);
      setCartCount(cart.length);

      const user = safeParse(localStorage.getItem("currentUser"), null);
      setCurrentUser(user);
    };

    init();
  }, [apiBase]);

  useEffect(() => {
    let result = [...beans];

    // 검색
    if (searchTerm) {
      result = result.filter(
        (bean) =>
          bean.beanName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          bean.origin.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 원산지 필터
    if (filterOrigin) {
      result = result.filter((bean) => bean.origin === filterOrigin);
    }

    // 로스팅 필터
    if (filterRoast) {
      result = result.filter((bean) => bean.roastLevel === filterRoast);
    }

    // 정렬
    if (sortBy === "latest") {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === "price-low") {
      result.sort(
        (a, b) => Number.parseInt(a.price) - Number.parseInt(b.price)
      );
    } else if (sortBy === "price-high") {
      result.sort(
        (a, b) => Number.parseInt(b.price) - Number.parseInt(a.price)
      );
    } else if (sortBy === "popular") {
      result.sort((a, b) => (b.likes || 0) - (a.likes || 0));
    }

    setFilteredBeans(result);
  }, [searchTerm, filterOrigin, filterRoast, sortBy, beans]);

  const toggleFavorite = (beanId) => {
    const newFavorites = favorites.includes(beanId)
      ? favorites.filter((id) => id !== beanId)
      : [...favorites, beanId];

    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  }
    const addToCart = (bean) => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      cart.push(bean);
      localStorage.setItem("cart", JSON.stringify(cart));
      setCartCount(cart.length);
      alert("장바구니에 추가되었습니다!");
    };

    const handleLogout = () => {
      localStorage.removeItem("currentUser");
      setCurrentUser(null);
      alert("성공 로그아웃되었습니다.");
      window.location.href = "/";
    };
    //a
    const origins = [...new Set(beans.map((bean) => bean.origin))].filter(
      Boolean
    );

    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.logo}>DabeanChi</div>
          <nav className={styles.nav}>
            <a href="/" className={styles.navLink}>
              홈
            </a>
            {currentUser ? (
              <>
                <a href="/profile" className={styles.navLink}>
                  프로필
                </a>
                <a href="/cart" className={styles.navLink}>
                  장바구니 ({cartCount})
                </a>
                <button onClick={handleLogout} className={styles.logoutButton}>
                  로그아웃
                </button>
                <RecommendationButton />
              </>
            ) : (
              <>
                <a href="/cart" className={styles.navLink}>
                  장바구니 ({cartCount})
                </a>
                <a href="/login" className={styles.loginButton}>
                  로그인
                </a>
              </>
            )}
          </nav>
        </header>

        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>당신의 원두를 공유하세요</h1>
          <p className={styles.heroSubtitle}>
            직접 로스팅한 원두를 판매하고, 특별한 원두를 발견하세요
          </p>
          <a href="/register-bean" className={styles.heroButton}>
            원두 등록하기
          </a>
        </section>

        <section className={styles.searchSection}>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="원두 이름이나 원산지로 검색..."
              className={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className={styles.filterToggle}
              onClick={() => setShowFilters(!showFilters)}
            >
              🔍 필터 {showFilters ? "숨기기" : "보기"}
            </button>
          </div>

          {showFilters && (
            <div className={styles.filterContainer}>
              <select
                className={styles.filterSelect}
                value={filterOrigin}
                onChange={(e) => setFilterOrigin(e.target.value)}
              >
                <option value="">모든 원산지</option>
                {origins.map((origin) => (
                  <option key={origin} value={origin}>
                    {origin}
                  </option>
                ))}
              </select>

              <select
                className={styles.filterSelect}
                value={filterRoast}
                onChange={(e) => setFilterRoast(e.target.value)}
              >
                <option value="">모든 로스팅</option>
                <option value="light">라이트 로스트</option>
                <option value="medium">미디엄 로스트</option>
                <option value="dark">다크 로스트</option>
              </select>

              <select
                className={styles.filterSelect}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="latest">최신순</option>
                <option value="price-low">가격 낮은순</option>
                <option value="price-high">가격 높은순</option>
                <option value="popular">인기순</option>
              </select>

              <button
                className={styles.resetButton}
                onClick={() => {
                  setSearchTerm("");
                  setFilterOrigin("");
                  setFilterRoast("");
                  setSortBy("latest");
                }}
              >
                초기화
              </button>
            </div>
          )}
        </section>

        <section id="products" className={styles.productsSection}>
          <h2 className={styles.sectionTitle}>
            {searchTerm || filterOrigin || filterRoast
              ? "검색 결과"
              : "최근 등록된 원두"}{" "}
            ({filteredBeans.length})
          </h2>
          {filteredBeans.length === 0 ? (
            <div className={styles.emptyState}>
              <p className={styles.emptyText}>
                {beans.length === 0
                  ? "아직 등록된 원두가 없습니다"
                  : "검색 결과가 없습니다"}
              </p>
              <p className={styles.emptySubtext}>
                {beans.length === 0
                  ? "첫 번째로 원두를 등록해보세요!"
                  : "다른 검색어로 시도해보세요"}
              </p>
              {beans.length === 0 && (
                <a href="/register-bean" className={styles.registerButton}>
                  원두 등록하기
                </a>
              )}
            </div>
          ) : (
            <div className={styles.productsGrid}>
              {filteredBeans.map((bean) => (
                <div key={bean.id} className={styles.productCard}>
                  <button
                    className={styles.favoriteButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(bean.id);
                    }}
                  >
                    {favorites.includes(bean.id) ? "❤️" : "🤍"}
                  </button>

                  <a href={`/bean/${bean.id}`} className={styles.productLink}>
                    {bean.image && (
                      <div className={styles.productImageWrapper}>
                        <img
                          src={bean.image || "/placeholder.svg"}
                          alt={bean.beanName}
                          className={styles.productImage}
                        />
                      </div>
                    )}
                    <div className={styles.productInfo}>
                      <h3 className={styles.productName}>{bean.beanName}</h3>
                      <p className={styles.productOrigin}>{bean.origin}</p>
                      <p className={styles.productDetails}>
                        {bean.roastLevel === "light"
                          ? "라이트 로스트"
                          : bean.roastLevel === "medium"
                          ? "미디엄 로스트"
                          : "다크 로스트"}{" "}
                        · {bean.weight}
                      </p>
                      <p className={styles.productPrice}>
                        {Number.parseInt(bean.price).toLocaleString()}원
                      </p>
                      {bean.location && (
                        <p className={styles.productLocation}>
                          📍 {bean.location}
                        </p>
                      )}
                    </div>
                  </a>

                  <button
                    className={styles.addToCartButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(bean);
                    }}
                  >
                    장바구니 담기
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        <footer className={styles.footer}>
          <div className={styles.footerContent}>
            <p className={styles.footerText}>
              © 2025 DabeanChi. 원두 거래 플랫폼
            </p>
            <p className={styles.footerText}>문의: dcpop28201004@gmail.com</p>
          </div>
        </footer>
      </div>
    );
}
