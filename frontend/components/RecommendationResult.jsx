"use client"

import { useRouter } from "next/navigation"

export default function RecommendationResult({ recommendation, onClose }) {
  const router = useRouter()
  
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>추천 원두</h2>
      
      <div style={styles.card}>
        <h3 style={styles.coffeeName}>
          {recommendation.name || '이름 없음'}
        </h3>
        
        <div style={styles.detailsGrid}>
          <div>
            <p><strong>원산지:</strong> {recommendation.origin || '정보 없음'}</p>
            <p><strong>로스팅 레벨:</strong> {recommendation.roast_level || '정보 없음'}</p>
            <p><strong>가격:</strong> {recommendation.price ? `${recommendation.price.toLocaleString()}원` : '가격 정보 없음'}</p>
          </div>
          <div>
            {/* Taste information removed as per user's request */}
          </div>
        </div>

        {recommendation.description && (
          <div style={styles.descriptionBox}>
            <h4 style={styles.descriptionTitle}>원두 설명</h4>
            <p>{recommendation.description}</p>
          </div>
        )}

        <div style={styles.buttonContainer}>
          <button
            onClick={onClose}
            style={styles.closeButton}
          >
            닫기
          </button>
          <button
            onClick={() => {
              // 여기에 장바구니 추가 로직을 구현하세요
              alert('장바구니에 추가되었습니다!');
            }}
            style={styles.addToCartButton}
          >
            장바구니에 추가
          </button>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    textAlign: 'center'
  },
  title: { 
    marginBottom: '30px',
    color: '#2c3e50',
    fontSize: '2rem',
    fontWeight: 'bold'
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: '12px',
    padding: '25px',
    marginBottom: '20px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  coffeeName: { 
    fontSize: '24px', 
    color: '#2c3e50',
    marginBottom: '20px',
    fontWeight: '600'
  },
  detailsGrid: { 
    display: 'grid', 
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
    marginBottom: '25px',
    textAlign: 'left',
    padding: '15px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  },
  descriptionBox: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '25px',
    textAlign: 'left',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  },
  descriptionTitle: { 
    marginTop: 0, 
    color: '#2c3e50',
    fontSize: '1.1rem',
    marginBottom: '10px',
    fontWeight: '500'
  },
  buttonContainer: { 
    display: 'flex', 
    justifyContent: 'center',
    gap: '15px',
    marginTop: '25px',
    flexWrap: 'wrap'
  },
  closeButton: {
    padding: '12px 25px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    ':hover': {
      backgroundColor: '#d32f2f',
      transform: 'translateY(-2px)'
    }
  },
  addToCartButton: {
    padding: '12px 25px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    ':hover': {
      backgroundColor: '#388e3c',
      transform: 'translateY(-2px)'
    }
  }
}
