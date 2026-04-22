#!/bin/bash

# Script de Deploy para Café & Verso
# Domínio: cafeeverso.fun
# Sem backend - apenas frontend estático

set -e

DOMAIN="cafeeverso.fun"
VPS_USER="${VPS_USER:-root}"
VPS_IP="${VPS_IP}"
VPS_PORT="${VPS_PORT:-22}"
APP_PATH="/var/www/cafeeverso.fun"

echo "🚀 Iniciando deploy do Café & Verso"
echo "   Domínio: $DOMAIN"
echo "   VPS: $VPS_USER@$VPS_IP:$VPS_PORT"
echo ""

# Validar variáveis obrigatórias
if [ -z "$VPS_IP" ]; then
    echo "❌ Erro: Defina a variável VPS_IP"
    echo "   Exemplo: export VPS_IP='123.45.67.89'"
    exit 1
fi

# 1. Build local
echo "📦 Building aplicação..."
npm run build
echo "✓ Build concluído"
echo ""

# 2. Criar tarball
echo "📦 Preparando artifacts..."
tar -czf cafe-verso-dist.tar.gz dist/
echo "✓ Arquivo pronto: cafe-verso-dist.tar.gz"
echo ""

# 3. Transferir para VPS
echo "📤 Enviando para VPS..."
scp -P "$VPS_PORT" cafe-verso-dist.tar.gz "$VPS_USER@$VPS_IP:/tmp/"
echo "✓ Transferência concluída"
echo ""

# 4. Descompactar e configurar na VPS
echo "⚙️  Configurando na VPS..."
ssh -p "$VPS_PORT" "$VPS_USER@$VPS_IP" << 'ENDSSH'
    set -e
    DOMAIN="cafeeverso.fun"
    APP_PATH="/var/www/cafeeverso.fun"
    
    # Criar diretório se não existir
    sudo mkdir -p "$APP_PATH"
    
    # Backup anterior (opcional)
    if [ -d "$APP_PATH/html" ]; then
        sudo mv "$APP_PATH/html" "$APP_PATH/html.backup.$(date +%s)"
    fi
    
    # Extrair arquivos
    sudo tar -xzf /tmp/cafe-verso-dist.tar.gz -C "$APP_PATH"
    sudo mv "$APP_PATH/dist" "$APP_PATH/html"
    
    # Permissões
    sudo chown -R www-data:www-data "$APP_PATH"
    sudo chmod -R 755 "$APP_PATH"
    
    # Configurar Nginx (se necessário)
    if ! [ -f "/etc/nginx/sites-available/$DOMAIN" ]; then
        echo "⚠️  Configure Nginx manualmente:"
        echo ""
        echo "sudo nano /etc/nginx/sites-available/$DOMAIN"
        echo ""
        echo "server {"
        echo "    listen 80;"
        echo "    listen [::]:80;"
        echo "    server_name $DOMAIN www.$DOMAIN;"
        echo ""
        echo "    root /var/www/cafeeverso.fun/html;"
        echo "    index index.html;"
        echo ""
        echo "    location / {"
        echo "        try_files \$uri \$uri/ /index.html;"
        echo "    }"
        echo "}"
        echo ""
    else
        echo "✓ Nginx já configurado"
    fi
    
    echo "✓ Deploy concluído na VPS"
ENDSSH

echo ""
echo "✅ Deploy finalizado!"
echo ""
echo "🌐 Próximos passos:"
echo "   1. Configure SSL (Let's Encrypt): sudo certbot --nginx -d $DOMAIN"
echo "   2. Reinicie o Nginx: sudo systemctl restart nginx"
echo "   3. Acesse: https://$DOMAIN"
echo ""

# Cleanup
rm -f cafe-verso-dist.tar.gz
echo "🧹 Cleanup local concluído"
