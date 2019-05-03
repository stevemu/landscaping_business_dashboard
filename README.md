## People Management Dashboard for Roger's Landscaping Service 

staging server: https://landscaping-business-dashboard.stevemu.com/

Run postgres on mac:

`pg_ctl -D /usr/local/var/postgres start`

Development

```$xslt
cd frontend
npm start
// then start the spring boot backend
```


Deploy:

On ubuntu:

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