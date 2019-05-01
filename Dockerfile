FROM node:10.15.3
MAINTAINER gureuso <gureuso.github.io>

USER root
WORKDIR /root

# nextjs
RUN git clone https://github.com/gureuso/movie.git
WORKDIR /root/movie
RUN npm install

CMD npm run start

EXPOSE 3000
