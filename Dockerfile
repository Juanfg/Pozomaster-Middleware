FROM node:8

# Updating apt-get
RUN apt-get update
RUN apt-get upgrade -y

# Create app directory
WORKDIR /app

# Copy all the files
#COPY . .

# PostgreSQL

	# Install
	# RUN apt-get install -y postgresql postgresql-contrib

	# Config files
	# ADD postgresql/pg_hba.conf /etc/postgresql/9.1/main/pg_hba.conf
	# ADD postgresql/postgresql.conf /etc/postgresql/9.1/main/postgresql.conf

	# Env
	#ENV POSTGRES_DATA /var/lib/postgresql/9.1/main
	#ENV POSTGRES_BIN /usr/lib/postgresql/9.1/bin
	#ENV POSTGRES_CONFIG /etc/postgresql/9.1/main/postgresql.conf

	# Some setup
	#RUN rm -rf $POSTGRES_DATA
	#RUN mkdir -p $POSTGRES_DATA
	#RUN chown -R postgres $POSTGRES_DATA
	# RUN su postgres sh -c "$POSTGRES_BIN/initdb $POSTGRES_DATA"

	# Create database & user
	#RUN echo "CREATE USER "Lalo" WITH SUPERUSER PASSWORD '1423qrwe';" | \
	   # su postgres sh -c "$POSTGRES_BIN/postgres --single \
	   # -D $POSTGRES_DATA \
	   # -c config_file=$POSTGRES_CONFIG"

	#RUN echo "CREATE DATABASE pozomaster WITH OWNER "Lalo";" | \
	   # su postgres sh -c "$POSTGRES_BIN/postgres --single \
	   # -D $POSTGRES_DATA \
	   # -c config_file=$POSTGRES_CONFIG"

# Install app dependencies
COPY package.json /app
RUN npm install
COPY . /app

# Make migrations
RUN npm install -g sequelize-cli-typescript
RUN npm install -g gulp
RUN gulp build
RUN sequelize db:migrate

# Run
RUN npm uninstall bcrypt
RUN npm install
EXPOSE 8085
CMD [ "npm", "start" ]
