'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Box, Container, Typography, Grid, Card, CardActionArea,
  Skeleton, Stack, Alert, IconButton, Chip,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { motion } from 'motion/react';
import { colors, clipPaths } from '@/theme/theme';

interface SocialPost {
  id: string;
  platform: string;
  title: string;
  url: string;
  thumbnail: string;
  author: string;
}

export default function SocialFeed() {
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const tiktokUser = 'trevor_bfit';
  const instagramUser = 'trevor_bfit';

  const fetchFeed = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/social-feed?user=${tiktokUser}&limit=10`);
      const data = await res.json();
      if (data.meta?.error) setError(data.meta.error);
      setPosts(data.posts || []);
    } catch { setError('Failed to load social feed'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchFeed(); }, [fetchFeed]);

  return (
    <Box sx={{ minHeight: '100vh', pt: { xs: 10, sm: 12 }, pb: 8, background: `radial-gradient(ellipse at 50% 0%, ${colors.amber}08 0%, transparent 50%), linear-gradient(180deg, ${colors.smokeBlack} 0%, ${colors.coalBrown} 40%, ${colors.smokeBlack} 100%)` }}>
      <Container maxWidth="lg">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Stack direction="row" alignItems="flex-start" justifyContent="space-between" sx={{ mb: 1 }}>
            <Box>
              <Typography variant="overline" sx={{ color: colors.brass, display: 'block', letterSpacing: 6, fontSize: '0.75rem', mb: 0.5 }}>Stay Connected</Typography>
              <Typography variant="h2" sx={{ fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }, background: `linear-gradient(135deg, ${colors.amber} 0%, ${colors.red} 100%)`, backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Social Feed</Typography>
            </Box>
            <IconButton onClick={fetchFeed} disabled={loading} sx={{ mt: 1, color: colors.amber, border: `1px solid ${colors.brass}44`, '&:hover': { borderColor: colors.amber, boxShadow: `0 0 16px ${colors.amber}33` } }}>
              <RefreshIcon sx={{ animation: loading ? 'spin 1s linear infinite' : 'none', '@keyframes spin': { '0%': { transform: 'rotate(0deg)' }, '100%': { transform: 'rotate(360deg)' } } }} />
            </IconButton>
          </Stack>
          <Typography variant="body2" sx={{ color: colors.dust, mb: 5, maxWidth: 500 }}>Latest videos from Trevor — tap any post to watch on TikTok.</Typography>
        </motion.div>

        {error && !loading && posts.length === 0 && (
          <Alert severity="warning" sx={{ mb: 3, bgcolor: `${colors.red}22`, color: colors.bone, border: `1px solid ${colors.red}44`, '& .MuiAlert-icon': { color: colors.red } }}>
            Couldn&apos;t load posts right now — try refreshing in a bit.
          </Alert>
        )}

        {loading && posts.length === 0 && (
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <Grid size={{ xs: 6, sm: 4, md: 3 }} key={i}>
                <Skeleton variant="rounded" sx={{ bgcolor: `${colors.dust}15`, borderRadius: 1, aspectRatio: '9/16', width: '100%' }} />
              </Grid>
            ))}
          </Grid>
        )}

        <Grid container spacing={{ xs: 2, md: 3 }}>
          {posts.map((post, index) => (
            <Grid size={{ xs: 6, sm: 4, md: 3 }} key={post.id}>
              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.06, duration: 0.45, ease: 'easeOut' }}>
                <Card sx={{ bgcolor: 'transparent', boxShadow: 'none', borderRadius: 1, overflow: 'hidden', transition: 'transform 0.25s ease, box-shadow 0.25s ease', '&:hover': { transform: 'translateY(-4px) scale(1.02)', boxShadow: `0 8px 32px rgba(0,0,0,0.5), 0 0 24px ${colors.amber}15`, '& .play-overlay': { opacity: 1 }, '& .card-image': { filter: 'brightness(1.1)' } } }}>
                  <CardActionArea href={post.url} target="_blank" rel="noopener noreferrer" sx={{ position: 'relative' }}>
                    <Box sx={{ position: 'relative', width: '100%', aspectRatio: '9/16', overflow: 'hidden', bgcolor: colors.darkLeather, clipPath: clipPaths.clippedCornerSm }}>
                      {post.thumbnail ? (
                        <Box component="img" className="card-image" src={post.thumbnail} alt={post.title} sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'filter 0.25s ease' }} />
                      ) : (
                        <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `linear-gradient(180deg, ${colors.darkLeather} 0%, ${colors.coalBrown} 100%)` }}>
                          <Typography sx={{ fontSize: '3rem', opacity: 0.2, color: colors.dust }}>♪</Typography>
                        </Box>
                      )}
                      <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%', background: 'linear-gradient(transparent, rgba(0,0,0,0.85))', pointerEvents: 'none' }} />
                      <Box className="play-overlay" sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.25s ease', pointerEvents: 'none' }}>
                        <Box sx={{ width: 56, height: 56, borderRadius: '50%', bgcolor: 'rgba(0,0,0,0.6)', border: `2px solid ${colors.amber}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 20px ${colors.amber}44` }}>
                          <PlayArrowIcon sx={{ color: colors.amber, fontSize: 32 }} />
                        </Box>
                      </Box>
                      <Chip label="TikTok" size="small" sx={{ position: 'absolute', top: 8, left: 8, bgcolor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', color: '#00f2ea', fontWeight: 700, fontSize: '0.6rem', letterSpacing: '0.08em', textTransform: 'uppercase', height: 20, '& .MuiChip-label': { px: 1 } }} />
                      <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, p: 1.5 }}>
                        <Typography variant="body2" sx={{ color: '#fff', fontWeight: 500, fontSize: { xs: '0.7rem', sm: '0.8rem' }, lineHeight: 1.3, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
                          {post.title || 'Watch video'}
                        </Typography>
                      </Box>
                    </Box>
                  </CardActionArea>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {!loading && posts.length === 0 && !error && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <VisibilityIcon sx={{ fontSize: 48, color: colors.dust, opacity: 0.3, mb: 2 }} />
            <Typography variant="h5" color="text.secondary">No posts found</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>Check back soon for new content.</Typography>
          </Box>
        )}

        {posts.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.5 }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} justifyContent="center" alignItems="center" sx={{ mt: 6, pt: 4, borderTop: `1px solid ${colors.brass}22` }}>
              <Box component="a" href={`https://tiktok.com/@${tiktokUser}`} target="_blank" rel="noopener noreferrer" sx={{ color: colors.dust, textDecoration: 'none', fontWeight: 600, fontSize: '0.85rem', letterSpacing: '0.04em', transition: 'color 0.2s ease', '&:hover': { color: '#00f2ea' } }}>
                TikTok → @{tiktokUser}
              </Box>
              <Box sx={{ width: 4, height: 4, borderRadius: '50%', bgcolor: `${colors.brass}44`, display: { xs: 'none', sm: 'block' } }} />
              <Box component="a" href={`https://instagram.com/${instagramUser}`} target="_blank" rel="noopener noreferrer" sx={{ color: colors.dust, textDecoration: 'none', fontWeight: 600, fontSize: '0.85rem', letterSpacing: '0.04em', transition: 'color 0.2s ease', '&:hover': { color: '#E1306C' } }}>
                Instagram → @{instagramUser}
              </Box>
            </Stack>
          </motion.div>
        )}
      </Container>
    </Box>
  );
}
