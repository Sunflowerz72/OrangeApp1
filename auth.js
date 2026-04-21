// auth.js - Working Google Sign In
window.googleAuthLoaded = false;

function loadGoogleAuth() {
  const script = document.createElement('script');
  script.src = 'https://accounts.google.com/gsi/client';
  script.async = true;
  script.defer = true;
  script.onload = () => {
    window.googleAuthLoaded = true;
    initGoogleAuth();
  };
  document.head.appendChild(script);
}

function initGoogleAuth() {
  google.accounts.id.initialize({
    client_id: '433082063649-ic8lhhd3hr7hgsivho40m2tjhplt8j71.apps.googleusercontent.com',
    callback: onGoogleSuccess,
    auto_select: false,
    cancel_on_tap_outside: false
  });
}

window.onGoogleSuccess = function(response) {
  try {
    const token = response.credential;
    const payload = JSON.parse(atob(token.split('.')[1]));
    
    // Save
    localStorage.googleToken = token;
    localStorage.googleProfile = JSON.stringify(payload);
    
    // Update all pages
    updateAllProfiles(payload);
    
    console.log('✅ Google sign in:', payload.name, payload.email);
  } catch(e) {
    console.error('Google auth error:', e);
  }
}

function updateAllProfiles(user) {
  const avatar = document.querySelectorAll('.profile-avatar, #profile-pic, #google-avatar, #user-avatar, #settings-avatar');
  const nameEl = document.querySelectorAll('#user-name, #profile-name, #google-name, #settings-name');
  const emailEl = document.querySelectorAll('#user-email, #profile-email, #google-email, #settings-email');
  
  avatar.forEach(el => el.src = user.picture);
  nameEl.forEach(el => el.textContent = user.name);
  emailEl.forEach(el => el.textContent = user.email);
  
  // Unlock settings
  const signedInContent = document.querySelectorAll('#signed-in-content, #settings-content');
  signedInContent.forEach(el => el.style.display = 'block');
}

// Auto load on every page
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadGoogleAuth);
} else {
  loadGoogleAuth();
}

// Export
window.loadGoogleAuth = loadGoogleAuth;
window.updateAllProfiles = updateAllProfiles;
