import autocannon from 'autocannon';
import lighthouse from 'lighthouse';
import puppeteer from 'puppeteer';

async function runPerformanceTests() {
  // Lighthouse 테스트
  const browser = await puppeteer.launch({ headless: true });
  const results = await lighthouse('http://localhost:3000', {
    port: new URL(browser.wsEndpoint()).port,
    output: 'html',
    logLevel: 'info',
  });

  console.log('Lighthouse scores:', results.lhr.categories.performance.score * 100);

  // 부하 테스트
  const loadTestResults = await autocannon({
    url: 'http://localhost:3000',
    connections: 10,
    duration: 10,
  });

  console.log('Load test results:', {
    'Avg Latency': loadTestResults.latency.average,
    'Req/Sec': loadTestResults.requests.average,
  });

  await browser.close();
}

runPerformanceTests().catch(console.error);
