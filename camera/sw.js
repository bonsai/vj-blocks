const CACHE = 'mediapipe-v1';
const URLS = [
  'https://cdn.jsdelivr.net/npm/@mediapipe/pose/pose.js',
  'https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js',
  'https://cdn.jsdelivr.net/npm/@mediapipe/pose/pose_solution_packed_assets_loader.js',
  'https://cdn.jsdelivr.net/npm/@mediapipe/pose/pose_solution_wasm_bin.js',
  'https://cdn.jsdelivr.net/npm/@mediapipe/pose/pose_solution_simd_wasm_bin.js',
  'https://cdn.jsdelivr.net/npm/@mediapipe/pose/pose_landmark_lite.tflite',
  'https://cdn.jsdelivr.net/npm/@mediapipe/pose/pose_web.binarypb',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(URLS)));
  self.skipWaiting();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
