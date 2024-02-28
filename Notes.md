# Time taken 
4 hours

# Notes
I was using a laptop that was almost 10 years old, it is very slow and froze over 5 times and crashed twice during the assignment. 
I was not able to use my main tools and plugins like VS code, as it is too intense for my laptop. I can not have more than one GUI application open, so I had to use Vim which is not optimized well. I had to use the browser rarely, as it would cause it to become too slow, making it difficult to research information efficiently. I have tried using online editors like github workspaces, but I lack a good internet connection to work efficiently.

Due to these limits I was not able to test the docker configuration I made, as docker will not install on my laptop, but I am confident it should work. I also did not fully complete all the tests for the application, I went as far as I could go before I ran out of time to complete it. 

All other tasks were completed, postman apis have been provided for testing the endpoints.

To run tests use: 
```
make test
```

# Improvements
- Use a test database instead of only using one
- Use typescript to make it easier for IDE autocompletion and data structure of each table
- Use better validation and authentication for each endpoint
- Set up sqlite services in the docker compose instead of using an one in memory.
- Potentially a better testing framework than jest for api testing, would have used cypress but if I accidentally opened the GUI test runner it would have frozen my computer. Both are good to use to run the server and test the endponts as a whole with a normal request.

#Further Examples
To see other examples of my work these are the most informative.
[Solita Dev Acadmey Exercise](https://github.com/JoshuaH-sudo/dev-academy-2023-exercise)
[Turfcoach Assighment](https://github.com/JoshuaH-sudo/turfcoach-assighment)

