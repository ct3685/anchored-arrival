import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Trevor | Ranch Squad';
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
          'linear-gradient(135deg, #0D0A07 0%, #1A1510 50%, #0D0A07 100%)',
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
            'radial-gradient(circle, rgba(212,160,23,0.3) 0%, transparent 70%)',
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
            'radial-gradient(circle, rgba(139,37,0,0.25) 0%, transparent 70%)',
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
            background: 'linear-gradient(135deg, #D4A017, #8B2500, #6B8E23)',
            padding: '6px',
          }}
        >
          <div
            style={{
              width: '308px',
              height: '308px',
              borderRadius: '50%',
              background: '#1A1510',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '120px',
            }}
          >
            🤠
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
              color: '#8B2500',
              letterSpacing: '4px',
              textTransform: 'uppercase',
            }}
          >
            Welcome to the
          </div>

          <div
            style={{
              fontSize: '72px',
              fontWeight: 800,
              background:
                'linear-gradient(135deg, #D4A017 0%, #FFD700 50%, #6B8E23 100%)',
              backgroundClip: 'text',
              color: 'transparent',
              lineHeight: 1.1,
            }}
          >
            Ranch Squad
          </div>

          <div
            style={{
              fontSize: '28px',
              fontWeight: 500,
              color: '#FFD700',
              marginTop: '16px',
            }}
          >
            Gooder Than Shit
          </div>

          <div
            style={{
              fontSize: '22px',
              fontWeight: 400,
              color: '#B8A88A',
              marginTop: '8px',
            }}
          >
            TikTok LIVE Pro • Ranch Squad Commander
          </div>
        </div>
      </div>
    </div>,
    {
      ...size,
    }
  );
}
