FROM node:22.2

LABEL maintainer="dave@giegertechnology.com"

WORKDIR /var/www/html

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
    && echo "deb http://dl.yarnpkg.com/debian/ stable main" > /etc/apt/sources.list.d/yarn.list \
    && apt-get update \
    && apt-get install -y gosu git yarn \
    && apt-get -y autoremove \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh
RUN npm install -g npm@^10.8
RUN npm install -g wrangler

EXPOSE 8976

ENTRYPOINT ["docker-entrypoint.sh"]
