import { NextResponse } from 'next/server'
import axios from 'axios'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const lat = searchParams.get('lat')
  const lon = searchParams.get('lon')
  const city = searchParams.get('city')

  if (!lat && !lon && !city) {
    return NextResponse.json(
      { error: '위도와 경도 또는 도시 이름이 필요합니다.' },
      { status: 400 },
    )
  }

  try {
    const response = await axios.get(
      'https://api.openweathermap.org/data/2.5/weather',
      {
        params: {
          ...(lat && lon ? { lat, lon } : { q: city }),
          appid: process.env.OPENWEATHERMAP_API_KEY,
          units: 'metric',
        },
      },
    )

    return NextResponse.json(response.data)
  } catch (error) {
    console.error('날씨 데이터 가져오기 오류:', error)
    return NextResponse.json(
      { error: '날씨 데이터를 가져오는 중 오류가 발생했습니다.' },
      { status: 500 },
    )
  }
}
