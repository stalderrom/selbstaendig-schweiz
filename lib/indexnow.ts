/**
 * IndexNow Implementation für selbstaendig-schweiz.ch
 *
 * IndexNow ermöglicht es, Suchmaschinen sofort über neue/aktualisierte URLs zu informieren.
 * Unterstützt: Bing, Yandex, Seznam.cz, Naver, und indirekt Google.
 *
 * Dokumentation: https://www.indexnow.org/
 */

const INDEXNOW_API_KEY = '7d22c5dd-0c94-432e-b929-6355d1bc0152';
const SITE_HOST = 'www.xn--selbstndig-schweiz-qtb.ch'; // Punycode for technical compatibility

/**
 * Sendet eine einzelne URL an IndexNow
 */
export async function notifyIndexNow(url: string): Promise<{
  success: boolean;
  message: string;
  statusCode?: number;
}> {
  try {
    // Validierung
    if (!url.startsWith('https://')) {
      return {
        success: false,
        message: 'URL must start with https://',
      };
    }

    // IndexNow API Request
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        host: SITE_HOST,
        key: INDEXNOW_API_KEY,
        keyLocation: `https://${SITE_HOST}/${INDEXNOW_API_KEY}.txt`,
        urlList: [url],
      }),
    });

    const statusCode = response.status;

    // Status Code Handling
    // 200: OK - URL successfully submitted
    // 202: Accepted - URL received (may be already indexed)
    // 400: Bad Request - Invalid format
    // 403: Forbidden - Key mismatch
    // 422: Unprocessable - URL not owned or invalid
    // 429: Too Many Requests - Rate limit exceeded

    if (statusCode === 200 || statusCode === 202) {
      console.log(`✅ IndexNow: Successfully submitted ${url}`);
      return {
        success: true,
        message: `URL successfully submitted to IndexNow (${statusCode})`,
        statusCode,
      };
    } else {
      const errorText = await response.text();
      console.error(`❌ IndexNow Error (${statusCode}):`, errorText);
      return {
        success: false,
        message: `IndexNow returned status ${statusCode}: ${errorText}`,
        statusCode,
      };
    }
  } catch (error) {
    console.error('❌ IndexNow Error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Sendet mehrere URLs an IndexNow (Batch)
 * Max. 10.000 URLs pro Request (empfohlen: max. 100 für beste Performance)
 */
export async function notifyIndexNowBatch(urls: string[]): Promise<{
  success: boolean;
  message: string;
  submitted: number;
  statusCode?: number;
}> {
  try {
    // Validierung
    if (urls.length === 0) {
      return {
        success: false,
        message: 'No URLs provided',
        submitted: 0,
      };
    }

    if (urls.length > 100) {
      console.warn(
        `⚠️ Warning: Submitting ${urls.length} URLs. Recommended max: 100`
      );
    }

    // Nur HTTPS URLs
    const validUrls = urls.filter((url) => url.startsWith('https://'));
    if (validUrls.length !== urls.length) {
      console.warn(
        `⚠️ Warning: ${urls.length - validUrls.length} URLs were skipped (not HTTPS)`
      );
    }

    // IndexNow API Request
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        host: SITE_HOST,
        key: INDEXNOW_API_KEY,
        keyLocation: `https://${SITE_HOST}/${INDEXNOW_API_KEY}.txt`,
        urlList: validUrls,
      }),
    });

    const statusCode = response.status;

    if (statusCode === 200 || statusCode === 202) {
      console.log(
        `✅ IndexNow: Successfully submitted ${validUrls.length} URLs`
      );
      return {
        success: true,
        message: `${validUrls.length} URLs successfully submitted to IndexNow`,
        submitted: validUrls.length,
        statusCode,
      };
    } else {
      const errorText = await response.text();
      console.error(`❌ IndexNow Batch Error (${statusCode}):`, errorText);
      return {
        success: false,
        message: `IndexNow returned status ${statusCode}: ${errorText}`,
        submitted: 0,
        statusCode,
      };
    }
  } catch (error) {
    console.error('❌ IndexNow Batch Error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error',
      submitted: 0,
    };
  }
}

/**
 * Generiert URLs für alle Artikel und sendet sie an IndexNow
 * Nützlich für initialen Batch-Submit oder Re-Indexierung
 */
export async function submitAllArticles(
  articleSlugs: string[]
): Promise<{
  success: boolean;
  message: string;
  submitted: number;
}> {
  const urls = articleSlugs.map(
    (slug) => `https://${SITE_HOST}/artikel/${slug}`
  );

  return await notifyIndexNowBatch(urls);
}

/**
 * Helper: Erstellt URLs aus Slugs
 */
export function createArticleUrl(slug: string): string {
  return `https://${SITE_HOST}/artikel/${slug}`;
}

export function createCategoryUrl(slug: string): string {
  return `https://${SITE_HOST}/kategorie/${slug}`;
}

/**
 * IndexNow für spezifische Seiten-Typen
 */
export async function notifyArticle(slug: string) {
  return await notifyIndexNow(createArticleUrl(slug));
}

export async function notifyCategory(slug: string) {
  return await notifyIndexNow(createCategoryUrl(slug));
}

export async function notifyHomepage() {
  return await notifyIndexNow(`https://${SITE_HOST}`);
}

/**
 * Rate Limiting Helper
 * IndexNow erlaubt max. 1000 Requests pro Tag pro Host
 * Diese Funktion stellt sicher, dass wir nicht zu viele Requests senden
 */
let requestCount = 0;
const MAX_REQUESTS_PER_DAY = 1000;

export function canSubmitToIndexNow(): boolean {
  if (requestCount >= MAX_REQUESTS_PER_DAY) {
    console.warn(
      `⚠️ IndexNow rate limit reached (${MAX_REQUESTS_PER_DAY}/day)`
    );
    return false;
  }
  return true;
}

export function incrementRequestCount() {
  requestCount++;
}

export function resetRequestCount() {
  requestCount = 0;
}
