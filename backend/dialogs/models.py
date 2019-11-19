from django.db import models
from django.core.exceptions import (
    ValidationError,
    ObjectDoesNotExist,
)
from django.utils.translation import gettext_lazy as _

from backend.profiles.models import Profile
from backend.socket_chat.models import MessageMixin


class Dialog(models.Model):
    """ Room for 2 people """
    members = models.ManyToManyField(
        Profile,
        through='DialogMembership',
        related_name='dialogs'
    )

    class Meta:
        verbose_name = "Dialog"
        verbose_name_plural = "Dialogs"

    @staticmethod
    def check_unique_members(user1, user2):
        try:
            p1 = Profile.objects.get(id=user1)
            p2 = Profile.objects.get(id=user2)
        except ObjectDoesNotExist:
            raise ValidationError(_('Profile does not exist'))
        general_dialogs = p2.dialogs.all() & p1.dialogs.all()
        if len(general_dialogs) > 0:
            raise ValidationError(_('Dialog with these 2 person already exist'))

    def __str__(self):
        return f"{self.id}"


class DialogMembership(models.Model):
    """ m2m for Profile and Group """
    person = models.ForeignKey(Profile, on_delete=models.CASCADE)
    dialog = models.ForeignKey(Dialog, on_delete=models.CASCADE)

    class Meta:
        verbose_name = "Membership in dialog"
        verbose_name_plural = "Memberships in dialogs"
        constraints = [
            models.UniqueConstraint(
                fields=("person", "dialog"),
                name="unique_person_and_dialog",
            )
        ]

    def save(self, *args, **kwargs):
        """ Only to members in dialog & no dialog with two same person """
        dialog_members = self.dialog.members.all()
        if len(dialog_members) >= 2:
            raise ValidationError(_('This dialog already have 2 members'))
        else:
            for member in dialog_members:
                member_dialogs = member.dialogs.exclude(id=self.dialog.id)
                general_dialogs = member_dialogs & self.person.dialogs.all()
                if len(general_dialogs) > 0:
                    raise ValidationError(_(
                        'Person already have dialog with members'
                    ))
        super().save(*args, **kwargs)

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
            info, created = DialogMessageInfo.objects.get_or_create(
                message=self,
                person=person,
            )
            if created:
                if person.id == self.sender.id:
                    info.unread = False
                else:
                    info.unread = True
            info.save()

    class Meta:
        verbose_name = "Message in dialog"
        verbose_name_plural = "Messages in dialog"

    def __str__(self):
        return f"{self.sender} - {self.dialog.id}"


class DialogMessageInfo(models.Model):
    """ m2m for profile & dialog message """
    message = models.ForeignKey(
        DialogMessage,
        on_delete=models.CASCADE,
        related_name="message_info"
    )
    person = models.ForeignKey(Profile, on_delete=models.CASCADE)
    unread = models.BooleanField(default=True)
    stared = models.BooleanField(default=False)

    def __str__(self):
        return f"message {self.message.id}, for '{self.person}' user"
