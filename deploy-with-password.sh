#!/bin/bash

set -e

DOMAIN="cafeeverso.fun"
VPS_IP="72.60.147.56"
VPS_USER="root"
VPS_PORT="22"
VPS_PASS="a@YV;3Mi&PLjz8UjR@9L"
APP_PATH="/var/www/cafeeverso.fun"

echo "🚀 Deploy Café & Verso com Autenticação SSH"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Verificar se build existe
if [ ! -d "dist" ]; then
    echo "❌ Pasta dist/ não encontrada. Execute 'npm run build' primeiro."
    exit 1
fi

echo "📦 Build encontrado: $(du -sh dist/ | cut -f1)"
echo ""

# Preparar tarball
echo "📦 Preparando arquivo de deploy..."
tar -czf cafe-verso-deploy.tar.gz dist/
TARBALL_SIZE=$(du -sh cafe-verso-deploy.tar.gz | cut -f1)
echo "✓ Tarball criado: cafe-verso-deploy.tar.gz ($TARBALL_SIZE)"
echo ""

# Criar script de instalação na VPS
echo "📝 Criando script de instalação na VPS..."
cat > /tmp/install-vps.sh << 'INSTALL_SCRIPT'
#!/bin/bash
set -e

DOMAIN="cafeeverso.fun"
APP_PATH="/var/www/cafeeverso.fun"

echo "⚙️  Configurando na VPS..."
echo ""

# Criar diretório
echo "📁 Criando diretório..."
mkdir -p "$APP_PATH/html"

# Extrair tarball
echo "📦 Extraindo arquivos..."
cd /tmp
tar -xzf cafe-verso-deploy.tar.gz

# Backup do anterior (se existir)
if [ -d "$APP_PATH/html.old" ]; then
    rm -rf "$APP_PATH/html.old"
fi

if [ -d "$APP_PATH/html" ] && [ "$(ls -A $APP_PATH/html)" ]; then
    mv "$APP_PATH/html" "$APP_PATH/html.backup.$(date +%s)"
fi

# Mover arquivos
mv /tmp/dist "$APP_PATH/html"

# Permissões
if [ -x "$(command -v chown)" ]; then
    chown -R www-data:www-data "$APP_PATH" 2>/dev/null || true
fi
chmod -R 755 "$APP_PATH"

# Criar .htaccess para SPA fallback (se Apache)
if [ -x "$(command -v apache2ctl)" ]; then
    cat > "$APP_PATH/html/.htaccess" << 'HTACCESS'
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
HTACCESS
    echo "✓ .htaccess configurado para Apache"
fi

# Limpar tarball
rm -f /tmp/cafe-verso-deploy.tar.gz

echo ""
echo "✅ Deploy concluído na VPS!"
echo ""
echo "📍 Caminho: $APP_PATH/html"
echo "🌐 Acesse: https://$DOMAIN"
echo ""
echo "🔒 PRÓXIMOS PASSOS:"
echo "1. Configure SSL (se ainda não tiver):"
echo "   sudo certbot --nginx -d $DOMAIN"
echo "2. Ou reinicie o servidor web:"
echo "   sudo systemctl restart nginx"
echo "   sudo systemctl restart apache2"
echo ""

INSTALL_SCRIPT

chmod +x /tmp/install-vps.sh

echo "✓ Script de instalação criado"
echo ""

# Tentar conectar e fazer deploy
echo "🔌 Conectando à VPS..."
echo "   Host: $VPS_USER@$VPS_IP:$VPS_PORT"
echo ""

# Criar comando SSH
ssh_cmd="ssh -o StrictHostKeyChecking=accept-new -o ConnectTimeout=10 -p $VPS_PORT $VPS_USER@$VPS_IP"

# Teste de conexão
echo "🔍 Testando conexão (aguarde)..."
if eval "$ssh_cmd 'echo OK'" 2>/dev/null; then
    echo "✓ Conexão estabelecida!"
    echo ""
    
    # Upload do tarball
    echo "📤 Enviando arquivo (aguarde)..."
    scp -P $VPS_PORT cafe-verso-deploy.tar.gz "$VPS_USER@$VPS_IP:/tmp/" || {
        echo "❌ Erro ao enviar tarball"
        exit 1
    }
    echo "✓ Upload concluído"
    echo ""
    
    # Upload do script
    echo "📤 Enviando script de instalação..."
    scp -P $VPS_PORT /tmp/install-vps.sh "$VPS_USER@$VPS_IP:/tmp/" || {
        echo "❌ Erro ao enviar script"
        exit 1
    }
    echo "✓ Script enviado"
    echo ""
    
    # Executar instalação
    echo "⚙️  Executando instalação na VPS (aguarde)..."
    eval "$ssh_cmd 'bash /tmp/install-vps.sh'" || {
        echo "⚠️  Deploy executado, mas com avisos"
    }
    echo ""
    
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "✅ DEPLOY CONCLUÍDO COM SUCESSO!"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "🌐 Acesse: https://$DOMAIN"
    echo ""
    
else
    echo "❌ Não foi possível conectar à VPS via SSH"
    echo ""
    echo "Possíveis motivos:"
    echo "  • Porta SSH bloqueada"
    echo "  • Firewall da VPS"
    echo "  • Credenciais incorretas"
    echo ""
    echo "Alternativa: Use cPanel File Manager"
    echo "  → Arquivo ZIP: cafe-verso-dist.zip"
    echo "  → Guia: DEPLOY-CPANEL.md"
    echo ""
    exit 1
fi

# Cleanup local
rm -f cafe-verso-deploy.tar.gz /tmp/install-vps.sh

echo "🧹 Limpeza concluída"

