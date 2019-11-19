from django.db import models
from PIL import Image

from backend.profiles.models import Profile
from backend.socket_chat.models import MessageMixin


class ChatGroup(models.Model):
    """ Room for >2 people """
    name = models.CharField("Name", max_length=100)
    slug = models.SlugField("Unique name", max_length=100, unique=True)
    img = models.ImageField("Image", upload_to="groups/", null=True, blank=True)
    description = models.TextField(
        "Description",
        max_length=1000,
        null=True,
        blank=True
    )
    members = models.ManyToManyField(
        Profile,
        through='GroupMembership',
        related_name='groups'
    )

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


class GroupMembership(models.Model):
    """ m2m for Profile and Group """
    ROLES_CHOICES = [
        ("A", "Admin"),
        ("M", "Moderator"),
        ("S", "Subscriber"),
    ]

    person = models.ForeignKey(Profile, on_delete=models.CASCADE)
    group = models.ForeignKey(ChatGroup, on_delete=models.CASCADE)
    role = models.CharField(
        "Role in Group",
        max_length=1,
        choices=ROLES_CHOICES
    )
    date_joined = models.DateField("Date of joined", auto_now_add=True)

    class Meta:
        verbose_name = "Membership in group"
        verbose_name_plural = "Memberships in group"
        constraints = [
            models.UniqueConstraint(
                fields=("person", "group"),
                name="unique_person_and_group"
            )
        ]

    def __str__(self):
        return f"`{self.person.user.username}` in `{self.group.name}`"


class GroupMessage(MessageMixin):
    """ Group message """
    group = models.ForeignKey(
        ChatGroup,
        on_delete=models.CASCADE,
        related_name="messages"
    )
    readers = models.ManyToManyField(
        Profile,
        through="GroupMessageInfo",
        related_name="group_messages"
    )

    def save(self, *args, **kwargs):
        """ set readers as group members """
        super().save(*args, **kwargs)
        for person in self.group.members.all():
            info, created = GroupMessageInfo.objects.get_or_create(
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
        verbose_name = "Message in group"
        verbose_name_plural = "Messages in group"

    def __str__(self):
        return f"`{self.sender}` send in `{self.group.name}`"


class GroupMessageInfo(models.Model):
    """ m2m for profile & group message """
    message = models.ForeignKey(
        GroupMessage,
        on_delete=models.CASCADE,
        related_name="message_info"
    )
    person = models.ForeignKey(Profile, on_delete=models.CASCADE)
    unread = models.BooleanField(default=True)
    stared = models.BooleanField(default=False)

    def __str__(self):
        return f"message {self.message.id}, for '{self.person}' user"
