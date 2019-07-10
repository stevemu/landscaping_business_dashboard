## Business Dashboard for Roger's Landscaping Service 

## Demo

Url: https://staging-business-dashboard.stevemu.com

Username: a

Password: p


## Development

```$xslt
// Run postgres on mac
pg_ctl -D /usr/local/var/postgres start
cd frontend
npm start
// then start the spring boot backend
```

## Branching

`dev` is the main development branch. Code in this branch are deployed to the staging server for internal reviewing/testing. Staging server is at https://staging-business-dashboard.stevemu.com


`master` is the production branch. Once code is tested and approved on staging server, code in this branch are deployed to production. Production server is at https://prod-business-dashboard.stevemu.com


## Deploying On Ubuntu 18/16:

create `landscaping_business_dashboard.service` in /etc/systemd/system:

```$xslt
[Unit]
Description=landscaping_business_dashboard.service
After=syslog.target

[Service]
User=root
ExecStart=/root/landscaping_business_dashboard/build/libs/landscaping_business_dashboard-1.0-SNAPSHOT.jar
SuccessExitStatus=143

[Install]
WantedBy=multi-user.target
```

Install postgres 11 on ubuntu, on port 5432, create the database landscaping_people and run as a service, username and password are postgres
https://computingforgeeks.com/install-postgresql-11-on-ubuntu-18-04-ubuntu-16-04/

```aidl

sudo -u postgres psql
ALTER USER postgres PASSWORD 'postgres';
createdb landscaping_people
```

then build:

```$xslt
create src/main/resources/static folder
cd frontend
npm i
npm run build
cd ..
gradle bootJar
systemctl restart landscaping_business_dashboard.service
// or run manually
./build/libs/landscaping_business_dashboard-1.0-SNAPSHOT.jar
```

## Database management:

use ssh to create an tunnel to manage the postgres

```aidl
ssh -f root@stevemu.com -L 5431:localhost:5432 -N
ssh -f root@prod.stevemu.com -L 5430:localhost:5432 -N
```