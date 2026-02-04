import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Agent Morgie | Main Character Energy';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  // Fetch the avatar image
  const avatarUrl = 'https://agentmorgie.com/images/main-character.png';

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background:
          'linear-gradient(135deg, #0D0D1A 0%, #1A1A2E 50%, #0D0D1A 100%)',
        position: 'relative',
      }}
    >
      {/* Gradient orb - top left */}
      <div
        style={{
          position: 'absolute',
          top: '-100px',
          left: '-100px',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(255,105,180,0.3) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Gradient orb - bottom right */}
      <div
        style={{
          position: 'absolute',
          bottom: '-100px',
          right: '-100px',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(0,212,255,0.25) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Content container */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '60px',
          padding: '60px',
        }}
      >
        {/* Avatar with gradient border */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '320px',
            height: '320px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FF69B4, #00D4FF, #9B59B6)',
            padding: '6px',
          }}
        >
          <img
            src={avatarUrl}
            alt="Agent Morgie"
            width={308}
            height={308}
            style={{
              borderRadius: '50%',
              objectFit: 'cover',
            }}
          />
        </div>

        {/* Text content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          {/* Overline */}
          <div
            style={{
              fontSize: '20px',
              fontWeight: 600,
              color: '#00D4FF',
              letterSpacing: '4px',
              textTransform: 'uppercase',
            }}
          >
            Welcome to the world of
          </div>

          {/* Main title */}
          <div
            style={{
              fontSize: '72px',
              fontWeight: 800,
              background:
                'linear-gradient(135deg, #FF69B4 0%, #00D4FF 50%, #9B59B6 100%)',
              backgroundClip: 'text',
              color: 'transparent',
              lineHeight: 1.1,
            }}
          >
            Agent Morgie
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: '28px',
              fontWeight: 500,
              color: '#FFD700',
              marginTop: '16px',
            }}
          >
            Main Character Energy
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: '22px',
              fontWeight: 400,
              color: '#B8B8D1',
              marginTop: '8px',
            }}
          >
            TikTok LIVE Creator • Community Driven
          </div>
        </div>
      </div>
    </div>,
    {
      ...size,
    }
  );
}
