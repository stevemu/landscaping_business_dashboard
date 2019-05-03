## People Management Dashboard for Roger's Landscaping Service 



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

create `people-management.service` in /etc/systemd/system:

```$xslt
[Unit]
Description=people-management
After=syslog.target

[Service]
User=root
ExecStart=/root/people_management_dashboard/build/libs/landscaping-people-management-dashboard-1.0-SNAPSHOT.jar
SuccessExitStatus=143

[Install]
WantedBy=multi-user.target
```

then build:

```$xslt
cd frontend
npm i
npm run build
cd ..
gradle bootJar
systemctl restart people-management.service
// or run manually
./build/libs/landscaping-people-management-dashboard-1.0-SNAPSHOT.jar
```