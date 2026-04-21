// money.js - Shared cash balance for Send/Pay/Receive
export let cashBalance = parseFloat(localStorage.getItem('orange-cash-balance') || '1250.00');

export function getCashBalance() {
  return cashBalance.toFixed(2);
}

let updateTimeout;
export function updateCashBalance(delta) {
  // Debounce 300ms
  if (updateTimeout) return;
  updateTimeout = setTimeout(() => { updateTimeout = null; }, 300);

  // Validate
  if (typeof delta !== 'number' || isNaN(delta) || Math.abs(delta) > 10000) {
    console.error('Invalid delta:', delta);
    return;
  }
  cashBalance = Math.max(0, cashBalance + delta);
  localStorage.setItem('orange-cash-balance', cashBalance.toFixed(2));

  // Safe DOM update
  const balanceStr = cashBalance.toFixed(2);
document.querySelectorAll('#cash-balance:not(#send-amount), .cash-balance-amount span:not(#send-amount)').forEach(el => {
    el.textContent = balanceStr;
  });
  document.querySelectorAll('#balance-change')?.forEach(el => {
    el.textContent = `Balance $${balanceStr}`;
  });
  console.log('Balance updated:', balanceStr);
}

export function initMoney() {
  cashBalance = parseFloat(localStorage.getItem('orange-cash-balance') || '1250.00');
  const balanceStr = cashBalance.toFixed(2);
document.querySelectorAll('#cash-balance:not(#send-amount), .cash-balance-amount span:not(#send-amount)').forEach(el => el.textContent = balanceStr);
  document.querySelectorAll('#balance-change')?.forEach(el => el.textContent = `Balance $${balanceStr}`);
}

console.log('Money.js loaded:', cashBalance);

