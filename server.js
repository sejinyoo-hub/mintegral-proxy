const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/mintegral-data', async (req, res) => {
  const { start, end } = req.query;
  const url = `https://report-api.mintegral.com/open/api/report/v2` +
              `?api_key=5bdddd44355f1caf61ec8fefaf5c9d86&start_date=${start}&end_date=${end}` +
              `&timezone=Asia/Seoul&dimension=unit_id&metric=request,impression,click,est_revenue`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (e) {
    res.status(500).json({ error: 'Mintegral fetch failed', details: e.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
