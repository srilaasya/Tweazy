from dotenv import load_dotenv
from expertai.nlapi.cloud.client import ExpertAiClient
import os
import sys
import re
import tweepy
import json

# Load and set environment variables
load_dotenv()

# Load NLP API
client = ExpertAiClient()

# Authenticate and fetch tweets
auth = tweepy.OAuthHandler(os.getenv("consumer_key"),
                           os.getenv("consumer_secret"))
auth.set_access_token(os.getenv("access_token"),
                      os.getenv("access_token_secret"))
api = tweepy.API(auth)
#print("Username from extension:", str(sys.argv[1]))
tweets = api.user_timeline(screen_name=str(sys.argv[1]),
                           count=50,
                           include_rts=True,
                           tweet_mode='extended'
                           )
oldest_id = tweets[-1].id
all_tweets = []
all_tweets.extend(tweets)
#print('Number of tweets downloaded till now {}'.format(len(all_tweets)))

# Clean text


def removeEmoji(text):
    regrex_pattern = re.compile(pattern="["
                                u"\U0001F600-\U0001F64F"  # emoticons
                                u"\U0001F300-\U0001F5FF"  # symbols & pictographs
                                u"\U0001F680-\U0001F6FF"  # transport & map symbols
                                u"\U0001F1E0-\U0001F1FF"  # flags (iOS)
                                "]+", flags=re.UNICODE)
    return regrex_pattern.sub(r'', text)


def removeUsername(text):
    regrex_pattern = re.compile(pattern="@[A-Za-z0-9\w]+", flags=re.UNICODE)
    return regrex_pattern.sub(r'', text)


def removeURL(text):
    regrex_pattern = re.compile(
        pattern="(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})", flags=re.UNICODE)
    return regrex_pattern.sub(r'', text)


def removeLine(text):
    regrex_pattern = re.compile(
        pattern="\n", flags=re.UNICODE)
    return regrex_pattern.sub(r'', text)


def removeSpecialChar(text):
    regrex_pattern = re.compile(
        pattern="[^0-9a-zA-Z ]+", flags=re.UNICODE)
    return regrex_pattern.sub(r'', text)
# print(all_tweets[0])


# Individual sentiment of tweets
individual_sentiment = []


def sentiment(tweets, all_tweets):
    for i in all_tweets:
        texttweets = [i.full_text]
        text = [''.join(ele) for ele in texttweets]
        text = " ".join(str(x) for x in text)
        text = removeEmoji(text)
        text = removeUsername(text)
        text = removeURL(text)
        text = removeLine(text)
        text = removeSpecialChar(text)
        language = 'en'
        document = client.specific_resource_analysis(
            body={"document": {"text": text}},
            params={'language': language, 'resource': 'sentiment'})
        individual_sentiment.append(document.sentiment.overall)
    return individual_sentiment


rate_list = sentiment(tweets, all_tweets)

# No. of neg, pos, neutral tweets
neg_count = len(list(filter(lambda x: (x < 0), rate_list)))
pos_count = len(list(filter(lambda x: (x > 0), rate_list)))
neutral_count = len(list(filter(lambda x: (x == 0), rate_list)))

# Overall sentiment of the tweets
texttweets = [[tweet.full_text] for idx, tweet in enumerate(all_tweets)]
text = [''.join(ele) for ele in texttweets]
text = " ".join(str(x) for x in text)
text = removeEmoji(text)
text = removeUsername(text)
text = removeURL(text)
text = removeLine(text)
text = removeSpecialChar(text)
# print(text)
document = client.specific_resource_analysis(
    body={"document": {"text": text}},
    params={'language': 'en', 'resource': 'sentiment'})


# Get user details
user = api.get_user(sys.argv[1])
output = {'username': user.name, 'joined': user.created_at.ctime(), 'followers': user.followers_count, 'following':  user.friends_count,
          'positive': pos_count, 'negative': neg_count, 'neutral': neutral_count, 'overall': document.sentiment.overall}
print(json.dumps(output))
