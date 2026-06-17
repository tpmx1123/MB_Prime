/**
 * Instagram Graph API proxy — add to your existing Express API server.
 *
 * Required env vars (server-side only, never expose to the frontend):
 *   INSTAGRAM_BUSINESS_ACCOUNT_ID  — Instagram Business/Creator account ID
 *   INSTAGRAM_ACCESS_TOKEN         — Long-lived Meta user/page access token
 *
 * Mount:
 *   const instagramFeedRoute = require('./instagramFeed.route.example');
 *   app.use(instagramFeedRoute);
 *
 * Token setup: https://developers.facebook.com/docs/instagram-api/getting-started
 */

const express = require('express');

const router = express.Router();
const CACHE_TTL_MS = 15 * 60 * 1000;
let cache = { data: null, cachedAt: 0 };

const FIELDS = [
  'username',
  'name',
  'profile_picture_url',
  'followers_count',
  'media.limit(25){id,caption,media_type,media_url,thumbnail_url,permalink,timestamp}',
].join(',');

function mapMediaItem(item) {
  return {
    id: item.id,
    caption: item.caption || '',
    media_type: item.media_type,
    media_url: item.media_url || null,
    thumbnail_url: item.thumbnail_url || null,
    permalink: item.permalink,
    timestamp: item.timestamp,
  };
}

router.get('/api/instagram/feed', async (req, res) => {
  try {
    if (cache.data && Date.now() - cache.cachedAt < CACHE_TTL_MS) {
      return res.json(cache.data);
    }

    const accountId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID;
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

    if (!accountId || !accessToken) {
      return res.status(503).json({
        message: 'Instagram API credentials are not configured on the server.',
      });
    }

    const url = new URL(`https://graph.facebook.com/v21.0/${accountId}`);
    url.searchParams.set('fields', FIELDS);
    url.searchParams.set('access_token', accessToken);

    const response = await fetch(url);
    const payload = await response.json();

    if (!response.ok) {
      console.error('Instagram Graph API error:', payload);
      if (cache.data) return res.json(cache.data);
      return res.status(response.status).json({
        message: payload?.error?.message || 'Instagram API request failed',
      });
    }

    const data = {
      profile: {
        username: payload.username,
        name: payload.name,
        profilePictureUrl: payload.profile_picture_url,
        followersCount: payload.followers_count ?? null,
      },
      posts: (payload.media?.data || []).map(mapMediaItem),
    };

    cache = { data, cachedAt: Date.now() };
    return res.json(data);
  } catch (err) {
    console.error('Instagram feed route error:', err);
    if (cache.data) return res.json(cache.data);
    return res.status(500).json({ message: 'Failed to load Instagram feed' });
  }
});

module.exports = router;
