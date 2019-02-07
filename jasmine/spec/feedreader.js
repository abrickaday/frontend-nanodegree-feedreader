/*jshint esversion: 6 */
/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('have URLs', function() {
           for (let feed of allFeeds) {
             expect(feed.url).toBeDefined();
             expect(feed.url.length).not.toBe(0);
           }
         });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('have names', function() {
           for (let feed of allFeeds) {
             expect(feed.name).toBeDefined();
             expect(feed.name.length).not.toBe(0);
           }
         });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe("The menu", function() {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

         function isHidden() {
           // The menu is hidden when the class 'menu-hidden' is added to the body element.
           // Check whether the body element contains this class.
           return document.getElementsByTagName("body")[0].classList.contains('menu-hidden');
         }

         it('is hidden by default', function() {
           expect(isHidden()).toBe(true);
         });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          it('is toggled when the menu icon is clicked', function() {
            // Click the application using click() and check the body element class.
            document.getElementsByClassName('menu-icon-link')[0].click();
            expect(isHidden()).toBe(false);
            document.getElementsByClassName('menu-icon-link')[0].click();
            expect(isHidden()).toBe(true);
          });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
      /* TODO: Write a test that ensures when the loadFeed
      * function is called and completes its work, there is at least
      * a single .entry element within the .feed container.
      * Remember, loadFeed() is asynchronous so this test will require
      * the use of Jasmine's beforeEach and asynchronous done() function.
      */
      beforeEach(function(done){
        loadFeed(0,done);
      });

      it('are loaded', function(){
        let entryCount = document.getElementsByClassName('entry').length;
        expect(entryCount).not.toBe(0);
      });

    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function(){
      /* TODO: Write a test that ensures when a new feed is loaded
      * by the loadFeed function that the content actually changes.
      * Remember, loadFeed() is asynchronous.
      */
      let contentBefore,
          contentAfter,
          contentChanged;

      // This function retrieves the text content of the first h2 element in the feed
      function getContent() {
        return document.getElementsByClassName('entry')[0].firstElementChild.innerText;
      }

      // Execute loadFeed() two times, one after another, using different feed id to load different content.
      // Store these retrieved content for comparison later.
      beforeEach(function(done){
        loadFeed(0, function () {
          contentBefore = getContent();
          loadFeed(1, function () {
            contentAfter = getContent();
            done();
          });
        });
      });

      it('loads new feeds', function(){
        if ( contentBefore !== contentAfter ) {
          contentChanged = true;
        }

          expect(contentChanged).toBe(true);

      });
    });
}());
