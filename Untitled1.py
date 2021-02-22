#!/usr/bin/env python
# coding: utf-8

# In[5]:


import tweepy
import pandas as pd
import numpy as np
import re
import matplotlib.pyplot as plt
from wordcloud import WordCloud

consumer_key = "IXCvf6WsTxR5JSsdusJHiyfIr"
consumer_secret = "HCrCeUIKlBmQuCS2vjHQCWi8VgdfnSOBbmeRKCUl2NcUIK570t"
access_token = "1303429505256574976-cy4Ck9Fa7yFG7p79QVL7oZywojInYG"
access_token_secret = "5Quo4hc93EoSyHpCuTyESIRhg6ef3fA3xzZMZEK7HaJHO"

auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth)


# In[6]:


for i in str.argv():
    tweets = api.user_timeline(screen_name=i, 
                           # 200 is the maximum allowed count
                           count=100,
                           include_rts = False,
                           # Necessary to keep full_text 
                           # otherwise only the first 140 words are extracted
                           tweet_mode = 'extended'
                           )


# In[7]:


for info in tweets[:3]:
     print("ID: {}".format(info.id))
     print(info.created_at)
     print(info.full_text)
     print("\n")


# In[18]:


all_tweets = []
all_tweets.extend(tweets)
oldest_id = tweets[-1].id
while max_id == 0:
    tweets = api.user_timeline(screen_name=i, 
                       # 200 is the maximum allowed count
                       count=100,
                       include_rts = False,
                       max_id = oldest_id - 1,
                       # Necessary to keep full_text 
                       # otherwise only the first 140 words are extracted
                       tweet_mode = 'extended'
                       )
    if len(tweets) == 0:
        break
    oldest_id = tweets[-1].id
    all_tweets.extend(tweets)
    print('N of tweets downloaded till now {}'.format(len(all_tweets)))


# In[16]:


import os
os.environ["EAI_USERNAME"] = 'nutheti.laasya@gmail.com'
os.environ["EAI_PASSWORD"] = 'Rintern1311'

from expertai.nlapi.cloud.client import ExpertAiClient
client = ExpertAiClient()


# In[17]:


from pandas import DataFrame
texttweets = [[tweet.id_str, 
              tweet.created_at, 
              tweet.favorite_count, 
              tweet.retweet_count, 
              tweet.full_text] for idx,tweet in enumerate(all_tweets)]
df = DataFrame(texttweets,columns=["id","created_at","favorite_count","retweet_count", "text"])
df.to_csv('%s_tweets.csv' % userID,index=False)
text = df.text
language= 'en'
document = client.specific_resource_analysis(
    body={"document": {"text": text}}, 
    params={'language': language, 'resource': 'sentiment'})
print("sentiment:", response.sentiment.overall)


# In[30]:


#not needed

tweets = api.user_timeline(screen_name=userID, 
                           # 200 is the maximum allowed count
                           count=100,
                           include_rts = False,
                           max_id = oldest_id - 1,
                           # Necessary to keep full_text 
                           # otherwise only the first 140 words are extracted
                           tweet_mode = 'extended'
                           )

#if len(tweets) == 0:
#    break
oldest_id = tweets[-1].id
all_tweets.extend(tweets)
print('N of tweets downloaded till now {}'.format(len(all_tweets)))


# In[1]:


#not needed

from expertai.nlapi.cloud.client import ExpertAiClient
client = ExpertAiClient()

text = "Michael Jordan was one of the best basketball players of all time. Scoring was Jordan's stand-out skill, but he still holds a defensive NBA record, with eight steals in a half." 
language= 'en'

output = client.specific_resource_analysis(
    body={"document": {"text": text}}, 
    params={'language': language, 'resource': 'sentiment'
})

# Output overall sentiment

print("Output overall sentiment:")

print(output.sentiment.overall)


# In[ ]:




