FROM debian:stretch
RUN apt-get update && apt-get install -y apache2 && rm -rf /var/lib/apt/lists/*
COPY ./dist /usr/local/apache2/htdocs/
COPY ./.htaccess /var/www/html/.htaccess
RUN a2enmod rewrite