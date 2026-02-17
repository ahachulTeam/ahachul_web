#!/usr/bin/env node
import process from 'node:process';

const DEFAULT_TIMEOUT_MS = 15000;
const DEFAULT_ROUTES = ['/', '/community', '/complaint', '/lost-found'];

function parseArgs(argv) {
  return argv.reduce((acc, current) => {
    if (!current.startsWith('--')) return acc;

    const [rawKey, ...rawValue] = current.slice(2).split('=');
    const key = rawKey.trim();
    const value = rawValue.join('=').trim();

    acc[key] = value || 'true';
    return acc;
  }, {});
}

function ensureBaseUrl(rawBaseUrl) {
  if (!rawBaseUrl) {
    throw new Error('Missing required argument: --base-url');
  }

  const normalized = rawBaseUrl.endsWith('/') ? rawBaseUrl.slice(0, -1) : rawBaseUrl;

  new URL(normalized);
  return normalized;
}

function toRouteList(rawRoutes) {
  if (!rawRoutes) {
    return DEFAULT_ROUTES;
  }

  return rawRoutes
    .split(',')
    .map(route => route.trim())
    .filter(Boolean);
}

function toAbsoluteUrl(baseUrl, pathLike) {
  if (pathLike.startsWith('http://') || pathLike.startsWith('https://')) {
    return pathLike;
  }

  const normalizedPath = pathLike.startsWith('/') ? pathLike : `/${pathLike}`;
  return new URL(normalizedPath, `${baseUrl}/`).toString();
}

function extractAssetUrls(html, routeUrl) {
  const assetUrls = new Set();
  const tagPattern = /<(script|link)\\b[^>]+(?:src|href)=["']([^"']+)["'][^>]*>/gi;
  let match = null;

  while ((match = tagPattern.exec(html)) !== null) {
    const candidate = match[2];

    if (!candidate || candidate.startsWith('data:') || candidate.startsWith('javascript:')) {
      continue;
    }

    const absoluteUrl = new URL(candidate, routeUrl).toString();
    const pathname = new URL(absoluteUrl).pathname;

    const isStaticChunkPath =
      pathname.includes('/_next/static/') ||
      pathname.includes('/assets/') ||
      pathname.includes('/static/');
    const isKnownAssetExt = /\.(css|js|mjs|map|woff2?|ttf|otf)(\?|$)/.test(pathname);

    if (isStaticChunkPath || isKnownAssetExt) {
      assetUrls.add(absoluteUrl);
    }
  }

  return [...assetUrls];
}

function hasImmutableCachePolicy(cacheControl) {
  if (!cacheControl) return false;

  if (cacheControl.includes('immutable')) {
    return true;
  }

  const maxAgeMatch = cacheControl.match(/max-age=(\d+)/);
  if (!maxAgeMatch) return false;

  const maxAge = Number(maxAgeMatch[1]);
  return Number.isFinite(maxAge) && maxAge >= 31536000;
}

function isImmutableAssetPath(url) {
  const pathname = new URL(url).pathname;
  return (
    pathname.includes('/_next/static/') ||
    pathname.includes('/assets/') ||
    pathname.includes('/static/') ||
    /\.(css|js|mjs|woff2?|ttf|otf)(\?|$)/.test(pathname)
  );
}

async function fetchWithTimeout(url, options, timeoutMs) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal,
      redirect: 'follow',
    });
  } finally {
    clearTimeout(timeout);
  }
}

async function assertAssetReachable(url, timeoutMs) {
  const headResponse = await fetchWithTimeout(url, { method: 'HEAD' }, timeoutMs).catch(() => null);

  if (headResponse?.ok) {
    return headResponse;
  }

  const getResponse = await fetchWithTimeout(url, { method: 'GET' }, timeoutMs);
  if (!getResponse.ok) {
    throw new Error(`Asset request failed (${getResponse.status})`);
  }

  return getResponse;
}

async function run() {
  const args = parseArgs(process.argv.slice(2));
  const baseUrl = ensureBaseUrl(args['base-url']);
  const routes = toRouteList(args.routes);
  const timeoutMs = Number(args['timeout-ms'] ?? DEFAULT_TIMEOUT_MS);
  const product = args.product ?? 'unknown';

  if (!Number.isFinite(timeoutMs) || timeoutMs <= 0) {
    throw new Error(`Invalid timeout value: ${args['timeout-ms']}`);
  }

  const failures = [];
  const warnings = [];
  const discoveredAssets = new Set();

  console.log(`[smoke] product=${product}`);
  console.log(`[smoke] base=${baseUrl}`);
  console.log(`[smoke] routes=${routes.join(', ')}`);

  for (const route of routes) {
    const routeUrl = toAbsoluteUrl(baseUrl, route);
    const bustUrl = new URL(routeUrl);
    bustUrl.searchParams.set('__smoke', `${Date.now()}`);

    try {
      const response = await fetchWithTimeout(bustUrl.toString(), { method: 'GET' }, timeoutMs);
      if (!response.ok) {
        failures.push(`[route] ${routeUrl} -> ${response.status}`);
        continue;
      }

      const cacheControl = response.headers.get('cache-control') ?? '';
      if (cacheControl && !/(no-cache|no-store|max-age=0)/.test(cacheControl)) {
        warnings.push(`[route-cache] ${routeUrl} cache-control="${cacheControl}"`);
      }

      const html = await response.text();
      const assets = extractAssetUrls(html, routeUrl);

      if (assets.length === 0) {
        warnings.push(`[route-assets] ${routeUrl} did not expose chunk/static asset references`);
      }

      assets.forEach(assetUrl => discoveredAssets.add(assetUrl));
      console.log(`[route-ok] ${routeUrl} assets=${assets.length}`);
    } catch (error) {
      failures.push(
        `[route] ${routeUrl} -> ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  for (const assetUrl of discoveredAssets) {
    try {
      const response = await assertAssetReachable(assetUrl, timeoutMs);
      const cacheControl = response.headers.get('cache-control') ?? '';

      if (isImmutableAssetPath(assetUrl) && !hasImmutableCachePolicy(cacheControl)) {
        failures.push(`[asset-cache] ${assetUrl} cache-control="${cacheControl}"`);
        continue;
      }

      console.log(`[asset-ok] ${assetUrl}`);
    } catch (error) {
      failures.push(
        `[asset] ${assetUrl} -> ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  if (warnings.length > 0) {
    console.log('\n[smoke] warnings');
    warnings.forEach(warning => console.log(`- ${warning}`));
  }

  if (failures.length > 0) {
    console.error('\n[smoke] failures');
    failures.forEach(failure => console.error(`- ${failure}`));
    process.exit(1);
  }

  console.log(`\n[smoke] success routes=${routes.length} assets=${discoveredAssets.size}`);
}

run().catch(error => {
  console.error(`[smoke] fatal ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
});
