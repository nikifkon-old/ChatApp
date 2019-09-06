from django.db import models
from backend.profiles.models import Profile
from time import time
from random import random


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