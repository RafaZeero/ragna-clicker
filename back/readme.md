## Commands

Enter mySQL docker: (it will prompt asking for the password, it is the same for the docker container creation)

```bash
sudo docker exec -it ragnaDB mysql -u root -p
```

## TODOS

- [x] Create auth
- [x] Save data in DB - SQL
  - [ ] Create `Last login` in SQL
- [x] Connect DB with backend
  - [ ] Add rate limit -> See https://www.npmjs.com/package/express-rate-limit
