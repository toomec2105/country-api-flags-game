# Country game



  >The application gets data from an external API and uses it to display flags and country names options.
  >The game has 4 levels, which can be set in "Options" and can be played by 2 players. 
  >After running out of flags for a given level the level restarts(automatically) 
  >or the players can choose to change the difficulty level.
  
# Live version 
  - https://toomec2105.github.io/country-api-flags-game/

# Tools and Technologies
 - parcel-bundler
 - npm
 - visual studio code
 - jasmine
# How to start development
 - clone or fork the project
 - install node 
 - install dependencies from package.json by "npm i"
 - build by "npm run build"(parcel-bundler will create the dist folder)
 - start a parcel-bundler server by "npm start" and go to http://localhost:1234/
 - deploy to your Github Pages by "npm run deploy" (First add "homepage" key in package.json)
# Testing
 - tests run with jasmine framkework by "npm run test"
# Known Issues
 - If you want the page to display correctly at your Github Pages, after making a build you have to change index.html(all hyperlinks to .css and .js) and style.css(all img hyperlinks)).
 Just remove "/" from the beggining of the hyperlinks.
Now you are ready to deploy it to Github Pages.


# Ideas for Enchancement
 - Options for the number of players.
 - Persist your progress.
 - Options for the number of flags per match.