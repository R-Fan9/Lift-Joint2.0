from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Post(models.Model):
    title = models.CharField(max_length=50, null=True)
    content = models.CharField(max_length=10000)
    owner = models.ForeignKey(User, related_name="posts", on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now=True)
    published = models.BooleanField(default=False)
    topPick = models.IntegerField(null=True)
    group = models.CharField(max_length=30, null=True)
    savedBy = models.ManyToManyField(User, related_name="savedPosts", blank=True)

class Rating(models.Model):
    rating = models.IntegerField()
    post = models.ForeignKey(Post, related_name="ratings", on_delete=models.CASCADE)
    owner = models.ForeignKey(User, related_name="ratings", on_delete=models.CASCADE, null=True)
    
class PostImg(models.Model):
    image = models.ImageField(upload_to='postImg/%Y/%m/%D/', null=True)
    imgUrl = models.CharField(max_length=1000, null=True)
    imgID = models.IntegerField(null=True)
    post = models.ForeignKey(Post, related_name="images", on_delete=models.CASCADE)

class SuggestTag(models.Model):
    tag = models.CharField(max_length=50)
    owner = models.ForeignKey(User, related_name="suggestTags", on_delete=models.CASCADE, null=True)

class Category(models.Model):
    category = models.CharField(max_length=50)

class Question(models.Model):
    question = models.CharField(max_length=100)
    spec = models.CharField(max_length=500, blank=True)
    owner = models.ForeignKey(User, related_name="questions", on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now=True)
    tags = models.ManyToManyField(Category, related_name="toQuestions", blank=True)

class Answer(models.Model):
    answer = models.CharField(max_length=500)
    created_at = models.DateTimeField(auto_now=True)
    owner = models.ForeignKey(User, related_name="answers", on_delete=models.CASCADE, null=True)
    questions = models.ManyToManyField(Question, related_name='answers', blank=True)
    picture = models.ImageField(blank=True, null=True, upload_to='ansPic/%Y/%m/%D/')

class Like(models.Model):
    owner = models.ForeignKey(User, related_name="likes", on_delete=models.CASCADE, null=True)
    toAnswer = models.ManyToManyField(Answer, related_name="likes")

class Comment(models.Model):
    comment = models.CharField(max_length=500)
    created_at = models.DateTimeField(auto_now=True)
    owner = models.ForeignKey(User, related_name="comments", on_delete=models.CASCADE, null=True)
    answers = models.ManyToManyField(Answer, related_name='comments', blank=True)
    posts = models.ManyToManyField(Post, related_name='comments', blank=True)

class Upvote(models.Model):
    owner = models.ForeignKey(User, related_name="upvotes", on_delete=models.CASCADE, null=True)
    toComment = models.ManyToManyField(Comment, related_name="upvotes")




