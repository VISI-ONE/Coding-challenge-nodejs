FROM node:21

ENV name code-challenge
ENV port 3000

RUN mkdir -p /opt/${name}
WORKDIR /opt/${name}
VOLUME /opt/${name}

EXPOSE ${port}