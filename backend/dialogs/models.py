from django.db import models
from backend.profiles.models import Profile
from backend.socket_chat.models import MessageMixin


class Dialog(models.Model):
    """ Room for 2 people """
    members = models.ManyToManyField(Profile, through='DialogMembership', related_name='dialogs')

    class Meta:
        verbose_name = "Dialog"
        verbose_name_plural = "Dialogs"

    def __str__(self):
        return f"{self.id}"


class DialogMembership(models.Model):
    """ m2m for Profile and Group """
    person = models.ForeignKey(Profile, on_delete=models.CASCADE)
    dialog = models.ForeignKey(Dialog, on_delete=models.CASCADE)

    class Meta:
        verbose_name = "Membership in dialog"
        verbose_name_plural = "Memberships in dialogs"
        unique_together = ('person', 'dialog')

    def __str__(self):
        return f"{self.person.user.username} in {self.dialog.id}"


class DialogMessage(MessageMixin):
    """ Dialog message """
    dialog = models.ForeignKey(
        Dialog,
        on_delete=models.CASCADE,
        related_name="messages"
    )
    readers = models.ManyToManyField(
        Profile,
        through="DialogMessageInfo",
        related_name="dialog_messages"
    )

    def save(self, *args, **kwargs):
        """ set readers as dialog members """
        super().save(*args, **kwargs)
        for person in self.dialog.members.all():
            unread = True
            if person.id == self.sender.id:
                unread = False

            DialogMessageInfo.objects.create(
                message=self,
                person=person,
                unread=unread,
            )

    class Meta:
        verbose_name = "Message in dialog"
        verbose_name_plural = "Messages in dialog"

    def __str__(self):
        return f"{self.sender} - {self.dialog.id}"


class DialogMessageInfo(models.Model):
    """ m2m for profile & dialog message """
    message = models.ForeignKey(DialogMessage, on_delete=models.CASCADE)
    person = models.ForeignKey(Profile, on_delete=models.CASCADE)
    unread = models.BooleanField(default=True)
    stared = models.BooleanField(default=False)

    def __str__(self):
        return f"message {self.message.id}, for '{self.person}' user"
