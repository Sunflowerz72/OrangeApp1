// profile.js - Forces consistent PFP
const SILHOUETTE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNMTIgMTJDMTQuMjA5MSAxMiAxNiAxMC4yMDkxIDE2IDhDMzIgNS43OTA4NiAxNC4yMDkxIDQgMTIgNEM5Ljc5MDg2IDQgOCA1Ljc5MDg2IDggOEM4IDEwLjIwOTEgOS43OTA4NiAxMiAxMiAxMloiIGZpbGw9IiNGRjkwMCIvPgo8cGF0aCBkPSJNMjAgMTJDMjAgMTYuMzk3IDE2LjM5NyAxNiAxMiAxNkM3LjYwMjk0IDE2IDQgMTYuMzk3IDQgMTJDNCA3LjYwMjk0IDcuNjAyOTQgNCAxMiA0QzE2LjM5NyA0IDIwIDcuNjAyOTQgMjAgMTJaIiBmaWxsPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuOCkiLz4KPC9zdmc+';

document.addEventListener('DOMContentLoaded', () => {
  const savedAvatar = localStorage.getItem('orangeProfile');
  if (savedAvatar) {
    const profile = JSON.parse(savedAvatar);
    const avatar = profile.avatar || SILHOUETTE;
    // Update all
    document.querySelectorAll('.profile-avatar, #profile-avatar, #user-avatar').forEach(img => {
      img.src = avatar;
    });
  } else {
    // Base silhouette
    document.querySelectorAll('.profile-avatar, #profile-avatar, #user-avatar').forEach(img => {
      img.src = SILHOUETTE;
    });
  }
});
