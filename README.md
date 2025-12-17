# Veteriner Randevu Sistemi (Veterinary Appointment System)

Gerçek zamanlı konum tabanlı klinik bulucu özelliğine sahip, modern, mikro hizmet tabanlı veteriner randevu yönetim sistemi.

## İçindekiler (Table of Contents)

- [Özellikler (Features)](#özellikler-features)
- [Teknoloji Stack](#teknoloji-stack)
- [Mimari (Architecture)](#mimari-architecture)
- [Kurulum (Installation)](#kurulum-installation)
- [Kullanım (Usage)](#kullanım-usage)
- [Proje Yapısı (Project Structure)](#proje-yapısı-project-structure)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
- [Geliştirme (Development)](#geliştirme-development)

## Özellikler (Features)
### Planlananlar Dahil (Including Planned Features)
### Hasta Sahipleri İçin (For Pet Owners)
- **Konum Bazlı Klinik Bulucu**: Harita üzerinde yakındaki veteriner kliniklerini görüntüleme
- **Hızlı Randevu Alma**: Tek tıkla randevu oluşturma ve onay
- **Evcil Hayvan Profilleri**: Birden fazla evcil hayvan yönetimi
- **Mesajlaşma**: Veterinerlerle doğrudan iletişim
- **Dashboard**: Randevu takibi ve geçmiş kayıtları

### Veterinerler İçin (For Veterinarians)
- **Randevu Yönetimi**: Günlük, haftalık, aylık randevu takvimi
- **Bekleme Listesi**: Randevu taleplerini onaylama/reddetme
- **Hasta Kayıtları**: Detaylı hasta geçmişi ve tedavi notları
- **İstatistikler**: Aylık gelir, hasta sayısı, randevu istatistikleri
- **Bildirimler**: Yeni randevu talepleri için anlık bildirim

### Sistem Özellikleri (System Features)
- **Güvenli Kimlik Doğrulama**: JWT tabanlı authentication
- **Microservice Mimarisi**: Ölçeklenebilir ve modüler yapı
- **Docker & Kubernetes**: Container-based deployment
- **Real-time Updates**: WebSocket desteği ile anlık güncellemeler
- **Responsive Design**: Mobil ve desktop uyumlu arayüz

## Teknoloji Stack

### Frontend
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Maps**: Leaflet.js
- **State Management**: Context API
- **HTTP Client**: Fetch API

### Backend
- **Runtime**: Node.js
- **Framework**: Fastify
- **Database**: PostgreSQL
- **Caching**: Redis
- **Authentication**: JWT (JSON Web Tokens)
- **ORM/ODM**: Sequelize

### DevOps & Infrastructure
- **Containerization**: Docker, Docker Compose
- **Orchestration**: Kubernetes (Helm Charts)
- **Reverse Proxy**: Nginx
- **API Gateway**: Custom Fastify Gateway
- **CI/CD**: GitHub Actions (planlanan)

## Mimari (Architecture)

```
┌─────────────────────────────────────────────────────────┐
│                      Frontend (React)                    │
│                   Port: 5173 (dev)                       │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                    Nginx (Reverse Proxy)                 │
│                       Port: 80/443                       │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                   API Gateway (Fastify)                  │
│                       Port: 3000                         │
└───┬──────────────┬──────────────┬─────────────┬─────────┘
    │              │              │             │
    ▼              ▼              ▼             ▼
┌─────────┐  ┌─────────┐  ┌────────────┐  ┌──────────┐
│  Auth   │  │  User   │  │Appointment │  │  Other   │
│ Service │  │ Service │  │  Service   │  │ Services │
│Port:3001│  │Port:3002│  │ Port:3003  │  │          │
└────┬────┘  └────┬────┘  └─────┬──────┘  └──────────┘
     │            │              │
     └────────────┴──────────────┴───────────┐
                                             ▼
                           ┌─────────────────────────────┐
                           │   PostgreSQL + Redis        │
                           │   Database & Cache Layer    │
                           └─────────────────────────────┘
```

### Microservices

1. **Auth Service** (`/srcs/backend/auth`)
   - Kullanıcı kimlik doğrulama ve yetkilendirme
   - JWT token üretimi ve doğrulama
   - Güvenli şifre kaydı ve güvenlik 

2. **User Service** (`/srcs/backend/user`)
   - Kullanıcı profil yönetimi (planlanan)
   - Veteriner ve hasta sahipleri bilgileri (planlanan)
   - Evcil hayvan kayıtları (planlanan)

3. **Appointment Service** (`/srcs/backend/appointment`)
   - Randevu oluşturma, güncelleme, iptal (planlanan)
   - Takvim yönetimi (planlanan)
   - Bekleme listesi (planlanan)
   - Bildirimler (planlanan)

4. **Gateway Service** (`/srcs/backend/gateway`)
   - API routing
   - Request/response dönüşümü
    
## Kurulum (Installation)

### Gereksinimler (Prerequisites)

- Node.js >= 18.x
- Docker >= 24.x
- Docker Compose >= 2.x
- Kubernetes >= 1.28 (production deployment için)
- PostgreSQL >= 14.x (local development)
- Redis >= 7.x (local development)

### Docker ile Kurulum (Recommended)

1. **Repository'yi klonlayın:**
```bash
git clone https://github.com/yourusername/Bilisim-Vadisi-Hackathon.git
cd Bilisim-Vadisi-Hackathon
```

2. **Environment variables ayarlayın:**
```bash
# Backend servisleri için .env dosyaları oluşturun
cp srcs/backend/auth/.env.example srcs/backend/auth/.env
cp srcs/backend/user/.env.example srcs/backend/user/.env
cp srcs/backend/appointment/.env.example srcs/backend/appointment/.env
```

3. **Docker Compose ile başlatın:**
```bash
cd srcs/backend
docker-compose up -d
```

4. **Frontend'i başlatın:**
```bash
cd srcs/frontend
npm install
npm run dev
```
5. **Uygulamaya erişin:**
- `https://localhost:443`

### Manuel Kurulum (Development)

#### Backend Services

```bash
# Her servis için:
cd srcs/backend/auth
npm install
npm run dev

cd srcs/backend/user
npm install
npm run dev

cd srcs/backend/appointment
npm install
npm run dev

cd srcs/backend/gateway
npm install
npm run dev
```

#### Frontend

```bash
cd srcs/frontend
npm install
npm run dev
```

## Kullanım (Usage)

### Kullanıcı Tipleri

1. **Hasta Sahipleri (Pet Owners)**
   - Ana sayfadan yakındaki veterinerleri harita üzerinde görüntüleyin
   - "Register" ile kayıt olun (userType: "customer")
   - Dashboard'dan randevu oluşturun ve yönetin

2. **Veterinerler (Veterinarians)**
   - "Register" ile veteriner hesabı oluşturun (userType: "vet")
   - Klinik bilgilerinizi ve lokasyonunuzu ekleyin
   - Randevuları kabul edin, takvimi yönetin

### API Kullanımı

```javascript
// Login
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "password123"
}

// Yakındaki veterinerleri listele
GET /api/vets?lat=41.0082&lng=28.9784&radius=5

// Randevu oluştur
POST /api/appointments
{
  "vetId": "vet-uuid",
  "petId": "pet-uuid",
  "date": "2025-12-20",
  "time": "14:00",
  "type": "routine-checkup"
}
```

## Proje Yapısı (Project Structure)

```
Bilisim-Vadisi-Hackathon/
├── srcs/
│   ├── frontend/                 # React frontend application
│   │   ├── src/
│   │   │   ├── components/      # Reusable components
│   │   │   ├── pages/           # Page components
│   │   │   ├── context/         # React Context (Auth, etc.)
│   │   │   ├── services/        # API service layer
│   │   │   └── assets/          # Static assets
│   │   └── package.json
│   │
│   └── backend/                  # Microservices
│       ├── auth/                # Authentication service
│       │   ├── src/
│       │   │   ├── controllers/
│       │   │   ├── models/
│       │   │   ├── routes/
│       │   │   ├── plugins/
│       │   │   └── utils/
│       │   ├── Dockerfile
│       │   └── package.json
│       │
│       ├── user/                # User management service
│       ├── appointment/         # Appointment service
│       ├── gateway/             # API Gateway
│       ├── nginx/               # Nginx configuration
│       └── docker-compose.yml   # Local development
│
├── deploy/
│   └── k8s/
│       ├── chart/               # Helm chart templates
│       │   ├── templates/
│       │   │   ├── deployment.yaml
│       │   │   ├── service.yaml
│       │   │   ├── ingress.yaml
│       │   │   └── configmap.yaml
│       │   ├── Chart.yaml
│       │   └── values.yaml
│       │
│       └── services/            # Service-specific values
│           ├── auth/
│           ├── user/
│           ├── appointment/
│           └── gateway/
│
├── scripts/
│   ├── build.sh                 # Build script
│   └── deploy.sh                # Deployment script
│
├── Makefile                     # Project automation
└── README.md
```

## API Endpoints

### Authentication Service (Port 3001)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Yeni kullanıcı kaydı |
| POST | `/api/auth/login` | Kullanıcı girişi |
| POST | `/api/auth/logout` | Çıkış yapma |
| POST | `/api/auth/refresh` | Token yenileme |
| GET | `/api/auth/verify` | Token doğrulama |

### User Service (Port 3002)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users/profile` | Kullanıcı profili |
| PUT | `/api/users/profile` | Profil güncelleme |
| GET | `/api/users/pets` | Evcil hayvanları listele |
| POST | `/api/users/pets` | Yeni evcil hayvan ekle |
| GET | `/api/vets` | Veterinerleri listele |
| GET | `/api/vets/:id` | Veteriner detayı |

### Appointment Service (Port 3003)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/appointments` | Randevuları listele |
| POST | `/api/appointments` | Yeni randevu oluştur |
| GET | `/api/appointments/:id` | Randevu detayı |
| PUT | `/api/appointments/:id` | Randevu güncelle |
| DELETE | `/api/appointments/:id` | Randevu iptal et |
| GET | `/api/appointments/calendar` | Takvim görünümü |
| POST | `/api/appointments/:id/confirm` | Randevu onayla (vet) |
| POST | `/api/appointments/:id/reject` | Randevu reddet (vet) |

## Deployment

```bash
    make
```

### Environment Variables

#### Auth Service
```env
PORT=3001
NODE_ENV=production
DB_HOST=postgres
DB_PORT=5432
DB_NAME=vet_auth
DB_USER=postgres
DB_PASSWORD=your_password
REDIS_HOST=redis
REDIS_PORT=6379
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=24h
```

#### User Service
```env
PORT=3002
NODE_ENV=production
DB_HOST=postgres
DB_PORT=5432
DB_NAME=vet_users
DB_USER=postgres
DB_PASSWORD=your_password
```

#### Appointment Service
```env
PORT=3003
NODE_ENV=production
DB_HOST=postgres
DB_PORT=5432
DB_NAME=vet_appointments
DB_USER=postgres
DB_PASSWORD=your_password
REDIS_HOST=redis
REDIS_PORT=6379
```

## Mevcut Durum ve Planlanan Özellikler

### Tamamlanan Özellikler
- [x] Microservice mimarisi kurulumu
- [x] Docker containerization
- [x] Basic authentication (JWT)
- [x] Kullanıcı kayıt ve giriş
- [x] Frontend responsive tasarım
- [x] Harita entegrasyonu (Leaflet)
- [x] Dashboard (vet ve customer)
- [x] Kubernetes Helm charts

### Geliştirme Aşamasında
- [ ] Backend API'lerin tamamlanması
- [ ] Gerçek veritabanı entegrasyonu
- [ ] Harita için veteriner lokasyon API'si
- [ ] Randevu sisteminin backend bağlantısı
- [ ] Kubernetes production deployment

### Planlanan Özellikler
- E-posta ve SMS bildirimleri
- Veteriner değerlendirme sistemi
- Mobil uygulama (React Native)
- Çoklu dil desteği


## Lisans (License)

Bu proje Bilişim Vadisi Hackathon için geliştirilmiştir.

## Ekip (Team)

Bilişim Vadisi Hackathon 2025

## İletişim (Contact)

Proje ile ilgili sorularınız için issue açabilirsiniz.
