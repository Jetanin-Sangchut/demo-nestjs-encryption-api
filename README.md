# NestJS RSA/AES Encryption API REPO

This project demonstrates secure payload encryption using a hybrid RSA (public/private) and AES scheme with NestJS.

---

## 📦 Features

- `POST /api/get-encrypt-data`: Accepts a plaintext payload and returns encrypted data.
- `POST /api/get-decrypt-data`: Accepts encrypted data and returns the original payload.
- 🔐 Uses RSA to encrypt AES key, and AES-256-CBC to encrypt payload.
- 🧪 Includes full e2e test coverage.
- 📄 Swagger Docs at `/api-docs`

---

## 🛡️ Security Notes

- this is just for demo/testing purposes, note that fixed IV and static keys are not production-secure.

---

## How to Start

0. Clone
```bash
git clone https://github.com/Jetanin-Sangchut/demo-nestjs-encryption-api.git
cd demo-nestjs-encryption-api
```

1. Install dependencies:
```bash
npm install
```

2. Add RSA Keys
```bash
mkdir keys
```
Paste `private.pem` and `public.pem`  from cryptotools.net/rsagen into `/keys`.

3. Run the service:
```bash
npm run start:dev
```

4. Open Swagger at `http://localhost:3000/api-docs`

5. Unit test with Nest JS Framework
```bash
npm run test
```
Unit test with Http Server (.e2e-spec)
```bash
npm run test:e2e
```