from rest_framework import routers
from django.urls import path, include
from .api import QuestionViewSet, AnswerViewSet, CommentViewSet, LikeViewSet , UpvoteViewSet, QuestList, CategoryViewSet, SugTagList, SuggestTagViewSet, PostViewSet, PostImgViewSet, PostList, RatingViewSet

router = routers.DefaultRouter()
router.register('api/questions', QuestionViewSet, 'questions')
router.register('api/answers', AnswerViewSet, 'answers')
router.register('api/comments', CommentViewSet, 'comments')
router.register('api/sugTags', SuggestTagViewSet, 'sugTags')
router.register('api/all/questions', QuestList, 'questlist')
router.register('api/all/sugTags', SugTagList, 'sugTaglist')
router.register('api/all/posts', PostList, 'postlist')
router.register('api/likes', LikeViewSet, 'likes')
router.register('api/upvotes', UpvoteViewSet, 'upvotes')
router.register('api/categories', CategoryViewSet, 'categories')
router.register('api/posts', PostViewSet, 'posts')
router.register('api/ratings', RatingViewSet, 'ratings')
router.register('api/postImgs', PostImgViewSet, 'postImgs')

urlpatterns = [
    path(r'', include(router.urls)),
]