from django.db import models
from django.contrib.auth.models import AbstractUser
from PIL import Image


MEDIA_DIR = "person/"


class User(AbstractUser):
    """ User model"""

    GENDER_CHOICES = [
        ("M", "Male"),
        ("F", "Famale"),
    ]

    avatar = models.ImageField("Avatar", upload_to=MEDIA_DIR, null=True, blank=True)
    tel = models.CharField("Telephone", max_length=16, blank=True)
    birth = models.DateField("Date of Birth", max_length=200, null=True, blank=True)
    gender = models.CharField("Gender", max_length=1, choices=GENDER_CHOICES, blank=True)

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"

    def __str__(self):
        return self.username

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if self.avatar:
            img = Image.open(self.avatar.path)
            if img.height > 500 or img.width > 500:
                output_size = (500, 500)
                img.thumbnail(output_size)
                img.save(self.avatar.path)
