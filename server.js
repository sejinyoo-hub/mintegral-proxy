const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/mintegral-data', async (req, res) => {
  const { start, end } = req.query;

  const url = `https://report-api.mintegral.com/open/api/report/v2` +
              `?api_key=8fa2684f7c6432e313272aaaeb3a772a&start_date=${start}&end_date=${end}` +
              `&timezone=Asia/Seoul&dimension=unit_id&metric=request,impression,click,est_revenue`;

  console.log('🟢 Fetching Mintegral API from:', url); // ✅ 호출 URL 확인용

  try {
    const response = await axios.get(url);
    console.log('✅ Mintegral API response received:', response.status); // 상태 코드 확인
    res.json(response.data);
  } catch (e) {
    console.error('❌ Fetch error occurred:', e.message);              // 에러 요약
    if (e.response) {
      console.error('📦 Error response data:', e.response.data);       // 서버 응답 내용
      console.error('📄 Error status:', e.response.status);            // 응답 코드
    } else if (e.request) {
      console.error('📡 No response received. Raw request:', e.request);
    } else {
      console.error('⚠️ Axios config error:', e.message);
    }

    res.status(500).json({
      error: 'Mintegral fetch failed',
      details: e.message,
      status: e.response?.status || null,
      response: e.response?.data || null
    });
  }
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
