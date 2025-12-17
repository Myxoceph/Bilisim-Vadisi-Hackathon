# 🔐 Access Token ve Refresh Token Akışı

## 📋 Token Özellikleri

| Token Türü | Süre | Kullanım | Saklama |
|------------|------|----------|---------|
| **Access Token** | 15 dakika | API isteklerinde Authorization header'da | Frontend (memory/sessionStorage) |
| **Refresh Token** | 7 gün | Yeni access token almak için | Frontend (httpOnly cookie önerilir) + Redis |

---

## 🔄 Normal Akış

### 1️⃣ Login
```bash
POST /login
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbG...",
    "refreshToken": "eyJhbG...",
    "expiresIn": 900,
    "user": { ... }
  }
}
```

### 2️⃣ Protected Endpoint'e İstek (Access Token Geçerli)
```bash
GET /users/:id
Authorization: Bearer {accessToken}
```

**Response:**
```json
{
  "success": true,
  "data": { ... }
}
```

---

## ⏱️ Access Token Expire Senaryosu

### Durum: Access token'ın süresi doldu (15 dakika sonra)

#### ❌ Expired Token ile İstek
```bash
GET /users/:id
Authorization: Bearer {expiredAccessToken}
```

**Response:**
```json
{
  "success": false,
  "error": "Token expired. Please refresh your token."
}
```

#### ✅ Çözüm: Refresh Token ile Yeni Access Token Alma

```bash
POST /token/refresh
{
  "refreshToken": "eyJhbG..."
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbG... (YENİ)",
    "expiresIn": 900
  }
}
```

#### ✅ Yeni Access Token ile Tekrar İstek

```bash
GET /users/:id
Authorization: Bearer {newAccessToken}
```

**Response:**
```json
{
  "success": true,
  "data": { ... }
}
```

---

## ⛔ Refresh Token Expire Senaryosu

### Durum: Refresh token'ın da süresi doldu (7 gün sonra)

#### ❌ Expired Refresh Token ile İstek
```bash
POST /token/refresh
{
  "refreshToken": "{expiredRefreshToken}"
}
```

**Response:**
```json
{
  "success": false,
  "error": "Invalid or expired refresh token"
}
```

#### ✅ Çözüm: Yeniden Login

Kullanıcı tekrar login olmalı:
```bash
POST /login
{
  "email": "user@example.com",
  "password": "password123"
}
```

---

## 🚪 Logout Senaryosu

```bash
POST /logout
{
  "refreshToken": "eyJhbG..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

**Ne Olur:**
- Refresh token Redis'ten silinir
- Artık bu refresh token kullanılamaz
- Access token hala geçerli (expire süresine kadar) ama yenilenemez

---

## 🛡️ Güvenlik Özellikleri

### ✅ Yapılan Güvenlik Önlemleri

1. **Token Separation**: Access ve refresh token ayrı
2. **Short-lived Access Token**: 15 dakika (güvenlik riski düşük)
3. **Long-lived Refresh Token**: 7 gün (kullanıcı deneyimi iyi)
4. **Redis Storage**: Refresh tokenlar sunucu tarafında saklanıyor
5. **Token Invalidation**: Logout ile token geçersiz kılınıyor
6. **JWT Verification**: Her korumalı endpoint token doğrulaması yapıyor
7. **Expiry Handling**: Expire olan tokenlar net hata mesajı veriyor

### 🔒 Güvenlik Best Practices

1. **Access Token**: 
   - Kısa ömürlü (15 dakika)
   - Her API isteğinde kullanılır
   - Memory veya sessionStorage'da saklanabilir
   
2. **Refresh Token**:
   - Uzun ömürlü (7 gün)
   - Sadece token yenileme için kullanılır
   - **HttpOnly cookie**'de saklanmalı (XSS koruması)
   - Redis'te saklanıyor (sunucu tarafı kontrolü)
   
3. **Token Rotation** (Gelecek İyileştirme):
   - Refresh token her kullanıldığında yeni bir tane üretilmeli
   - Eski refresh token geçersiz kılınmalı

---

## 📱 Frontend Entegrasyonu

### Örnek Axios Interceptor

```javascript
// Request interceptor - Access token ekleme
axios.interceptors.request.use(
  (config) => {
    const accessToken = sessionStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - 401 durumunda token yenileme
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Token expired ve henüz yenileme denenmedi
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Refresh token ile yeni access token al
        const refreshToken = sessionStorage.getItem('refreshToken');
        const response = await axios.post('/token/refresh', {
          refreshToken
        });

        const { accessToken } = response.data.data;
        
        // Yeni token'ı sakla
        sessionStorage.setItem('accessToken', accessToken);
        
        // Original isteği yeni token ile tekrar dene
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axios(originalRequest);
        
      } catch (refreshError) {
        // Refresh token da geçersiz - Login'e yönlendir
        sessionStorage.clear();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
```

---

## 🧪 Test Sonuçları

### ✅ Başarılı Testler

1. ✅ Login - Access + Refresh token üretimi
2. ✅ Geçerli token ile protected endpoint erişimi
3. ✅ Geçersiz token reddedilmesi
4. ✅ Token olmadan istek reddedilmesi
5. ✅ Expired token reddedilmesi
6. ✅ Refresh token ile yeni access token alma
7. ✅ Yeni access token ile başarılı istek
8. ✅ Logout ile token geçersiz kılma
9. ✅ Redis'te token saklama ve TTL kontrolü

### 📊 Test İstatistikleri

- **Access Token Ömrü**: 900 saniye (15 dakika)
- **Refresh Token Ömrü**: 604800 saniye (7 gün)
- **Redis TTL Doğrulaması**: ✅ Başarılı
- **Token Expiry Handling**: ✅ Başarılı
- **Token Refresh Flow**: ✅ Başarılı

---

## 🔧 Endpoints

| Method | Endpoint | Auth | Açıklama |
|--------|----------|------|----------|
| POST | `/login` | ❌ | Login - Access + Refresh token al |
| POST | `/logout` | ❌ | Logout - Refresh token'ı sil |
| POST | `/token/refresh` | ❌ | Yeni access token al |
| GET | `/users/:id` | ✅ | Kullanıcı bilgisi (Protected) |
| POST | `/test/short-token` | ❌ | Test için 5 saniyelik token (dev only) |

---

## 🎯 Sonuç

✅ **Access token ve refresh token sistemi tam olarak çalışıyor!**

- Token üretimi ✅
- Token doğrulama ✅
- Token yenileme ✅
- Token expire handling ✅
- Redis storage ✅
- Logout flow ✅
- Security best practices ✅
