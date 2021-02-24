from pandas import DataFrame
from expertai.nlapi.cloud.client import ExpertAiClient
import os
import sys
import tweepy
import pandas as pd
import numpy as np
import re
import matplotlib.pyplot as plt
from wordcloud import WordCloud
from dotenv import load_dotenv
load_dotenv()

#Auth
consumer_key = os.getenv("consumer_key")
consumer_secret = os.getenv("consumer_secret")
access_token = os.getenv("access_token")
access_token_secret = os.getenv("access_token_secret")

auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
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
#print('N of tweets downloaded till now {}'.format(len(all_tweets)))

#ExpertNLP api
client = ExpertAiClient()

#Clean text
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
#print(all_tweets[0])

#Individual sentiment of tweets
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

#No. of neg, pos, neut tweets
neg_count = len(list(filter(lambda x: (x < 0), rate_list)))
pos_count = len(list(filter(lambda x: (x > 0), rate_list)))
neut_count = len(list(filter(lambda x: (x == 0), rate_list)))

#Overall sentiment of the tweets
texttweets = [[tweet.full_text] for idx, tweet in enumerate(all_tweets)]
text = [''.join(ele) for ele in texttweets]
text = " ".join(str(x) for x in text)
text = removeEmoji(text)
text = removeUsername(text)
text = removeURL(text)
text = removeLine(text)
text = removeSpecialChar(text)
#print(text.encode('utf-8'))
#print(text)
language = 'en'
document = client.specific_resource_analysis(
    body={"document": {"text": text}},
    params={'language': language, 'resource': 'sentiment'})


#User Details
user = api.get_user(sys.argv[1])
#User name
print(user.name)
#Account created at
print(str(user.created_at))
#Follower count
print(str(user.followers_count))
#Friends count (No. of people the user is following)
print(str(user.friends_count))
#Individual sentiment (positive, negative and neutral tweet count)
print(pos_count, neg_count, neut_count)
#Overall sentiment of the account
print(document.sentiment.overall)