## People Management Dashboard for Roger's Landscaping Service 

## Development

```$xslt
// Run postgres on mac
pg_ctl -D /usr/local/var/postgres start
cd frontend
npm start
// then start the spring boot backend
```

## Branching

`dev` is the main development branch. Code in this branch are deployed to the staging server for internal reviewing/testing. Staging server is at https://people-management-dashboard.stevemu.com


`master` is the production branch. Once code is tested and approved on staging server, code in this branch are deployed to production. Production server is at https://people-management-dashboard-prod.stevemu.com


## Deploying On ubuntu:

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

then build:

```$xslt
create src/main/resources/static folder
cd frontend
npm i
npm run build
cd ..
gradle bootJar
systemctl restart people-management.service
// or run manually
./build/libs/landscaping_business_dashboard-1.0-SNAPSHOT.jar
```