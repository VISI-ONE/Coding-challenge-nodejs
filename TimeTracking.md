## Time Tracking

- Obviously it took more time than 90 minutes
- In 90 minutes I managed:
- - set up Docker
- - set up tests runner
- - write second endpoint
- - cover both with tests

- It's the first time I work with sqlite3 and knex, so it took some time to find out how it works
- And the remaining time took pairing endpoint implementation and test coverage

## Things to improve

- Proper error handling: preferably Custom Errors and a middleware that sets response status based on Error type
- Input data (url params, query params, body) schema validation
- Reset test set up in test suit rather than in scripting command
