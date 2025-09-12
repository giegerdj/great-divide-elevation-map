FROM ubuntu:24.04

LABEL maintainer="dave@giegertechnology.com"

WORKDIR /var/www/html

# Avoid prompts while building
ENV DEBIAN_FRONTEND=noninteractive
ENV TZ=UTC
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN id -u ubuntu &>/dev/null || useradd -ms /bin/bash -u 1000 ubuntu \
    && apt-get update \
    && apt-get install -y gosu gnupg ca-certificates wget curl gzip zip unzip git \
       supervisor sqlite3 \
    && apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 4F4EA0AAE5267A6C \
    && echo "deb http://ppa.launchpad.net/ondrej/php/ubuntu noble main" > /etc/apt/sources.list.d/ppa_ondrej_php.list \
    && apt-get update \
    && apt-get install -y nginx cron php8.2-fpm php8.2-cli \
        php8.2-pgsql php8.2-sqlite3 php8.2-gd \
        php8.2-curl php8.2-memcached \
        php8.2-imap php8.2-mysql php8.2-mbstring \
        php8.2-xml php8.2-zip php8.2-bcmath php8.2-soap \
        php8.2-intl php8.2-readline \
        php8.2-msgpack php8.2-igbinary  php8.2-imagick \
        php8.2-ldap php8.2-gmp \
        php8.2-redis mysql-client \
    && php -r "readfile('http://getcomposer.org/installer');" | php -- --install-dir=/usr/bin/ --filename=composer \
    && mkdir -p /run/php \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* \
    && sed -i '1i daemon off;' /etc/nginx/nginx.conf \
    && ln -sf /dev/stdout /var/log/nginx/access.log \
    && ln -sf /dev/stderr /var/log/nginx/error.log \
    && sed -i 's/^;daemonize.*$/daemonize = no/g' /etc/php/8.2/fpm/php-fpm.conf \
    && sed -i 's@^error_log.*$@error_log = /proc/self/fd/2@g' /etc/php/8.2/fpm/php-fpm.conf

COPY default /etc/nginx/sites-available/default
COPY start-container /usr/local/bin/start-container
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf
RUN chmod +x /usr/local/bin/start-container \
    && mkdir -p /var/log/supervisor

EXPOSE 80

ENTRYPOINT ["start-container"]
