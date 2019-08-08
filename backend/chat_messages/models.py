from django.db import models
from backend.profiles.models import Profile
from backend.groups.models import ChatGroup


class Message(models.Model):
    sender = models.ForeignKey(Profile, on_delete=models.CASCADE)
    group = models.ForeignKey(ChatGroup, on_delete=models.CASCADE)
    text = models.TextField(max_length=1000)
    date = models.DateField("date of created or updated", auto_now=True)

    class Meta:
        verbose_name = "Message"
        verbose_name_plural = "Messages"

    def __str__(self):
        return f"{self.sender} - {self.group.name}"
