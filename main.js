// ------------------------------------------------------
// main.js
//  - Uzun sayıya (15 haneli) özel “Sayıyı Gör” butonu
//  - Dil çevirileri, input kontrolü, hesaplama, grafik vs.
//  - theme.js’in hemen ardından yüklenmelidir.
// ------------------------------------------------------


/* ------------------------------------------------------
   1) Çeviriler & Para Birimi Bilgileri
------------------------------------------------------- */
const translations = {
  en: {
    years_label: 'Investment Period',
    years_unit: 'years',
    years_unit_suffix: 'years',
    interest_label: 'Annual Interest Rate',
    monthly_label: 'Monthly Contribution',
    calculate_btn: 'Calculate Growth',
    result_title: 'Total Value After',
    contributions_title: 'Total Contributions',
    interest_title: 'Interest Earned',
    chart_title: 'Investment Growth Over Time',
    total_balance: 'Total Balance',
    total_contributions: 'Total Contributions',
    year_axis: 'Year',
    negative_input_error: 'Please enter a value greater than or equal to 0.',
    interest_negative_error: 'Interest rate must be at least 0.1%.',
    full_number_modal_title: 'Full Number',
    close_btn: 'Close',
    view_full_number_label: 'View full number'
  },
  tr: {
    years_label: 'Yatırım Süresi',
    years_unit: 'yıl',
    years_unit_suffix: 'yıl sonra',
    interest_label: 'Yıllık Faiz Oranı',
    monthly_label: 'Aylık Katkı',
    calculate_btn: 'Büyümeyi Hesapla',
    result_title: 'Toplam Değer -',
    contributions_title: 'Toplam Katkı',
    interest_title: 'Kazanılan Faiz',
    chart_title: 'Zaman İçinde Yatırım Büyümesi',
    total_balance: 'Toplam Bakiye',
    total_contributions: 'Toplam Katkı',
    year_axis: 'Yıl',
    negative_input_error: "Lütfen 0'dan büyük veya eşit bir değer girin.",
    interest_negative_error: 'Faiz oranı en az %0.1 olmalıdır.',
    full_number_modal_title: 'Tam Sayı',
    close_btn: 'Kapat',
    view_full_number_label: 'Tam sayıyı görüntüle'
  },
  az: {
    years_label: 'Investisiya Müddəti',
    years_unit: 'il',
    years_unit_suffix: 'il sonra',
    interest_label: 'İllik Faiz Dərəcəsi',
    monthly_label: 'Aylıq Töhfə',
    calculate_btn: 'Artımı Hesabla',
    result_title: 'Ümumi Dəyər -',
    contributions_title: 'Ümumi Töhfə',
    interest_title: 'Qazanılan Faiz',
    chart_title: 'Vaxt İçində İnvestisiya Artımı',
    total_balance: 'Ümumi Balans',
    total_contributions: 'Ümumi Töhfə',
    year_axis: 'İl',
    negative_input_error: 'Zəhmət olmasa, 0-dan böyük və ya bərabər bir dəyər daxil edin.',
    interest_negative_error: 'Faiz dərəcəsi ən azı 0.1% olmalıdır.',
    full_number_modal_title: 'Tam Ədəd',
    close_btn: 'Bağla',
    view_full_number_label: 'Tam ədədi göstər'
  },
  ru: {
    years_label: 'Период Инвестирования',
    years_unit: 'лет',
    years_unit_suffix: 'лет',
    interest_label: 'Годовая Процентная Ставка',
    monthly_label: 'Ежемесячный Вклад',
    calculate_btn: 'Рассчитать Рост',
    result_title: 'Общая Стоимость Через',
    contributions_title: 'Общие Взносы',
    interest_title: 'Заработанные Проценты',
    chart_title: 'Рост Инвестиций Во Времени',
    total_balance: 'Общий Баланс',
    total_contributions: 'Общие Взносы',
    year_axis: 'Год',
    negative_input_error: 'Пожалуйста, введите значение больше или равное 0.',
    interest_negative_error: 'Процентная ставка должна быть не менее 0.1%.',
    full_number_modal_title: 'Полное число',
    close_btn: 'Закрыть',
    view_full_number_label: 'Посмотреть полное число'
  }
};

const currencies = {
  en: { symbol: '$', code: 'USD' },
  tr: { symbol: '₺', code: 'TRY' },
  az: { symbol: '₼', code: 'AZN' },
  ru: { symbol: '₽', code: 'RUB' }
};


/* ------------------------------------------------------
   2) Uluslararasılaştırma & Para Birimi Formatlama
------------------------------------------------------- */
let currentLanguage = 'en';

function getLocale() {
  const locales = { en: 'en-US', tr: 'tr-TR', az: 'az-AZ', ru: 'ru-RU' };
  return locales[currentLanguage] || 'en-US';
}

function formatCurrency(amount) {
  return new Intl.NumberFormat(getLocale(), {
    style: 'currency',
    currency: currencies[currentLanguage].code,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}


/* ------------------------------------------------------
   3) Dil Değiştirme İşlemleri
------------------------------------------------------- */
function updateLanguage() {
  document.querySelectorAll('[data-translate]').forEach(element => {
    const key = element.getAttribute('data-translate');
    if (translations[currentLanguage] && translations[currentLanguage][key]) {
      element.textContent = translations[currentLanguage][key];
    }
  });
  document.querySelectorAll('[data-translate-aria]').forEach(element => {
    const key = element.getAttribute('data-translate-aria');
    if (translations[currentLanguage] && translations[currentLanguage][key]) {
      element.setAttribute('aria-label', translations[currentLanguage][key]);
    }
  });
  // Placeholders'ı her zaman sabit tutuyoruz
  document.getElementById('years').placeholder = '1';
  document.getElementById('interest').placeholder = '1.0';
  document.getElementById('money').placeholder = '100';
}

function updateCurrencySymbol() {
  document.getElementById('currencySymbol').textContent = currencies[currentLanguage].symbol;
}

function changeLanguage() {
  currentLanguage = document.getElementById('languageSelect').value;
  updateLanguage();
  updateCurrencySymbol();
  if (!isFirstCalculation) {
    calculate();
  }
}


/* ------------------------------------------------------
   4) Ekran Altı Uyarı (Toast) İşlevi
------------------------------------------------------- */
function showToast(message, duration = 3000) {
  const toastElement = document.getElementById('toastNotification');
  const messageElement = document.getElementById('toastMessage');
  if (!toastElement || !messageElement) return;

  messageElement.textContent = message;
  toastElement.classList.add('show');
  setTimeout(() => {
    toastElement.classList.remove('show');
  }, duration);
}


/* ------------------------------------------------------
   5) Input Kontrolleri & “Tam Sayı Göster” Butonu
------------------------------------------------------- */
function isNumericString(str) {
  if (typeof str !== 'string') return false;
  return !isNaN(str) && !isNaN(parseFloat(str));
}

function validateInput(inputElement) {
  const rawValue = inputElement.dataset.fullValue || inputElement.value;
  const val = parseFloat(rawValue);

  if (rawValue !== '' && isNumericString(rawValue) && val < 0) {
    showToast(translations[currentLanguage]?.negative_input_error || 'Input cannot be negative.');
    inputElement.value = '';
    inputElement.dataset.fullValue = '';
  }
}

function handleNumericInput(event) {
  const inputElement = event.target;
  let value = inputElement.value;

  // 12 karakteri geçmeyen bir sınır koy
  if (value.length > 12) {
    value = value.slice(0, 12);
    inputElement.value = value;
  }

  inputElement.dataset.fullValue = value;

  const viewBtn = inputElement.nextElementSibling;
  if (isNumericString(value)) {
    const num = parseFloat(value);
    const stringRep = num.toString();
    const displayThreshold = 9;
    if (
      value.length > displayThreshold ||
      stringRep.length > displayThreshold ||
      value.toLowerCase().includes('e')
    ) {
      if (viewBtn && viewBtn.classList.contains('view-full-number-btn')) {
        viewBtn.style.display = 'inline-block';
      }
    } else {
      if (viewBtn && viewBtn.classList.contains('view-full-number-btn')) {
        viewBtn.style.display = 'none';
      }
    }
  } else {
    if (viewBtn && viewBtn.classList.contains('view-full-number-btn')) {
      viewBtn.style.display = 'none';
    }
    if (value.trim() === '' || (value !== '-' && value !== '.' && !isNumericString(value))) {
      inputElement.dataset.fullValue = '';
    }
  }

  validateInput(inputElement);
  checkInputs();

  if (!isFirstCalculation && !document.getElementById('calculateBtn').disabled) {
    if (calculateTimeout) clearTimeout(calculateTimeout);
    calculateTimeout = setTimeout(calculate, 400);
  }
}

function checkInputs() {
  const yearsRaw = document.getElementById('years').dataset.fullValue || document.getElementById('years').value;
  const interestRaw = document.getElementById('interest').dataset.fullValue || document.getElementById('interest').value;
  const moneyRaw = document.getElementById('money').dataset.fullValue || document.getElementById('money').value;

  const years = parseFloat(yearsRaw);
  const interest = parseFloat(interestRaw);
  const money = parseFloat(moneyRaw);

  const yearsMin = parseFloat(document.getElementById('years').min);
  const interestMin = parseFloat(document.getElementById('interest').min);
  const moneyMin = parseFloat(document.getElementById('money').min);

  const allFilledAndValid =
    isNumericString(yearsRaw) && years >= yearsMin &&
    isNumericString(interestRaw) && interest >= interestMin &&
    isNumericString(moneyRaw) && money >= moneyMin;

  document.getElementById('calculateBtn').disabled = !allFilledAndValid;
}


/* ------------------------------------------------------
   6) “15 Haneden Uzun” Kontrolü & Buton Oluşturma Helper’ı
------------------------------------------------------- */
/**
 * Bir HTML elemanına direk sayı yazmak yerine,
 * eğer hane sayısı > 15 ise <button> yerleştirir.
 * Butona tıklanınca alert() ile tam sayıyı gösterir.
 *
 * @param {HTMLElement} containerElement - Sayının yerleşeceği DOM elementi
 * @param {number|string} rawNumber - Tam sayı (örneğin 1234567890123456 gibi)
 * @param {string} formattedNumber - Çok büyük olsa bile göstermek istediğimiz formatlı metin (örn. “$1,234,567,890,123,456”)
 */
function displayValueOrButton(containerElement, rawNumber, formattedNumber) {
  // rawNumber’ı string olarak alıyoruz, noktalar ya da virgül varsa kaldırıyoruz:
  const rawStr = rawNumber.toString().replace(/[^0-9]/g, '');
  if (rawStr.length > 15) {
    // 15 haneden uzunsa buton göster
    containerElement.innerHTML = '';
    const btn = document.createElement('button');
    btn.textContent = translations[currentLanguage].view_full_number_label;
    btn.classList.add('long-number-btn');
    btn.addEventListener('click', () => {
      alert(formattedNumber);
    });
    containerElement.appendChild(btn);
  } else {
    // Normal uzunlukta ise doğrudan metin olarak yaz
    containerElement.textContent = formattedNumber;
  }
}


/* ------------------------------------------------------
   7) Hesaplama & Grafik Güncelleme
------------------------------------------------------- */
let chart = null;
let isFirstCalculation = true;
let calculateTimeout = null;

function calculate() {
  const yearsRaw = document.getElementById('years').dataset.fullValue || document.getElementById('years').value;
  const interestRaw = document.getElementById('interest').dataset.fullValue || document.getElementById('interest').value;
  const moneyRaw = document.getElementById('money').dataset.fullValue || document.getElementById('money').value;

  let years = parseFloat(yearsRaw);
  let annualInterestRate = parseFloat(interestRaw);
  let monthlyContribution = parseFloat(moneyRaw);

  if (
    isNaN(years) || years < parseFloat(document.getElementById('years').min) ||
    isNaN(annualInterestRate) || annualInterestRate < parseFloat(document.getElementById('interest').min) ||
    isNaN(monthlyContribution) || monthlyContribution < parseFloat(document.getElementById('money').min)
  ) {
    checkInputs();
    return;
  }

  const interestFactor = 1 + annualInterestRate / 100;
  let yearlyData = [];
  let currentBalance = 0;
  yearlyData.push({ year: 0, balance: 0, contributions: 0 });

  for (let i = 1; i <= years; i++) {
    currentBalance = (monthlyContribution * 12) + (currentBalance * interestFactor);
    yearlyData.push({
      year: i,
      balance: currentBalance,
      contributions: monthlyContribution * 12 * i
    });
  }

  const finalBalance = currentBalance;
  const totalContributions = monthlyContribution * 12 * years;
  const interestEarned = finalBalance - totalContributions;

  // Şimdi “displayValueOrButton” ile hem raw hem formatlı sayıyı veriyoruz:
  const resultAmountEl = document.getElementById('result-amount');
  const contributionsEl = document.getElementById('total-contributions');
  const interestEl = document.getElementById('interest-earned');

  const formattedFinal = formatCurrency(finalBalance);
  const formattedContrib = formatCurrency(totalContributions);
  const formattedInterest = formatCurrency(interestEarned);

  displayValueOrButton(resultAmountEl, Math.trunc(finalBalance), formattedFinal);
  displayValueOrButton(contributionsEl, Math.trunc(totalContributions), formattedContrib);
  displayValueOrButton(interestEl, Math.trunc(interestEarned), formattedInterest);

  // Yıl bilgisini doğrudan koyabiliriz (ki hane sayısı asla 15’den uzun olmaz)
  document.getElementById('result-years').textContent = years;

  const resultSection = document.getElementById('result-section');
  resultSection.style.display = 'block';
  if (!resultSection.classList.contains('animate-fade-in') || isFirstCalculation) {
    resultSection.classList.remove('animate-fade-in');
    void resultSection.offsetWidth;
    resultSection.classList.add('animate-fade-in');
  }

  const chartSection = document.getElementById('chartSection');
  if (isFirstCalculation) {
    chartSection.classList.add('visible');
    chartSection.classList.remove('animate-fade-in');
    void chartSection.offsetWidth;
    chartSection.classList.add('animate-fade-in');
    isFirstCalculation = false;
  }
  updateChart(yearlyData);
}

function updateChart(data) {
  const ctx = document.getElementById('growthChart').getContext('2d');
  if (chart) chart.destroy();

  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const textColor = isDark ? '#f9fafb' : '#333333';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)';
  const theme = window.currentChosenTheme;

  const maxYear = Math.max(...data.map(d => d.year));
  let stepSize = 1;
  if (maxYear > 20) stepSize = 5;
  else if (maxYear > 10) stepSize = 2;

  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.map(d => d.year),
      datasets: [
        {
          label: translations[currentLanguage].total_balance,
          data: data.map(d => d.balance),
          borderColor: theme.chartLineColor,
          backgroundColor: theme.chartFillColor,
          borderWidth: 2.5,
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 6,
          pointBackgroundColor: theme.chartLineColor,
          pointBorderColor: isDark ? '#1f2937' : '#ffffff',
          pointHoverBackgroundColor: theme.chartLineColor,
          pointHoverBorderColor: isDark ? '#1f2937' : '#ffffff',
          pointBorderWidth: 2,
          pointHoverBorderWidth: 2
        },
        {
          label: translations[currentLanguage].total_contributions,
          data: data.map(d => d.contributions),
          borderColor: isDark ? '#6b7280' : '#9ca3af',
          backgroundColor: isDark ? 'rgba(107, 114, 128, 0.1)' : 'rgba(156, 163, 175, 0.1)',
          borderWidth: 2,
          fill: false,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 6,
          pointBackgroundColor: isDark ? '#6b7280' : '#9ca3af',
          pointBorderColor: isDark ? '#1f2937' : '#ffffff',
          pointHoverBackgroundColor: isDark ? '#6b7280' : '#9ca3af',
          pointHoverBorderColor: isDark ? '#1f2937' : '#ffffff',
          pointBorderWidth: 2,
          pointHoverBorderWidth: 2
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 800, easing: 'easeOutCubic' },
      plugins: {
        legend: {
          position: 'top',
          labels: {
            usePointStyle: true,
            padding: 15,
            color: textColor,
            font: { size: 11, weight: '600' }
          }
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          backgroundColor: isDark ? 'rgba(0,0,0,0.85)' : 'rgba(255,255,255,0.9)',
          titleColor: textColor,
          bodyColor: textColor,
          borderColor: theme.chartLineColor,
          borderWidth: 1,
          padding: 10,
          titleFont: { size: 12 },
          bodyFont: { size: 11 },
          displayColors: true,
          boxPadding: 4,
          callbacks: {
            label: context => context.dataset.label + ': ' + formatCurrency(context.parsed.y)
          }
        }
      },
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: translations[currentLanguage].year_axis,
            color: textColor,
            font: { size: 11, weight: '600' }
          },
          grid: { color: gridColor, lineWidth: 0.5 },
          ticks: {
            color: textColor,
            font: { size: 10 },
            stepSize: stepSize,
            maxTicksLimit: 10
          }
        },
        y: {
          grid: { color: gridColor, lineWidth: 0.5 },
          ticks: {
            color: textColor,
            callback: value => formatCurrency(value),
            font: { size: 10 },
            maxTicksLimit: 7
          }
        }
      },
      interaction: { intersect: false, mode: 'index' }
    }
  });
}


/* ------------------------------------------------------
   8) Modal: “Tam Sayı Göster” İşlemleri
------------------------------------------------------- */
const fullNumberModal = document.getElementById('fullNumberModal');
const fullNumberDisplay = document.getElementById('fullNumberDisplay');
const closeFullNumberModalBtn = document.getElementById('closeFullNumberModalBtn');

function showFullNumberModal(numberStr) {
  fullNumberDisplay.textContent = numberStr;
  fullNumberModal.classList.add('show');
}

function closeFullNumberModal() {
  fullNumberModal.classList.remove('show');
}

closeFullNumberModalBtn.addEventListener('click', closeFullNumberModal);
fullNumberModal.addEventListener('click', function(event) {
  if (event.target === fullNumberModal) {
    closeFullNumberModal();
  }
});


/* ------------------------------------------------------
   9) Sayfa Yüklendiğinde Yapılacaklar
------------------------------------------------------- */
window.addEventListener('load', function () {
  // 1) Rastgele Tema Seç ve Uygula
  selectAndApplyRandomTheme();

  // 2) İlk Dil & Para Birimi Güncellemeleri
  updateLanguage();
  updateCurrencySymbol();

  // 3) Başlangıçta input kontrolü (Calculate düğmesini devre dışı bırakmak için)
  checkInputs();

  // 4) Toast HTML’i ekle
  const toastHTML =
    '<div id="toastNotification" class="toast" aria-live="assertive" aria-atomic="true"><span id="toastMessage"></span></div>';
  document.body.insertAdjacentHTML('beforeend', toastHTML);

  // 5) Tüm number input’lara event listener ekle
  document.querySelectorAll('input[type="number"]').forEach(inputEl => {
    inputEl.addEventListener('input', handleNumericInput);
    // “…” butonu logic
    const viewBtn = inputEl.nextElementSibling;
    if (viewBtn && viewBtn.classList.contains('view-full-number-btn')) {
      viewBtn.addEventListener('click', function() {
        const fullVal = inputEl.dataset.fullValue || inputEl.value;
        showFullNumberModal(fullVal);
      });
    }
  });
});


/* ------------------------------------------------------
   10) Karanlık Mod Değişince Grafiği Yeniden Çiz
------------------------------------------------------- */
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (chart && !isFirstCalculation) {
    setTimeout(calculate, 50);
  }
});
