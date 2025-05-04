function validateEmail(email) {
  return /^[^@]+@[^@]+\.[^@]+$/.test(email);
}

function register() {
  const username = document.getElementById("regUsername").value.trim();
  const password = document.getElementById("regPassword").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();
  const message = document.getElementById("message");

  if (!username || !password || !confirmPassword) {
    message.innerText = "All fields are required.";
    message.style.color = "red";
    return;
  }

  if (password !== confirmPassword) {
    message.innerText = "Passwords do not match.";
    message.style.color = "red";
    return;
  }

  localStorage.setItem("user", JSON.stringify({ username, password }));
  message.innerText = "Registration successful! Redirecting...";
  message.style.color = "green";

  setTimeout(() => {
    window.location.href = "login.html";
  }, 1500);
}

function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const message = document.getElementById("message");

  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (storedUser && storedUser.username === username && storedUser.password === password) {
    message.innerText = "Login successful! Redirecting...";
    message.style.color = "green";
    setTimeout(() => {
      window.location.href = "welcome.html";
    }, 1500);
  } else {
    message.innerText = "Invalid username or password.";
    message.style.color = "red";
  }
}

function calculateTax() {
  const totalIncome = parseFloat(document.getElementById("totalIncome").value) || 0;
  const basicSalary = parseFloat(document.getElementById("basicSalary").value) || 0;
  const deductions = parseFloat(document.getElementById("deductions").value) || 0;
  const hraReceived = parseFloat(document.getElementById("hraReceived").value) || 0;
  const rentPaid = parseFloat(document.getElementById("rentPaid").value) || 0;
  const isMetro = document.getElementById("metroCity").checked;

  const tenPercentBasic = 0.1 * basicSalary;
  const rentMinus10 = rentPaid - tenPercentBasic;
  const percentBasicAmount = (isMetro ? 0.5 : 0.4) * basicSalary;

  const hraExempt = Math.max(0, Math.min(hraReceived, rentMinus10, percentBasicAmount));
  const taxableIncomeOld = totalIncome - hraExempt - deductions;

  const taxOld = calculateOldRegimeTax(taxableIncomeOld);
  const taxNew = calculateNewRegimeTax(totalIncome);

  document.getElementById("oldTax").innerText = taxOld.toFixed(0);
  document.getElementById("newTax").innerText = taxNew.toFixed(0);

  document.getElementById("recommendation").innerText =
    taxOld < taxNew ? "Choose Old Regime" :
    taxNew < taxOld ? "Choose New Regime" :
    "Both regimes yield same tax.";
}

function calculateOldRegimeTax(income) {
  if (income <= 250000) return 0;
  else if (income <= 500000) return 0.05 * (income - 250000);
  else if (income <= 1000000) return 12500 + 0.2 * (income - 500000);
  return 112500 + 0.3 * (income - 1000000);
}

function calculateNewRegimeTax(income) {
  if (income <= 250000) return 0;
  else if (income <= 500000) return 0.05 * (income - 250000);
  else if (income <= 750000) return 12500 + 0.1 * (income - 500000);
  else if (income <= 1000000) return 37500 + 0.15 * (income - 750000);
  else if (income <= 1250000) return 75000 + 0.2 * (income - 1000000);
  else if (income <= 1500000) return 125000 + 0.25 * (income - 1250000);
  return 187500 + 0.3 * (income - 1500000);
}
