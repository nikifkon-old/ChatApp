from django.db import models
from backend.profiles.models import Profile
from backend.groups.models import ChatGroup
from backend.dialogs.models import Dialog


class GroupMessage(models.Model):
    """ Group message """
    sender = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="group_messages")
    group = models.ForeignKey(ChatGroup, on_delete=models.CASCADE, related_name="messages")
    text = models.TextField(max_length=1000)
    date = models.DateTimeField("date of created or updated", auto_now=True)

    class Meta:
        verbose_name = "Message in group"
        verbose_name_plural = "Messages in group"

    def __str__(self):
        return f"{self.sender} - {self.group.name}"


class DialogMessage(models.Model):
    """ Dialog message """
    sender = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="dialog_messages")
    dialog = models.ForeignKey(Dialog, on_delete=models.CASCADE, related_name="messages")
    text = models.TextField(max_length=1000)
    date = models.DateTimeField("date of created or updated", auto_now=True)

    class Meta:
        verbose_name = "Message in dialog"
        verbose_name_plural = "Messages in dialog"

    def __str__(self):
        return f"{self.sender} - {self.dialog.id}"
