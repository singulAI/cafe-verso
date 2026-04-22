server {
    listen 80;
    listen [::]:80;
    server_name cafeeverso.fun www.cafeeverso.fun;

    # Redireciona HTTP para HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name cafeeverso.fun www.cafeeverso.fun;

    # SSL/TLS - Configure com certbot
    ssl_certificate /etc/letsencrypt/live/cafeeverso.fun/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/cafeeverso.fun/privkey.pem;
    
    # Segurança SSL
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # Root da aplicação
    root /var/www/cafeeverso.fun/html;
    index index.html index.htm;

    # Logs
    access_log /var/log/nginx/cafeeverso.fun.access.log;
    error_log /var/log/nginx/cafeeverso.fun.error.log;

    # Compressão
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/javascript text/xml application/xml;
    gzip_min_length 256;
    gzip_vary on;

    # Cache headers para assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Rota principal - SPA React
    location / {
        try_files $uri $uri/ /index.html;
        add_header Cache-Control "public, max-age=3600";
    }

    # Bloquear acesso a arquivos sensíveis
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }

    location ~ ~$ {
        deny all;
        access_log off;
        log_not_found off;
    }

    # Segurança - Headers HTTP
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
}
