# 📝 Deployment Notes for MCMPORTAL

---

## 🚀 **Deploy to School Server**

If you want to deploy on the school's server:

### SSH into the server:

```bash
ssh username@school-server-ip
```

---

### Copy your project:

```bash
scp -r ./MCMPORTAL username@school-server-ip:/path/to/directory
```

---

### Install Node.js (if not already installed):

```bash
sudo apt update
sudo apt install nodejs npm -y
```

---

### Navigate to your project:

```bash
cd /path/to/directory/MCMPORTAL
npm install
```

---

### Create an Environment Variable on the Server:

```bash
export OPENAI_API_KEY=your-secret-key
```

---

### Run the application:

```bash
npm run build
npm run start
```

---

### Setup a Reverse Proxy (e.g., Nginx):

Serve it on `http://school-domain.com/mcmporal`.

```nginx
server {
    listen 80;
    server_name school-domain.com;

    location /mcmporal {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```


