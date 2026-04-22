#!/usr/bin/env bash
# Setup do servidor API Café & Verso na VPS
# Rode como root: bash setup-api.sh

set -e

echo "==> Instalando Bun..."
curl -fsSL https://bun.sh/install | bash
export PATH="$HOME/.bun/bin:$PATH"

echo "==> Instalando dependências da API..."
cd /tmp/cv/server
bun install

echo "==> Instalando PM2..."
npm install -g pm2 2>/dev/null || bun add -g pm2

echo "==> Iniciando API com PM2..."
pm2 delete cafe-verso-api 2>/dev/null || true
pm2 start "bun run src/index.ts" --name "cafe-verso-api" --cwd /tmp/cv/server
pm2 save
pm2 startup

echo "==> Configurando nginx para proxy /api -> portta 3001..."
cat > /etc/nginx/snippets/cafeeverso-api.conf << 'EOF'
location /api {
    proxy_pass http://localhost:3001/api;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_cache_bypass $http_upgrade;
}
EOF

# Injeta o include no bloco server do site antes do ultimo }
CONF="/etc/nginx/sites-available/cafeeverso.fun"
if ! grep -q "cafeeverso-api" "$CONF"; then
    sed -i '/location \/ {/i \    include snippets/cafeeverso-api.conf;' "$CONF"
fi

nginx -t && systemctl reload nginx

echo ""
echo "✅ API rodando em http://localhost:3001"
echo "✅ Proxy /api ativo em https://cafeeverso.fun/api"
echo ""
echo "Teste: curl https://cafeeverso.fun/api/events | head -c 200"
