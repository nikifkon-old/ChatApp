from django.contrib.auth import get_user_model
from django.core.exceptions import ObjectDoesNotExist, ValidationError
from django.db import models
from django.utils.translation import gettext_lazy as _

User = get_user_model()


class Dialog(models.Model):
    """ Room for 2 people """
    members = models.ManyToManyField(
        User,
        through='DialogMembership',
        related_name='dialogs'
    )

    class Meta:
        verbose_name = "Dialog"
        verbose_name_plural = "Dialogs"

    @staticmethod
    def check_unique_members(user1, user2):
        try:
            user1 = User.objects.get(id=user1)
            user2 = User.objects.get(id=user2)
        except ObjectDoesNotExist:
            raise ValidationError(_('User does not exist'))
        general_dialogs = user2.dialogs.all() & user1.dialogs.all()
        if len(general_dialogs) > 0:
            raise ValidationError(_('Dialog with these 2 person already exist'))

    def __str__(self):
        return f"{self.id}"


class DialogMembership(models.Model):
    """ m2m for User and Group """
    person = models.ForeignKey(User, on_delete=models.CASCADE)
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
        return f"{self.person.username} in {self.dialog.id}"


class DialogMessage(models.Model):
    """ Dialog message """
    dialog = models.ForeignKey(
        Dialog,
        on_delete=models.CASCADE,
        related_name="messages"
    )
    readers = models.ManyToManyField(
        User,
        through="DialogMessageInfo",
        related_name="dialog_messages"
    )
    sender = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="dialogs_sended"
    )
    text = models.TextField(max_length=1000)
    date = models.DateTimeField("date of created or updated", auto_now=True)

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
    """ m2m for user & dialog message """
    message = models.ForeignKey(
        DialogMessage,
        on_delete=models.CASCADE,
        related_name="message_info"
    )
    person = models.ForeignKey(User, on_delete=models.CASCADE)
    unread = models.BooleanField(default=True)
    stared = models.BooleanField(default=False)

    def __str__(self):
        return f"message {self.message.id}, for '{self.person}' user"
