"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import RecommendationResult from "@/components/RecommendationResult"

export default function RecommendationResultPage() {
  const router = useRouter()
  const [recommendation, setRecommendation] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // 세션 스토리지에서 추천 결과 가져오기
    const savedRecommendation = sessionStorage.getItem('recommendation')
    
    if (savedRecommendation) {
      try {
        setRecommendation(JSON.parse(savedRecommendation))
      } catch (err) {
        console.error('Error parsing recommendation:', err)
        setError('추천 정보를 불러오는 중 오류가 발생했습니다.')
      }
    } else {
      setError('추천 정보를 찾을 수 없습니다. 다시 시도해 주세요.')
    }
    
    setIsLoading(false)
  }, [])

  const handleClose = () => {
    // 이전 페이지로 이동하거나 메인 페이지로 리다이렉트
    router.push('/')
  }

  if (isLoading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p>추천 정보를 불러오는 중입니다...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div style={styles.errorContainer}>
        <h2>오류 발생</h2>
        <p>{error}</p>
        <button 
          onClick={handleClose}
          style={styles.button}
        >
          메인으로 돌아가기
        </button>
      </div>
    )
  }

  return (
    <div style={styles.container}>
      <RecommendationResult 
        recommendation={recommendation} 
        onClose={handleClose} 
      />
    </div>
  )
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    minHeight: '80vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '50vh',
    gap: '20px'
  },
  spinner: {
    border: '5px solid #f3f3f3',
    borderTop: '5px solid #3498db',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    animation: 'spin 1s linear infinite'
  },
  errorContainer: {
    textAlign: 'center',
    padding: '40px 20px',
    maxWidth: '600px',
    margin: '0 auto'
  },
  button: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px'
  },
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' }
  }
}
