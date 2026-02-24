const fs = require('fs');
const { chromium } = require('@playwright/test');

const API_HINT_SEGMENTS = [
  '/auth',
  '/members',
  '/community-posts',
  '/community-hot-posts',
  '/complaint-posts',
  '/lost-posts',
  '/subway-lines',
  '/trains',
  '/v2/',
  '/common/presigned',
  '/comments',
  '/message-rooms',
  '/signout',
];

const ONE_APP_PARITY_GAP_ROUTES = new Set([
  '/community/1001/edit',
  '/complaint/2001/edit',
  '/me/setting',
  '/me/setting/account',
  '/talk',
  '/talk/1',
  '/talk/settings',
  '/setting',
  '/hashtag',
  '/subway',
  '/subway/map',
  '/subway/timeline',
  '/news/1',
  '/comments/7001/edit?returnTo=/community/1001',
  '/comments/7001/reply?returnTo=/community/1001',
  '/login/settings/subway',
  '/login/settings/nickname',
  '/user/%EC%95%84%EC%B0%A8%EC%B2%A0%EB%9F%AC/settings',
  '/user/%EC%95%84%EC%B0%A8%EC%B2%A0%EB%9F%AC/preview',
]);

const appSuites = [
  {
    name: 'vite-app-mock',
    baseUrl: 'http://127.0.0.1:4173',
    routes: [
      '/',
      '/community',
      '/community/1001',
      '/community/new',
      '/community/1001/edit',
      '/complaint',
      '/complaint/panel',
      '/complaint/2001',
      '/complaint/new',
      '/complaint/2001/edit',
      '/lost-found',
      '/lost-found/3001',
      '/lost-found/new',
      '/lost-found/3001/edit',
      '/me',
      '/me/setting',
      '/me/setting/account',
      '/talk',
      '/talk/1',
      '/talk/settings',
      '/notification',
      '/notification/settings',
      '/setting',
      '/hashtag',
      '/subway',
      '/subway/map',
      '/subway/timeline',
      '/news/1',
      '/comments/7001/edit?returnTo=/community/1001',
      '/comments/7001/reply?returnTo=/community/1001',
      '/login',
      '/login/callback?type=KAKAO&code=mock-provider-code',
      '/login/settings/subway',
      '/login/settings/nickname',
    ],
  },
  {
    name: 'next-one-app-mock',
    baseUrl: 'http://127.0.0.1:3100',
    routes: [
      '/',
      '/community',
      '/community/1001',
      '/community/new',
      '/community/1001/edit',
      '/complaint',
      '/complaint/panel',
      '/complaint/2001',
      '/complaint/new',
      '/complaint/2001/edit',
      '/lost-found',
      '/lost-found/3001',
      '/lost-found/new',
      '/lost-found/3001/edit',
      '/me',
      '/me/setting',
      '/me/setting/account',
      '/messages',
      '/notifications',
      '/talk',
      '/talk/1',
      '/talk/settings',
      '/setting',
      '/hashtag',
      '/subway',
      '/subway/map',
      '/subway/timeline',
      '/news/1',
      '/comments/7001/edit?returnTo=/community/1001',
      '/comments/7001/reply?returnTo=/community/1001',
      '/login',
      '/login/callback?type=KAKAO&code=mock-provider-code',
      '/login/settings/subway',
      '/login/settings/nickname',
      '/user/%EC%95%84%EC%B0%A8%EC%B2%A0%EB%9F%AC',
      '/user/%EC%95%84%EC%B0%A8%EC%B2%A0%EB%9F%AC/settings',
      '/user/%EC%95%84%EC%B0%A8%EC%B2%A0%EB%9F%AC/preview',
    ],
  },
];

function isLikelyApi(url) {
  return API_HINT_SEGMENTS.some(seg => url.includes(seg));
}

function isIgnorableConsoleError(text) {
  const ignorePatterns = [
    'favicon.ico',
    'deprecated',
    'hydration',
    'Download the React DevTools',
    'WebSocket',
    'use --host to expose',
  ];
  return ignorePatterns.some(pattern => text.includes(pattern));
}

function isKnownParityGap(suiteName, route, responseStatus) {
  if (suiteName !== 'next-one-app-mock') {
    return false;
  }

  return responseStatus === 404 && ONE_APP_PARITY_GAP_ROUTES.has(route);
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const report = {
    generatedAt: new Date().toISOString(),
    suites: [],
    totals: {
      checkedRoutes: 0,
      failedRoutes: 0,
      consoleErrors: 0,
      pageErrors: 0,
      apiRequestFailures: 0,
      apiRequestNetworkFailures: 0,
      unhandledMockSignals: 0,
      parityGaps: 0,
    },
  };

  for (const suite of appSuites) {
    const context = await browser.newContext();
    const suiteResult = {
      name: suite.name,
      baseUrl: suite.baseUrl,
      checkedRoutes: 0,
      failedRoutes: 0,
      parityGaps: 0,
      routes: [],
    };

    if (suite.name === 'next-one-app-mock') {
      await context.addCookies([
        {
          name: 'access_token',
          value: 'mock-access-token',
          domain: '127.0.0.1',
          path: '/',
        },
        {
          name: 'refresh_token',
          value: 'mock-refresh-token',
          domain: '127.0.0.1',
          path: '/',
        },
      ]);
    }

    // Next/Vite dev server의 최초 컴파일 구간에서 간헐 페이지 에러가 발생해
    // 본격 라우트 순회 전에 기본 경로를 한 번 워밍업한다.
    const warmupPage = await context.newPage();
    try {
      await warmupPage.goto(`${suite.baseUrl}/`, {
        waitUntil: 'domcontentloaded',
        timeout: 20000,
      });
      await warmupPage.waitForTimeout(700);
    } catch {
      // 워밍업 실패는 본 순회에서 다시 검출되므로 무시한다.
    }
    await warmupPage.close();

    for (const route of suite.routes) {
      const page = await context.newPage();
      const consoleErrors = [];
      const pageErrors = [];
      const apiRequestFailures = [];
      const apiRequestNetworkFailures = [];
      const unhandledMockSignals = [];

      page.on('console', msg => {
        const text = msg.text();
        if (text.includes('Unhandled mock API endpoint') || text.includes('[MSW] Error')) {
          unhandledMockSignals.push({ type: msg.type(), text });
        }
        if (msg.type() === 'error' && !isIgnorableConsoleError(text)) {
          consoleErrors.push({ type: msg.type(), text });
        }
      });

      page.on('pageerror', err => {
        pageErrors.push({ name: err.name, message: err.message });
      });

      page.on('response', response => {
        const status = response.status();
        const url = response.url();
        if (status >= 400 && isLikelyApi(url)) {
          apiRequestFailures.push({ status, url, method: response.request().method() });
        }
      });

      page.on('requestfailed', request => {
        const url = request.url();
        if (!isLikelyApi(url)) {
          return;
        }
        apiRequestNetworkFailures.push({
          url,
          method: request.method(),
          errorText: request.failure()?.errorText ?? 'unknown',
        });
      });

      let navigationError = null;
      let responseStatus = null;
      let finalUrl = null;
      let title = null;

      try {
        const response = await page.goto(`${suite.baseUrl}${route}`, {
          waitUntil: 'domcontentloaded',
          timeout: 20000,
        });
        responseStatus = response ? response.status() : null;
        await page.waitForTimeout(1200);
        finalUrl = page.url();
        title = await page.title();
      } catch (error) {
        navigationError = error instanceof Error ? error.message : String(error);
      }

      const parityGap = isKnownParityGap(suite.name, route, responseStatus);
      const failed =
        navigationError !== null ||
        (responseStatus !== null && responseStatus >= 400 && !parityGap) ||
        pageErrors.length > 0 ||
        apiRequestFailures.some(item => item.status >= 500) ||
        apiRequestNetworkFailures.length > 0 ||
        unhandledMockSignals.length > 0;

      const routeResult = {
        route,
        responseStatus,
        finalUrl,
        title,
        navigationError,
        failed,
        parityGap,
        consoleErrors,
        pageErrors,
        apiRequestFailures,
        apiRequestNetworkFailures,
        unhandledMockSignals,
      };

      suiteResult.routes.push(routeResult);
      suiteResult.checkedRoutes += 1;
      if (parityGap) suiteResult.parityGaps += 1;
      if (failed) suiteResult.failedRoutes += 1;

      report.totals.checkedRoutes += 1;
      if (parityGap) report.totals.parityGaps += 1;
      if (failed) report.totals.failedRoutes += 1;
      report.totals.consoleErrors += consoleErrors.length;
      report.totals.pageErrors += pageErrors.length;
      report.totals.apiRequestFailures += apiRequestFailures.length;
      report.totals.apiRequestNetworkFailures += apiRequestNetworkFailures.length;
      report.totals.unhandledMockSignals += unhandledMockSignals.length;

      await page.close();
    }

    report.suites.push(suiteResult);
    await context.close();
  }

  await browser.close();

  const outputPath = '/tmp/playwright_mock_smoke_report.json';
  fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));

  const summaryLines = [];
  summaryLines.push(`generatedAt=${report.generatedAt}`);
  summaryLines.push(`checkedRoutes=${report.totals.checkedRoutes}`);
  summaryLines.push(`failedRoutes=${report.totals.failedRoutes}`);
  summaryLines.push(`consoleErrors=${report.totals.consoleErrors}`);
  summaryLines.push(`pageErrors=${report.totals.pageErrors}`);
  summaryLines.push(`apiRequestFailures=${report.totals.apiRequestFailures}`);
  summaryLines.push(`apiRequestNetworkFailures=${report.totals.apiRequestNetworkFailures}`);
  summaryLines.push(`unhandledMockSignals=${report.totals.unhandledMockSignals}`);
  summaryLines.push(`parityGaps=${report.totals.parityGaps}`);

  for (const suite of report.suites) {
    summaryLines.push(
      `${suite.name}: failed=${suite.failedRoutes}/${suite.checkedRoutes}, parityGaps=${suite.parityGaps}`,
    );
  }

  fs.writeFileSync('/tmp/playwright_mock_smoke_summary.txt', `${summaryLines.join('\n')}\n`);
  console.log(summaryLines.join('\n'));
  console.log(`report=${outputPath}`);
})();
