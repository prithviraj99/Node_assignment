# Node_assignment(Web scraping)

Both the files use 'xmlhttprequest' module for hitting requests on server and 'cheerio' module for html DOM manipulation similar to jquery.

--------------------------
assignment_asyncmap.js
--------------------------

  This js file uses async.mapLimit for running 5 async requests in parallel at a time.
  Concurrency=5.

--------------------------
assignment_asyncforEach.js
--------------------------

  This js file uses async.forEachSeries for making async requests synchronous by running one at a time.
  Concurrency=1.

-------------------------------------
promises_qmap.js(without using async)
-------------------------------------

 This js file uses Q promise module instead of callbacks for running 5 async requests in parallel at a time.
 Concurrency=5.
