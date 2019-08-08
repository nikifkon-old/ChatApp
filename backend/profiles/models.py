from django.db import models
from django.contrib.auth.models import User
from PIL import Image


class Profile(models.Model):
    """ User Profile """
    
    GENDER_CHOICES = [
        ("M", "Man"),
        ("W", "Woman"),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    avatar = models.ImageField("Avatar", upload_to="profiles/", null=True, blank=True)
    tel = models.CharField("Telephone", max_length=16, blank=True)
    birth = models.DateField("Date of Birth", max_length=200, null=True, blank=True)
    gender = models.CharField("Gender", max_length=1, choices=GENDER_CHOICES, blank=True)


    class Meta:
        verbose_name = "Profile"
        verbose_name_plural = "Profiles"

    def __str__(self):
        return self.user.username
    

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if self.avatar:
            img = Image.open(self.avatar.path)
            if img.height > 500 or img.width > 500:
                output_size = (500, 500)
                img.thumbnail(output_size)
                img.save(self.avatar.path)
