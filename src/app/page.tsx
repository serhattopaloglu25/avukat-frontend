import Link from 'next/link';

export default function LandingPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Header */}
      <header style={{
        padding: '16px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            background: 'white',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px'
          }}>
            ⚖️
          </div>
          <span style={{ fontSize: '20px', fontWeight: 700, color: 'white' }}>
            AvukatAjanda
          </span>
        </div>
        
        <nav style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          <a href="#" style={{ color: 'white', textDecoration: 'none', fontSize: '14px' }}>Özellikler</a>
          <a href="#" style={{ color: 'white', textDecoration: 'none', fontSize: '14px' }}>Referanslar</a>
          <a href="#" style={{ color: 'white', textDecoration: 'none', fontSize: '14px' }}>Fiyatlar</a>
          <Link href="/login" style={{
            background: 'rgba(255,255,255,0.2)',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '14px',
            border: '1px solid rgba(255,255,255,0.3)'
          }}>
            Giriş Yap
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <div style={{
        textAlign: 'center',
        padding: '80px 24px',
        color: 'white'
      }}>
        <h1 style={{
          fontSize: '48px',
          fontWeight: 700,
          marginBottom: '24px',
          lineHeight: '1.2'
        }}>
          Avukatlar İçin<br />
          <span style={{
            background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Akıllı Ajanda
          </span>
        </h1>
        
        <p style={{
          fontSize: '20px',
          marginBottom: '48px',
          opacity: 0.9,
          maxWidth: '600px',
          margin: '0 auto 48px auto'
        }}>
          Müşterilerinizi, randevularınızı ve davalarınızı tek platformda yönetin. Hukuk 
          pratiğinizi dijitalleştirin, verimliliğinizi artırın.
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <button style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '16px 32px',
            borderRadius: '8px',
            border: 'none',
            fontSize: '16px',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
          }}>
            Ücretsiz Deneyin →
          </button>
          
          <Link href="/login" style={{
            background: 'transparent',
            color: 'white',
            padding: '16px 32px',
            borderRadius: '8px',
            border: '2px solid rgba(255,255,255,0.3)',
            fontSize: '16px',
            fontWeight: 600,
            textDecoration: 'none',
            display: 'inline-block'
          }}>
            Demo İzleyin
          </Link>
        </div>
      </div>

      {/* Features */}
      <div style={{
        background: 'rgba(255,255,255,0.1)',
        padding: '80px 24px',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '32px',
          textAlign: 'center',
          color: 'white'
        }}>
          <div>
            <div style={{ fontSize: '32px', marginBottom: '16px' }}>📅</div>
            <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>Ajanda & Hatırlatmalar</h3>
            <p style={{ opacity: 0.8, fontSize: '14px' }}>Duruşmalar ve görevler için hatırlatma alın.</p>
          </div>
          
          <div>
            <div style={{ fontSize: '32px', marginBottom: '16px' }}>📁</div>
            <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>Dosya & Notlar</h3>
            <p style={{ opacity: 0.8, fontSize: '14px' }}>Müvekkil dosyalarını ve notlarını tek yerde toplayın.</p>
          </div>
          
          <div>
            <div style={{ fontSize: '32px', marginBottom: '16px' }}>👥</div>
            <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>Müvekkil Takibi</h3>
            <p style={{ opacity: 0.8, fontSize: '14px' }}>İletişim ve süreç yönetimini kolaylaştırın.</p>
          </div>
          
          <div>
            <div style={{ fontSize: '32px', marginBottom: '16px' }}>🔒</div>
            <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>Güvenlik</h3>
            <p style={{ opacity: 0.8, fontSize: '14px' }}>Verileriniz şifreli, güvenli ve sadece size özel.</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        padding: '32px 24px',
        color: 'rgba(255,255,255,0.7)',
        fontSize: '14px'
      }}>
        © 2025 AvukatAjanda. Tüm hakları saklıdır.
      </footer>
    </div>
  );
}
