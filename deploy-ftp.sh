#!/bin/bash

# Deploy rápido via SFTP/FTP
# Alternativa simples quando SSH direto não é viável

set -e

echo "🚀 Deploy Café & Verso - Método Alternativo (SFTP/FTP)"
echo ""

# Variáveis
DOMAIN="cafeeverso.fun"
FTP_USER="${FTP_USER}"
FTP_PASS="${FTP_PASS}"
FTP_HOST="${FTP_HOST:-$DOMAIN}"
FTP_PORT="${FTP_PORT:-21}"
REMOTE_PATH="/public_html"

# Validações
if [ -z "$FTP_USER" ] || [ -z "$FTP_PASS" ]; then
    echo "❌ Configure as variáveis:"
    echo "   export FTP_USER='seu-usuario'"
    echo "   export FTP_PASS='sua-senha'"
    exit 1
fi

# 1. Build
echo "📦 Building..."
npm run build
echo "✓ Build ok"
echo ""

# 2. Opção A: Usando lftp
if command -v lftp &> /dev/null; then
    echo "📤 Enviando via lftp..."
    lftp -u "$FTP_USER","$FTP_PASS" "$FTP_HOST" << ENDFTP
    cd $REMOTE_PATH
    mirror -R --delete dist/
    quit
ENDFTP
    echo "✓ Upload concluído"
    
# 3. Opção B: Usando ncftp
elif command -v ncftp &> /dev/null; then
    echo "📤 Enviando via ncftp..."
    ncftpput -u "$FTP_USER" -p "$FTP_PASS" -R "$FTP_HOST" "$REMOTE_PATH" dist/*
    echo "✓ Upload concluído"
    
else
    echo "❌ Instale lftp ou ncftp:"
    echo "   Ubuntu/Debian: sudo apt install lftp"
    echo "   macOS: brew install lftp"
    exit 1
fi

echo ""
echo "✅ Deploy via FTP concluído!"
echo "🌐 Acesse: https://$DOMAIN"
