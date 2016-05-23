FROM ubuntu:14.04

# Create app directory
WORKDIR /root

ENV NODE_VERSION 5

# Install dependencies
RUN apt-get update
RUN apt-get install \
    apt-transport-https\
    ca-certificates \
    libssl-dev \
    git\
    curl\
    nodejs\
    mongodb\
    -y -q --no-install-recommends
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.1/install.sh | bash && \
    . /root/.bashrc && \
    nvm install $NODE_VERSION && \
    nvm alias default $NODE_VERSION && \
    nvm use default

RUN . /root/.bashrc && \
    git clone https://github.com/rcos/venue.git  && \
    cd venue && \
    npm install -g grunt-cli bower && \
    npm install && \
    bower install --allow-root

RUN apt-get clean

EXPOSE 9000
CMD service mongodb start && cd venue && grunt serve:dist
