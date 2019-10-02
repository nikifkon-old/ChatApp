from django.db import models
from backend.profiles.models import Profile
from backend.groups.models import ChatGroup
from backend.dialogs.models import Dialog


class GroupMessage(models.Model):
    """ Group message """
    sender = models.ForeignKey(
        Profile, on_delete=models.CASCADE,
        related_name="sended_group_messages"
    )
    group = models.ForeignKey(ChatGroup, on_delete=models.CASCADE, related_name="messages")
    text = models.TextField(max_length=1000)
    date = models.DateTimeField("date of created or updated", auto_now=True)
    readers = models.ManyToManyField(
        Profile,
        through="GroupMessageInfo",
        related_name="group_messages"
    )

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        for person in self.group.members.all():
            unread = True
            if person.id == self.sender.id:
                unread = False

            GroupMessageInfo.objects.create(
                message=self,
                person=person,
                unread=unread,
            )

    class Meta:
        verbose_name = "Message in group"
        verbose_name_plural = "Messages in group"

    def __str__(self):
        return f"`{self.sender}` send in `{self.group.name}`"


class GroupMessageInfo(models.Model):
    """ m2m for profile & group message """
    message = models.ForeignKey(GroupMessage, on_delete=models.CASCADE)
    person = models.ForeignKey(Profile, on_delete=models.CASCADE)
    unread = models.BooleanField(default=True)
    stared = models.BooleanField(default=False)

    def __str__(self):
        return f"message {self.message.id}, for '{self.person}' user"


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
