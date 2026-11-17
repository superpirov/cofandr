/**
 * Простое ограничение частоты создания платежей в памяти процесса.
 * shortcut: на serverless каждый инстанс считает отдельно — при высокой нагрузке
 * перенести в Redis/Upstash или подключить WAF.
 */
const buckets = new Map<string, number[]>();

export function rateLimit(key: string, limit = 6, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const hits = (buckets.get(key) ?? []).filter((time) => now - time < windowMs);
  if (hits.length >= limit) {
    buckets.set(key, hits);
    return false;
  }
  hits.push(now);
  buckets.set(key, hits);

  if (buckets.size > 5000) {
    for (const [bucketKey, times] of buckets) {
      if (times.every((time) => now - time >= windowMs)) buckets.delete(bucketKey);
    }
  }
  return true;
}
