## Commands

Enter mySQL docker: (it will prompt asking for the password, it is the same for the docker container creation)

```bash
sudo docker exec -it ragnaDB mysql -u root -p
```

## TODOS

- [ ] Create auth
  - [ ] Add rate limit -> See https://www.npmjs.com/package/express-rate-limit
- [ ] Save data in DB - SQL
- [ ] Connect DB with backend
