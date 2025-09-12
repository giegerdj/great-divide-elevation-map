FROM ruby:2.7.7

LABEL maintainer="dave@giegertechnology.com"

WORKDIR /var/www/html

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
    && echo "deb http://dl.yarnpkg.com/debian/ stable main" > /etc/apt/sources.list.d/yarn.list \
    && apt-get update \
    && curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt install -y nodejs \
    && apt-get -y autoremove \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN gem install capistrano -v 3.18.1
RUN gem install ed25519 -v 1.3.0 && gem install bcrypt_pbkdf elbas

RUN echo "StrictHostKeyChecking no" >> /etc/ssh/ssh_config

RUN git config --global --add safe.directory /var/www/html

COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["docker-entrypoint.sh"]
