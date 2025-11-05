"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from 'axios'


export default function RecommendationButton() {
  const router = useRouter()
  const [showOptions, setShowOptions] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [preferences, setPreferences] = useState({
    limit: 10,      // Number of recommendations
    offset: 0,      // For pagination
    acid: 5,        // Acidity (0-10)
    sweet: 5,       // Sweetness (0-10)
    body: 5,        // Body (0-10)
    cupnote: 'fruity' // Flavor note
  })

  const handleOptionSelect = () => {
    setShowOptions(true)
  }

  const handleRecommendation = async () => {
    try {
      setIsLoading(true)
      
      // Prepare request body with specific fields for the backend
      const requestBody = {
        acid: preferences.acid,
        sweet: preferences.sweet,
        body: preferences.body,
        cupnote: preferences.cupnote,
      }

      console.log('Sending request with body:', requestBody);

      const response = await axios({
        method: 'post',
        url: 'https://ef6e92c5c7f4.ngrok-free.app/api/coffee/recommend',
        data: requestBody,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      const responseData = response.data;
      console.log('Received response data:', responseData);
      
      if (!responseData || (Array.isArray(responseData) && responseData.length === 0)) {
        throw new Error('추천 결과를 찾을 수 없습니다. 다른 조건으로 시도해 주세요.');
      }

      // Store recommendation in session storage
      sessionStorage.setItem('recommendation', JSON.stringify(responseData[0] || responseData));
      // Navigate to recommendation result page
      router.push('/recommendation/result');
    } catch (error) {
      console.error('Error in handleRecommendation:', {
        error: error,
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        stack: error.stack
      });
      
      const errorMessage = error.response?.data?.message || 
                         error.message || 
                         '요청 처리 중 오류가 발생했습니다.';
      alert(`오류가 발생했습니다: ${errorMessage}`);
    } finally {
      setIsLoading(false)
      setShowOptions(false)
    }
  }

  return (
    <>
      <button 
        onClick={handleOptionSelect}
        style={{
          marginLeft: '10px',
          padding: '5px 10px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        추천받기
      </button>

      {/* Options Modal */}
      {showOptions && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
          zIndex: 1000,
          width: '300px'
        }}>
          <h3>커피 취향을 선택하세요</h3>
          
          <div style={{ margin: '15px 0' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>신맛: {preferences.acid.toFixed(1)}</label>
            <input 
              type="range" 
              min="0" 
              max="10" 
              step="0.5"
              value={preferences.acid} 
              onChange={(e) => setPreferences({...preferences, acid: parseFloat(e.target.value)})}
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ margin: '15px 0' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>단맛: {preferences.sweet.toFixed(1)}</label>
            <input 
              type="range" 
              min="0" 
              max="10" 
              step="0.5"
              value={preferences.sweet} 
              onChange={(e) => setPreferences({...preferences, sweet: parseFloat(e.target.value)})}
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ margin: '15px 0 20px 0' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>고소한맛: {preferences.body.toFixed(1)}</label>
            <input 
              type="range" 
              min="0" 
              max="10" 
              step="0.5"
              value={preferences.body} 
              onChange={(e) => setPreferences({...preferences, body: parseFloat(e.target.value)})}
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>향 선택</label>
            <select 
              value={preferences.cupnote}
              onChange={(e) => setPreferences({...preferences, cupnote: e.target.value})}
              style={{ width: '100%', padding: '8px', borderRadius: '4px' }}
            >
              <option value="fruit">fruit</option>
              <option value="berry">berry</option>
              <option value="chocolate">chocolate</option>
              <option value="floral">floral</option>
            </select>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button 
              onClick={() => setShowOptions(false)}
              style={{
                padding: '8px 16px',
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              취소
            </button>
            <button 
              onClick={handleRecommendation}
              disabled={isLoading}
              style={{
                padding: '8px 16px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                opacity: isLoading ? 0.7 : 1
              }}
            >
              {isLoading ? 'Loading...' : '추천받기'}
            </button>
          </div>
        </div>
      )}
    </>
  )
}