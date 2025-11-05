// frontend/app/recommendation/result/page.jsx
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import RecommendationResult from "@/components/RecommendationResult"

export default function RecommendationResultPage() {
  const router = useRouter()
  const [recommendation, setRecommendation] = useState(null)

  useEffect(() => {
    // 세션 스토리지에서 추천 결과 가져오기
    const rec = sessionStorage.getItem('recommendation')
    if (rec) {
      setRecommendation(JSON.parse(rec))
    } else {
      // 추천 결과가 없으면 메인 페이지로 리다이렉트
      router.push('/')
    }
  }, [router])

  const handleClose = () => {
    router.push('/')
  }

  if (!recommendation) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>로딩 중...</div>
  }

  return (
    <div style={{ padding: '20px' }}>
      <RecommendationResult 
        recommendation={recommendation} 
        onClose={handleClose} 
      />
    </div>
  )
}