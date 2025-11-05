"use client"

import { useState, useEffect } from "react"
import styles from "./cart.module.css"

export default function Cart() {
  const [cart, setCart] = useState([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]")
    setCart(cartItems)
    calculateTotal(cartItems)
  }, [])

  const calculateTotal = (items) => {
    const sum = items.reduce((acc, item) => acc + Number.parseInt(item.price), 0)
    setTotal(sum)
  }

  const removeFromCart = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index)
    setCart(updatedCart)
    localStorage.setItem("cart", JSON.stringify(updatedCart))
    calculateTotal(updatedCart)
  }

  const clearCart = () => {
    if (confirm("장바구니를 비우시겠습니까?")) {
      setCart([])
      localStorage.setItem("cart", JSON.stringify([]))
      setTotal(0)
    }
  }

  const checkout = () => {
    if (cart.length === 0) {
      alert("장바구니가 비어있습니다!")
      return
    }
    alert(`총 ${total.toLocaleString()}원 결제가 완료되었습니다!`)
    setCart([])
    localStorage.setItem("cart", JSON.stringify([]))
    setTotal(0)
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <a href="/" className={styles.logo}>
          DabeanChi
        </a>
        <a href="/" className={styles.backButton}>
          ← 쇼핑 계속하기
        </a>
      </header>

      <div className={styles.cartWrapper}>
        <h1 className={styles.title}>장바구니</h1>

        {cart.length === 0 ? (
          <div className={styles.emptyCart}>
            <p className={styles.emptyText}>장바구니가 비어있습니다</p>
            <a href="/" className={styles.shopButton}>
              원두 둘러보기
            </a>
          </div>
        ) : (
          <>
            <div className={styles.cartItems}>
              {cart.map((item, index) => (
                <div key={index} className={styles.cartItem}>
                  {item.image && (
                    <div className={styles.itemImageWrapper}>
                      <img src={item.image || "/placeholder.svg"} alt={item.beanName} className={styles.itemImage} />
                    </div>
                  )}
                  <div className={styles.itemInfo}>
                    <h3 className={styles.itemName}>{item.beanName}</h3>
                    <p className={styles.itemOrigin}>{item.origin}</p>
                    <p className={styles.itemDetails}>
                      {item.roastLevel === "light"
                        ? "라이트 로스트"
                        : item.roastLevel === "medium"
                          ? "미디엄 로스트"
                          : "다크 로스트"}{" "}
                      · {item.weight}
                    </p>
                  </div>
                  <div className={styles.itemPrice}>{Number.parseInt(item.price).toLocaleString()}원</div>
                  <button className={styles.removeButton} onClick={() => removeFromCart(index)}>
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <div className={styles.cartSummary}>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>상품 개수</span>
                <span className={styles.summaryValue}>{cart.length}개</span>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>배송비</span>
                <span className={styles.summaryValue}>무료</span>
              </div>
              <div className={styles.totalRow}>
                <span className={styles.totalLabel}>총 결제금액</span>
                <span className={styles.totalValue}>{total.toLocaleString()}원</span>
              </div>
              <div className={styles.buttonGroup}>
                <button className={styles.clearButton} onClick={clearCart}>
                  장바구니 비우기
                </button>
                <button className={styles.checkoutButton} onClick={checkout}>
                  결제하기
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
