// frontend/components/RecommendationResult.jsx
"use client"

import { useRouter } from "next/navigation"

export default function RecommendationResult({ recommendation, onClose }) {
  const router = useRouter()
  
  return (
    <div style={{
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
      textAlign: 'center'
    }}>
      <h2 style={{ marginBottom: '30px' }}>추천 원두</h2>
      
      <div style={{
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '20px'
      }}>
        <h3 style={{ 
          fontSize: '24px', 
          color: '#2c3e50',
          marginBottom: '15px'
        }}>
          {recommendation.name || '이름 없음'}
        </h3>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr',
          gap: '15px',
          marginBottom: '20px',
          textAlign: 'left'
        }}>
          <div>
            <p><strong>원산지:</strong> {recommendation.origin || '정보 없음'}</p>
            <p><strong>로스팅 레벨:</strong> {recommendation.roast_level || '정보 없음'}</p>
            <p><strong>가격:</strong> {recommendation.price ? `${recommendation.price.toLocaleString()}원` : '가격 정보 없음'}</p>
          </div>
          <div>
          </div>
        </div>

        {recommendation.description && (
          <div style={{
            backgroundColor: 'white',
            padding: '15px',
            borderRadius: '8px',
            marginBottom: '20px',
            textAlign: 'left'
          }}>
            <h4 style={{ marginTop: 0, color: '#2c3e50' }}>원두 설명</h4>
            <p>{recommendation.description}</p>
          </div>
        )}

        <div style={{ 
          display: 'flex', 
          justifyContent: 'center',
          gap: '10px',
          marginTop: '20px'
        }}>
          <button
            onClick={onClose}
            style={{
              padding: '10px 20px',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            닫기
          </button>
          <button
            onClick={() => {
              // 여기에 장바구니 추가 로직을 구현하세요
              alert('장바구니에 추가되었습니다!');
            }}
            style={{
              padding: '10px 20px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            장바구니에 추가
          </button>
        </div>
      </div>
    </div>
  )
}