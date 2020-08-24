from rest_framework import serializers
from .models import Answer, Question, Comment, Like, Upvote, Category, SuggestTag, Post, PostImg, Rating
from accounts.serializers import UserSerializer

class RatingSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    class Meta:
        model = Rating
        fields = ("id", "rating", "post", "owner")

class PostImgSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostImg
        fields = ("id", "image", "imgUrl", "imgID", "post")

class UpvoteSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    class Meta:
        model = Upvote
        fields = ("id", "owner", "toComment")

class CommentSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    class Meta:
        model = Comment
        fields = ("id", "comment", "created_at", "owner", "answers", "posts", "upvotes")
        extra_kwargs = {"upvotes":{'required':False}}

class PostSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    images = PostImgSerializer(many=True, read_only=True)
    comments = CommentSerializer(many=True, read_only=True)
    ratings = RatingSerializer(many=True, read_only=True)
    class Meta:
        model = Post
        fields = ("id", "title", "content", "owner", "created_at", "published", "topPick", "group", "savedBy", "images", "comments", "ratings")
        extra_kwargs = {"images":{"required":False}}

class LikeSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    class Meta:
        model = Like
        fields = ("id", "owner", "toAnswer")   

class AnswerSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    comments = CommentSerializer(many=True, read_only=True)
    class Meta:
        model = Answer
        fields = ("id", "answer", "created_at", "owner", "questions", "picture", "comments", "likes")
        extra_kwargs = {'comments': {'required': False}, 'likes':{'required':False}}

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ("id", "category", "toQuestions")
        extra_kwargs = {"toQuestions": {"required":False}}

class QuestionSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    answers = AnswerSerializer(many=True, read_only=True)
    class Meta:
        model = Question
        fields = ("id", "question", "spec", "owner", "created_at", "tags", "answers")
        extra_kwargs = {'answers': {'required': False}}

class SuggestTagSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    class Meta:
        model = SuggestTag
        fields = ("id", "tag", "owner")


    