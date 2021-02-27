# <img width="20%" src="https://user-images.githubusercontent.com/54776537/109198721-90b4de80-77c4-11eb-90e0-4b3de72e2016.gif"><img width="42%" src="https://user-images.githubusercontent.com/54776537/109186732-3feab900-77b7-11eb-8cf3-029ccc375cdb.png">


## :star: Objective

An extension downloadable through our [website](https://tweazy.herokuapp.com) which helps you analyze twitter accounts based on the content and history with real-time sentiment analysis on tweets

## :star: APIs, libraries and frameworks
- Tweepy- For scraping twitter data
- Expert.ai- For sentiment analysis
- Express.js - Back-end server

## :star: Working of Tweazy
- Identifies twwitter handles on screen
- Extracts text from 50 latest tweets of selected user handle
- Performs sentiment analysis and returns an overall sentiment score along with a sentiment graph showing number of positive, neutral and negative tweets
- Gives additional insights on on the number of followers and friends, and the time at which the account was created

## :star: Install dependencies and run the local server
- Run the command `npm i && pip install -r requirements.txt && node index.js` in your terminal to install dependencies and start the local server.
- This command will install Python and Node.js dependencies, after which, it will also start the server locally.
- You can now proceed to install the extension as mentioned in the next section.

## :star: Extension installation
- Download the extension from [here](https://tweazy.herokuapp.com).
- Unzip the file once downloaded and take note of the location.
- Open Google Chrome and go to `chrome://extensions`.
- Turn on the `Developer Mode` on the top right corner.
- Now select `Load Unpacked` from the left corner and select the `extension` folder from the unzipped file you downloaded.
- You should be able to see Tweazy extension now.
- You can now proceed to the next section on how to use the extension.

## :star: Usage
- Open up any twitter page / profile.
- Click on the extension.
- Select the username you wish to analyze.
- Voila! On the screen are your results!
