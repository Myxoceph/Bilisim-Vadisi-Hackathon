#!/bin/sh

if [ ! -f /etc/nginx/ssl/certificate.crt ] || [ ! -f /etc/nginx/ssl/certificate.key ]; then

    echo "Generating self-signed SSL certificates..."

    openssl genrsa -out /etc/nginx/ssl/certificate.key 4096

    openssl req -new -x509 -key /etc/nginx/ssl/certificate.key \
        -out /etc/nginx/ssl/certificate.crt -days 365 \
        -subj "/C=TR/ST=Kocaeli/L=Gebze/O=42 Kocaeli/OU=ft_transcendence/CN=${SSL_EXTERNAL_IP}"

    chmod 600 /etc/nginx/ssl/certificate.key
    chmod 644 /etc/nginx/ssl/certificate.crt

    echo "SSL certificates generated successfully!"

else
    echo "SSL certificates found, starting Nginx with SSL."
fi

echo "Starting Nginx..."
exec "$@"
