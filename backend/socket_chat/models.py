from django.db import models
from backend.profiles.models import Profile


class MessageMixin(models.Model):
    """ Message Mixin"""
    sender = models.ForeignKey(
        Profile,
        on_delete=models.CASCADE,
        related_name="%(class)s_sended"
    )
    text = models.TextField(max_length=1000)
    date = models.DateTimeField(
        "date of created or updated",
        auto_now=True
    )

    class Meta:
        abstract = True
