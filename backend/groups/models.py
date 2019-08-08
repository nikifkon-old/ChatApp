from django.db import models
from PIL import Image

from backend.profiles.models import Profile


class ChatGroup(models.Model):
    name = models.CharField("Name", max_length=100)
    slug = models.SlugField("Unique name", max_length=100, unique=True)
    img = models.ImageField("Image", upload_to="groups/", null=True, blank=True)
    description = models.TextField("Description", max_length=1000, null=True, blank=True)
    members = models.ManyToManyField(Profile, through='Membership', related_name='groups')

    class Meta:
        verbose_name = "Group"
        verbose_name_plural = "Groups"

    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if self.img:
            img = Image.open(self.img.path)
            if img.height > 500 or img.width > 500:
                output_size = (500, 500)
                img.thumbnail(output_size)
                img.save(self.img.path)


class Membership(models.Model):
    ROLES_CHOICES = [
        ("A", "Admin"),
        ("M", "Moderator"),
        ("M", "Member"),
    ]

    person = models.ForeignKey(Profile, on_delete=models.CASCADE)
    group = models.ForeignKey(ChatGroup, on_delete=models.CASCADE)
    role = models.CharField("Role in Group", max_length=1, choices=ROLES_CHOICES)
    date_joined = models.DateField("Date of joined", auto_now_add=True)

    class Meta:
        verbose_name = "Membership"
        verbose_name_plural = "Memberships"

    def __str__(self):
        return f"{self.person.user.username} - {self.group.name}" 
    