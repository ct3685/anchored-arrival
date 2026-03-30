import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Gallery | Trevor - Ranch Squad';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background:
          'linear-gradient(135deg, #0C0A09 0%, #1C1917 50%, #0C0A09 100%)',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '-100px',
          left: '-100px',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(245,158,11,0.3) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-100px',
          right: '-100px',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(220,38,38,0.25) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '60px',
          padding: '60px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '320px',
            height: '320px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #F59E0B, #DC2626, #40E0D0)',
            padding: '6px',
          }}
        >
          <div
            style={{
              width: '308px',
              height: '308px',
              borderRadius: '50%',
              background: '#1C1917',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '120px',
            }}
          >
            📸
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <div
            style={{
              fontSize: '20px',
              fontWeight: 600,
              color: '#DC2626',
              letterSpacing: '4px',
              textTransform: 'uppercase',
            }}
          >
            Proof of Life
          </div>
          <div
            style={{
              fontSize: '72px',
              fontWeight: 800,
              background:
                'linear-gradient(135deg, #F59E0B 0%, #FFD700 50%, #40E0D0 100%)',
              backgroundClip: 'text',
              color: 'transparent',
              lineHeight: 1.1,
            }}
          >
            Ranch Gallery
          </div>
          <div
            style={{
              fontSize: '28px',
              fontWeight: 500,
              color: '#FFD700',
              marginTop: '16px',
            }}
          >
            Country Energy. Big Vibes.
          </div>
          <div
            style={{
              fontSize: '22px',
              fontWeight: 400,
              color: '#A8A29E',
              marginTop: '8px',
            }}
          >
            Trevor & Ranch Squad
          </div>
        </div>
      </div>
    </div>,
    {
      ...size,
    }
  );
}
